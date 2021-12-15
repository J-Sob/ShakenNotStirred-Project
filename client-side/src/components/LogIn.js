import React from 'react'
import {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Container, Paper, Button} from '@mui/material';
import axios from 'axios';
import TopAppBar from './TopAppBar';
import { Link } from 'react-router-dom';

const LogIn = () => {
    const paperStyle = {
        padding:"50px 20px",
        width: 600,
        margin: "20px auto",
    }
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')

    const handleOnClick = (e) => {
        e.preventDefault()
        const user = {
            email,
            password
        }
        axios.post("http://localhost:8080/user/loginAuth", user)
        .then(response => {
            console.log(response.data)
        })
        .catch(error =>{
            const errorCode = error.response.request.status
            if(errorCode === 404){
                console.log("There's no user registered on this email")
            }else if (errorCode === 409){
                console.log("Wrong password")
            }else if (errorCode === 406){
                console.log("Invalid email")
            }else{
                console.log("Unknown error: " + errorCode)
            }
        })
    }


return(
    <div classname="LogIn">
        <TopAppBar/>
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1>Log in to your account.</h1>
                <form className="LogInForm" autoComplete="off">
                    <Box
                     component="form"
                     sx={{
                         '& > :not(style)': { m: 1, width: '40ch' },
                     }}
                     noValidate
                     autoComplete="off"
                    >
                        <TextField label="E-mail" variant="outlined"
                            value={email}
                            onChange = {(e) => {
                                setEmail(e.target.value)
                            }}/><br/>
                        <TextField label="Password" variant="outlined" type="password"
                            value={password}
                            onChange = {(e) => {
                                setPassword(e.target.value)
                            }}/><br/>
                        <Button variant="outlined" color="success" onClick = {handleOnClick}>Log in</Button><br/>
                        Don't have an account? <Link to="/SignUp">Sign up!</Link>

                    </Box>
                </form>
            </Paper>
        </Container>
    </div>
    );
}

export default LogIn;