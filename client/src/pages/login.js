import React, { useState } from 'react';  
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import './global.css';
import { Typography, Container, TextField, Button, Link, Paper,  Checkbox, FormControlLabel,} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleMailchange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleLogin = async () => {
    const response = await fetch('http://localhost:8000/login', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({ email: email, password: password})

      });
      
      const data = await response.json();

      if (data.success) {
        Cookies.set('jwtToken', data.token);
        navigate('/home');
      }

    }


  return(
    <div>
        <div className="front-page-hero-section">
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>    
        
        <Container component={Paper} elevation={3} style={{padding: '20px', width: '400px'}}>
        <form noValidate autoComplete="off" style={{ display: 'flex', flexDirection: 'column' }}>
            
            <AccountCircleIcon color="secondary" style={{fontSize:"50px", alignSelf: 'center'}}/>

            <Typography variant='h6' style={{color: 'black', alignSelf: 'center', marginLeft: 8}}>Log-In</Typography>

            <Typography variant='body1' align='left' style={{color: 'black',marginLeft: 8}}>Email ID</Typography>
            <TextField label="Email" value={email} onChange={handleMailchange} required variant="outlined" fullWidth margin="normal" />

            <Typography variant='body1' align='left' style={{color: 'black',marginLeft: 8}}>Password</Typography>
            <TextField label="Password" value={password} onChange={handlePasswordChange} required variant="outlined" fullWidth margin="normal" type="password" />

            <FormControlLabel control={<Checkbox />} label="Remember me?" />

            <Button variant="contained" onClick={handleLogin} color="primary"  sx={{ width: '50%', margin:2, alignSelf: 'center' }} type="button"> Log-In </Button>
            
            <Link component="button" onClick={()=>{navigate('/signup')}} variant="body2"> Don't have an account? Click here ! </Link>

        </form>
        </Container>

    </div>
        </div>
    </div>
  );

}
