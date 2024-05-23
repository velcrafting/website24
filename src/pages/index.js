import React from 'react';
import { useAuth } from '../hooks/useAuth';
import AdminDashboard from '../components/Dashboards/AdminDashboard';
import ManagerDashboard from '../components/Dashboards/ManagerDashboard';
import UserDashboard from '../components/Dashboards/UserDashboard';
import VisitorDashboard from '../components/Dashboards/VisitorDashboard';
import MyCalendar from '../components/Calendar/Calendar'; // Import Calendar component
import MyChat from '../components/Chat/Chat'; // Import Chat component
import MyKanban from '../components/Kanban/Kanban'; // Import Kanban component

const Home = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <VisitorDashboard />;
  }

  switch (currentUser.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'manager':
      return <ManagerDashboard />;
    case 'user':
      return <UserDashboard />;
    default:
      return <VisitorDashboard />;
  }
};

export default Home;
