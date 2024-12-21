package org.fatmansoft.teach.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.Target;

import javax.persistence.*;

@Entity
@Table(name = "innovation")
@Getter
@Setter
@ToString
public class Innovation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne(targetEntity = Student.class)
    @JoinColumn(name = "student_id")
    private Student student;

    // 社会实践
    @Column(name = "social_practice")
    private String socialPractice;
    // 学科竞赛
    @Column(name = "competition")
    private String competition;
    // 科技成果
    @Column(name = "technology")
    private String technology;
    // 培训讲座
    @Column(name = "lecture")
    private String lecture;
    // 创新项目
    @Column(name = "project")
    private String project;
    // 校外实习
    @Column(name = "internship")
    private String internship;

}
