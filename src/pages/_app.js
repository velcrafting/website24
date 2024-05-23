import { AuthProvider, useAuth } from '../contexts/AuthContext';
0
import AdminLayout from '../components/Layout/AdminLayout';
import ManagerLayout from '../components/Layout/ManagerLayout';
import UserLayout from '../components/Layout/UserLayout';
import VisitorLayout from '../components/Layout/VisitorLayout';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme'; // Assuming you have created a theme.js file as suggested
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppContent Component={Component} pageProps={pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}

function AppContent({ Component, pageProps }) {
  const { currentUser } = useAuth();

  if (currentUser === undefined) {
    return <div>Loading...</div>; // Show a loading state
  }

  let Layout;
  if (currentUser?.role === 'admin') {
    Layout = AdminLayout;
  } else if (currentUser?.role === 'manager') {
    Layout = ManagerLayout;
  } else if (currentUser?.role === 'user') {
    Layout = UserLayout;
  } else {
    Layout = VisitorLayout;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
