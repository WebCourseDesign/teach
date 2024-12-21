package org.fatmansoft.teach.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "task_submit")
@Getter
@Setter
@ToString
public class TaskSubmit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @OneToOne
    @JoinColumn(name = "task_id")
    private Task task;
    @OneToOne
    @JoinColumn(name = "student_id")
    private Student student;

    private Double score;

    private String submitPath;


}
