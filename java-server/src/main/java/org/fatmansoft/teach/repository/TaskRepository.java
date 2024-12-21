package org.fatmansoft.teach.repository;

import org.fatmansoft.teach.models.Course;
import org.fatmansoft.teach.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task,Integer> {
    @Query(value = "select * from task where course_id = ?1",nativeQuery = true)
    List<Task> findByStudentAndCourse(Integer courseId);
    @Query(value = "select * from task where course_id = ?1 order by score desc ",nativeQuery = true)
    List<Task> findByCourseOrderByScore(Integer courseId);

    List<Task> findTaskByCourseIn(List<Course> courses);
    @Query(value = "select * from task where course_id in (?1)",nativeQuery = true)
    List<Task> findByCourses(List<Integer> courseId);
}
