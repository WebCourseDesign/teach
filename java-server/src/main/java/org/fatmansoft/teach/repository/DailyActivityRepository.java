package org.fatmansoft.teach.repository;

import org.fatmansoft.teach.models.DailyActivity;
import org.fatmansoft.teach.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface DailyActivityRepository extends JpaRepository<DailyActivity,Integer>, JpaSpecificationExecutor<DailyActivity> {
    @Query(value = "select * from daily_activity where student_id = ?1",nativeQuery = true)
    List<DailyActivity> findDailyActivitiesByStudent(Integer studentId);

    void deleteByStudent(Student student);
}
