import {useEffect, useState, React} from 'react'
import TopAppBar from './TopAppBar';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {Grid, Paper, Typography} from '@mui/material';
import Comments from './Comments';

const Cocktail = () => {
    const paperStyle = {
        padding:"50px 20px",
        width: 600,
        margin: "20px auto",
    }
    const imageStyle = {
        display: 'block',
        margin: 'auto'
    }
    const {id} = useParams()
    const[cocktail, setCocktail] = useState();
    const[errorMessage, setErrorMessage] = useState('')
    const[errorFlag, setErrorFlag] = useState(true)
    const[encodedImage, setEncodedImage] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:8080/cocktail/getCocktail/' + id)
        .then(res => {
            setCocktail(res.data)
            setErrorFlag(false)
            axios.get('http://localhost:8080/cocktail/getImage/' + id, {responseType: 'arraybuffer'})
            .then(res => {
                const data = Buffer.from(res.data, 'binary').toString('base64')
                setEncodedImage(data)
            })
            .catch(err => {
                setErrorMessage(err.response.data)
                setErrorFlag(true)
            })
        })
        .catch(err => {
            setErrorMessage(err.response.data)
            setErrorFlag(true)
        })
    }, [id])

    return(
        <div classname="Cocktail">
            <TopAppBar/>
            {errorFlag ? <h1>{errorMessage}</h1> :
            <div>
            <Paper elevation={3} style={paperStyle}>
                <Grid container rowSpaceing={10} direction="column" >
                    <Typography item variant="h4" ><b>{cocktail.name}</b></Typography><br/>
                    <img src={`data:image/jpg;base64,${encodedImage}`} alt="cocktail" width={400} style={imageStyle}/><br/>
                    <Paper item elevation = {6} >
                        <Typography variant="h5" align='left' style={{whiteSpace: 'pre-line'}}><b>Ingredients:</b>{'\n' + cocktail.ingredients}</Typography>
                    </Paper><br/>
                    <Paper item elevation = {6}>
                        <Typography variant="h5" align='left'><b>Method:</b> {cocktail.method}</Typography>
                    </Paper><br/>
                    <Paper item elevation = {6}>
                        <Typography variant="h5" align='left'><b>Glass:</b> {cocktail.glass}</Typography>
                    </Paper><br/>
                    <Paper item elevation = {6}>
                        <Typography variant="h5" align='left' style={{whiteSpace: 'pre-line'}}><b>How to prepare:</b> {'\n' + cocktail.description}</Typography>
                    </Paper><br/>
                </Grid>
            </Paper>
            <Comments/>
            </div>
            }
        </div>
    );
}

export default Cocktail;