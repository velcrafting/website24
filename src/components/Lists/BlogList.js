import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const BlogList = ({ blogs, onEdit, onDelete }) => {
  return (
    <Box>
      <Typography variant="h6">Blogs</Typography>
      {blogs.map(blog => (
        <Box key={blog.id} sx={{ mb: 2 }}>
          <Typography variant="h6">{blog.title}</Typography>
          <Button variant="outlined" color="primary" onClick={() => onEdit(blog)}>Edit</Button>
          <Button variant="outlined" color="secondary" onClick={() => onDelete(blog.id)}>Delete</Button>
        </Box>
      ))}
    </Box>
  );
};

export default BlogList;
