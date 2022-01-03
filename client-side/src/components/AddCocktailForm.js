import React from 'react';
import { Button, Paper, Container, Box, TextField, MenuItem, Input, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios'

const paperStyle = {
    padding: "50px 20px",
    width: 600,
    margin: "20px auto",
}

const methods = ['Shaking', 'Stirring', 'Building', 'Throwing', 'Muddling']
const glassTypes = ['Highball', 'Lowball', 'Margerita glass', 'Cocktail glass', 'Hurricane glass', 'Shot glass']

const AddCocktailForm = () => {

    const ref = useRef()

    const [name, setName] = useState('')
    const [baseAlcohol, setBaseAlcohol] = useState('')
    const [method, setMethod] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [description, setDescription] = useState('')
    const [glass, setGlass] = useState('')
    const [file, setFile] = useState(null)
    const [successFlag, setSuccessFlag] = useState(false)
    const [errorFlag, setErrorFlag] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [adminFlag, setAdminFlag] = useState(false)

    const handleOnFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const clearInputs = () => {
        setName('')
        setBaseAlcohol('')
        setMethod('')
        setIngredients('')
        setDescription('')
        setGlass('')
        setFile(null)
        ref.current.value = ""
    }

    const handleOnClick = (e) => {
        setSuccessFlag(false)
        setErrorFlag(false)
        setErrorMessage(false)
        if (adminFlag) {
            if (name === "" || baseAlcohol === "" || method === ""
                || ingredients === "" || description === "" || file === null) {
                setErrorFlag(true)
                setErrorMessage("Fill all fields first")
            } else {
                const cocktail = {
                    name,
                    baseAlcohol,
                    method,
                    ingredients,
                    description,
                    glass,
                    image: ''
                }
                axios.post("http://localhost:8080/cocktail/addCocktail", cocktail)
                    .then(res => {
                        const cocktailId = res.data
                        const formData = new FormData()
                        formData.append('image', file)
                        axios.post("http://localhost:8080/cocktail/addCocktailImage/" + cocktailId, formData)
                            .then(res => {
                                setSuccessFlag(true)
                                clearInputs()
                            }).catch(err => {
                                setErrorFlag(true)
                                if (err) {
                                    console.log(err)
                                    setErrorMessage(err.response.data)
                                }
                            })
                    }).catch(err => {
                        setErrorFlag(true)
                        if (err) {
                            console.log(err)
                            setErrorMessage(err.response.data)
                        }
                    })
            }
        }else{
            setErrorFlag(true)
            setErrorMessage("You don't have access to this feature.")
        }

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
        <div className="addCocktailForm">
            <Container>
                <Paper elevation={3} style={paperStyle}>
                    <h1>Add cocktail.</h1>
                    <form className="addCocktail" autoComplete="off">
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 'auto', mt: 1, width: '40ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField label="Cocktail name" variant="outlined"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value)
                                }} /><br />
                            <TextField label="Base alcohol" variant="outlined"
                                value={baseAlcohol}
                                onChange={(e) => {
                                    setBaseAlcohol(e.target.value)
                                }} /><br />
                            <TextField label="Method" variant="outlined"
                                select
                                value={method}
                                onChange={(e) => {
                                    setMethod(e.target.value)
                                }}>
                                {methods.map((method) => (
                                    <MenuItem key={method} value={method}>
                                        {method}
                                    </MenuItem>
                                ))}
                            </TextField><br />
                            <TextField label="Glass type" variant="outlined"
                                select
                                value={glass}
                                onChange={(e) => {
                                    setGlass(e.target.value)
                                }}>
                                {glassTypes.map((glassType) => (
                                    <MenuItem key={glassType} value={glassType}>
                                        {glassType}
                                    </MenuItem>
                                ))}
                            </TextField><br />
                            <TextField label="Ingredients" variant="outlined"
                                multiline
                                rows={4}
                                value={ingredients}
                                onChange={(e) => {
                                    setIngredients(e.target.value)
                                }} /><br />
                            <TextField label="Description" variant="outlined"
                                multiline
                                rows={4}
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                }} /><br />
                            <label htmlFor="file-upload">
                                <Input ref={ref} accept="image/*" id="file-upload" type="file" onChange={handleOnFileChange} />
                                <IconButton color="primary" aria-label="upload picture" component="span" />
                            </label>
                            {errorFlag ? <Typography color="red">{errorMessage}</Typography> : ''}
                            <Button variant="contained" onClick={handleOnClick}>Add cocktail</Button><br />
                            <Button variant="contained" component={Link} to="/admin">Back</Button><br />
                            {successFlag ? <Typography color="green">Cocktail successfully added.</Typography> : ''}

                        </Box>
                    </form>
                </Paper>
            </Container>
        </div>
    )
}

export default AddCocktailForm;