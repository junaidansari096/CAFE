import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Menu from './pages/Menu';
import Rewards from './pages/Rewards';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/Admin';
import AdminOrderDetail from './pages/AdminOrderDetail';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import History from './pages/History';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    document.body.className = isDark ? 'bg-[#121414]' : 'bg-[#fafaf5]';
  }, [isDark]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Consumer Routes */}
        <Route path="/" element={<Layout isDark={isDark} toggleTheme={toggleTheme} />}>
          <Route index element={<Home />} />
          <Route path="reserve" element={<Booking />} />
          <Route path="menu" element={<Menu />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="rewards" element={<Rewards />} />
          <Route path="profile" element={<Profile />} />
          <Route path="history" element={<History />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="control" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="admin/order/:id" element={<ProtectedRoute><AdminOrderDetail /></ProtectedRoute>} />
          <Route path="terms" element={<Terms />} />
          <Route path="privacy" element={<Privacy />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
