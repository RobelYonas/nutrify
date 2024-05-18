import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CalorieProvider } from "./components/CalorieContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CalorieProvider>
      <App />
    </CalorieProvider>
  </React.StrictMode>
);
