package org.fatmansoft.teach.repository;

import org.fatmansoft.teach.models.Student;
import org.fatmansoft.teach.models.StudentStatistics;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentStatisticsRepository extends JpaRepository<StudentStatistics,Integer> {
    StudentStatistics findByStudent(Student student);
}
