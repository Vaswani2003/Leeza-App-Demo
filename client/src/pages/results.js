import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Button } from '@mui/material';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

export default function Results() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    const token = Cookies.get('jwtToken');

    if(token){
        const decoded = jwtDecode(token);
        if(decoded){
            setUsername(decoded.name);
            fetchScore(decoded.name);
        }
    }
}, []);

const fetchScore = async (name) => {
try{
  const response = await fetch('http://localhost:8000/get-score', {
    method:'POST', headers: { 'Content-Type': 'application/json',}, body: JSON.stringify({username}),
  });

  const result = await response.json();
  if(result.success){
    setScore(result.score);
  }
}catch(err){
  console.log(err);
}
};

    return(
      <div>
       <div className="front-page-hero-section">
       <Container component={Paper} elevation={3} style={{display:'flex',marginTop:'20vh', flexDirection:'column', padding: '20px', width: '400px'}}>
            
            <AccountCircleIcon color="secondary" style={{fontSize:"50px", alignSelf: 'center'}}/>

            <Typography variant='h6' style={{color: 'black', alignSelf: 'center', marginLeft: 8}}>Greetings! {username}</Typography>

            <Typography variant='body1' align='center' style={{color: 'black',marginLeft: 8}}>You have scored : {score} </Typography>

            <Button variant="contained" onClick={()=>{navigate('/home')}} color="primary"  sx={{ width: '50%', margin:2, alignSelf: 'center' }} type="button"> Home </Button>
            
        </Container>
   
       </div>
      </div>
    );}