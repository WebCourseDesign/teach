package org.fatmansoft.teach.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serial;
import java.io.Serializable;

/**
 * Course 课程表实体类  保存课程的的基本信息信息，
 * Integer courseId 人员表 course 主键 course_id
 * String num 课程编号
 * String name 课程名称
 * Integer credit 学分
 * Course preCourse 前序课程 pre_course_id 关联前序课程的主键 course_id
 */
@Entity
@Table(	name = "course",
        uniqueConstraints = {
        })
@ToString
@Getter
@Setter
public class Course implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer courseId;
    @Size(max = 20)
    private String num;

    @Size(max = 50)
    private String name;
    private Double credit;
    @ManyToOne
    @JoinColumn(name="pre_course_id")
    private Course preCourse;
    @Size(max = 12)
    private String coursePath;

    @ManyToOne (targetEntity = Teacher.class)
    @JoinColumn(name="teacher_id")
    private Teacher teacher;


    private Integer maxCount;

    private Integer currentCount;

}
