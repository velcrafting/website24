import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

const Settings = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" gutterBottom>
          This is the about page. You can update this section with more information about your project or organization.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Settings;
