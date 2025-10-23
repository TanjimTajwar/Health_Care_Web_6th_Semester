// Import React library - the core library for building user interfaces
import React from 'react';
// Import ReactDOM from react-dom/client for rendering React components
// This is the modern way to render React 18+ applications
import ReactDOM from 'react-dom/client';
// Import Bootstrap CSS framework for responsive design and pre-built components
// This provides a consistent look and feel across the application
import 'bootstrap/dist/css/bootstrap.min.css';
// Import the main application CSS file for custom styles
import './App.css';
// Import the main App component that contains the entire application
import App from './App';

// Create a root element for React to render into
// This gets the HTML element with id 'root' from the public/index.html file
// createRoot is the new React 18+ way to create a root for rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component into the root element
// React.StrictMode is a development tool that helps identify potential problems
// It enables additional checks and warnings for the application
root.render(
  <React.StrictMode>
    {/* Main App component - this is the entry point of the entire application */}
    <App />
  </React.StrictMode>
);
