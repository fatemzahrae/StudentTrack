package com.project.exam.controller;

import com.project.exam.entities.Grade;
import com.project.exam.service.GradeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/grades")
public class GradeController {

    private final GradeService gradeService ;

    public GradeController(GradeService gradeService) {
        this.gradeService = gradeService;
    }

    @GetMapping
    public List<Grade> getAllGrades(){
        return gradeService.getAllGrades() ;
    }

    @PostMapping
    public ResponseEntity<Grade> saveGrade(@RequestBody Grade grade){
        return ResponseEntity.ok(gradeService.saveGrade(grade));
    }
}
