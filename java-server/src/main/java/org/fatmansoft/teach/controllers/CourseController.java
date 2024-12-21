package org.fatmansoft.teach.controllers;

import com.github.benmanes.caffeine.cache.Cache;
import org.fatmansoft.teach.models.*;
import org.fatmansoft.teach.payload.request.DataRequest;
import org.fatmansoft.teach.payload.response.DataResponse;
import org.fatmansoft.teach.payload.response.OptionItem;
import org.fatmansoft.teach.payload.response.OptionItemList;
import org.fatmansoft.teach.repository.*;
import org.fatmansoft.teach.service.StudentService;
import org.fatmansoft.teach.util.CommonMethod;
import org.fatmansoft.teach.util.JsonConvertUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.sql.In;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import javax.validation.Valid;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.ObjectOutputStream;
import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/course")

public class CourseController {
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private PersonRepository personRepository;
    @Autowired
    private ScoreRepository scoreRepository;
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private Cache<String, Object> caffeineCache;
    @Autowired
    private StudentService studentService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TeacherRepository teacherRepository;

    @PostMapping("/getCourseList")
    public DataResponse getCourseList(@Valid @RequestBody DataRequest dataRequest) {
        String numName = dataRequest.getString("numName");
        if(numName == null)
            numName = "";
        List<Course> cList = courseRepository.findCourseListByNumName(numName);  //数据库查询操作
//        List dataList = new ArrayList();
//        Map m;
//        Course pc;
//        for (Course c : cList) {
//            m = new HashMap();
//            m.put("courseId", c.getCourseId()+"");
//            m.put("num",c.getNum());
//            m.put("name",c.getName());
//            m.put("credit",c.getCredit()+"");
//            m.put("coursePath",c.getCoursePath());
//            pc =c.getPreCourse();
//            if(pc != null) {
//                m.put("preCourse",pc.getName());
//                m.put("preCourseId",pc.getCourseId());
//            }
//            dataList.add(m);
//        }
        return CommonMethod.getReturnData(cList);
    }
    private boolean hasCycle(Course course) {
        Set<Integer> visited = new HashSet<>();
        Set<Integer> stack = new HashSet<>();
        return hasCycleHelper(course, visited, stack);
    }

    private boolean hasCycleHelper(Course course, Set<Integer> visited, Set<Integer> stack) {
        if (stack.contains(course.getCourseId())) {
            return true;
        }
        if (visited.contains(course.getCourseId())) {
            return false;
        }
        visited.add(course.getCourseId());
        stack.add(course.getCourseId());

        if (course.getPreCourse() != null) {
            Optional<Course> preCourseOpt = courseRepository.findById(course.getPreCourse().getCourseId());
            if (preCourseOpt.isPresent() && hasCycleHelper(preCourseOpt.get(), visited, stack)) {
                return true;
            }
        }

        stack.remove(course.getCourseId());
        return false;
    }
    @PostMapping("/courseSave")
    public DataResponse courseSave(@Valid @RequestBody DataRequest dataRequest) {
        System.out.println(dataRequest.getData());
        Integer courseId = dataRequest.getInteger("courseId");
        String num = dataRequest.getString("num");
        String name = dataRequest.getString("name");
        String coursePath = dataRequest.getString("coursePath");
        Double credit = dataRequest.getDouble("credit");
        Integer preCourseId = dataRequest.getInteger("preCourseId");
        Integer maxcount = dataRequest.getInteger("maxCount");
        Integer tid=(Integer)((Map)(dataRequest.getData().get("teacher"))).get("teacherId");
        Teacher teacher=teacherRepository.findById(tid).get();
        Optional<Course> op;
        Course c= null;

        if(courseId != null) {
            op = courseRepository.findById(courseId);
            if(op.isPresent())
                c= op.get();
        }
        if(c== null)
            c = new Course();
        Course pc =null;
        if(preCourseId != null) {
            op = courseRepository.findById(preCourseId);
            if(op.isPresent())
                pc = op.get();
        }
        c.setNum(num);
        c.setName(name);
        c.setCredit(credit);
        c.setCoursePath(coursePath);
        c.setPreCourse(pc);
        c.setMaxCount(maxcount);
        c.setTeacher(teacher);
        System.out.println(courseRepository.existsByNum(num));
        if(courseRepository.existsByNum(num)&&courseId==null){
            return CommonMethod.getReturnMessageError("课程号已存在,不能添加课程");
        }
        if(c.getPreCourse()!=null)
        {
            if (hasCycle(c)) {
                return CommonMethod.getReturnMessageError("存在循环依赖，不能保存课程");
            }
        }
        courseRepository.save(c);
        return CommonMethod.getReturnMessageOK();
    }
    @PostMapping("/courseDelete")
    public DataResponse courseDelete(@Valid @RequestBody DataRequest dataRequest) {
        Integer courseId = dataRequest.getInteger("courseId");
        Optional<Course> op;
        Course c= null;
        if(courseId != null) {
            op = courseRepository.findById(courseId);
            if(op.isPresent()) {
                c = op.get();
                //如果课程有成绩、或者存在依赖课程、或者有作业，都不能删除
                List<Score> sList = scoreRepository.findByCourses(Arrays.asList(c));
                if(sList.size() > 0) {
                    return CommonMethod.getReturnMessageError("课程有成绩，不能删除");
                }
                List<Course> cList = courseRepository.findCoursesByPreCourse(c);
                if(cList.size() > 0) {
                    return CommonMethod.getReturnMessageError("课程被依赖，不能删除");
                }
                courseRepository.delete(c);
            }
        }


        return CommonMethod.getReturnMessageOK();
    }

    @GetMapping ("/changeCourseState")
    @PreAuthorize("hasRole('ADMIN')")
    public DataResponse changeCourseState(){
        Integer state = (Integer) caffeineCache.asMap().get("selectCourse");
        if (state == 0){
            return startSelectCourse();
        }
        if (state == 1){
            return stopSelectCourse();
        }
        return CommonMethod.getReturnMessageError("参数错误");
    }

    public DataResponse startSelectCourse(){
        Integer state = (Integer) caffeineCache.asMap().get("selectCourse");
        if(state != null){
            if (state == 1){
                return CommonMethod.getReturnMessageError("选课已经开始，请勿重复操作");
            }
        }
        caffeineCache.asMap().put("selectCourse",1);
        return CommonMethod.getReturnData(1);
    }

    public DataResponse stopSelectCourse(){
        Integer state = (Integer) caffeineCache.asMap().get("selectCourse");
        if(state != null){
            if (state == 0){
                return CommonMethod.getReturnMessageError("选课已经结束，请勿重复操作");
            }
        }
        caffeineCache.asMap().put("selectCourse",0);
        studentService.selectCourse();
        return CommonMethod.getReturnData(0);
    }

    @GetMapping("/getSelectState")
    public DataResponse getSelectState(){
        Integer state = (Integer) caffeineCache.asMap().get("selectCourse");
        return CommonMethod.getReturnData(state);
    }

    @GetMapping("/getCourseByTeacherGET")
    public DataResponse getCourseByTeacher(){
        Integer userId = CommonMethod.getUserId();
        Person person = userRepository.findById(userId).get().getPerson();
        Teacher teacher = teacherRepository.getTeacherByPerson(person);
        List<Course> cList = courseRepository.findByTeacher(teacher);
        System.out.println(cList);
        return CommonMethod.getReturnData(cList);
    }

    @PostMapping("/getCourseByTeacher")
    public OptionItemList getCourseByTeacher(@Valid @RequestBody DataRequest dataRequest) {
        Integer userId = CommonMethod.getUserId();
        Person person = userRepository.findById(userId).get().getPerson();
        Teacher teacher = teacherRepository.getTeacherByPerson(person);
        List<Course> cList = courseRepository.findByTeacher(teacher);

        List<OptionItem> itemList = new ArrayList<>();
        for (Course c : cList) {
            itemList.add(new OptionItem(c.getCourseId(), c.getCourseId() + "", c.getNum() + "-" + c.getName()));
        }

        System.out.println(itemList);

        return new OptionItemList(0, itemList);
    }
}
