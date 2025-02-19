import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';

const Topbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Synthetic Data Generator
          </Typography>
          <Avatar alt='admin'></Avatar>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Topbar;