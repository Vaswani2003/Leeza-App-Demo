import React, { useState } from 'react';
import './global.css';
import { Typography, Container, TextField, Button, Paper} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';


export default function Signup() {
  const navigate = useNavigate();
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const handleNameChange = (event) => {
    setname(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setpassword(event.target.value);
  }

  const handleMailchange = (event) => {
    setemail(event.target.value);
  }

  const handleSignup = async () => {
    const response = await fetch('http://localhost:8000/signup', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({ name: name, email: email, password: password})
  });

      const data = await response.json();

      if(data.success){
        alert('Signup successful!');
        navigate('/');
      }
      else{
        alert('Signup failed!');
      }
  }

    return(
      <div>
        <div className="front-page-hero-section">
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>    
        
        <Container component={Paper} elevation={3} style={{padding: '20px', width: '400px'}}>
        
        <form noValidate autoComplete="off" style={{ display: 'flex', flexDirection: 'column' }}>
            
            <AccountCircleIcon color="secondary" style={{fontSize:"50px", alignSelf: 'center'}}/>

            <Typography variant='h6' style={{color: 'black', alignSelf: 'center', marginLeft: 8}}>Sign-Up</Typography>
            
            <Typography variant='body1' align='left' style={{color: 'black',marginLeft: 8}}>Full Name</Typography>
            <TextField label="Name" value={name} onChange={handleNameChange} required variant="outlined" fullWidth margin="normal" />

            <Typography variant='body1' align='left' style={{color: 'black',marginLeft: 8}}>Email ID</Typography>
            <TextField label="Email" value={email} onChange={handleMailchange} required variant="outlined" fullWidth margin="normal" />

            <Typography variant='body1' align='left' style={{color: 'black',marginLeft: 8}}>Password</Typography>
            <TextField label="Password" value={password} onChange={handlePasswordChange} required variant="outlined" fullWidth margin="normal" type="password" />

            <Button variant="contained" onClick={handleSignup} color="primary" sx={{ width: '50%', margin:2, alignSelf: 'center' }} type="button"> Sign - Up </Button>
        
        </form>
    </Container>
    </div>
        </div>
      </div>
    );}