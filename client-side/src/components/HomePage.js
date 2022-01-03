import React from 'react'
import TopAppBar from './TopAppBar';
import { Grid, Paper, Typography, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import bartending from '../img/bartending.jpg'

const paperStyle = {
    padding: "50px 20px",
    width: 1100,
    margin: "20px 20px auto",
}

const paperStyleSmall = {
    padding: "50px 20px",
    width: 400,
    margin: "20px 20px auto",
}


const HomePage = () => {
    return (
        <div classname="Homepage">
            <TopAppBar />
            <Grid container spacing={2} sx={{ m: 'auto' }} alignItems="stretch" justifyContent="center">
                <Paper elevation={3} style={paperStyle}>
                    <Typography item variant="h4" sx={{ fontWeight: 'bold' }} >Welcome to Shaken, not Stirred!</Typography><br />
                    <Grid container spacing={1} sx={{ m: 'auto' }} alignItems="stretch" justifyContent="center" direction="row">
                        <Paper elevation={6} style={paperStyleSmall}>
                            <Typography item variant="h5">About us.</Typography><br />
                            <Typography item variant="h6">
                                <b>Shaken, not stirred</b> is a small project associating fans 
                                of cocktails and mixology, as well as aiming to spread 
                                bartending culture. <Link to="/SignUp">Join our comunity now</Link> to learn about 
                                mixing alcohol and be up to date with latest mixology trends.
                            </Typography>
                        </Paper>
                        <Avatar  alt="bartending" src={bartending} sx={{ width: 350, height: 350, margin : "auto" }}/><br/>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    );
}

export default HomePage;