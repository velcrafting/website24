import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { auth, db, createUserWithEmailAndPassword, signInWithPopup, googleProvider, twitterProvider, setDoc, doc } from '../../../firebase';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useAuth } from '../../hooks/useAuth'; // Correct import

const SignUpForm = () => {
  const { setCurrentUser } = useAuth(); // Use hook from hooks folder
  const [formData, setFormData] = useState({ email: '', password: '', name: '', username: '' });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { email, password, name, username } = formData;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        username,
        role: 'user',
      });

      setCurrentUser(user); // Set current user
      console.log('User signed up:', user);
      router.push('/'); // Redirect to home screen after sign up
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const handleSocialSignUp = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName,
        email: user.email,
        username: user.displayName.split(' ').join('').toLowerCase(),
        role: 'user',
      });

      setCurrentUser(user); // Set current user
      console.log('User signed up with social:', user);
      router.push('/'); // Redirect to home screen after social sign up
    } catch (error) {
      console.error('Error signing up with social:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSignUp} sx={{ mt: 3 }}>
      <Typography variant="h6">Sign Up</Typography>
      <TextField label="Name" name="name" fullWidth margin="normal" onChange={handleChange} autoComplete="name" />
      <TextField label="Username" name="username" fullWidth margin="normal" onChange={handleChange} autoComplete="username" />
      <TextField label="Email" name="email" type="email" fullWidth margin="normal" onChange={handleChange} autoComplete="email" />
      <TextField label="Password" name="password" type="password" fullWidth margin="normal" onChange={handleChange} autoComplete="new-password" />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Sign Up</Button>
      <Button onClick={() => handleSocialSignUp(googleProvider)} variant="contained" color="secondary" fullWidth sx={{ mt: 2 }}>Sign Up with Google</Button>
      <Button onClick={() => handleSocialSignUp(twitterProvider)} variant="contained" color="secondary" fullWidth sx={{ mt: 2 }}>Sign Up with Twitter</Button>
    </Box>
  );
};

export default SignUpForm;
