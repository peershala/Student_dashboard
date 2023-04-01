import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AppProvider, { UserProvider } from './context/ContextProvider';
// import { UserProvider } from './context/ContextProvider';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <AppProvider>
      <App />
    </AppProvider>
  </UserProvider>

);