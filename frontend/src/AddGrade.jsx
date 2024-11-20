import React from 'react'
import { useState } from 'react';
import './style.css'
import axios from 'axios';


export default function AddGrade({isOpen, onClose, onAddGrade, studentId}) {
    const [course, setCourse] = useState('');
    const [grade, setGrade] = useState('');

    
    const handleAdd = () => {

        const gradeValue = parseFloat(grade);
        if (isNaN(gradeValue)) {
            alert("Please enter a valid grade.");
            return;
        }

        const studentGrade = {subject: course, grade : gradeValue} ;
        onAddGrade(studentGrade) ;
        axios.post(`http://localhost:8080/grades/student/${studentId}`,studentGrade )
        .then(res =>{
            console.log(res);
            console.log(res.data);
            setCourse("");
            setGrade("");
            onClose() ;
        })
        .catch((error) => {
            console.error("Error adding grade:", error);
            alert("Failed to add grade. Please try again.");
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
                <button onClick={handleAdd}>Add</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
  )
}
