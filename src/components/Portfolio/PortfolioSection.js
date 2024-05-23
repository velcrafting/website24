import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Fade from 'react-reveal/Fade';
import CarouselComponent from './carousel'; // Adjust the path if necessary
import mediaFiles from './mediaFiles'; // Adjust the path if necessary

const categories = ['digital', 'graphic', 'videos', 'physical', 'websites'];

const PortfolioSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('digital');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Box sx={{ py: 8, px: { xs: 2, sm: 4 }, textAlign: 'center', width: '100%', overflowX: 'hidden' }}>
      <Fade bottom>
        <div>
          <Typography variant="h4" gutterBottom>Art Portfolio</Typography>
          <Typography variant="body1" sx={{ maxWidth: '600px', margin: 'auto', mb: 4 }}>
            A collection of my digital, graphic, animation, video, and physical artworks.
          </Typography>
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            {categories.map((category) => (
              <Button
                key={category}
                variant="contained"
                color="primary"
                sx={{ m: 1 }}
                onClick={() => handleCategoryChange(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </Box>
        </div>
      </Fade>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ width: { xs: '100%', sm: '100%', md: '80%' }, maxWidth: { xs: '420px', sm: '450px', md: '750px', lg: '1000px' }, margin: 'auto' }}>
          <CarouselComponent mediaFiles={mediaFiles[selectedCategory]} />
        </Box>
      </Box>
    </Box>
  );
};

export default PortfolioSection;
