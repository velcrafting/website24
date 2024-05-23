import React, { useState } from 'react';
import { Box, Button, Typography, Grid, Card, CardContent, CardMedia, Modal, Fade as MuiFade, Backdrop } from '@mui/material';
import Fade from 'react-reveal/Fade';

const projects = [
  {
    title: 'Stubbs The Zombie',
    description: 'World Record Holder: 4 Categories & Community Leader',
    more: 'As a kid, I loved playing this game, and in May of 2019, I found myself humming the theme song "Mr. Sandman" by Oranger. My search for a way to play the game on a modern PC led me to the speedrunning community. At that time, the World Record was 1 hour, 00 minutes, and 29 seconds.\n\nOn June 2nd, 2019, I earned my first World Record with a time of 1 hour, 00 minutes, and 11 seconds. Over the years, Stubbs was re-released, allowing me to collaborate with Aspyr Studios to improve the game\'s quality of life and share gameplay tips on their social media.\n\nCurrently, I, Velcrafting, hold the World Record with a time of 40 minutes and 40 seconds—a significant 19 minute and 25 second reduction, which is about a 25% decrease in the time needed to beat the game. Our community has grown to include 10 speedrunners and over 180 Discord members.',
    image: '/gaming/stubbs.png',
  },
  {
    title: 'HotLine Miami',
    description: 'Blind Run - 1 Month Challenge',
    more: 'I was seeking a uniquely different challenge, with a competitive friend (LaughingManES on Twitch). We chose this game due to the sheer difficulty of the game itself, and that we thought the current world record looked beatable. Little did we understand quite how difficult this game is, and soon were quickly humbled. This was a 1-month challenge to see how quickly we could push our times down from a blind-run (no experience or route) to finish of the month. Ultimately, my personal time was dropped from 4 hours to 36 minutes 24 seconds. A drastic personal improvement, but nowhere near toppling the World Record. Previously never playing the game, or a game similar to now finding joy in playing this title at a breakneck speed.',
    image: '/gaming/hlm.png',
  },
  {
    title: 'Rocket Racing',
    description: 'Skill Peak: Season 0 Multiple Top 1,000 Ranked Accounts',
    more: 'A brand new game mode released within the popular game Fortnite, Rocket Racing brought an immediate new style of challenge with an impressive player base of roughly 40,000 players. A proving ground to test mass adoption, and rapid improvement of self in a competitive environment. Within the 3 months of game opening, I had and maintained top 10 race times on multiple tracks, contributed to social media Reddit community, helped community members learn how to do harder technical execution maneuvers with ease as well as teaching optimal racetrack routes. My personal fastest account was unranked to top 1000 players in 14 hours game time.',
    image: '/gaming/rr.png',
  },
];

const ProjectsSection = () => {
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpen = (project) => {
    setSelectedProject(project);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProject(null);
  };

  return (
    <Box sx={{ py: 8, px: 4, backgroundColor: '#f3e5f5', textAlign: 'center' }}>
      <Fade bottom>
        <Typography variant="h4" gutterBottom>Recent Challenges</Typography>
        <Grid container spacing={2} justifyContent="center">
          {projects.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between', 
                  maxWidth: 450, 
                  mx: 'auto', 
                  cursor: 'pointer' 
                }}
                onClick={() => handleOpen(project)}
              >
                <CardMedia
                  component="img"
                  image={project.image}
                  alt={project.title}
                  style={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
                  <Typography variant="h6" component="h5" gutterBottom>{project.title}</Typography>
                  <Typography variant="body2" sx={{ textAlign: 'center', minHeight: '48px', display: 'flex', alignItems: 'center' }}>
                    {project.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
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
            {selectedProject && (
              <>
                <CardMedia
                  component="img"
                  height="400"
                  image={selectedProject.image}
                  alt={selectedProject.title}
                  style={{ objectFit: 'scale-down', marginTop: '20px' }}
                />
                <Box sx={{ p: 4 }}>
                  <Typography variant="h4" gutterBottom>{selectedProject.title}</Typography>
                  <Typography variant="body1" gutterBottom>{selectedProject.description}</Typography>
                  <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>{selectedProject.more}</Typography>
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

export default ProjectsSection;
