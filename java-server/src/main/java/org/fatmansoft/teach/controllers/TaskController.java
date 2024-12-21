package org.fatmansoft.teach.controllers;

import lombok.RequiredArgsConstructor;
import org.fatmansoft.teach.exception.ServiceException;
import org.fatmansoft.teach.models.*;
import org.fatmansoft.teach.payload.request.DataRequest;
import org.fatmansoft.teach.payload.response.DataResponse;
import org.fatmansoft.teach.repository.*;
import org.fatmansoft.teach.util.CommonMethod;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/task")
@CrossOrigin
@RequiredArgsConstructor
public class TaskController {

    private final TaskRepository taskRepository;

    private final TaskSubmitRepository submitRepository;

    private final TeacherRepository teacherRepository;

    private final PersonRepository personRepository;

    private final UserRepository userRepository;

    private final CourseRepository courseRepository;

    private final StudentRepository studentRepository;

    private final ScoreRepository scoreRepository;
    private final TaskSubmitRepository taskSubmitRepository;

    @PostMapping("/publish")
    public DataResponse publishTask(@RequestBody Task task){
        return null;
    }

    @GetMapping("/getTasksByTeacher")
    public DataResponse getTaskListByTeacher(){
        Integer userId = CommonMethod.getUserId();
        Person person = userRepository.findById(userId).get().getPerson();
        Teacher teacher = teacherRepository.getTeacherByPerson(person);
        List<Course> c = courseRepository.findByTeacher(teacher);
        List<Task> t = taskRepository.findTaskByCourseIn(c);
        return CommonMethod.getReturnData(t);

    }
    @PostMapping("/task")
    public DataResponse addAndEditTask(@RequestBody Task task){
        System.out.println("task = " + task);
        taskRepository.save(task);
        return CommonMethod.getReturnMessageOK();
    }

    @PostMapping("/upload/{taskId}")
    public DataResponse upload(@RequestParam("file")MultipartFile file,@PathVariable Integer taskId) throws IOException {
        Integer userId = CommonMethod.getUserId();
        Person person = userRepository.findById(userId).get().getPerson();
        Student student = studentRepository.getStudentByPerson(person);
        Optional<Task> byId = taskRepository.findById(taskId);
        Task task;
        if (byId.isPresent()) {
            task = byId.get();
            String url = task.getTaskPath()+FileSystems.getDefault().getSeparator()+student.getStudentId()+ FileSystems.getDefault().getSeparator();
            if (!new File(url).exists()) {
                new File(url).mkdirs();

            }
            file.transferTo(new File(url+file.getOriginalFilename()));
            TaskSubmit taskSubmit = new TaskSubmit();
            List<TaskSubmit> byTaskAndStudent = taskSubmitRepository.findByTaskAndStudent(task, student);
            if (byTaskAndStudent.size() > 1) {
                throw new ServiceException("作业已提交");
            }
            if (byTaskAndStudent.size() == 1) {
                taskSubmit = byTaskAndStudent.get(0);
            }
            taskSubmit.setTask(task);
            taskSubmit.setStudent(student);
            taskSubmit.setSubmitPath(url+file.getOriginalFilename());
            if (task.getState() == 0){
                task.setState(1);
            }
            if (taskSubmit.getScore() == null){
                taskRepository.save(task);
                taskSubmitRepository.save(taskSubmit);
            }else{
                throw new ServiceException("作业已批改，无法再提交");
            }
            return CommonMethod.getReturnData(url);
        }
        return CommonMethod.getReturnMessageError("作业不存在");
    }

    @GetMapping("/getTasksByStudent")
    public DataResponse getTaskListByStudent(){
        Integer userId = CommonMethod.getUserId();
        Person person = userRepository.findById(userId).get().getPerson();
        Student s = studentRepository.getStudentByPerson(person);
        List<Score> sList = scoreRepository.findByStudentStudentId(s.getStudentId());
        List<Integer> cList = sList.stream().map(score -> score.getCourse().getCourseId()).toList();
        System.out.println("cList = " + cList);
        List<Task> tList = taskRepository.findByCourses(cList);
        List<Task> list = tList.stream().filter(task -> new Date().before(task.getOverTime())).toList();
        System.out.println("list = " + list);
        return CommonMethod.getReturnData(list);
    }

    @PostMapping("/correntTask")
    public DataResponse correntTask(@RequestBody TaskSubmit taskSubmit){
        taskSubmitRepository.save(taskSubmit);
        Task task = taskRepository.findById(taskSubmit.getTask().getTaskId()).get();
        List<TaskSubmit> taskSubmits = taskSubmitRepository.findByTask(task.getTaskId());
        List<Double> list = taskSubmits.stream().map(TaskSubmit::getScore).toList();
        if (!list.contains(null) && new Date().after(task.getOverTime())){
            task.setState(3);
        }else{
            task.setState(2);
        }

        return CommonMethod.getReturnMessageOK();
    }
}
