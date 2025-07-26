// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/searchContext'; // 🆕 import
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <SearchProvider> {/* 🆕 Wrap around the app */}
      <CartProvider>
        <App />
      </CartProvider>
    </SearchProvider>
  </BrowserRouter>
);
