package com.project.exam.controller;

import com.project.exam.entities.Grade;
import com.project.exam.entities.Student;
import com.project.exam.service.GradeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/grades")
public class GradeController {

    private final GradeService gradeService ;

    public GradeController(GradeService gradeService) {
        this.gradeService = gradeService;
    }

    @GetMapping("/student/{studentId}")
    public List<Grade> getGradesByStudent(@PathVariable Long studentId){
        return gradeService.getGradesByStudentId(studentId) ;
    }

    @PostMapping("/student/{studentId}")
    public Student addGradeToStudent(@PathVariable Long studentId, @RequestBody Grade grade){
        return gradeService.addGradeToStudent(studentId, grade) ;
    }
}
