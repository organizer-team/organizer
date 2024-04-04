import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import AppWrapper from './AppWrapper.jsx';
import { UserContextProvider } from './context/UserContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppWrapper>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </AppWrapper>
);
