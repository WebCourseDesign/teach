package org.fatmansoft.teach.controllers;

import lombok.RequiredArgsConstructor;
import org.fatmansoft.teach.exception.ServiceException;
import org.fatmansoft.teach.models.*;
import org.fatmansoft.teach.payload.request.DataRequest;
import org.fatmansoft.teach.payload.response.DataResponse;
import org.fatmansoft.teach.repository.*;
import org.fatmansoft.teach.util.CommonMethod;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/taskSubmit")
@CrossOrigin
@RequiredArgsConstructor
public class TaskSubmitController {

    private final TaskSubmitRepository taskSubmitRepository;

    private final TaskRepository taskRepository;

    private final StudentRepository studentRepository;

    private final TeacherRepository teacherRepository;

    private final UserRepository userRepository;

    private final CourseRepository courseRepository;

    private final ScoreRepository scoreRepository;

    @PostMapping("/getTaskSubmitsByTeacher")
    public DataResponse getTaskSubmitListByTeacher(@RequestBody TaskSubmit ts) {
        Integer userId = CommonMethod.getUserId();
        Person person = userRepository.findById(userId).get().getPerson();
        Teacher teacher = teacherRepository.getTeacherByPerson(person);
        List<Course> coursesByTeacher = courseRepository.findCoursesByTeacher(teacher);
        List<Task> taskByCourseIn = taskRepository.findTaskByCourseIn(coursesByTeacher);

        List<TaskSubmit> byTasks = taskSubmitRepository.findByTasks(taskByCourseIn);
        Integer studentId = ts.getStudent().getStudentId();
        System.out.println("studentId = " + studentId);
        if (studentId != null) {
            byTasks = byTasks.stream().filter(taskSubmit -> taskSubmit.getStudent().getStudentId().equals(studentId)).toList();
        }
        return CommonMethod.getReturnData(byTasks);

    }
    @GetMapping("/openFolder/{id}")
    public void openFolder(@PathVariable Integer id, HttpServletResponse response){
        Optional<TaskSubmit> byId = taskSubmitRepository.findById(id);
        if(byId.isPresent()){
            TaskSubmit taskSubmit = byId.get();
            try {
//                java.awt.Desktop.getDesktop().open(new File(taskSubmit.getSubmitPath()));
                File file = new File(taskSubmit.getSubmitPath());
                ServletOutputStream out = response.getOutputStream();
                FileInputStream fileInputStream = new FileInputStream(file);
                response.setContentType("application/pdf;charset=UTF-8");
                response.setHeader("Content-Disposition", "attachment;fileName=" + URLEncoder.encode(taskSubmit.getSubmitPath(), "UTF-8"));

                int length = (int)file.length();
                byte[] bytes = new byte[length];
                fileInputStream.read(bytes);
                fileInputStream.close();
                out.write(bytes);
                out.close();


            } catch (Exception e) {
                throw new ServiceException("找不到该文件");
            }
        }
    }

    @GetMapping("/history")
    public DataResponse getHistory() {
        Integer userId = CommonMethod.getUserId();
        Person person = userRepository.findById(userId).get().getPerson();
        Student student = studentRepository.getStudentByPerson(person);
        List<TaskSubmit> taskSubmits = taskSubmitRepository.findByStudent(student);
        return CommonMethod.getReturnData(taskSubmits);
    }

}
