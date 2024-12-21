package org.fatmansoft.teach.service;

import com.github.benmanes.caffeine.cache.Cache;
import org.fatmansoft.teach.models.*;
import org.fatmansoft.teach.repository.*;
import org.fatmansoft.teach.util.ComDataUtil;
import org.fatmansoft.teach.util.CommonMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private Cache<String, Object> caffeineCache;
    @Autowired
    private ScoreRepository scoreRepository;
    @Autowired
    private StudentStatisticsRepository studentStatisticsRepository;
    @Autowired
    private UserRepository userRepository;

    public Map getMapFromStudent(Student s) {
        Map m = new HashMap();
        Person p;
        if(s == null)
            return m;
        m.put("major",s.getMajor());
        m.put("className",s.getClassName());
        p = s.getPerson();
        if(p == null)
            return m;
        m.put("studentId", s.getStudentId());
        m.put("personId", p.getPersonId());
        m.put("num",p.getNum());
        m.put("name",p.getName());
        m.put("dept",p.getDept());
        m.put("card",p.getCard());
        String gender = p.getGender();
        m.put("gender",gender);
        m.put("genderName", ComDataUtil.getInstance().getDictionaryLabelByValue("XBM", gender)); //性别类型的值转换成数据类型名
        m.put("birthday", p.getBirthday());  //时间格式转换字符串
        m.put("email",p.getEmail());
        m.put("phone",p.getPhone());
        m.put("address",p.getAddress());
        m.put("introduce",p.getIntroduce());
        return m;
    }

    public void selectCourse(){
        for (Course course : courseRepository.findAll()) {
            List<Integer> sList = (List<Integer>) caffeineCache.asMap().get(String.valueOf(course.getCourseId()));

            if (sList != null && !sList.isEmpty()) {
//                判断是否到达课程最大人数
                if (course.getMaxCount()<=sList.size()) {
//                    sList随机排序后截取最大人数的长度
                    Collections.shuffle(sList);
                    sList = sList.subList(0, course.getMaxCount());
                }
                System.out.println(String.format("course.name=%s,studentids=%s",course.getName(),sList));
                for (Integer sId : sList) {
                    Score score = new Score();
                    score.setCourse(course);
                    studentRepository.findById(sId).ifPresent(score::setStudent);
                    System.out.println("score = " + score);
                    scoreRepository.save(score);
                }
                course.setCurrentCount(sList.size());
            }
            caffeineCache.invalidate(String.valueOf(course.getCourseId()));
        }
        caffeineCache.invalidate("selectedStudents");

    }

//    public StudentStatistics statistics(){
//        Integer userId = CommonMethod.getUserId();
//        Person person = userRepository.findById(userId).get().getPerson();
//        Student student = studentRepository.getStudentByPerson(person);
//        List<Score> byStudentStudentId = scoreRepository.findByStudentStudentId(student.getStudentId());
//        Double sumCredit = 0.0;
//        Double creditXscoreSum = 0.0;
//        Double sumScore = 0.0;
//        for (Score score : byStudentStudentId) {
//            if (score.getMark() == null){
//                continue;
//            }
//            Double cXs = score.getMark() * score.getCourse().getCredit();
//            creditXscoreSum += cXs;
//            sumCredit += score.getCourse().getCredit();
//            sumScore += score.getMark();
//        }
//        Double gpa = creditXscoreSum.doubleValue() / sumCredit.doubleValue();
//        Double avgScore = sumScore.doubleValue() / byStudentStudentId.size();
//        StudentStatistics studentStatistics = new StudentStatistics();
//        studentStatistics.setStudent(student);
//        studentStatistics.setGpa(gpa);
//        studentStatistics.setAvgScore(avgScore);
//        studentStatistics.setCourseCount(byStudentStudentId.size());
//        studentStatistics.setCreditTotal(sumCredit);
//        studentStatisticsRepository.save(studentStatistics);
//        return studentStatistics;
//    }
public StudentStatistics statistics(){
    Integer userId = CommonMethod.getUserId();
    Person person = userRepository.findById(userId).get().getPerson();
    Student student = studentRepository.getStudentByPerson(person);
    List<Score> byStudentStudentId = scoreRepository.findByStudentStudentId(student.getStudentId());
    Double sumCredit = 0.0;
    Double gpaSum = 0.0;

    for (Score score : byStudentStudentId) {
        if (score.getMark() == null){
            continue;
        }
        Double gpaPart = ((score.getMark() - 50) *1.0/ 10 > 0 ? (score.getMark() - 50)*1.0 / 10 : 0) * score.getCourse().getCredit();
        gpaSum += gpaPart;
    }

    for (Score score : byStudentStudentId) {
        if (score.getMark() == null){
            continue;
        }
        sumCredit += score.getCourse().getCredit();
    }

    Double gpa = Math.ceil(gpaSum / sumCredit * 100) / 100;
    Double avgScore = byStudentStudentId.stream()
            .filter(score -> score.getMark() != null)
            .mapToDouble(Score::getMark)
            .average()
            .orElse(0.0);
    avgScore = Math.ceil(avgScore * 100) / 100;

    StudentStatistics studentStatistics = new StudentStatistics();
    studentStatistics.setStudent(student);
    studentStatistics.setGpa(gpa);
    studentStatistics.setAvgScore(avgScore);
    studentStatistics.setCourseCount(byStudentStudentId.size());
    studentStatistics.setCreditTotal(sumCredit);
    studentStatisticsRepository.save(studentStatistics);
    return studentStatistics;
}
}
