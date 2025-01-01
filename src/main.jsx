import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FormDataProvider } from './components/FormDataContext.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <FormDataProvider>
//       <App />
//     </FormDataProvider>
//   </StrictMode>,
// )

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FormDataProvider>
      <App />
    </FormDataProvider>
  </React.StrictMode>
);