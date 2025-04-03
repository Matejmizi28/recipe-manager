import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import AddIcon from '@mui/icons-material/Add';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <RestaurantMenuIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Recipe Manager
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            startIcon={<LocalDiningIcon />}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/recipes"
            startIcon={<RestaurantMenuIcon />}
          >
            Recipes
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/add-recipe"
            startIcon={<AddIcon />}
          >
            Add Recipe
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/calorie-tracker"
            startIcon={<MonitorWeightIcon />}
          >
            Calorie Tracker
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 