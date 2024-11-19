package com.project.exam.service;

import com.project.exam.entities.Student;
import com.project.exam.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository){
        this.studentRepository = studentRepository ;
    }
    public List<Student> getAllStudent(){
        return studentRepository.findAll() ;
    }
    public Student saveStudent(Student student){
        return studentRepository.save(student);
    }
}
