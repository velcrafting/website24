import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { LinkedIn, GitHub, MailOutline } from '@mui/icons-material';
import SpeedIcon from '@mui/icons-material/Speed';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import TwitterIcon from '@mui/icons-material/Twitter';
import Fade from 'react-reveal/Fade';

const ContactSection = () => {
  return (
    <Box sx={{ py: 8, px: 4, textAlign: 'center' }}>
      <Fade bottom>
        <Typography variant="h4" gutterBottom>Contact Me</Typography>
        <Typography variant="body1" sx={{ maxWidth: '600px', margin: 'auto' }}>
          Interested in working together? Get in touch!
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            startIcon={<LinkedIn />}
            variant="contained"
            color="primary"
            sx={{ m: 1 }}
            href="https://www.linkedin.com/in/spajewski/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </Button>

          <Button
            startIcon={<MailOutline />}
            variant="contained"
            color="primary"
            sx={{ m: 1 }}
            href="mailto:vel@blockchaingg.com"
          >
            Email
          </Button>
          <Button
            startIcon={<GitHub />}
            variant="contained"
            color="primary"
            sx={{ m: 1 }}
            href="https://github.com/velcrafting"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Button>
          <Button
            startIcon={<TwitterIcon />}
            variant="contained"
            color="primary"
            sx={{ m: 1 }}
            href="https://x.com/Velcrafting"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </Button>
          {/* <Button
            startIcon={<SpeedIcon />}
            variant="contained"
            color="primary"
            sx={{ m: 1 }}
            href="https://www.speedrun.com/users/velcrafting"
            target="_blank"
            rel="noopener noreferrer"
          >
            Speedrun.com
          </Button> */}
          {/* <Button
            startIcon={<LiveTvIcon />}
            variant="contained"
            color="primary"
            sx={{ m: 1 }}
            href="https://www.twitch.tv/velcrafting"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitch
          </Button> */}
         
        </Box>
      </Fade>
    </Box>
  );
};

export default ContactSection;
