import '../App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes, Router, Navigate } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';


import pubTheme from '../theme';

import '../custom.css'

import Header from './Header';
import Dashboard from './Dashboard';
import Session from './Session';
import NewSession from '../pages/NewSession';
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
      <Header/>
      <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/session" exact element={<NewSession/>}/>
          <Route path="/session/:documentId" element={<Session/>}/>
      </Routes>

    </ThemeProvider>
  )
}

export default App;
