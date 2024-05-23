import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { auth } from '../../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const UserCreator = ({ user, onSave }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setRole(user.role);
      setPassword(''); // Do not show the password
    } else {
      setEmail('');
      setPassword('');
      setRole('user');
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const newUser = {
          email,
          role,
          uid: userCredential.user.uid,
        };
        onSave(newUser);
      } catch (error) {
        console.error('Error creating user:', error);
      }
    } else {
      const updatedUser = {
        ...user,
        email,
        role,
      };
      onSave(updatedUser);
    }
  };

  return (
    <Box>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      {!user && (
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
      )}
      <FormControl fullWidth margin="normal">
        <InputLabel>Role</InputLabel>
        <Select value={role} onChange={(e) => setRole(e.target.value)}>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="manager">Manager</MenuItem>
          <MenuItem value="user">User</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
        Save User
      </Button>
    </Box>
  );
};

export default UserCreator;
