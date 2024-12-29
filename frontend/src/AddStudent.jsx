import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import './style.css'


export default function AddStudent({isOpen, onClose, onAddStudent}) {
    const [studentName, setStudentName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://backend:8080";


    const handleAdd = () => {

        if (!studentName.trim()) {
            alert("Student name cannot be empty!");
            return;
        }

        const creationDate = new Date().toISOString().split('T')[0] ;
        const student = {name : studentName, creation_date : creationDate}
        
        setIsSubmitting(true); 

        axios.post(`${backendUrl}/students`, student )
        .then(res =>{
            console.log(res);
            console.log(res.data);
            onAddStudent(res.data) ;
            setStudentName('');
            onClose() ;
        })
        .catch((error) => {
            console.error("Error adding student:", error);
            alert("Failed to add student. Please try again.");
        })
        .finally(() => {
            setIsSubmitting(false);
          });
        
    };

    if (!isOpen) return null ;

  return (

        <div className="modal">
            <div className="modal-content">
                <h2>Add New Student</h2>
                <label>
                Enter student name
                <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    />
                </label>
                <br />
                <button onClick={handleAdd} disabled={isSubmitting}>
                    {isSubmitting ? "Adding..." : "Add"} 
                </button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
  )
}
