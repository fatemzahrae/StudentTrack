import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css'
import AddStudent from './AddStudent';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Home() {

    const [students, setStudents] = useState([
        { id: 1, name: 'John Doe', date: '2024-11-18' },
        { id: 2, name: 'Jane Smith', date: '2024-11-18' },
      ]);
    const [isModalOpen, setIsModalOpen] = useState(false) ;
    
    
    
    const handleCloseModal = () =>{
        setIsModalOpen(false);
    }

    const handleOpenModal = () =>{
        setIsModalOpen(true);
    }

    const handleAddStudent = (newStudent) =>{
        setStudents([...students, newStudent]);

    }


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
          
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));

      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));


      


  return (
    <div className='container'>
        <h1>Students List</h1>
        <div className='sub-container'>
            <p>Manage your students' information easily</p>
            <button className='add-btn' onClick={handleOpenModal}>Add new student</button>

            <TableContainer component={Paper}>
                <Table  aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Name</StyledTableCell>
                        <StyledTableCell align="center">Created on</StyledTableCell>

                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {students.map((row) => (
                        <StyledTableRow key={row.name}>
                        <StyledTableCell align="center" component="th" scope="row">
                           <Link to={`/student/${row.id}`}> {row.name} </Link>
                        </StyledTableCell>
                        <StyledTableCell align="center">{row.date}</StyledTableCell>

                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
            <AddStudent
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onAddStudent={handleAddStudent}
            />
        </div>
      
    </div>
  )
}
