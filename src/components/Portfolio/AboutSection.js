import React from 'react';
import { Box, Typography } from '@mui/material';
import Fade from 'react-reveal/Fade';

const AboutSection = () => {
  return (
    <Box sx={{ py: 8, px: 4, textAlign: 'center' }}>
      <Fade bottom>
        <Typography variant="h4" gutterBottom>About Me</Typography>
        <Typography variant="body1" sx={{ maxWidth: '750px', margin: 'auto' }}>
        Welcome to my world of art and design! Since 2015, I've been honing my skills in graphic design, video editing, and public-facing graphics, starting with my earliest physical artworks and YouTube thumbnails. My journey began with the tactile art of Velcro (Hook and Loop) making statues, figures, and intricate 2.5D shadowbox frames—each piece a unique creation that sparked my passion, and gave me the artist handle "Velcrafting".
        As I dove into live streaming and content creation, I crafted custom overlays, emotes, and thumbnails to enhance my channels. This experience led me to freelance work, creating art and design for fellow streamers and content creators. My portfolio expanded as I took on business clients, delivering designs for websites and physical handouts that reached thousands.
        Minimalism and expressive creativity define my style, often infused with a touch of pastel colors. Explore my portfolio below to see a diverse array of projects and deliverables. Interested in collaborating? Send me a message, and let's create something amazing together!
        </Typography>
      </Fade>
    </Box>
  );
};

export default AboutSection;
