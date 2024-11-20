package com.project.exam.service;

import com.project.exam.entities.Grade;
import com.project.exam.entities.Student;
import com.project.exam.repository.GradeRepository;
import com.project.exam.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GradeService {
    private final GradeRepository gradeRepository;
    private final StudentRepository studentRepository;


    public GradeService(GradeRepository gradeRepository, StudentRepository studentRepository) {
        this.gradeRepository = gradeRepository;
        this.studentRepository = studentRepository;
    }

    public List<Grade> getGradesByStudentId(Long studentId){
        return gradeRepository.findByStudentId(studentId) ;
    }
    public Student addGradeToStudent(Long studentId, Grade grade){
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        grade.setStudent(student);

        gradeRepository.save(grade);
        return student;
    }
}
