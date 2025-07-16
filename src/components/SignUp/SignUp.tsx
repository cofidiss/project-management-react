import React, { useContext, useEffect, useReducer, useState } from 'react';
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AppContext } from '../../Contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import {
  SignUpFormAction,
  SignUpFormState,
  UserRole,
} from '../../Models/Models';

const Signup: React.FC = () => {
  const initialState: SignUpFormState = {
    username: '',
    password: '',
    confirmPassword: '',
    address: '',
    phone: '',
    error: '',
    roleId: undefined,
  };

  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { startLoading, stopLoading, setIsLoggedIn } = useContext(AppContext);
 
  const roleLov = Object.entries(UserRole).map(([key, value]) => ({
    id: value,
    name: key
  }));
  function formReducer(
    state: SignUpFormState,
    action: SignUpFormAction,
  ): SignUpFormState {
    switch (action.type) {
      case 'SET_FIELD':
        if (action.field === 'phone' && !/^\d+$/.test(action.value)) {
          return { ...state };
        }
        return { ...state, [action.field]: action.value };
      case 'SET_ERROR':
        return { ...state, error: action.error };
      case 'CLEAR_ERROR':
        return { ...state, error: '' };
      default:
        return state;
    }
  }


  const [state, dispatch] = useReducer(formReducer, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>('');

  const handlePasswordVisibilityToggle = () => {
    setShowPassword((prevShow) => !prevShow);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (state.password !== state.confirmPassword) {
      dispatch({ type: 'SET_ERROR', error: 'Passwords do not match!' });
    } else {
      dispatch({ type: 'CLEAR_ERROR' });
      startLoading();
      fetch(`${baseUrl}/api/user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: state.username,
          password: state.password,
          address: state.address,
          phone: state.phone,
          roleId: selectedRole,
        }),
      })
        .then((response) => {
          if (response.ok) {
            console.log('Signup başarılı');
            setIsLoggedIn(true);
            navigate('/');
          } else {
            response.text().then((x) =>
              dispatch({
                type: 'SET_ERROR',
                error: x || 'Signup unsuccessful',
              }),
            );
          }
        })
        .catch(() => {
          dispatch({
            type: 'SET_ERROR',
            error: 'Connection error to server occurred',
          });
        })
        .finally(() => {
          stopLoading();
        });
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'SET_FIELD',
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    setSelectedRole(event.target.value as string);
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        minHeight="100vh"
        paddingTop={4}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Signup
        </Typography>
        <div>
          <TextField
            label="Username"
            name="username"
            value={state.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={state.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handlePasswordVisibilityToggle}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            value={state.confirmPassword}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handlePasswordVisibilityToggle}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-select-label">Role</InputLabel>
            <Select
              labelId="role-select-label"
              id="role-select"
              value={selectedRole}
              onChange={handleRoleChange}
            >
              {roleLov.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Address"
            name="address"
            value={state.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Phone"
            name="phone"
            value={state.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="tel"
            inputProps={{
              pattern: '.{10,10}',
              maxLength: 10,
            }}
          />

          {state.error && (
            <Typography color="error" variant="body1">
              {state.error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleSubmit}
          >
            Signup
          </Button>
        </div>
      </Box>
    </Container>
  );
};

export default Signup;