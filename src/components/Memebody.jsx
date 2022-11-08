import '../index.css';
import { useEffect, useState } from 'react';
import {Container, Row, Col, Form, InputGroup, Button} from 'react-bootstrap';


export default function MemeBody(){

    const [details, setDetails] = useState({
        toptext: '', bottomtext: '', img: 'https://i.imgflip.com/30b1gx.jpg'
    })

    console.log(details);
    const[memeDetails, setMemeDetails] = useState([]);

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setMemeDetails(data.data.memes))
    },[])

    function randomMeme(){
        let randomNumber = Math.floor(Math.random() * memeDetails.length);
        let url = memeDetails[randomNumber].url;
        setDetails(prevMeme => ({
            ...prevMeme,
            img: url
        }))
    }

    function handleChange(event){
        event.preventDefault()
        const{name, value} = event.target
        setDetails(prevState => ({
            ...prevState,
            [name] : value
        }))
    }

    function reset(){
        setDetails(prev => ({
            ...prev,
            toptext: '',
            bottomtext: ''
        }))
    }
   
    return(
<>
      <Container className='mt-5'>
<form>
    <Row>
        <Col lg={6} sm={6}>
             <InputGroup className="mb-3">
        <Form.Control aria-label="Text input with checkbox" 
            placeholder='Enter first text'
            name='toptext'
            value={details.toptext}
            onChange={handleChange}
            />
            </InputGroup>
        </Col>
        <Col>
        <InputGroup>
        <Form.Control aria-label="Text input with checkbox" 
        placeholder='Enter bottom text'
        name='bottomtext'
        value={details.bottomtext}
        onChange={handleChange}
        />
        </InputGroup>
        </Col>
    </Row>
    <Row>
        <Col className='btn-container mt-4'>
            <Button variant="success" onClick={randomMeme}> Get Random Meme  </Button>
            <Button variant='danger' onClick={reset}> Reset Text </Button>
        </Col>
    </Row>
</form>
      </Container>
      <Container className='meme-image-container'>
        <div className='meme-container my-5'>
            <img src={details.img} className='memeimage'/>
            <h2 className='top-text'>{details.toptext}</h2>
            <h2 className='bottom-text'>{details.bottomtext}</h2>
        </div>
      </Container>
</>

    )
}