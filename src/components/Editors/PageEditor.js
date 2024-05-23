import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const PageEditor = ({ page, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (page) {
      setTitle(page.title);
      setContent(page.content);
      setUrl(page.url);
      setTags(page.tags);
    } else {
      setTitle('');
      setContent('');
      setUrl('');
      setTags('');
    }
  }, [page]);

  const handleSave = () => {
    onSave({ id: page?.id, title, content, url, tags });
  };

  return (
    <Box>
      <TextField
        label="Page Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Typography variant="h6" gutterBottom>
        Content
      </Typography>
      <ReactQuill value={content} onChange={setContent} />
      <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
        Save Page
      </Button>
    </Box>
  );
};

export default PageEditor;
