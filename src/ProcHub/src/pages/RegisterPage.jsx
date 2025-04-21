import React, { useState, useEffect } from 'react';
import { Box, Button, Paper, Typography, TextField, CircularProgress } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate, Link } from 'react-router-dom';



const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:8888/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname, lastname, username, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Account created!');
        setIsAuthenticated(true);
        navigate('/login');
      } else {
        alert(data.error || 'Failed to create account.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong.');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 300 }}>
          Create Account
        </Typography>

        <TextField
          label="First name"
          variant="outlined"
          fullWidth
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Last name"
          variant="outlined"
          fullWidth
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Enter password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Confirm password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
        //   onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        /> 

        <Button
          variant="contained"
          size="large"
          onClick={handleRegister}
          startIcon={<LoginIcon />}
          sx={{
            width: '100%',
            py: 1.5,
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          Create Account
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none' }}>Login</Link>
        </Typography>
        <Typography variant="body2" sx={{ mt: 3, color: '#888' }}>
          Sign in to access the application.
        </Typography>
      </Paper>
    </Box>
  );
};

export default RegisterPage;
