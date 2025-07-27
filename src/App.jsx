import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import Header from './components/Header';
import ScanPage from './pages/ScanPage';
import AdminPage from "./pages/AdminPage";
import SeedDemo from './pages/seedDemo';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/seed" element={<SeedDemo />} />

      </Routes>
    </>
  );
}
