import React, { useState } from 'react';
import { Box, Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const CarouselComponent = ({ mediaFiles }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <Carousel
      key={JSON.stringify(mediaFiles)} // Use key to force re-render on mediaFiles change
      showThumbs={false}
      showStatus={false}
      infiniteLoop
      useKeyboardArrows
      autoPlay={!isPlaying}
      emulateTouch
      renderArrowPrev={(clickHandler) => (
        <IconButton
          onClick={clickHandler}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '10px',
            transform: 'translateY(-50%)',
            color: 'black',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'transparent',
            },
            zIndex: 1,
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>
      )}
      renderArrowNext={(clickHandler) => (
        <IconButton
          onClick={clickHandler}
          sx={{
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
            color: 'black',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'transparent',
            },
            zIndex: 1,
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      )}
    >
      {mediaFiles.map((file, index) => (
        <Box key={index} sx={{ px: { xs: 1, sm: 2 }, display: 'flex', justifyContent: 'center' }}>
          <Card sx={{ width: '100%', maxWidth: { xs: '100%', sm: '80%', md: '800px' }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ width: '100%', height: { xs: '300px', md: '500px' }, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {file.fileName.endsWith('.mp4') ? (
                <CardMedia
                  component="video"
                  controls
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  onPlay={handlePlay}
                  onPause={handlePause}
                >
                  <source src={file.fileName} type="video/mp4" />
                  Your browser does not support the video tag.
                </CardMedia>
              ) : (
                <CardMedia
                  component="img"
                  image={file.fileName}
                  alt={`media-${index}`}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              )}
            </Box>
            <CardContent>
              <Typography variant="h6" sx={{ textAlign: 'center' }}>{file.displayName}</Typography>
              <Typography variant="body2" sx={{ fontStyle: 'italic', textAlign: 'center' }}>
                {file.description}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
