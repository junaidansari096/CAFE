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
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

// Admin Pages
import AdminLayout from './pages/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ProductManager from './pages/Admin/ProductManager';
import BookingManager from './pages/Admin/BookingManager';
import ReviewManager from './pages/Admin/ReviewManager';
import ProtectedRoute from './components/ProtectedRoute';

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
      <Routes>
        {/* Consumer Routes */}
        <Route path="/" element={<Layout isDark={isDark} toggleTheme={toggleTheme} />}>
          <Route index element={<Home />} />
          <Route path="reserve" element={<Booking />} />
          <Route path="menu" element={<Menu />} />
          <Route path="rewards" element={<Rewards />} />
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="terms" element={<Terms />} />
          <Route path="privacy" element={<Privacy />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout isDark={isDark} />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="menu" element={<ProductManager isDark={isDark} />} />
          <Route path="bookings" element={<BookingManager isDark={isDark} />} />
          <Route path="reviews" element={<ReviewManager isDark={isDark} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
