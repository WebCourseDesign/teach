package org.fatmansoft.teach.repository;

import org.fatmansoft.teach.models.Honor;
import org.fatmansoft.teach.models.Student;
import org.hibernate.sql.Select;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface HonorRepository extends JpaRepository<Honor,Integer>, JpaSpecificationExecutor<Honor> {

//    @Query(value = "select * from honor where student_id = ?1",nativeQuery = true)
    @Query(value="from Honor h where h.student.studentId = ?1")
    List<Honor> getHonorByStudent(Integer studentId);

    List<Honor> findByStudent(Student student);

    void deleteByStudent(Student student);
}
