import React, { useState } from 'react';
import { Box, Button, Typography, Grid, Card, CardContent, CardMedia, Modal, Fade as MuiFade, Backdrop } from '@mui/material';
import Fade from 'react-reveal/Fade';

const projects = [
  {
    title: 'Crimson Odyssey',
    description: 'Co-wrote, developed, and designed a manga series, achieving a top rating on Amazon.',
    more: 'At the heart of our unique endeavor, Crimson Odyssey, lies the innovative spirit of collaboration between human creativity & artificial intelligence. This Project is a collaboration between @KenMalibuArt, @velcrafting, and Aria, our Customized ChatGPT agent, epitomizing a groundbreaking approach in ai-storytelling. Mangak-Ai represents our core ethos: to embrace the synergy between the boundless imagination of AI and our human expertise in crafting narratives, development, and problem solving. Our goal transcends traditional methods, weaving a tapestry of deep world-building lore that sets the stage for an episodic manga series across various mediums. As executive producers and creative leads, we lack conventional manga wisdom, yet our appreciation and study of this artistic form have fueled our ambition to present a unique, blended take on this widely beloved medium. This project is a testament to our respect for the art of manga and storytelling, striving to captivate and express through an innovative lens.',
    image: '/projects/clogo.png',
  },
  {
    title: 'RagTags',
    description: 'Retrieval Augmented Generation: Ticketing Agents',
    more: 'RagTag is an AI-driven ticketing agent that enhances service business ticketing systems by automating updates through conversational interactions. It utilizes advanced AI to provide relevant troubleshooting documentation, logs user actions, and summarizes these actions to update ticket statuses and alert relevant parties as needed. RagTag allows users to engage with the system through natural language, removing the need for manual ticket updates and ensuring that all necessary information is captured accurately and efficiently. It is designed for scalability and customization, providing a user-friendly interface and robust data handling capabilities, while continuously evolving with new features and improvements.',
    image: '/projects/RagTags.png',
  },
  {
    title: 'Velcrafting.com',
    description: 'Advanced Resume, Content Management Site, and Portfolio',
    more: 'Leveraging nextJS, Material UI, Firebase, and more to build a comprehensive website platform that acts as a display of work history for visitors. Soon, registration will be available and interested visitors can sign up for my newsletter and have access to a suite of custom made tools including: A Kanban (think like trello), Calendar, Taskmanager, Dynamic Forms/Surveys, Calendly-Type Scheudler. As well as some for fun tools including: Master Queue (aggregator of streaming services), & a Tool Requestor for suggestions on what others may want to made.',
    image: '/logo.png',
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
        <Typography variant="h4" gutterBottom>Current Projects</Typography>
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
                  style={{ objectFit: 'scale-down', marginTop: '20px' }} // Add margin-top
                />

                <Box sx={{ p: 4 }}>
                  <Typography variant="h4" gutterBottom>{selectedProject.title}</Typography>
                  <Typography variant="body1" gutterBottom>{selectedProject.description}</Typography>
                  <Typography variant="body2">{selectedProject.more}</Typography>
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
