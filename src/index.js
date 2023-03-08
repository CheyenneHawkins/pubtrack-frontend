import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import client from './components/apolloClient';
import { ApolloProvider } from '@apollo/react-hooks';
import { AuthProvider } from './context/authContext';

import { ThemeProvider } from '@mui/material/styles';
import pubTheme from './theme';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <ApolloProvider client={client}>
      <React.StrictMode>
        <BrowserRouter>
          <ThemeProvider theme={pubTheme}>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </React.StrictMode>
    </ApolloProvider>
  </AuthProvider>
);


