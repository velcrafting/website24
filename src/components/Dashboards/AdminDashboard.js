import React, { useEffect, useState } from 'react';
import { Typography, Box, Grid, Card, CardContent, CardHeader, Avatar } from '@mui/material';
import { red, green, blue } from '@mui/material/colors';
import PieChartIcon from '@mui/icons-material/PieChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import MyKanban from '../Kanban/Kanban';
import MyCalendar from '../Calendar/Calendar'

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const [userStats, setUserStats] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [performanceMetrics, setPerformanceMetrics] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const q = query(collection(db, 'userStats'), where('userId', '==', currentUser.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        console.log('Fetched user stats:', snapshot.docs.length);
        const stats = snapshot.docs.map(doc => doc.data());
        setUserStats(stats);
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="body1" gutterBottom>
        Welcome to the admin dashboard!
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }}>
                  <PieChartIcon />
                </Avatar>
              }
              title="User Statistics"
              subheader="Overview of user activities"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: green[500] }}>
                  <BarChartIcon />
                </Avatar>
              }
              title="Sales Data"
              subheader="Monthly sales data"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: blue[500] }}>
                  <DataUsageIcon />
                </Avatar>
              }
              title="Performance Metrics"
              subheader="System performance metrics"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Kanban Board" />
            <CardContent>
              <MyKanban />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Calendar" />
            <CardContent>
              <MyCalendar />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
