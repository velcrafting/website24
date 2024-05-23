import React, { useState } from 'react';
import { CssBaseline, Toolbar, Typography, Box } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
import * as Icons from '../Common/Emotes';

const VisitorLayout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    {
      text: 'Resume',
      icon: <Icons.HomeIcon />,
      children: [
        { text: 'Professional', path: '/', icon: <Icons.HomeWorkIcon /> },
        { text: 'Art Portfolio', path: '/users/portfolio', icon: <Icons.BrushIcon /> },
        { text: 'Gaming', path: '/users/gaming', icon: <Icons.SportsEsportsIcon /> },
      ],
    },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar menuItems={menuItems} drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: 0 }}>
        {children}
      </Box>
    </div>
  );
};

export default VisitorLayout;
