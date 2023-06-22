import { TextField, Button, Box, Typography, useTheme, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import React, { useState } from "react";
import axios from 'axios';

const CodeInsertComponent = () => {
  const theme = useTheme();
  const [code, setCode] = useState('');
  const [points, setPoints] = useState('');
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handlePointsChange = (event) => {
    setPoints(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:5000/codes/AddCode', { code, points });
      setCode('');
      setPoints('');
      setSuccessDialogOpen(true);
    } catch (error) {
      console.error('Error adding code:', error);
      setSuccessDialogOpen(true);
    }
  };

  const handleSuccessDialogClose = () => {
    setSuccessDialogOpen(false);
  };

  const handleErrorDialogClose = () => {
    setErrorDialogOpen(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box width="700px">
        <Typography variant="h5">Insert Code</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Code"
            fullWidth
            value={code}
            onChange={handleCodeChange}
            required
          />
          <TextField
            label="Points"
            fullWidth
            value={points}
            onChange={handlePointsChange}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Insert code
          </Button>
        </form>
      </Box>

      <Dialog open={successDialogOpen} onClose={handleSuccessDialogClose}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Code added successfully.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSuccessDialogClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={errorDialogOpen} onClose={handleErrorDialogClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Failed to add code. Please try again.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleErrorDialogClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CodeInsertComponent;
