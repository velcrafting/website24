import React from 'react';
import { Button } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';

const SignOutButton = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleLogout} fullWidth>
      Sign Out
    </Button>
  );
};

export default SignOutButton;
