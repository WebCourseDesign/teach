package org.fatmansoft.teach.controllers;

import lombok.RequiredArgsConstructor;
import org.fatmansoft.teach.models.Honor;
import org.fatmansoft.teach.models.Student;
import org.fatmansoft.teach.models.User;
import org.fatmansoft.teach.payload.request.DataRequest;
import org.fatmansoft.teach.payload.response.DataResponse;
import org.fatmansoft.teach.repository.HonorRepository;
import org.fatmansoft.teach.repository.StudentRepository;
import org.fatmansoft.teach.repository.UserRepository;
import org.fatmansoft.teach.util.CommonMethod;
import org.springframework.beans.BeanUtils;
import org.springframework.boot.autoconfigure.validation.ValidationAutoConfiguration;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

import static org.fatmansoft.teach.util.CommonMethod.getReturnData;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/api")
public class HonorController {

    private final HonorRepository honorRepository;

    private final StudentRepository studentRepository;

    private final UserRepository userRepository;


//    @GetMapping("/honors")
//    public DataResponse getHonors(){
//        return CommonMethod.getReturnData(honorRepository.findAll());
//    }

    @PostMapping("/honor/list")
    public DataResponse findByStudentId(@Valid @RequestBody DataRequest request){

        Integer userId = CommonMethod.getUserId();
        User user = userRepository.findById(userId).orElse(new User());
        if ("1".equals(user.getPerson().getType())) {
            Student student = studentRepository.findByPersonPersonId(user.getPerson().getPersonId()).orElse(new Student());
            return CommonMethod.getReturnData(honorRepository.getHonorByStudent(student.getStudentId()));
        }

        Integer studentId = request.getInteger("studentId");
        if (studentId != null){
            return CommonMethod.getReturnData(honorRepository.getHonorByStudent(studentId));
        }else{
            List<Honor> all = honorRepository.findAll();
            return CommonMethod.getReturnData(all);
        }
    }
    @PostMapping("/honor")
    @PreAuthorize("hasRole('ADMIN')")
    public DataResponse saveHonor(@RequestBody Honor honor){
        System.out.println("honor = " + honor);
        Optional<Student> byId = studentRepository.findById(honor.getStudent().getStudentId());
        Student student = byId.get();
        System.out.println("student = " + student);
        honor.setStudent(student);
        honorRepository.saveAndFlush(honor);
        return CommonMethod.getReturnMessageOK();
    }

    @DeleteMapping("/honor/{honorId}")
    @PreAuthorize("hasRole('ADMIN')")
    public DataResponse deleteHonor(@PathVariable Integer honorId){
        honorRepository.deleteById(honorId);
        return CommonMethod.getReturnData(null);
    }
}
