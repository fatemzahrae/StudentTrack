package com.project.exam.service;

import com.project.exam.entities.Student;
import com.project.exam.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class StudentService{
    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository){
        this.studentRepository = studentRepository ;
    }
    public List<Student> getAllStudents(){
        return studentRepository.findAll() ;
    }
    public Student saveStudent(Student student){
        return studentRepository.save(student);
    }
    public Student getStudentById(Long studentId){
        Optional<Student> studentOptional = studentRepository.findById(studentId);
        if (studentOptional.isPresent()) {
            return studentOptional.get();
        } else {
            throw new NoSuchElementException("Student not found with ID: " + studentId);
        }

    }


}
