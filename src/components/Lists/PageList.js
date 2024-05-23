import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const PageList = ({ pages, onEdit, onDelete }) => {
  return (
    <Box>
      <Typography variant="h6">Pages</Typography>
      {pages.map((page) => (
        <Box key={page.id} sx={{ mb: 2 }}>
          <Typography variant="h6">{page.title}</Typography>
          <Button variant="outlined" color="primary" onClick={() => onEdit(page)}>
            Edit
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => onDelete(page.id)}>
            Delete
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default PageList;
