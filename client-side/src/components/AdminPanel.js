import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Paper, Grid, Typography, Button } from '@mui/material'
import TopAppBar from './TopAppBar';
import CocktailsTable from './CocktailsTable'
import UsersTable from './UsersTable'
import axios from 'axios'

const paperStyle = {
    padding: "50px 20px",
    width: 1500,
    margin: "20px 20px auto",
}

const paperStyleSmall = {
    padding: "50px 20px",
    width: 600,
    margin: "20px 20px auto",
}

const AdminPanel = () => {

    const [adminFlag, setAdminFlag] = useState(false)

    const cocktailsHandleOnClick = (e) => {
        e.preventDefault()
        axios.delete(`http://localhost:8080/cocktail/deleteAllCocktails`)
            .then(res => {
                console.log(res.data)
                window.location.reload(false)
            })
            .catch(err => {
                console.log(err.response.request.message)
            })
    }

    const usersHandleOnClick = (e) => {
        e.preventDefault()
        axios.delete(`http://localhost:8080/user/deleteAll`)
            .then(res => {
                console.log(res.data)
                window.location.reload(false)
            })
            .catch(err => {
                console.log(err.response.request.message)
            })
    }

    useEffect(() => {
        const loggedUser = JSON.parse(sessionStorage.getItem('user'))
        if (loggedUser) {
            if (loggedUser.type === 'admin') {
                setAdminFlag(true)
            } else {
                setAdminFlag(false)
            }
        } else {
            setAdminFlag(false)
        }
    }, [])

    return (
        <div classname="Adminpanel">
            <TopAppBar />
            {adminFlag
                ? <Grid container spacing={2} sx={{ m: 'auto' }} alignItems="stretch" justifyContent="center">
                    <Paper elevation={3} style={paperStyle}>
                        <Typography item variant="h4">Admin Panel.</Typography><br />
                        <Grid container spacing={2} sx={{ m: 'auto' }} alignItems="stretch" justifyContent="center" direction="row">
                            <Paper elevation={6} style={paperStyleSmall}>
                                <Typography item variant="h5">Cocktails.</Typography><br />
                                <CocktailsTable /> <br />
                                <Button variant="contained" component={Link} to="/addcocktail">
                                    Add cocktail
                                </Button> 
                                <Button variant="contained" color="error" onClick={cocktailsHandleOnClick}> 
                                    Clear data
                                </Button>
                            </Paper>
                            <Paper elevation={6} style={paperStyleSmall}>
                                <Typography item variant="h5">Users.</Typography><br />
                                <UsersTable /><br/>
                                <Button variant="contained" color="error" onClick={usersHandleOnClick}> 
                                    Clear data
                                </Button>
                            </Paper>
                        </Grid>
                    </Paper>
                </Grid>
                : <h1>You don't have access to this feature</h1>}
        </div>
    );
}

export default AdminPanel;