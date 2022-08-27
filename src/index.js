import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { applyStyles } from './helpers';

applyStyles(document.body, {
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  width: '100vw',
  minHeight: '100vh',
  boxSizing: 'border-box',
  margin: 0
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);