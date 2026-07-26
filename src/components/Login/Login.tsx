import React, { useState, useContext } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Link,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Contexts/AppContext';

import { IsLoggedIn } from '../../services/authService';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { startLoading, stopLoading, setIsLoggedIn } = useContext(AppContext);

  const handlePasswordVisibilityToggle = () => {
    setShowPassword((prevShow) => !prevShow);
  };
  const getUserRole = () => {
    startLoading();
    setError('');

    fetch(`${baseUrl}/api/user/getUserRoles`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
        } else {
          return response.text().then(() => setError('Login is unsuccessful.'));
        }
      })
      .catch(() => {
        setError('Login is unsuccessful.');
      })
      .finally(() => {
        stopLoading();
      });
  };
  const handleLogin = () => {
    startLoading();
    setError('');

    fetch(`${baseUrl}/api/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Giriş başarılı');
              IsLoggedIn(baseUrl as string).then((result) => {
                    setIsLoggedIn(result);
                  });
          navigate('/');
        } else {
          return response.text().then(() => setError('Login is unsuccessful.'));
        }
      })
      .catch(() => {
        setError('Login is unsuccessful.');
      })
      .finally(() => {
        stopLoading();
      });
  };

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        minHeight="100vh"
        paddingTop={4}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Login
        </Typography>
        <TextField
          label="UserName"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handlePasswordVisibilityToggle} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {error && (
          <Typography color="error" variant="body2" gutterBottom>
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          sx={{ mt: 2 }}
        >
          Login
        </Button>
        <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
          <Grid >
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;