import React from 'react'
import {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Container, Paper, Button} from '@mui/material';
import axios from 'axios';
import TopAppBar from './TopAppBar';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const paperStyle = {
        padding:"50px 20px",
        width: 600,
        margin: "20px auto",
    }
    const[email, setEmail] = useState('')
    const[name, setName] = useState('')
    const[password, setPassword] = useState('')
    const[confirmPassword, setConfirmPassword] = useState('')

    const handleOnClick = (e) => {
        e.preventDefault()
        const user = {
            email,
            name,
            password,
            type: "user"
        }
        console.log(user)
        axios.get("http://localhost:8080/user/getUserByEmail/" + user.email)
        .then(response => {
            if(response.data.length !== 0){
                console.log("Email already taken")
            }
            else if(confirmPassword !== user.password){
                console.log("Passwords don't match")
            }else{
                 axios.post("http://localhost:8080/user/addUser", user)
                 .then(response => {
                     console.log(response.data)
                 })
            }
        })
    }


return(
    <div classname="LogIn">
        <TopAppBar/>
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1>Create an account.</h1>
                <form className="SignUpForm" autoComplete="off">
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
                        <TextField label="Name" variant="outlined"
                            value={name}
                            onChange = {(e) => {
                                setName(e.target.value)
                            }}/><br/>
                        <TextField label="Password" variant="outlined" type="password"
                            value={password}
                            onChange = {(e) => {
                                setPassword(e.target.value)
                            }}/><br/>
                        <TextField label="Confirm password" variant="outlined" type="password"
                            value={confirmPassword}
                            onChange = {(e) => {
                                setConfirmPassword(e.target.value)
                            }}/><br/>
                        <Button variant="outlined" color="success" onClick = {handleOnClick}>Sign up</Button><br/>
                        Already have an account? <Link to="/LogIn">Sign in!</Link>

                    </Box>
                </form>
            </Paper>
        </Container>
    </div>
    );
}

export default SignUp;