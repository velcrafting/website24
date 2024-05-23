import React, { useState } from 'react';
import {
  Drawer, useTheme, useMediaQuery, Box, Divider, IconButton, CssBaseline
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TopSection from './TopSection';
import MenuSection from './MenuSection';
import BottomSection from './BottomSection';

const Sidebar = ({ menuItems }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <CssBaseline />
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ position: 'fixed', top: 16, left: 16, zIndex: theme.zIndex.drawer + 1 }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          },
        }}
      >
        <Box>
          <TopSection />
          <Divider />
          <MenuSection menuItems={menuItems} />
        </Box>
        <Box>
          <Divider />
          <BottomSection />
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
