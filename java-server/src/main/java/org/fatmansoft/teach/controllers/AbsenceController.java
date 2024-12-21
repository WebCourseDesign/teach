package org.fatmansoft.teach.controllers;

import lombok.RequiredArgsConstructor;
import org.fatmansoft.teach.exception.ServiceException;
import org.fatmansoft.teach.models.Absence;
import org.fatmansoft.teach.models.Person;
import org.fatmansoft.teach.models.Student;
import org.fatmansoft.teach.models.User;
import org.fatmansoft.teach.payload.request.DataRequest;
import org.fatmansoft.teach.payload.response.DataResponse;
import org.fatmansoft.teach.repository.AbsenceRepository;
import org.fatmansoft.teach.repository.PersonRepository;
import org.fatmansoft.teach.repository.StudentRepository;
import org.fatmansoft.teach.repository.UserRepository;
import org.fatmansoft.teach.util.CommonMethod;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin
public class AbsenceController {
    private final AbsenceRepository absenceRepository;
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final PersonRepository personRepository;

    @PostMapping("/absence/list")
    public DataResponse getAbsenceList(@RequestBody DataRequest request){
        Integer userId = CommonMethod.getUserId();
        User user = userRepository.findById(userId).orElse(new User());
        if ("1".equals(user.getPerson().getType())) {
            Student student = studentRepository.findByPersonPersonId(user.getPerson().getPersonId()).orElse(new Student());
            return CommonMethod.getReturnData(absenceRepository.findAbsenceByStudent(student.getStudentId()));
        }

        Integer studentId = request.getInteger("studentId");
        System.out.println("studentId = " + studentId);
        if (studentId != null){
            return CommonMethod.getReturnData(absenceRepository.findAbsenceByStudent(studentId));
        }else{
            return CommonMethod.getReturnData(absenceRepository.findAll());
        }
    }

    @PostMapping("/absence")
    public DataResponse addAbsence(@RequestBody Absence absence){
        Optional<Absence> byId = absenceRepository.findById(absence.getId());
        if (byId.isPresent()){
            Absence a = byId.get();
            if (a.getApproved() == 1){
                return CommonMethod.getReturnMessageError("该请假单已批准，不能修改");
            }
        }
        Integer userId = CommonMethod.getUserId();
        userRepository.findById(userId).ifPresentOrElse(user -> {
            Person person = user.getPerson();
            studentRepository.findByPersonPersonId(person.getPersonId()).ifPresent(absence::setStudent);
        },() -> {
            throw new ServiceException("找不到该学生");
        });
        absence.setApprover(null);
        absence.setApproved(0);
        absence.setApprovedTime(null);
        return CommonMethod.getReturnData(absenceRepository.save(absence));
    }

    @PostMapping("/absence/approve")
    public DataResponse approveAbsence(@RequestBody Absence absence){
        absence.setApproved(1);
        Integer userId = CommonMethod.getUserId();
        Optional<User> byId = userRepository.findById(userId);
        if (byId.isPresent()){
            User user = byId.get();
            Person person = user.getPerson();
            absence.setApprover(person);
            absence.setApprovedTime(new Date());
        }
        return CommonMethod.getReturnData(absenceRepository.save(absence));
    }
    @PostMapping("/absence/disagree")
    public DataResponse disagreeAbsence(@RequestBody Absence absence){
        absence.setApproved(2);
        Integer userId = CommonMethod.getUserId();
        Optional<User> byId = userRepository.findById(userId);
        if (byId.isPresent()){
            User user = byId.get();
            Person person = user.getPerson();
            absence.setApprover(person);
            absence.setApprovedTime(new Date());
        }
        return CommonMethod.getReturnData(absenceRepository.save(absence));
    }
}
