import React from 'react';
import { Box } from '@mui/material';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import PortfolioSection from './PortfolioSection';
import ExperienceSection from './ExperienceSection';
import ContactSection from '../Common/ContactSection';

const Portfolio = () => {
  return (
    <Box>
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      {/* <SkillsSection />
      <ExperienceSection /> */}
      <ContactSection />
    </Box>
  );
};

export default Portfolio;
