package org.fatmansoft.teach.controllers;

import lombok.RequiredArgsConstructor;
import org.fatmansoft.teach.exception.ServiceException;
import org.fatmansoft.teach.models.Innovation;
import org.fatmansoft.teach.models.Student;
import org.fatmansoft.teach.models.User;
import org.fatmansoft.teach.payload.request.DataRequest;
import org.fatmansoft.teach.payload.response.DataResponse;
import org.fatmansoft.teach.repository.InnovationRepository;
import org.fatmansoft.teach.repository.StudentRepository;
import org.fatmansoft.teach.repository.UserRepository;
import org.fatmansoft.teach.util.CommonMethod;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api")
public class InnovationController {

    private final InnovationRepository innovationRepository;

    private final StudentRepository studentRepository;

    private final UserRepository userRepository;

    // TODO: 实现创新项目管理的增删改查功能
    @PostMapping("/innovation/list")
    public DataResponse list(@Valid @RequestBody DataRequest request){
        Integer userId = CommonMethod.getUserId();
        User user = userRepository.findById(userId).orElse(new User());
        if ("1".equals(user.getPerson().getType())) {
            Student student = studentRepository.findByPersonPersonId(user.getPerson().getPersonId()).orElse(new Student());
            return CommonMethod.getReturnData(innovationRepository.findByStudentId(student.getStudentId()));
        }

        Integer studentId = request.getInteger("studentId");
        System.out.println("studentId = " + studentId);
        if (studentId != null){
            return CommonMethod.getReturnData(innovationRepository.findByStudentId(studentId));
        }else{
            return CommonMethod.getReturnData(innovationRepository.findAll());
        }

    }

    @PostMapping("/innovation")
    @PreAuthorize("hasRole('ADMIN')")
    public DataResponse save(@Valid @RequestBody Innovation innovation){
        List<Innovation> byStudentId = innovationRepository.findByStudentId(innovation.getStudent().getStudentId());
        if (byStudentId == null || byStudentId.isEmpty()) {

            return CommonMethod.getReturnData(innovationRepository.save(innovation));
        }
        if (byStudentId.size() == 1){
            Innovation innovation1 = byStudentId.get(0);
            innovation.setId(innovation.getId());
            return CommonMethod.getReturnData(innovationRepository.save(innovation));
        }
        throw new ServiceException("学生创新项目信息异常");
    }

    @DeleteMapping("/innovation/{innovationId}")
    @PreAuthorize("hasRole('ADMIN')")
    public DataResponse delete(@PathVariable Integer innovationId){
        innovationRepository.deleteById(innovationId);
        return CommonMethod.getReturnData(null);
    }

}
