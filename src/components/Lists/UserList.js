import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const UserList = ({ users, onEdit, onDelete, onResetPassword }) => {
  return (
    <Box>
      <Typography variant="h6">Users</Typography>
      {users.map((user) => (
        <Box key={user.id} sx={{ mb: 2 }}>
          <Typography variant="h6">{user.email}</Typography>
          <Typography variant="body1">Role: {user.role}</Typography>
          <Button variant="outlined" color="primary" onClick={() => onEdit(user)}>
            Edit
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => onDelete(user.id)}>
            Delete
          </Button>
          <Button variant="outlined" color="default" onClick={() => onResetPassword(user.email)}>
            Reset Password
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default UserList;
