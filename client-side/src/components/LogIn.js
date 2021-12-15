import React from 'react'
import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Container, Paper, Button} from '@mui/material';
import axios from 'axios';
import TopAppBar from './TopAppBar';
import Typography from '@mui/material/Typography';
import { Link, Navigate } from 'react-router-dom';

const LogIn = () => {
    const paperStyle = {
        padding:"50px 20px",
        width: 600,
        margin: "20px auto",
        justifyContent: "center"
    }
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[isUserLogged, setUserLogged] = useState(false)
    const[errorMessage, setErrorMessage] = useState('')
    const[errorFlag, setErrorFlag] = useState(false)

    const handleOnClick = (e) => {
        e.preventDefault()
        const loggingCrudentials = {
            email,
            password
        }
        setErrorFlag(false)
        axios.post("http://localhost:8080/user/loginAuth", loggingCrudentials)
        .then(response => {
            localStorage.setItem('user', JSON.stringify(response.data))
            setUserLogged(true)
        })
        .catch(error =>{
            setErrorFlag(true)
            const errorCode = error.response.request.status
            if(errorCode === 404){
                setErrorMessage("There's no user registered on this email.")
            }else if (errorCode === 409){
                setErrorMessage("Wrong password.")
            }else if (errorCode === 406){
                setErrorMessage("Invalid email.")
            }else{
                setErrorMessage("Something went wrong, try again.")
            }
            console.log(errorMessage)
        })
    }

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem('user'));
        if(loggedUser){
            setUserLogged(true)
        }
    },[])



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
                         '& > :not(style)': { m: 'auto', mt: 1, width: '40ch'},
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
                        {errorFlag ? <Typography color="red">{errorMessage}</Typography> : ''}
                        <Button variant="outlined" color="success" onClick = {handleOnClick}>Log in</Button><br/>
                        Don't have an account? <Link to="/SignUp">Sign up!</Link>

                    </Box>
                </form>
            </Paper>
        </Container>
        {isUserLogged ? <Navigate to="/homepage"/> : ""}
    </div>
    );
}

export default LogIn;