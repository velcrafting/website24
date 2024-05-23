import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const FormList = ({ forms, onEdit, onDelete }) => {
  return (
    <Box>
      <Typography variant="h6">Forms</Typography>
      {forms.map((form) => (
        <Box key={form.id} sx={{ mb: 2 }}>
          <Typography variant="h6">{form.title}</Typography>
          <Button variant="outlined" color="primary" onClick={() => onEdit(form)}>
            Edit
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => onDelete(form.id)}>
            Delete
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default FormList;
