import React from 'react'
import { useState } from 'react';
import './style.css'


export default function AddGrade({isOpen, onClose, onAddGrade}) {
    const [course, setCourse] = useState('');
    const [grade, setGrade] = useState(0);

    
    const handleAdd = () => {
        const creationDate = new Date().toISOString() ;
        onAddGrade({course: course, grade : grade}) ;
        setCourse('');
        setGrade(0);
        onClose() ;
    }

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
