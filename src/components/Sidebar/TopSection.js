import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext'; // Adjust path as necessary

const TopSection = () => {
  const { currentUser } = useAuth();

  return (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      {currentUser ? (
        <>
          <Avatar src={currentUser.photoURL} alt={currentUser.displayName} sx={{ width: 56, height: 56, margin: 'auto' }} />
          <Typography variant="h6" sx={{ mt: 1 }}>
            {currentUser.displayName}
          </Typography>
          <Typography variant="body2">{currentUser.email}</Typography>
        </>
      ) : (
        <>
          <Avatar src="/logo.png" alt="Logo" sx={{ width: 112, height: 112, margin: 'auto' }} />
          <Typography variant="h5" sx={{ mt: 1 }}>
            Steven Pajewski
          </Typography>
          {/* <Typography variant="body">Ai Imagineer</Typography> */}
        </>
      )}
    </Box>
  );
};

export default TopSection;
