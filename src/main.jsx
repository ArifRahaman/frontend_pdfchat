import React from 'react'
// import 'regenerator-runtime/runtime'; // Add this line
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthContextProvider } from '../Context/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'
// import 'regenerator-runtime/runtime';

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
