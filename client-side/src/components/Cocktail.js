import {useEffect, useState, React} from 'react'
import TopAppBar from './TopAppBar';
import {useParams} from 'react-router-dom';
import axios from 'axios';

const Cocktail = () => {
    const {id} = useParams()
    const[cocktail, setCocktail] = useState();
    const[errorMessage, setErrorMessage] = useState('')
    const[errorFlag, setErrorFlag] = useState(true)
    const[encodedImage, setImagePath] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:8080/cocktail/getCocktail/' + id)
        .then(res => {
            setCocktail(res.data)
            setErrorFlag(false)
            axios.get('http://localhost:8080/cocktail/getImage/' + id, {responseType: 'arraybuffer'})
            .then(res => {
                const data = Buffer.from(res.data, 'binary').toString('base64')
                setImagePath(data)
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
              <h1>Cocktail: {cocktail.name}</h1><br/>
              <img src={`data:image/jpg;base64,${encodedImage}`} alt="cocktail"/>
            </div>
            }
          

        </div>
    );
}

export default Cocktail;