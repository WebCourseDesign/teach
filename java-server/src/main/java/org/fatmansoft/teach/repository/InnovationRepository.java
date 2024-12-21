package org.fatmansoft.teach.repository;

import org.fatmansoft.teach.models.Innovation;
import org.fatmansoft.teach.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
@Repository
@Transactional
public interface InnovationRepository extends JpaRepository<Innovation,Integer>, JpaSpecificationExecutor<Innovation> {
    @Query(value = "select * from innovation where student_id = ?1",nativeQuery = true)
    List<Innovation> findByStudentId(Integer studentId);

    void deleteByStudent(Student student);
}
