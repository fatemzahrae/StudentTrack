import React from 'react'
import { useState } from 'react';
import './style.css'
import axios from 'axios';


export default function AddGrade({isOpen, onClose, onAddGrade, studentId}) {
    const [course, setCourse] = useState('');
    const [grade, setGrade] = useState('');
    const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://backend:8080";
    const [isSubmitting, setIsSubmitting] = useState(false);
    console.log("Student ID from URL:", studentId);


    
    const handleAdd = () => {

        if (!course.trim()) {
            alert("Course name cannot be empty!");
            return;
        }

        const gradeValue = parseFloat(grade);
        if (isNaN(gradeValue)) {
            alert("Please enter a valid grade.");
            return;
        }

        const studentGrade = {subject: course, grade : gradeValue} ;
        onAddGrade(studentGrade) ;

        console.log("Adding grade with studentId:", studentId);
        console.log("Payload:", studentGrade);
        setIsSubmitting(true);

       axios
      .post(`${backendUrl}/grades/student/${studentId}`, studentGrade)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setCourse("");
        setGrade("");
        onClose(); // Close the modal
      })
      .catch((error) => {
        console.error("Error adding grade:", error);
        alert("Failed to add grade. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false); 
      });
  };

    if (!isOpen) return null ;

  return (

        <div className="modal">
            <div className="modal-content">
                <h2>Add New Grade</h2>
               
                <input
                    type="text"
                    value={course}
                    placeholder='Enter course name'
                    onChange={(e) => setCourse(e.target.value)}
                    />
                <input
                    type="text"
                    value={grade}
                    placeholder='Enter student grade'
                    onChange={(e) => setGrade(e.target.value)}
                    />
                <br />
                <button onClick={handleAdd} disabled={isSubmitting}>
                   {isSubmitting ? "Adding..." : "Add"}
                </button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
  )
}
