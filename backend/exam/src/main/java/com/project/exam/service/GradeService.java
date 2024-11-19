package com.project.exam.service;

import com.project.exam.entities.Grade;
import com.project.exam.repository.GradeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GradeService {
    private final GradeRepository gradeRepository;

    public GradeService(GradeRepository gradeRepository) {
        this.gradeRepository = gradeRepository;
    }

    public List<Grade> getAllGrades(){
        return gradeRepository.findAll() ;
    }
    public Grade saveGrade(Grade grade){
        return gradeRepository.save(grade);
    }
}
