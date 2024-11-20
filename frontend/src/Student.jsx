import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './style.css'
import AddGrade from './AddGrade';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from 'axios';

export default function Student() {

    const { studentId } = useParams();
    const [studentName, setStudentName] = useState("") 
    console.log("Student ID:", studentId);

    const [grades, setGrades] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false) ;

    useEffect(() => {
      axios.get(`http://localhost:8080/students/${studentId}`)
      .then((res) => {
        setStudentName(res.data.name) ;
      })
      .catch((error) =>{
        console.error('error fetching student : ', error);
      })
    })
    
    useEffect(() => {
      axios.get(`http://localhost:8080/grades/student/${studentId}`)
      .then((res) => {
        setGrades(res.data);
      })
      .catch((error) => {
        console.error('error fetching grades :',error );
      })
    }, [studentId]);
    
    const handleCloseModal = () =>{
        setIsModalOpen(false);
    }

    const handleOpenModal = () =>{
        setIsModalOpen(true);
    }

    const handleAddGrade = (newGrade) =>{
        setGrades([...grades, newGrade]);

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
    <>
    <div className='back'>
        <Link to="/"  className="back-link">
            <ArrowBackIosIcon className='back-icon' /> 
            Back
        </Link>
    </div>
    <div className='container'>
        <h1>Student Details</h1>
        <div className='sub-container'>
            <p>View and manage <span>{studentName}</span> grades in all courses</p>
            <button className='add-btn' onClick={handleOpenModal}>Add new grade</button>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Subjects</StyledTableCell>
                        <StyledTableCell align="center">Grades</StyledTableCell>

                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {grades.map((row) => (
                        <StyledTableRow key={row.subject}>
                        <StyledTableCell align="center" component="th" scope="row">
                           {row.subject}
                        </StyledTableCell>
                        <StyledTableCell align="center">{row.grade}</StyledTableCell>

                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
            <AddGrade
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onAddGrade={handleAddGrade}
                studentId = {studentId}
            />
        </div>
      
    </div>
    </>
  )
}
