import { Grid, Paper, Typography } from '@mui/material';
import {React, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import TopAppBar from './TopAppBar';
import axios from 'axios';


const CocktailPage = () => {
    const paperStyle = {
        padding:"50px 20px",
        width: 250,
        margin: "20px auto",
        textDecoration: 'none'
    }
    const imageStyle = {
        display: 'block',
        margin: 'auto',
        width: 200,
        height: 200,
    }

    const[cocktailInfo, setCocktailInfo] = useState([])
    const[cocktailImages, setCocktailImages] = useState([])


    useEffect(() => {
        cocktailInfo.map((cocktail, index) => (
            axios.get('http://localhost:8080/cocktail/getImage/' + cocktail.id, {responseType: 'arraybuffer'})
            .then(res => {
                const data = Buffer.from(res.data, 'binary').toString('base64')
                let arr = [...cocktailInfo]
                arr[index].cocktailImage = data
                setCocktailImages(cocktailImages => [...cocktailImages, data])
            })
            .catch(err => {
                console.log(err.response.data)
            })
        ))
    }, [cocktailInfo])

    useEffect(() => {
        axios.get('http://localhost:8080/cocktail/getAllCocktails')
        .then(res => {
            setCocktailInfo(res.data)
        })
        .catch(err => {
            console.log(err.response.data)
        })
    }, [])

    return(
        <div className="CocktailPage">
            <TopAppBar/>
            <Typography item variant="h3" ><b>All recipes.</b></Typography><br/>
                <Grid container spacing={2} justifyContent='center' alignItems='stretch'>
                {cocktailImages.length !== 0
                ?   cocktailInfo.map((cocktail) => (
                    <Paper component={Link} to={`/cocktail/${cocktail.id}`} style={paperStyle} key={`cocktail-${cocktail.id}`}>
                        <Typography item variant="h4" >{cocktail.name}</Typography><br/>
                        {cocktail.cocktailImage ? 
                        <div><img src={`data:image/jpg;base64,${cocktail.cocktailImage}`} alt={`cocktail-${cocktail.id}`} style={imageStyle}/><br/></div> 
                        : 
                        <span>Loading image...</span>}
                    </Paper>
                ))
                :<span>Loading images...</span>}

                </Grid>

        </div>
    );
}

export default CocktailPage;