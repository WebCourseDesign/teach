package org.fatmansoft.teach.controllers;

import lombok.RequiredArgsConstructor;
import org.fatmansoft.teach.models.DailyActivity;
import org.fatmansoft.teach.models.Student;
import org.fatmansoft.teach.models.User;
import org.fatmansoft.teach.payload.request.DataRequest;
import org.fatmansoft.teach.payload.response.DataResponse;
import org.fatmansoft.teach.repository.DailyActivityRepository;
import org.fatmansoft.teach.repository.PersonRepository;
import org.fatmansoft.teach.repository.StudentRepository;
import org.fatmansoft.teach.repository.UserRepository;
import org.fatmansoft.teach.util.CommonMethod;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api")
public class DailyActivityController {

    private final DailyActivityRepository dailyActivityRepository;

    private final UserRepository userRepository;

    private final PersonRepository personRepository;

    private final StudentRepository studentRepository;

    @PostMapping("/dailyActivity/list")
    public DataResponse getDailyActivityList(@Valid @RequestBody DataRequest request){
        Integer userId = CommonMethod.getUserId();
        User user = userRepository.findById(userId).orElse(new User());
        if ("1".equals(user.getPerson().getType())) {
            Student student = studentRepository.findByPersonPersonId(user.getPerson().getPersonId()).orElse(new Student());
            return CommonMethod.getReturnData(dailyActivityRepository.findDailyActivitiesByStudent(student.getStudentId()));
        }

        Integer studentId = request.getInteger("studentId");
        System.out.println("studentId = " + studentId);
        if (studentId != null){
            return CommonMethod.getReturnData(dailyActivityRepository.findDailyActivitiesByStudent(studentId));
        }else{
            return CommonMethod.getReturnData(dailyActivityRepository.findAll());
        }

    }

    @PostMapping("/dailyActivity")
    @PreAuthorize("hasRole('ADMIN')")
    public DataResponse addDailyActivity(@Valid @RequestBody DailyActivity dailyActivity){
        System.out.println("dailyActivity = " + dailyActivity);
        dailyActivityRepository.saveAndFlush(dailyActivity);
        return CommonMethod.getReturnMessageOK();
    }
//    @PostMapping("/dailyActivity/update")
//    @PreAuthorize("hasRole('ADMIN')")
//    public DataResponse updateDailyActivity(@Valid @RequestBody DailyActivity dailyActivity){
//        dailyActivityRepository.saveAndFlush(dailyActivity);
//        return CommonMethod.getReturnMessageOK();
//    }
    @DeleteMapping("/dailyActivity/{dailyActivityId}")
    @PreAuthorize("hasRole('ADMIN')")
    public DataResponse deleteDailyActivity(@PathVariable Integer dailyActivityId){
        Optional<DailyActivity> dailyActivity = dailyActivityRepository.findById(dailyActivityId);
        dailyActivity.ifPresent(dailyActivityRepository::delete);
        return CommonMethod.getReturnMessageOK();
    }
}
