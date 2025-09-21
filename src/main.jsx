import React from 'react';
import { createRoot } from 'react-dom/client'
// import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter  basename="/pym">
    <App />
    {/* <p>Hi, This is PYM</p> */}
  </BrowserRouter>
);
