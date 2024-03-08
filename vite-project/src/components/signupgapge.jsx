
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import { AccountCircle, Email, Lock } from '@material-ui/icons';
import {SignupApi} from  '../services/services'
import backgroundImage from '../img/bacground.png';


export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
  const auth = localStorage.getItem('user');
  console.log('auth', auth)
    if (auth) {
      navigate('/');
    }
  }, [navigate]);


  
  const validateForm = () => {
    let valid = true;
    setNameError('');
    setEmailError('');
    setPasswordError('');
    if (!name) {
      setNameError('Please enter your name');
      valid = false;
    }
    // Validate email field
    if (!email) {
      setEmailError('Please enter your email');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      valid = false;
    }
    // Validate password field
    if (!password) {
      setPasswordError('Please enter your password');
      valid = false;
    }
    return valid;
  };


  const collectData = async () => {
    console.log("collectData");
    if (!validateForm()) {
      return;
    }
    console.log('name:', name, 'email:', email, 'password:', password);
    const result = await SignupApi(name, email, password)
    if (result.error) {
      setEmailError('Email already exists');
      return;
    }
    if (result.auth) {
      await localStorage.setItem('user', JSON.stringify(result.result));
      console.log("result.auth");
      await localStorage.setItem('token', JSON.stringify(result.auth)); // Save the token to localStorage
      navigate('/');
    } else {
      console.error('Registration error:', result);
    }
  };
  
  
  return (
    <div className='signup' style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Opacity using RGBA color
    }}>
      <div style={{ textAlign: 'center', backgroundColor:"white", marginTop:"-180px", borderRadius:"20px", padding:"16px" }}>
      <h1>Register</h1>
      <TextField
        className='inputbox'
        label='Username'
        value={name}
        onChange={(e) => setName(e.target.value)}
        variant='outlined'
        InputProps={{
          startAdornment: <AccountCircle />,
        }}
        fullWidth
        margin='normal'
        style={{ width: '300px' }}
        error={Boolean(nameError)}
        helperText={nameError}
      /><br></br>

      <TextField
        className='inputbox'
        label='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        variant='outlined'
        InputProps={{
          startAdornment: <Email />,
        }}
        fullWidth
        margin='normal'
        style={{ width: '300px' }}
        error={Boolean(emailError)}
        helperText={emailError}
      /><br></br>

      <TextField
        className='inputbox'
        label='Password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        variant='outlined'
        InputProps={{
          startAdornment: <Lock />,
        }}
        fullWidth
        margin='normal'
        style={{ width: '300px' }}
        error={Boolean(passwordError)}
        helperText={passwordError}
      /><br></br>

      <Button
        variant='contained'
        color='primary'
        onClick={collectData}
        className='signupbutton'
        style={{ marginLeft: '10px' }}
      >
        Sign Up
      </Button>
      </div>
    </div>
  );
}
