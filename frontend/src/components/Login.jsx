import React from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here

    // Assuming login is successful
    navigate('/'); // Navigate to the Dashboard component
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Username" variant="outlined" fullWidth />
      <TextField label="Password" variant="outlined" type="password" fullWidth />
      <Button variant="contained" type="submit" color="primary" fullWidth>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
