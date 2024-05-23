import React from 'react';
import { Box, Typography } from '@mui/material';
import { Parallax } from 'react-parallax';

const HeroSection = () => {
  return (
    <Parallax bgImage="/projects/04.png" strength={500}>
      <Box sx={{ height: '75vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', textAlign: 'center' }}>
        <Typography variant="h2" component="h1">Steven Pajewski</Typography>
        <br></br>
        <Typography variant="h" component="h5">Digital Artist | Physical Crafts | Graphic Design </Typography>
        <br></br>
        <Typography variant="h" component="h3">Imagineering New Concepts</Typography>
      </Box>
    </Parallax>
  );
};

export default HeroSection;
