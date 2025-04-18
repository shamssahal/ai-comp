import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ResponseProvider } from './context/ResponseContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <ResponseProvider>
    <App />
  </ResponseProvider>
  
);

