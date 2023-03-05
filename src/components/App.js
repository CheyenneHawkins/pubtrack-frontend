import '../App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes } from 'react-router-dom';

import Header from './Header';
import pubTheme from '../theme';

import '../custom.css'
import Dashboard from './Dashboard';
import Session from './Session';
import MenuDrawer from './MenuDrawer';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',

  },
});

function App() {
  return (
    
    <ThemeProvider 
      // theme={pubTheme}
      theme={darkTheme}
    >
    <CssBaseline 
      enableColorScheme 
    />
      <Header/>
      {/* <MenuDrawer/> */}
    <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/session" element={<Session/>}/>
    </Routes>

    </ThemeProvider>
  )
}

export default App;
