import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';


export default function UsersTable() {
    const [rows, setRows] = useState([])

    const handleOnClick = (e) => {
        e.preventDefault()
        const userID = e.target.dataset.id
        axios.delete(`http://localhost:8080/user/deleteUser/${userID}`)
            .then(res => {
                console.log(res.data)
                window.location.reload(false)
            })
            .catch(err => {
                console.log(err.resoponse.data)
            })
    }

    useEffect(() => {
        axios.get('http://localhost:8080/user/getAllUsers/')
            .then(res => {
                setRows(res.data)
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }, [])

    return (
        <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
            <Table stickyHeader sx={{ minWidth: 650 }} size="small" aria-label="cocktail table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Type</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow sx={{ height: 50 }}>
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.type}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="error" data-id={row.id} onClick={handleOnClick}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}