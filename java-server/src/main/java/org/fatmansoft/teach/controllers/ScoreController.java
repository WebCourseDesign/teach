package org.fatmansoft.teach.controllers;

import com.github.benmanes.caffeine.cache.Cache;
import org.fatmansoft.teach.exception.ServiceException;
import org.fatmansoft.teach.models.*;
import org.fatmansoft.teach.payload.request.DataRequest;
import org.fatmansoft.teach.payload.response.DataResponse;
import org.fatmansoft.teach.payload.response.OptionItem;
import org.fatmansoft.teach.payload.response.OptionItemList;
import org.fatmansoft.teach.repository.*;
import org.fatmansoft.teach.util.CommonMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/score")
public class ScoreController {
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private ScoreRepository scoreRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private Cache<String, Object> caffeineCache;
    @Autowired
    private TeacherRepository teacherRepository;

    @PostMapping("/getStudentItemOptionList")
    public OptionItemList getStudentItemOptionList(@Valid @RequestBody DataRequest dataRequest) {
        List<Student> sList = studentRepository.findStudentListByNumName(""); // 数据库查询操作
        OptionItem item;
        List<OptionItem> itemList = new ArrayList();
        for (Student s : sList) {
            itemList.add(new OptionItem(s.getStudentId(), s.getStudentId() + "",
                    s.getPerson().getNum() + "-" + s.getPerson().getName()));
        }
        return new OptionItemList(0, itemList);
    }

    @PostMapping("/getCourseItemOptionList")
    public OptionItemList getCourseItemOptionList(@Valid @RequestBody DataRequest dataRequest) {
        List<Course> sList = courseRepository.findAll(); // 数据库查询操作
        OptionItem item;
        List<OptionItem> itemList = new ArrayList();
        for (Course c : sList) {
            itemList.add(new OptionItem(c.getCourseId(), c.getCourseId() + "", c.getNum() + "-" + c.getName()));
        }
        return new OptionItemList(0, itemList);
    }

    @PostMapping("/getScoreList")
    public DataResponse getScoreList(@Valid @RequestBody DataRequest dataRequest) {
        Integer studentId = dataRequest.getInteger("studentId");
        if (studentId == null)
            studentId = 0;
        Integer courseId = dataRequest.getInteger("courseId");
        if (courseId == null)
            courseId = 0;
        List<Score> sList = scoreRepository.findByStudentCourse(studentId, courseId); // 数据库查询操作
        Integer userId = CommonMethod.getUserId();
        Person person = userRepository.findById(userId).get().getPerson();
        if (person.getType().equals("2")) {
            Teacher teacher = teacherRepository.getTeacherByPerson(person);
            sList = sList.stream().filter(score -> {
                if (score.getCourse().getTeacher() != null) {
                    return score.getCourse().getTeacher().getTeacherId().equals(teacher.getTeacherId());
                }
                return false;
            }).toList();
        }
        List dataList = new ArrayList();
        Map m;
        for (Score s : sList) {
            m = new HashMap();
            m.put("scoreId", s.getScoreId() + "");
            m.put("studentId", s.getStudent().getStudentId() + "");
            m.put("courseId", s.getCourse().getCourseId() + "");
            m.put("studentNum", s.getStudent().getPerson().getNum());
            m.put("studentName", s.getStudent().getPerson().getName());
            m.put("className", s.getStudent().getClassName());
            m.put("courseNum", s.getCourse().getNum());
            m.put("courseName", s.getCourse().getName());
            m.put("credit", "" + s.getCourse().getCredit());
            m.put("mark", s.getMark());
            dataList.add(m);
        }
        return CommonMethod.getReturnData(dataList);
    }

    @PostMapping("/scoreSave")
    public DataResponse scoreSave(@Valid @RequestBody DataRequest dataRequest) {
        Integer studentId = dataRequest.getInteger("studentId");
        Integer courseId = dataRequest.getInteger("courseId");
        Integer mark = dataRequest.getInteger("mark");
        Integer scoreId = dataRequest.getInteger("scoreId");
        Optional<Score> op;
        Score s = null;
        if (scoreId != null) {
            op = scoreRepository.findById(scoreId);
            if (op.isPresent())
                s = op.get();
        }
        if (s == null) {
            s = new Score();
            Student student = studentRepository.findByStudentId(studentId);
            List<Score> existingScores = scoreRepository.findByStudentCourse(studentId, courseId);
            if (!existingScores.isEmpty()) {
                return CommonMethod.getReturnMessageError("该学生已经有该课程的成绩信息，不能重复添加");
            }
            s.setStudent(studentRepository.findById(studentId).get());
            s.setCourse(courseRepository.findById(courseId).get());
        }
        s.setMark(mark);
        scoreRepository.save(s);
        List<Score> byStudentCourse = scoreRepository.findByStudentCourse(0, courseId);
        byStudentCourse.sort(Comparator.comparingInt((Score sc) -> sc.getMark() == null ? Integer.MIN_VALUE : sc.getMark()).reversed());
        System.out.println("byStudentCourse = " + byStudentCourse);
        for (int i = 0; i < byStudentCourse.size(); i++) {
            byStudentCourse.get(i).setRanking(i + 1);
            scoreRepository.save(byStudentCourse.get(i));
        }
        return CommonMethod.getReturnMessageOK();
    }

    @PostMapping("/scoreDelete")
    public DataResponse scoreDelete(@Valid @RequestBody DataRequest dataRequest) {
        Integer scoreId = dataRequest.getInteger("scoreId");
        Optional<Score> op;
        Score s = null;
        if (scoreId != null) {
            op = scoreRepository.findById(scoreId);
            if (op.isPresent()) {
                s = op.get();
                scoreRepository.delete(s);
            }
        }
        return CommonMethod.getReturnMessageOK();
    }

    /**
     * 选课逻辑，成绩表作为学生-课程关系表
     * 
     * @return
     */
    @PostMapping("/selectCourse")
    public DataResponse selectCourse(@RequestBody List<String> courseIdList) {
        try {
            courseIdList=List.of(courseIdList.get(courseIdList.size()-1));
            if (courseIdList != null && !courseIdList.isEmpty()) {
                System.out.println("courseIdList = " + courseIdList);
                HashSet<String> courseIdSet = new HashSet<>(courseIdList);
                System.out.println("courseIdSet = " + courseIdSet);
                Integer userId = CommonMethod.getUserId();

                Optional<User> byId = userRepository.findById(userId);
                if (byId.isPresent()) {
                    User user = byId.get();
                    personRepository.findById(user.getPerson().getPersonId()).ifPresent(person -> {
                        // System.out.println("上面的"+caffeineCache.asMap());
                        studentRepository.findByPersonPersonId(person.getPersonId()).ifPresent(student -> {

                            List<Integer> selectedStudents = (List<Integer>) caffeineCache.asMap()
                                    .get("selectedStudents");
                            if (selectedStudents == null) {
                                selectedStudents = new ArrayList<>();
                            }
                            System.out.println("selectedStudents = " + selectedStudents);
                            for (String courseids : courseIdSet) {
                                Integer courseId = Integer.valueOf(courseids);
                                List<Integer> finalSelectedStudents = selectedStudents;

                                Course preCourse = courseRepository.findById(courseId).get().getPreCourse();
                                Integer preCourseId = preCourse == null ? 0 : preCourse.getCourseId();
                                if (preCourseId != 0) {
                                    List<Score> byStudentCourse = scoreRepository.findByStudentCourse(student.getStudentId(), preCourseId);
                                    if (byStudentCourse.isEmpty()) {
                                        throw new ServiceException("请先修完 " + preCourse.getName());
                                    }
                                }

                                // 找出实际已经选上（在数据库而不是缓存中）的学生并添加到finalSelectedStudents中
                                List<Integer> selectedStudentIds = scoreRepository.findByCourseCourseId(courseId)
                                        .stream()
                                        .map(score -> score.getStudent().getStudentId()).collect(Collectors.toList());

                                courseRepository.findById(courseId).ifPresent(course -> {
                                    List sList = (List<Integer>) caffeineCache.asMap().get(String.valueOf(courseId));
                                    if (selectedStudentIds.contains(student.getStudentId())) {
                                        throw new ServiceException("你已经选中了 " + course.getName());
                                    }
                                    if (sList != null && !sList.isEmpty()) {
                                        if (finalSelectedStudents.contains(student.getStudentId())) {
                                            throw new ServiceException("你已经选过了 " + course.getName());
                                        }
                                        sList.add(student.getStudentId());
                                        caffeineCache.asMap().put(String.valueOf(courseId), sList);
                                    } else {
                                        List<Integer> studentList = new ArrayList<>();
                                        studentList.add(student.getStudentId());
                                        caffeineCache.asMap().put(String.valueOf(courseId), studentList);
                                    }
                                });
                                List sList = (List<Integer>) caffeineCache.asMap().get(String.valueOf(courseId));
                                System.out.println("courseId=" + courseId);
                                System.out.println("sList = " + sList);
                                // List<Score> byStudentCourse =
                                // scoreRepository.findByStudentCourse(student.getStudentId(), courseId);
                                // if (byStudentCourse.isEmpty()){
                                // Score score = new Score();
                                // score.setStudent(student);
                                // score.setCourse(courseRepository.findById(courseId).get());
                                // scoreRepository.save(score);
                                // }
                            }
                            selectedStudents.add(student.getStudentId());
                            caffeineCache.asMap().put("selectedStudents", selectedStudents);
                        });
                    });
                }

            }
            return CommonMethod.getReturnMessageOK();
        } catch (ServiceException e) {
            return CommonMethod.getReturnMessageError(e.getMessage());
        }
    }

    // 用于得到选了但还不一定选中的课程
    @GetMapping("/attemptToSelectCourses")
    public DataResponse getAttemptToSelectCourseByStudent() {
        // 获取当前登录用户
        Integer userId = CommonMethod.getUserId();
        Optional<User> byId = userRepository.findById(userId);
        if (byId.isPresent()) {
            User user = byId.get();
            Integer personId = user.getPerson().getPersonId();
            Optional<Student> byPersonPersonId = studentRepository.findByPersonPersonId(personId);
            if (byPersonPersonId.isPresent()) {
                // 从caffeineCache中获取此用户的选课信息
                Student student = byPersonPersonId.get();
                System.out.println("下面的" + caffeineCache.asMap());
                List<Integer> selectedStudents = (List<Integer>) caffeineCache.asMap().get("selectedStudents");
                List<Course> attemptToSelectCourses = new ArrayList<>();
                if (selectedStudents != null && selectedStudents.contains(student.getStudentId())) {
                    for (String key : caffeineCache.asMap().keySet()) {
                        if (key.matches("\\d+")) {
                            List<Integer> sList = (List<Integer>) caffeineCache.asMap().get(key);
                            if (sList.contains(student.getStudentId())) {
                                courseRepository.findById(Integer.valueOf(key)).ifPresent(attemptToSelectCourses::add);
                            }
                        }
                    }
                    return CommonMethod.getReturnData(attemptToSelectCourses);
                }

            }
        }
        return null;

    }

    // 取消选课（从缓存中移除选课请求）
    @PostMapping("/cancelSelectCourse")
    public DataResponse cancelSelectCourse(@RequestBody List<String> courseIdList) {
        if (courseIdList != null && !courseIdList.isEmpty()) {
            HashSet<String> courseIdSet = new HashSet<>(courseIdList);
            Integer userId = CommonMethod.getUserId();
            Optional<User> byId = userRepository.findById(userId);
            if (byId.isPresent()) {
                User user = byId.get();
                personRepository.findById(user.getPerson().getPersonId()).ifPresent(person -> {
                    studentRepository.findByPersonPersonId(person.getPersonId()).ifPresent(student -> {
                        List<Integer> selectedStudents = (List<Integer>) caffeineCache.asMap().get("selectedStudents");
                        if (selectedStudents == null) {
                            selectedStudents = new ArrayList<>();
                        }
                        for (String courseids : courseIdSet) {
                            Integer courseId = Integer.valueOf(courseids);
                            List<Integer> finalSelectedStudents = selectedStudents;
                            courseRepository.findById(courseId).ifPresent(course -> {
                                List sList = (List<Integer>) caffeineCache.asMap().get(String.valueOf(courseId));
                                if (sList != null && !sList.isEmpty()) {
                                    sList.remove(student.getStudentId());
                                    caffeineCache.asMap().put(String.valueOf(courseId), sList);
                                }
                            });
                            List sList = (List<Integer>) caffeineCache.asMap().get(String.valueOf(courseId));
                            System.out.println("courseId=" + courseId);
                            System.out.println("sList = " + sList);
                        }
                        selectedStudents.remove(student.getStudentId());
                        caffeineCache.asMap().put("selectedStudents", selectedStudents);
                    });
                });
            }

        }
        return CommonMethod.getReturnMessageOK();

    }

    @GetMapping("/selectedCourse")
    public DataResponse getSelectedCourseByStudent() {
        Integer userId = CommonMethod.getUserId();
        Optional<User> byId = userRepository.findById(userId);
        if (byId.isPresent()) {
            User user = byId.get();
            Integer personId = user.getPerson().getPersonId();
            Optional<Student> byPersonPersonId = studentRepository.findByPersonPersonId(personId);
            if (byPersonPersonId.isPresent()) {
                Student student = byPersonPersonId.get();
                List<Score> score = scoreRepository.findByStudentStudentId(student.getStudentId());
                List<Course> selectedCourses = courseRepository
                        .findAllById(score.stream().map(s -> s.getCourse().getCourseId()).toList());
                System.out.println("selectedCourses = " + selectedCourses);
                return CommonMethod.getReturnData(selectedCourses);

            }
        }
        return null;

    }

}
