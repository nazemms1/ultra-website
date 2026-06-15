import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0DF1D9',
    },
    background: {
      default: '#121212',
      paper: '#121212',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255,255,255,0.55)',
    },
  },
  typography: {
    fontFamily: "'Rajdhani', sans-serif",
    h1: {
      fontFamily: "'Ethnocentric Rg', 'Rajdhani', sans-serif",
      fontWeight: 400,
      fontStyle: 'normal',
      fontSize: '50px',
      lineHeight: '70px',
      letterSpacing: '0.6px',
      color: '#ffffff',
    },
    h2: {
      fontFamily: "'Ethnocentric Rg', 'Rajdhani', sans-serif",
      fontWeight: 400,
      letterSpacing: '0.5px',
      color: '#ffffff',
    },
    h3: {
      fontFamily: "'Ethnocentric Rg', 'Rajdhani', sans-serif",
      fontWeight: 400,
      letterSpacing: '0.4px',
      color: '#ffffff',
    },
    h4: {
      fontFamily: "'Ethnocentric Rg', 'Rajdhani', sans-serif",
      fontWeight: 400,
      color: '#ffffff',
    },
    h5: {
      fontFamily: "'Ethnocentric Rg', 'Rajdhani', sans-serif",
      fontWeight: 400,
      color: '#ffffff',
    },
    h6: {
      fontFamily: "'Rajdhani', sans-serif",
      fontWeight: 600,
      letterSpacing: '0.7px',
      textTransform: 'uppercase',
      color: '#ffffff',
    },
    body1: {
      fontFamily: "'Rajdhani', sans-serif",
      fontWeight: 400,
      fontSize: '15px',
      lineHeight: '24px',
      letterSpacing: '0.4px',
    },
    body2: {
      fontFamily: "'Rajdhani', sans-serif",
      fontWeight: 400,
      fontSize: '13px',
      letterSpacing: '0.3px',
    },
    caption: {
      fontFamily: "'Rajdhani', sans-serif",
      fontSize: '11px',
      letterSpacing: '0.8px',
      textTransform: 'uppercase',
    },
    overline: {
      fontFamily: "'Rajdhani', sans-serif",
      fontSize: '10px',
      letterSpacing: '1.5px',
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#060E10',
          color: '#ffffff',
        },
      },
    },
  },
});

export default theme;
