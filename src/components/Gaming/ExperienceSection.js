import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Modal,
  Fade as MuiFade,
  Backdrop,
  Button
} from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import Fade from 'react-reveal/Fade';

const events = [
  {
    title: 'Stubbs the Zombie in Rebel Without a Pulse is re-released',
    date: '2021-03-16',
    location: 'United States',
    details: '',
    icon: <StarIcon />
  },
  {
    title: 'velcrafting completed the first PC Any% Run!',
    date: '2021-03-16',
    details: 'The first time recorded was 48m 41s.',
    location: 'United States',
    icon: <SportsEsportsIcon />
  },
  {
    title: 'TSalanski set a new record time of 46m 13s!',
    date: '2021-03-16',
    details: 'Record time improved by 2m 28s.',
    location: 'United States',
    icon: <AccessTimeIcon />
  },
  {
    title: 'velcrafting set a new record time of 43m 24s!',
    date: '2021-03-18',
    details: 'Record time improved by 2m 49s.',
    location: 'United States',
    icon: <AccessTimeIcon />
  },
  {
    title: 'velcrafting improved their time to 41m 41s!',
    date: '2021-03-20',
    location: 'Valhalla',
    details: '',
    icon: <AccessTimeIcon />
  },
  {
    title: 'Blvmx set a new record time of 41m 35s!',
    date: '2022-07-29',
    details: 'Record time improved by 0m 06s.',
    location: 'United States',
    icon: <AccessTimeIcon />
  },
  {
    title: 'velcrafting set a new record time of 41m 21s!',
    date: '2022-08-06',
    details: 'Record time improved by 0m 14s.',
    location: 'Valhalla',
    icon: <AccessTimeIcon />
  },
  {
    title: 'Blvmx set a new record time of 41m 10s!',
    date: '2022-08-14',
    details: 'Record time improved by 0m 11s.',
    location: 'Valhalla',
    icon: <AccessTimeIcon />
  },
  {
    title: 'Blvmx improved their time to 41m 05s!',
    date: '2022-08-14',
    location: 'United States',
    details: '',
    icon: <AccessTimeIcon />
  },
  {
    title: 'velcrafting set a new record time of 40m 40s!',
    date: '2023-06-24',
    details: 'Record time improved by 0m 25s.',
    location: '',
    icon: <AccessTimeIcon />
  },
  {
    title: 'Waiting for the next world record...',
    date: '',
    location: '',
    details: '',
    icon: <SportsEsportsIcon />
  },
];

const TimelineSection = () => {
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleOpen = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  return (
    <Box sx={{ py: 8, backgroundColor: '#f0f4f8', textAlign: 'center' }}>
      <Fade bottom>
        <Typography variant="h4" gutterBottom>Stubbs Re-Release Record Progression</Typography>
        <Timeline position="alternate">
          {events.map((event, index) => (
            <TimelineItem key={index} onClick={() => handleOpen(event)} sx={{ cursor: 'pointer' }}>
              <TimelineOppositeContent sx={{ m: 'auto 0' }}>
                <Typography variant="body2" color="textSecondary">
                  {event.date}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="primary">
                  {event.icon}
                </TimelineDot>
                {index < events.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Paper elevation={3} sx={{ p: 2, backgroundColor: '#e0f7fa', transition: 'background-color 0.3s' }}>
                  <Typography variant="h6">{event.title}</Typography>
                  <Typography variant="body2" color="textSecondary">{event.location}</Typography>
                  <Typography variant="body2">{event.details}</Typography>
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
            maxWidth: '600px', 
            bgcolor: 'background.paper', 
            boxShadow: 24, 
            p: 4, 
            borderRadius: 2 
          }}>
            {selectedEvent && (
              <>
                <Typography variant="h4" gutterBottom>{selectedEvent.title}</Typography>
                <Typography variant="subtitle1" gutterBottom>{selectedEvent.location}</Typography>
                <Typography variant="body2" gutterBottom>{selectedEvent.details}</Typography>
                <Button variant="contained" color="primary" onClick={handleClose}>
                  Close
                </Button>
              </>
            )}
          </Box>
        </MuiFade>
      </Modal>
    </Box>
  );
};

export default TimelineSection;
