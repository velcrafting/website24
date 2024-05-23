import React from 'react';
import { Box, Typography, Grid, Avatar } from '@mui/material';
import Fade from 'react-reveal/Fade';
import * as icons from '../Common/Emotes';

const skills = [
  { name: 'JavaScript', icon: <icons.CodeIcon />, color: '#E5C700' },
  { name: 'React', icon: <icons.SettingsEthernetIcon />, color: '#21A1C4' },
  { name: 'Java', icon: <icons.EmojiObjectsIcon />, color: '#005F6A' },
  { name: 'HTML', icon: <icons.HtmlIcon />, color: '#D35D29' },
  { name: 'CSS', icon: <icons.CssIcon />, color: '#104F7C' },
  { name: 'Python', icon: <icons.DeveloperModeIcon />, color: '#2A73A5' },
  { name: 'AWS Suite', icon: <icons.CloudQueueIcon />, color: '#D9822B' },
  { name: 'NVIDIA AI Workbench', icon: <icons.VideogameAssetIcon />, color: '#4A8C24' },
  { name: 'OpenAI API', icon: <icons.SmartToyIcon />, color: '#303030' },
  { name: 'Canva', icon: <icons.BrushIcon />, color: '#00A0A3' },
  { name: 'Figma', icon: <icons.DesignServicesIcon />, color: '#C1431E' },
  { name: 'Google & Office Suite', icon: <icons.AppsIcon />, color: '#356AC3' },
];

const SkillsSection = () => {
  return (
    <Box sx={{ py: 4, backgroundColor: '#f3e5f5', textAlign: 'center' }}>
      <Fade bottom>
        <Typography variant="h4" gutterBottom>Skills</Typography>
        <Grid container spacing={4} justifyContent="center">
          {skills.map((skill, index) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  '&:hover .skill-icon': {
                    transform: 'scale(1.1)',
                    boxShadow: `0px 4px 15px ${skill.color}`,
                  },
                }}
              >
                <Avatar 
                  className="skill-icon"
                  sx={{ 
                    bgcolor: skill.color, 
                    width: 60, 
                    height: 60, 
                    mb: 1, 
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    border: `2px solid ${skill.color}`,
                    boxShadow: `0px 2px 10px rgba(0, 0, 0, 0.1)`,
                  }}
                >
                  {skill.icon}
                </Avatar>
                <Typography variant="body1" sx={{ textAlign: 'center' }}>{skill.name}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Fade>
    </Box>
  );
};

export default SkillsSection;
