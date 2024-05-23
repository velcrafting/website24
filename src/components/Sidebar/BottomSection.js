import React from 'react';
import { Box, Button } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';
import SignOutButton from '../Common/SignOutButton'; // Adjust path as necessary

const BottomSection = () => {
  const { currentUser } = useAuth();
  const router = useRouter();

  return (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      {currentUser ? (
        <>
          <Button variant="contained" color="primary" onClick={() => router.push('/users/settings')} fullWidth sx={{ mb: 1 }}>
            Settings
          </Button>
          <SignOutButton />
        </>
      ) : (
        <>
          <Button variant="contained" color="primary" onClick={() => router.push('/auth/signin')} fullWidth sx={{ mb: 1 }}>
            Login
          </Button>
          {/* <Button variant="contained" color="secondary" onClick={() => router.push('/auth/signup')} fullWidth>
            Register
          </Button> */}
        </>
      )}
    </Box>
  );
};

export default BottomSection;