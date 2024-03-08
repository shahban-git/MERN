
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import { Email, Lock } from '@material-ui/icons';
import backgroundImage from '../img/bacground.png';
import {loginApi} from '../services/services';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    console.log("auth", auth)
    if (auth) {
      navigate('/');
    }
  }, [navigate]);

  const validateForm = () => {
    let valid = true;
    setEmailError('');
    setPasswordError('');
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
    console.log('collectData');
    if (!validateForm()) {
      return;
    }
    console.log('email:', email, 'password:', password);

    

    const { success, error } = await loginApi(email, password);
    console.log('Login Response:', { success }); // Add this line
    if (success) {
      navigate('/');
    } else {
      console.error('Login error:', error);
    }
  };
  

   
  return (
    <div
      className='signup'
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Opacity using RGBA color
      }}
    >
      <div
        style={{
          textAlign: 'center',
          backgroundColor: 'white',
          marginTop: '-180px',
          borderRadius: '20px',
          padding: '16px',
        }}
      >
        <h1>Log-in</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <TextField
            className='inputbox'
            label='Email'
            required
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
          />

          <TextField
            className='inputbox'
            label='Password'
            type='password'
            required
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
          />
        </div>

        <Button
          variant='contained'
          color='primary'
          onClick={collectData}
          className='signupbutton'
          style={{ marginLeft: '10px' }}
        >
          Login
        </Button>
        <br />
        <br />
      </div>
    </div>
  );
}
