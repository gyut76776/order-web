import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from "./context/CartContext.jsx";
import { Toaster } from "react-hot-toast";


createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <CartProvider>
      <App />
      <Toaster position="top-center" reverseOrder={false} />
    </CartProvider>
  </React.StrictMode>
)
