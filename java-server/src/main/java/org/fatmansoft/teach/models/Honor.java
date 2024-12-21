package org.fatmansoft.teach.models;

import lombok.*;
import org.hibernate.proxy.HibernateProxy;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity
@RequiredArgsConstructor
@Table(name = "honor")
@ToString
public class Honor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer honorId;
    private String name;

    private String description;

    @ManyToOne (targetEntity = Student.class)
    @JoinColumn(name = "student_id")
    private Student student;
    @Column(name = "get_time")
    private String getTime;

    private String reward;



    public Integer getHonorId() {
        return honorId;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public Student getStudent() {
        return student;
    }

    public String getGetTime() {
        return getTime;
    }

    public String getReward() {
        return reward;
    }

    public void setHonorId(Integer honorId) {
        this.honorId = honorId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public void setGetTime(String getTime) {
        this.getTime = getTime;
    }

    public void setReward(String reward) {
        this.reward = reward;
    }
}
