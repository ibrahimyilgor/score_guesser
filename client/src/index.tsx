import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './contexts/authContext';
import { SettingsProvider } from './contexts/settingsContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthProvider>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </AuthProvider>
);