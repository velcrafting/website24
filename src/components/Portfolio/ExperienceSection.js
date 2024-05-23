import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  CardMedia,
  Modal,
  Fade as MuiFade,
  Backdrop,
  Button,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Fade from 'react-reveal/Fade';

const experiences = [
  {
    role: 'Consultant, Developer, and Project Lead',
    company: 'Self-Employed',
    duration: 'April 2021 - Present',
    responsibilities: [
      'Full-Stack Development & Blockchain Integration: Engineered and deployed engaging mini-games and digital platforms, incorporating blockchain technology for enhanced user interaction. Spearheaded the creation of sustainablegaming systems, including tokenomics & smart contract integration, ensuring a balanced and engaging user experience.',
      'AI and Software Innovation: Developed and implemented AI-driven tools and solutions to optimize project workflows and enhance efficiency across financial and operational systems.',
      'Community Building and Engagement: Co-founded Community First, leading the design and implementation of engaging mini-games, spearheading digital event coordination, and formulating strategic social media plans to enhance community engagement.',
      'Strategic Project Assistance: Provided ownership transition assistance for Chum Chums, including creative ideation for blockchain-integrated digital events, compelling pitch deck design, and strategic financial planning.',
      'Creative Content and Game Design: Authored and designed immersive storylines and world-building content for Titanforge and 1Kin Labs, including developing game systems, tokenomics, and comprehensive whitepapers for blockchain-based games',
      'Leadership in Innovation: Demonstrated leadership in innovative game design and community engagement strategies, including managing Discord channels, public speaking, and facilitating inter-team communications for efficient project delivery in a cutting edge technology environment.',
    ],
    image: '/experience/01.png'
  },
  {
    role: 'Designer, Developer & Researcher',
    company: 'Nutel Solutions',
    duration: 'August 2023 - March 2024',
    responsibilities: [
      'Identify areas of opportunity to improve and otherwise optimize workflow.',
      'Research and implemented Figma into the team fullstack workflow.',
      'Developed a prototype internal AI tutor-agent for the financial team.',
      'Wrote process documentation for complex internal system workflow',
      'Enhanced sales team workflow by designing Figma-based informational materials.',
    ],
    image: '/experience/nutel.png'
  },
  {
    role: 'IT Director',
    company: 'Mike Maroone Automotive',
    duration: 'June 2018 - April 2021',
    responsibilities: [
      'Spearheaded company digital transformation, seamlessly consolidating five satellite locations into a unified cloudbased network & VOIP telephony system.',
      'Enhanced user satisfaction and efficiency through strategic system upgrades and bolstering support service speed and stability',
      'Collaborated with a local tech company for remote support while supervising on-site integrations and installations.',
      'Managed comprehensive IT operations, including astute budgeting, diligent maintenance, efficient help desk management, and nurturing vendor relationships.',
    ],
    image: '/experience/maroone.png'
  },
  {
    role: 'Infrastructure & Implementation Engineer II',
    company: 'Comcast',
    duration: 'September 2017 - April 2018',
    responsibilities: [
      'Delivered rapid troubleshooting and proactive ticket engagement.',
      'Developed comprehensive procedures & metrics for new automated tracking system build and design.',
      'Coordinated effectively with the team leader for strategic project plan phase deployment.',
      'Accountable for the physical build & innovative design of automated test system server racks.',
      'Efficiently fabricated, routed, and deployed coax/cat6/fiber connections.',
    ],
    image: '/experience/comcast.png'
  },
  {
    role: 'Datacenter Infrastructure & Implementation Engineer',
    company: 'J.P Morgan Chase',
    duration: 'September 2015 - September 2017',
    responsibilities: [
      'Managed the coordination, planning, & execution of data center projects.',
      'Organized destruction events for decommissioned data center equipment, leading core delivery logistics functions for data center operations.',
      'Oversaw the identification of operation plans, service-level agreements (SLAs), operational-level agreements (OLAs), & support models for platforms.',
      'Received & cataloged all incoming data center assets and supporting equipment; analyzed, developed, & modified various project documents as necessary.',
    ],
    image: '/experience/jpmc.png'
  },
];

const ExperienceSection = () => {
  const [open, setOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const handleOpen = (experience) => {
    setSelectedExperience(experience);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedExperience(null);
  };

  const truncateText = (text, length = 100) => {
    if (text.length > length) {
      return text.substring(0, length) + '...';
    }
    return text;
  };

  return (
    <Box sx={{ py: 8, backgroundColor: '#e0f7fa', textAlign: 'center' }}>
      <Fade bottom>
        <Typography variant="h4" gutterBottom>Experience</Typography>
        <Timeline position="alternate">
          {experiences.map((experience, index) => (
            <TimelineItem key={index} onClick={() => handleOpen(experience)} sx={{ cursor: 'pointer' }}>
              <TimelineOppositeContent sx={{ m: 'auto 0' }}>
                <Typography variant="body2" color="textSecondary">
                  {experience.duration}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end' }}>
                    {index % 2 === 0 && (
                      <CardMedia
                        component="img"
                        image={experience.image}
                        alt={experience.company || 'Company'}
                        sx={{ width: 80, height: 80, borderRadius: '50%', mr: 2 }}
                      />
                    )}
                    <Box sx={{ textAlign: index % 2 === 0 ? 'left' : 'right' }}>
                      <Typography variant="h6">{experience.role}</Typography>
                      <Typography variant="subtitle1" color="textSecondary">{experience.company}</Typography>
                    </Box>
                    {index % 2 !== 0 && (
                      <CardMedia
                        component="img"
                        image={experience.image}
                        alt={experience.company || 'Company'}
                        sx={{ width: 80, height: 80, borderRadius: '50%', ml: 2 }}
                      />
                    )}
                  </Box>
                  <List dense sx={{ mt: 2, textAlign: index % 2 === 0 ? 'right' : 'left' }}>
                    {experience.responsibilities.slice(0, 3).map((responsibility, idx) => (
                      <ListItem key={idx} sx={{ padding: '0 0 8px 0' }}>
                        <ListItemText primary={truncateText(responsibility, 175)} />
                      </ListItem>
                    ))}
                    {experience.responsibilities.length > 3 && (
                      <Typography
                        variant="body2"
                        color="primary"
                        sx={{ fontStyle: 'italic', textAlign: 'center', mt: 1 }}
                      >
                        Click to learn more about my {experience.company} experience 
                      </Typography>
                    )}
                  </List>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Fade>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <MuiFade in={open}>
          <Box sx={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            width: '80%', 
            maxWidth: '800px', 
            bgcolor: 'background.paper', 
            boxShadow: 24, 
            p: 0, 
            borderRadius: 2, 
            overflow: 'hidden' 
          }}>
            {selectedExperience && (
              <>
                <CardMedia
                  component="img"
                  height="300"
                  image={selectedExperience.image}
                  alt={selectedExperience.role}
                  style={{ objectFit: 'cover' }}
                />
                <Box sx={{ p: 4 }}>
                  <Typography variant="h4" gutterBottom>{selectedExperience.role}</Typography>
                  <Typography variant="subtitle1" gutterBottom>{selectedExperience.company}</Typography>
                  <ul>
                    {selectedExperience.responsibilities.map((responsibility, idx) => (
                      <li key={idx}><Typography variant="body2">{responsibility}</Typography></li>
                    ))}
                  </ul>
                  <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleClose}>
                      Close
                    </Button>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </MuiFade>
      </Modal>
    </Box>
  );
};

export default ExperienceSection;
