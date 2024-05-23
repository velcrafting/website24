import React from 'react';
import { Box } from '@mui/material';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import ExperienceSection from './ExperienceSection';
import ContactSection from '../Common/ContactSection';

const About = () => {
  return (
    <Box>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </Box>
  );
};

export default About;
