import React from 'react'
import { useState } from 'react';
import './style.css'


export default function AddStudent({isOpen, onClose, onAddStudent}) {
    const [studentName, setStudentName] = useState('');
    
    const handleAdd = () => {
        const creationDate = new Date().toISOString() ;
        onAddStudent({name : studentName, date: creationDate}) ;
        setStudentName('');
        onClose() ;
    }

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
                <button onClick={handleAdd}>Add</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
  )
}
