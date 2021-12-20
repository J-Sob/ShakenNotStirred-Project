import { Container, Grid, Paper, TextField, Typography, Button } from '@mui/material';
import { React, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'

const Comments = () => {
    const paperStyle = {
        padding:"50px 20px",
        width: 600,
        margin: "20px auto",
    }
    const commentStyle = {
        padding:"15px 20px",
        margin: "20px auto",
    }

    const {id} = useParams()
    const[isUserLogged, setUserLogged] = useState(false)
    const[user, setUser] = useState()
    const[comment, setComment] = useState('')
    const[comments, setComments] = useState([])
    const[errorMessage, setErrorMessage] = useState('')
    const[errorFlag, setErrorFlag] = useState(false)

    const handleOnClick = (e) => {
        e.preventDefault()
        if(comment !== ''){
            const newComment = {
                cocktailId: id,
                userId: user.id,
                userName: user.name,
                message: comment
            }
            axios.post("http://localhost:8080/comment/addComment", newComment)
            .then(res =>{
                setComment('')
                setComments(comments => [...comments, newComment])
            })
            .catch(err =>{
                setErrorFlag(true)
                setErrorMessage(err.response.data)
            })
        }else{
            setErrorFlag(true)
            setErrorMessage("Comment can't be empty.")
        }

    }

    useEffect(() => {
        const loggedUser = JSON.parse(sessionStorage.getItem('user'));
        if(loggedUser){
            setUserLogged(true)
            setUser(loggedUser)
        }else{
            setUserLogged(false)
        }
        axios.get(`http://localhost:8080/comment/getCocktailsComments/${id}`)
        .then(res => {
            setComments(res.data)
        })
        .catch(err => {
            console.log(err.response)
        })
        console.log("in hook")
    }, [id])
    
    return(
        <div classname="Comments">
            <Container>
                <Paper elevation={3} style={paperStyle}>
                    <Grid container rowSpaceing={10} direction="column" >
                    <Typography item variant="h4" ><b>Comments.</b></Typography><br/>
                    {isUserLogged
                    ? <div>
                        <TextField label="Comment" variant="outlined" 
                        fullWidth
                        multiline
                        rows={4}
                        value={comment}
                        onChange = {(e) => {
                            setComment(e.target.value)
                        }}
                        /><br/><br/>
                        {errorFlag ? <Typography color="red">{errorMessage}</Typography> : ''}
                        <Button variant="contained"  onClick = {handleOnClick}>Add comment.</Button><br/><br/></div>
                    : <div>
                        <TextField label="Comment" variant="outlined" 
                        fullWidth
                        multiline
                        rows={4}
                        disabled
                        defaultValue="Log in first to comment"
                    /><br/></div>}
                    {comments.length !== 0
                    ? <div>
                        {comments.map((comment) => (
                            <div>
                                <Paper item elevation = {6} >
                                    <Typography variant="h5" style={commentStyle} align='left'>{`${comment.userName}: ${comment.message}`}</Typography>
                                </Paper>
                            </div>
                        ))}
                    </div>
                    : <div><Typography item variant="h5" ><b>There are no comments. Be first to comment.</b></Typography><br/></div>}

                    </Grid>
                </Paper>
            </Container>
        </div>
    );
}

export default Comments;