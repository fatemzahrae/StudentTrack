package com.project.exam.controller;

import com.project.exam.entities.Student;
import com.project.exam.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService studentService;


    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public List<Student> getAllStudent(){
        return studentService.getAllStudent() ;
    }

    @PostMapping
    public  ResponseEntity<Student> saveStudent(@RequestBody Student student){
        return ResponseEntity.ok(studentService.saveStudent(student));
    }
}
