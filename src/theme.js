import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7E57C2',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#81D4FA',
      contrastText: '#000000',
    },
    background: {
      default: '#F3E5F5',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#512DA8',
      secondary: '#A5D6A7',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h6: {
      color: '#512DA8',
    },
    body1: {
      color: '#512DA8',
    },
  },
  shadows: Array(25).fill('none').map((_, index) => {
    if (index === 1) return '0px 1px 3px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)';
    return 'none';
  }),
});

export default theme;
