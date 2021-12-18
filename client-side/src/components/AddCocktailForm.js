import React from 'react';
import {Button, Paper, Container, Box, TextField, MenuItem, Input, IconButton} from '@mui/material';
import {useState} from 'react';
import axios from 'axios'

const AddCocktailForm = () => {
    const paperStyle = {
        padding:"50px 20px",
        width: 600,
        margin: "20px auto",
    }

    const methods = ['Shaking', 'Stirring', 'Building', 'Throwing', 'Muddling']
    const glassTypes = ['Highball', 'Lowball', 'Margerita glass', 'Cocktail glass', 'Hurricane glass', 'Shot glass']

    const[name, setName] = useState('')
    const[baseAlcohol, setBaseAlcohol] = useState('')
    const[method, setMethod] = useState('')
    const[ingredients, setIngredients] = useState('')
    const[description, setDescription] = useState('')
    const[glass, setGlass] = useState('')
    const[file, setFile] = useState(null)

    const handleOnFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const handleOnClick = (e) => {
        const cocktail = {
            name,
            baseAlcohol,
            method,
            ingredients,
            description,
            image: ''
        }
        axios.post("http://localhost:8080/cocktail/addCocktail", cocktail)
        .then(res =>{
            const cocktailId = res.data
            const formData = new FormData()
            formData.append('image', file)
            axios.post("http://localhost:8080/cocktail/addCocktailImage/" + cocktailId, formData)
            .then(res => {

            }).catch(err => {
                console.log(err.response.data)
            })
        }).catch(err => {
            console.log(err.response.data)
        })
    }

    return(
        <div className="addCocktailForm">
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1>Add cocktail.</h1>
                <form className="addCocktail" autoComplete="off">
                    <Box
                     component="form"
                     sx={{
                         '& > :not(style)': { m: 'auto', mt: 1, width: '40ch'},
                     }}
                     noValidate
                     autoComplete="off"
                    >
                        <TextField label="Cocktail name" variant="outlined"
                            value={name}
                            onChange = {(e) => {
                                setName(e.target.value)
                            }}/><br/>
                        <TextField label="Base alcohol" variant="outlined"
                            value={baseAlcohol}
                            onChange = {(e) => {
                                setBaseAlcohol(e.target.value)
                            }}/><br/>
                        <TextField label="Method" variant="outlined"
                            select
                            value={method}
                            onChange = {(e) => {
                                setMethod(e.target.value)
                            }}>
                                {methods.map((method) => (
                                    <MenuItem key={method} value={method}>
                                        {method}
                                    </MenuItem>
                                ))}    
                        </TextField><br/>
                        <TextField label="Glass type" variant="outlined"
                            select
                            value={glass}
                            onChange = {(e) => {
                                setGlass(e.target.value)
                            }}>
                                {glassTypes.map((glassType) => (
                                    <MenuItem key={glassType} value={glassType}>
                                        {glassType}
                                    </MenuItem>
                                ))}    
                            </TextField><br/>
                        <TextField label="Ingredients" variant="outlined" 
                            multiline
                            rows={4}
                            value={ingredients}
                            onChange = {(e) => {
                                setIngredients(e.target.value)
                            }}/><br/>
                        <TextField label="Description" variant="outlined" 
                            multiline
                            rows={4}
                            value={description}
                            onChange = {(e) => {
                                setDescription(e.target.value)
                            }}/><br/>
                        <label htmlFor="file-upload">
                            <Input accept="image/*" id="file-upload" type="file" onChange={handleOnFileChange} />
                            <IconButton color="primary" aria-label="upload picture" component="span"/>
                        </label>                           
                        <Button variant="contained"  onClick = {handleOnClick}>Add cocktail</Button><br/>

                    </Box>
                </form>
            </Paper>
        </Container>
        </div>
    )
}

export default AddCocktailForm;