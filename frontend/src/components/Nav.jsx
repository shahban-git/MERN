import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Card,
  CardContent,
  CardActions
} from '@material-ui/core';
import { AccountCircle, MoreVert, ExitToApp } from '@material-ui/icons';
import logo from '../img/mylogo.PNG';



export default function Nav() {
  const [auth, setAuth] = useState(localStorage.getItem('user'));

  console.log("auth********************", auth)
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  
  useEffect(() => {
    const storedAuth = localStorage.getItem('user');
    if (!storedAuth || isTokenExpired(storedAuth)) {
      clearAuthData();
    } else {
      setAuth(storedAuth);
    }
  
    const timeout = setTimeout(() => {
      clearAuthData();
    }, 3600000);
  
    return () => clearTimeout(timeout);
  }, [auth]); // Include 'auth' in the dependency array
  


  const isTokenExpired = (auth) => {
    const parsedAuth = JSON.parse(auth);
    const currentTime = Math.floor(Date.now() / 1000);
    return parsedAuth.expiresIn < currentTime;
  };

  const clearAuthData = () => {
    localStorage.removeItem('user');
    setAuth(null);
    navigate('/login');
    console.log('Authentication data cleared');
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    clearAuthData();
    console.log('logout')
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <img alt='logo' className='logo' src={logo} />
        </Typography>
        {auth ? (
          <>
            <Button color="inherit" component={Link} to="/">Home Page</Button>
            <Button color="inherit" component={Link} to="/add">Add Product</Button>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <Card>
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    Name: {JSON.parse(auth).name} 
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Email: {JSON.parse(auth).email}  
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    color="primary"
                    startIcon={<ExitToApp />}
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </CardActions>
              </Card>
            </Menu>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/Signup">Signup</Button>
            <Button color="inherit" component={Link} to="/login">Login</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
