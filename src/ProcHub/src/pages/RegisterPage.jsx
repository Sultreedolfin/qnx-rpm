import React, { useState, useEffect } from 'react';
import { Box, Button, Paper, Typography, TextField, CircularProgress } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { Navigate, Link } from 'react-router-dom';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8888/register', {
            method: 'GET',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            if (data.user) {
                setIsAuthenticated(true);
            }
        });
    }, []);

    const handleRegister = () => {
        if (password != confirmedPassword) {
            setPasswordError('Passwords do not match');
            return;
        }
        const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_.-]{2,31}$/;
        if (!usernameRegex.test(username)) {
            setUsernameError('Username must only contain letters, numbers, and underscores.');
            return;
        }
  
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError('Password must be at least 8 characters long, include at least 1 letter, 1 number, and 1 special character.');
            return;
        }
        fetch('http://localhost:8888/register', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstname, lastname, username, password })
        })
        .then(async (res) => {
            if (!res.ok) {
                throw new Error('Account creation failed');
            }
            return res.json();
        })
        .then(() => {
            setIsAuthenticated(true);
        })
        .catch(err => {
            alert(err.message);
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    if (isAuthenticated) {
        console.log('made it');
        return <Navigate to="/" />; // Redirect to dashboard after login
    }
    if (isLoading) {
        return (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        );
    }

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
                    error={!!usernameError}
                    helperText={usernameError}
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
                    value={confirmedPassword}
                    onChange={(e) => setConfirmedPassword(e.target.value)}
                    sx={{ mb: 2 }}
                    error={!!passwordError}
                    helperText={passwordError}
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
