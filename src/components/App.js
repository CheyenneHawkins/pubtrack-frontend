import '../App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes } from 'react-router-dom';

import pubTheme from '../theme';

import '../custom.css'

import {UserContext} from '../context/UserContext';
import Header from './Header';
import Dashboard from './Dashboard';
import Session from './Session';
import MenuDrawer from './MenuDrawer';
import { useMemo, useState } from 'react';
import Login from './Login';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',

  },
});


function App() {
  
  const [user, setUser] = useState(null)
  // const providerUser = useMemo(() => ({ user, setUser }), [user, setUser])
  
  return (
    
    <ThemeProvider 
      // theme={pubTheme}
      theme={darkTheme}
    >
    <CssBaseline 
      enableColorScheme 
    />
    <UserContext.Provider value={{ user, setUser }}>
      <Header/>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/session" element={<Session/>}/>
      </Routes>
    </UserContext.Provider>

    </ThemeProvider>
  )
}

export default App;
