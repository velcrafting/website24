import React from 'react';
import { Box, Typography } from '@mui/material';
import { Parallax } from 'react-parallax';

const HeroSection = () => {
  return (
    <Parallax bgImage="/projects/08.png" strength={500}>
      <Box sx={{ height: '75vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', textAlign: 'center' }}>
        <Typography variant="h2" component="h1">Velcrafting</Typography>
        <br></br>
        <Typography variant="h" component="h5">Competitive Gamer | Horror Enthusiast | League Enjoyer  </Typography>
        <br></br>
        <Typography variant="h" component="h3">Will Take Your Challenges Head On</Typography>
      </Box>
    </Parallax>
  );
};

export default HeroSection;
