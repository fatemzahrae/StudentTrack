package com.project.exam.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
public class Student{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id ;
    private String name ;
    private LocalDate creation_date ;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    private List<Grade> grades ;





}