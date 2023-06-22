import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
  
} from '@mui/material';
import { ColorModeContext, tokens } from "../theme.js";
const AddDepotForm = () => {
  const [depotData, setDepotData] = useState({
    id: '',
    name: '',
    picture: '',
    longitude: '',
    latitude: '',
    capacity: '',
    logo: '',
    worktime: '',
    certificate: ''
  });
  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme();
  
  const colors = tokens(theme.palette.mode);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepotData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make API request to post the depot data
    try {
      const response = await fetch('/api/depots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(depotData)
      });

      if (response.ok) {
        setOpenDialog(true);
        // Reset form data
        setDepotData({
          id: '',
          name: '',
          picture: '',
          longitude: '',
          latitude: '',
          capacity: '',
          logo: '',
          worktime: '',
          certificate: ''
        });
      } else {
        throw new Error('Failed to post depot');
      }
    } catch (error) {
      console.error(error);
      // Handle error case
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" style={{ marginTop: 100 }}>
      <Typography variant="h6" >Add Depot</Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center"
        style={{ marginTop: 150 }}>
          <TextField
            label="ID"
            name="id"
            value={depotData.id}
            onChange={handleChange}
            required
          />

          <TextField
            label="Name"
            name="name"
            value={depotData.name}
            onChange={handleChange}
            required
          />

          <TextField
            label="Picture"
            name="picture"
            value={depotData.picture}
            onChange={handleChange}
          />

          <TextField
            label="Longitude"
            name="longitude"
            value={depotData.longitude}
            onChange={handleChange}
            required
          />

          <TextField
            label="Latitude"
            name="latitude"
            value={depotData.latitude}
            onChange={handleChange}
            required
          />

          <TextField
            label="Capacity"
            name="capacity"
            value={depotData.capacity}
            onChange={handleChange}
            required
          />

          <TextField
            label="Logo"
            name="logo"
            value={depotData.logo}
            onChange={handleChange}
          />

          <TextField
            label="Work Time"
            name="worktime"
            value={depotData.worktime}
            onChange={handleChange}
          />

          <TextField
            label="Certificate"
            name="certificate"
            value={depotData.certificate}
            onChange={handleChange}
          />
        </Box>

        <Button type="submit" variant="contained" backgroundColor={colors.primary[400]} style={{ marginTop: 56,left:600 }}>
          Add Depot
        </Button>
      </form>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Depot Added</DialogTitle>
        <DialogContent>
          <Typography>Depot has been successfully added.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddDepotForm;
