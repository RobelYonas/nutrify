import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CalorieProvider } from "./components/CalorieContext";
import ErrorBoundary from './function/ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CalorieProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </CalorieProvider>
  </React.StrictMode>
);
