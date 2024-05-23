import React from 'react';
import { TextField } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownEditor = ({ value, onChange }) => {
  return (
    <div>
      <TextField
        label="Content"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        multiline
        rows={10}
        fullWidth
        margin="normal"
      />
      <div>
        <h4>Preview:</h4>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownEditor;