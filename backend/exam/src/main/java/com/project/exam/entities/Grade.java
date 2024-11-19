package com.project.exam.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Grade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String subject;
    private double grade;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;



}
