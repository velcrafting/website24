import React from 'react';
import { Box, Typography } from '@mui/material';
import Fade from 'react-reveal/Fade';

const AboutSection = () => {
  return (
    <Box sx={{ py: 8, px: 4, textAlign: 'center' }}>
      <Fade bottom>
        <Typography variant="h4" gutterBottom>About Me</Typography>
        <Typography variant="body1" sx={{ maxWidth: '750px', margin: 'auto' }}>
        Driven optimizer who takes on new challenges headfirst. Leading to global ranking among various highly competitive games. 
        Vel has been streaming and creating gaming content since 2018. With a focus on speed running and challenge mode gaming, Vel consistently embarks on new difficult journeys.
        </Typography>
      </Fade>
    </Box>
  );
};

export default AboutSection;
