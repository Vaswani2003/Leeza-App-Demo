import React, { useState, useEffect } from 'react';
import { Container, Paper, Grid, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import {useNavigate} from 'react-router-dom';

export default function Testing() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [answers, setAnswers] = useState({
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: '',
        answer5: ''
    });

    const handleAnswerChange = (event, questionNumber) => {
        const { value } = event.target;
        switch (questionNumber) {
            case 1:
                setAnswers({ ...answers, answer1: value });
                break;
            case 2:
                setAnswers({ ...answers, answer2: value });
                break;
            case 3:
                setAnswers({ ...answers, answer3: value });
                break;
            case 4:
                setAnswers({ ...answers, answer4: value });
                break;
            case 5:
                setAnswers({ ...answers, answer5: value });
                break;
            default:
                break;
        }
    };
    

    useEffect(() => {
        const token = Cookies.get('jwtToken');

        if(token){
            const decoded = jwtDecode(token);
            if(decoded){
                setUsername(decoded.name);
            }
        }
    }, []);


    const handleSubmit = async () => {
        const data = { username: username, answers: answers };
        const response = await fetch('http://localhost:8000/submit-answers', {
            method: 'POST', headers: { 'Content-Type': 'application/json',}, body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.success){
            navigate('/results');
        }

    };

    return (
        <div>
            <div className="front-page-hero-section">
                
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'5vh' }}>
                   
                    <Container component={Paper} elevation={3} style={{ padding: '20px', width: '400px' }}>
                       
                        <Typography variant='h6' style={{ color: 'black', alignSelf: 'center', marginLeft: 8, marginBottom:'10px' }}>
                            Hello {username} <br></br> Answer the following questions on a scale of 1 (very low) to 5 (very high)
                        </Typography>

                        <Grid container spacing={3} direction="column">

                            <Grid item>
                                <Typography variant="body1">1. Does the person show difficulty in social interactions?</Typography>
                                <FormControl component="fieldset">
                                    <RadioGroup row aria-label="answer1" name="answer1" value={answers.answer1} onChange={(event) => handleAnswerChange(event, 1)}>
                                        <FormControlLabel value="1" control={<Radio />} label="1" />
                                        <FormControlLabel value="2" control={<Radio />} label="2" />
                                        <FormControlLabel value="3" control={<Radio />} label="3" />
                                        <FormControlLabel value="4" control={<Radio />} label="4" />
                                        <FormControlLabel value="5" control={<Radio />} label="5" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                            <Grid item>
                                <Typography variant="body1">2. Does the person have repetitive behaviors or restricted interests?</Typography>
                                <FormControl component="fieldset">
                                    <RadioGroup row aria-label="answer2" name="answer2" value={answers.answer2} onChange={(event) => handleAnswerChange(event, 2)}>
                                        <FormControlLabel value="1" control={<Radio />} label="1" />
                                        <FormControlLabel value="2" control={<Radio />} label="2" />
                                        <FormControlLabel value="3" control={<Radio />} label="3" />
                                        <FormControlLabel value="4" control={<Radio />} label="4" />
                                        <FormControlLabel value="5" control={<Radio />} label="5" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                            <Grid item>
                                <Typography variant="body1">3. Does the person experience sensory sensitivities?</Typography>
                                <FormControl component="fieldset">
                                    <RadioGroup row aria-label="answer3" name="answer3" value={answers.answer3} onChange={(event) => handleAnswerChange(event, 3)}>
                                        <FormControlLabel value="1" control={<Radio />} label="1" />
                                        <FormControlLabel value="2" control={<Radio />} label="2" />
                                        <FormControlLabel value="3" control={<Radio />} label="3" />
                                        <FormControlLabel value="4" control={<Radio />} label="4" />
                                        <FormControlLabel value="5" control={<Radio />} label="5" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                            <Grid item>
                                <Typography variant="body1">4. Is there difficulty in verbal and nonverbal communication?</Typography>
                                <FormControl component="fieldset">
                                    <RadioGroup row aria-label="answer4" name="answer4" value={answers.answer4} onChange={(event) => handleAnswerChange(event, 4)}>
                                        <FormControlLabel value="1" control={<Radio />} label="1" />
                                        <FormControlLabel value="2" control={<Radio />} label="2" />
                                        <FormControlLabel value="3" control={<Radio />} label="3" />
                                        <FormControlLabel value="4" control={<Radio />} label="4" />
                                        <FormControlLabel value="5" control={<Radio />} label="5" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                            <Grid item>
                                <Typography variant="body1">5. Does the person have difficulty adapting to changes in routines or surroundings?</Typography>
                                <FormControl component="fieldset">
                                    <RadioGroup row aria-label="answer5" name="answer5" value={answers.answer5} onChange={(event) => handleAnswerChange(event, 5)}>
                                        <FormControlLabel value="1" control={<Radio />} label="1" />
                                        <FormControlLabel value="2" control={<Radio />} label="2" />
                                        <FormControlLabel value="3" control={<Radio />} label="3" />
                                        <FormControlLabel value="4" control={<Radio />} label="4" />
                                        <FormControlLabel value="5" control={<Radio />} label="5" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                            <Grid item>
                                <Button variant="contained" onClick={handleSubmit} color="primary" > Submit Answers </Button>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </div>
        </div>
    );
}
