import React from 'react';
import { Box, Typography } from '@mui/material';
import Fade from 'react-reveal/Fade';

const AboutSection = () => {
  return (
    <Box sx={{ py: 8, px: 4, textAlign: 'center' }}>
      <Fade bottom>
        <Typography variant="h4" gutterBottom>About Me</Typography>
        <Typography variant="body1" sx={{ maxWidth: '750px', margin: 'auto' }}>
          Skilled IT professional with a strong background in fullstack development, blockchain, and creative design. 
          An expert in project management and team leadership, with a knack for innovation and solving complex problems. 
          Combining technical skills and creative thinking to drive project success and team growth.
        </Typography>
      </Fade>
    </Box>
  );
};

export default AboutSection;
