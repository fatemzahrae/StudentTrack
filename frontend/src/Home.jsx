import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css'
import AddStudent from './AddStudent';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';


export default function Home() {
  const [students, setStudents] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [error, setError] = useState(null); 
  const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://backend:8080";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${backendUrl}/students`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setStudents(res.data);
        } else {
          console.error("Invalid data format:", res.data);
          setError("Unexpected response format from server.");
        }
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        setError("Failed to fetch students. Please try again later.");
      })
      .finally(() => {
        setLoading(false); // Set loading to false once the API call is done
      });
  }, [backendUrl]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleAddStudent = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    "&.MuiTableCell-head": { 
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    "&.MuiTableCell-body": {  
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <div className="container">
      <h1>Students List</h1>
      <div className="sub-container">
        <p>Manage your students' information easily</p>
        <button className="add-btn" onClick={handleOpenModal}>
          Add new student
        </button>

        {error ? ( // Gestion des erreurs d'API
          <p className="error-message">{error}</p>
        ) : students.length === 0 ? ( // Gestion du cas où il n'y a pas de données
          <p>No students available.</p>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Created on</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell align="center" component="th" scope="row">
                      <Link to={`/students/${row.id}`}>{row.name}</Link>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.creation_date}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <AddStudent
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onAddStudent={handleAddStudent}
        />
      </div>
    </div>
  );
}

