import React, { useState } from 'react';
import { auth, signInWithPopup, googleProvider, twitterProvider, signInWithEmailAndPassword } from '../../../firebase';
import { TextField, Button, Box, Typography, Modal, CircularProgress, Alert } from '@mui/material';
import { useAuth } from '../../hooks/useAuth'; // Correct import

const SignInForm = () => {
  const { setCurrentUser } = useAuth(); // Use hook from hooks folder
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { email, password } = formData;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCredential.user);
      console.log('User signed in');
      window.location.href = '/';  // Redirect to home or dashboard
    } catch (error) {
      setError(error.message);
      console.error('Error signing in:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider) => {
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithPopup(auth, provider);
      setCurrentUser(userCredential.user);
      console.log('User signed in with social');
      window.location.href = '/';  // Redirect to home or dashboard
    } catch (error) {
      setError(error.message);
      console.error('Error signing in with social:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSignIn} sx={{ mt: 3 }}>
      <Typography variant="h6">Sign In</Typography>
      <TextField
        label="Email"
        name="email"
        type="email"
        fullWidth
        margin="normal"
        onChange={handleChange}
        autoComplete="email"
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        fullWidth
        margin="normal"
        onChange={handleChange}
        autoComplete="current-password"
      />
      {error && <Alert severity="error">{error}</Alert>}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        disabled={loading}
      >
        Sign In
      </Button>
      <Button
        onClick={() => handleSocialSignIn(googleProvider)}
        variant="contained"
        color="secondary"
        fullWidth
        sx={{ mt: 2 }}
        disabled={loading}
      >
        Sign In with Google
      </Button>
      <Button
        onClick={() => handleSocialSignIn(twitterProvider)}
        variant="contained"
        color="secondary"
        fullWidth
        sx={{ mt: 2 }}
        disabled={loading}
      >
        Sign In with Twitter
      </Button>

      <Modal open={loading}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      </Modal>
    </Box>
  );
};

export default SignInForm;
