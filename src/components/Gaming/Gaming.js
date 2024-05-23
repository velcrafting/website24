import React from 'react';
import { Box } from '@mui/material';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import StreamingSection from './StreamingSection';
import ProjectsSection from './ProjectsSection';
import ExperienceSection from './ExperienceSection';
import ContactSection from '../Common/ContactSection';

const Gaming = () => {
  return (
    <Box>
      <HeroSection />
      <AboutSection />
      {/* <StreamingSection /> */}
      <ProjectsSection />
      {/* <ExperienceSection /> */}
      <ContactSection />
    </Box>
  );
};

export default Gaming;
