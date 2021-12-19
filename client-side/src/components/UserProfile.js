import React from 'react';
import TopAppBar from './TopAppBar';
import {useEffect, useState} from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Grid, Paper} from '@mui/material';
import ChangePassworDialog from './ChangePasswordDialog';

function UserProfile() {

    const paperStyle = {
        padding:"50px 20px",
        width: 500,
        margin: "20px 20px auto",
        //background: '#85F5E9'
    }

    const[isUserLogged, setUserLogged] = useState(false)
    const[user, setUser] = useState()

    useEffect(() => {
        const loggedUser = JSON.parse(sessionStorage.getItem('user'));
        console.log(loggedUser)
        if(loggedUser){
            setUserLogged(true)
            setUser(loggedUser)
        }else{
            setUserLogged(false)
        }
    }, [])

    return (
        <div className="UserProfile">
            <TopAppBar />
            {isUserLogged ? 
            <Grid container spacing={2} sx={{m: 'auto'}} alignItems="stretch" justifyContent="center">
                <Paper elevation={3} style={paperStyle}>
                    <Grid container rowSpaceing={10} direction="column" >
                        <Typography item variant="h4">User profile.</Typography><br/>
                        <Paper item elevation = {6} >
                            <Typography variant="h5" align='left'>Name: {user.name}</Typography>
                        </Paper><br/>
                        <Paper item elevation = {6}>
                            <Typography variant="h5" align='left'>Email: {user.email}</Typography>
                        </Paper><br/>
                    </Grid>
                    <ChangePassworDialog />
                </Paper>
                <Paper elevation={3} style={paperStyle}>
                    <Box>
                        <Typography variant="h4">Favorite recipes.</Typography>
                    </Box>
                </Paper>
            </Grid> : 
            <Typography>Log in first to see you profile.</Typography>}
        </div>
    );
}

export default UserProfile;