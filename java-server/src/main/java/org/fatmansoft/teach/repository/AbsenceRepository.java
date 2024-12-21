package org.fatmansoft.teach.repository;

import org.fatmansoft.teach.models.Absence;
import org.fatmansoft.teach.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AbsenceRepository extends JpaRepository<Absence,Integer> {
    @Query(value = "select * from absence where student_id = ?1",nativeQuery = true)
    List<Absence> findAbsenceByStudent(Integer studentId);

    void deleteByStudent(Student student);
}
