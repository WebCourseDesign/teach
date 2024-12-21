package org.fatmansoft.teach.repository;

import org.fatmansoft.teach.models.Student;
import org.fatmansoft.teach.models.Task;
import org.fatmansoft.teach.models.TaskSubmit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TaskSubmitRepository extends JpaRepository<TaskSubmit, Integer> {
    @Query(value = "select * from task_submit where task_id = ?1",nativeQuery = true)
    List<TaskSubmit> findByTask(Integer taskId);
    @Query(value = "select * from task_submit where student_id = ?1",nativeQuery = true)
    List<TaskSubmit> findByStudentId(Integer studentId);

    List<TaskSubmit> findByTaskAndStudent(Task task, Student student);

    @Query(value = "select * from task_submit where task_id in ?1",nativeQuery = true)
    List<TaskSubmit> findByTasks(List<Task> tasks);

    List<TaskSubmit> findByStudent(Student student);
}
