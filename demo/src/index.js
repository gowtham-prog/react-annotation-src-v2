import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'; // Import createRoot

import './index.css';
import App from './App';

const root = createRoot(document.getElementById('demo')); // Create a root instance

root.render(<App />); // Render your app using createRoot
