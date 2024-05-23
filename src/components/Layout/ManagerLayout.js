import React, { useState } from 'react';
import { CssBaseline, Toolbar, Typography, Box } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
import * as Icons from '../Common/Emotes';

const ManagerLayout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    {
      text: 'General',
      icon: <Icons.HomeIcon />,
      children: [
        { text: 'Dashboard', path: '/', icon: <Icons.DashboardIcon /> },
        { text: 'About', path: '/users/about', icon: <Icons.InfoIcon /> },
        { text: 'Forms', path: '/users/forms', icon: <Icons.BuildIcon /> },
        { text: 'Blog', path: '/users/blogs', icon: <Icons.ArticleIcon /> },
      ],
    },
    {
      text: 'Projects',
      icon: <Icons.WorkIcon  />,
      children: [
        { text: 'Calendar', path: '/projects/calendar', icon: <Icons.CalendarTodayIcon /> },
        { text: 'Kanban', path: '/projects/kanban', icon: <Icons.AssignmentIcon /> },
        { text: 'Tasks', path: '/projects/tasks', icon: <Icons.TaskIcon /> },
      ],
    },
    { text: 'Settings', path: '/users/settings', icon: <Icons.SettingsIcon /> },
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

export default ManagerLayout;