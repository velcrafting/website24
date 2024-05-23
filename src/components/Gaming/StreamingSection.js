import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import TwitchEmbed from './TwitchEmbed';

const StreamingSection = () => {
  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
        py={4}
        bgcolor="background.paper"
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Twitch
        </Typography>
        <Box
          width="90%"
          maxWidth="1000px"
          bgcolor="grey.900"
          borderRadius={2}
          overflow="hidden"
          boxShadow={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box width="100%" height="500px">
            <TwitchEmbed channel="velcrafting" />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default StreamingSection;
