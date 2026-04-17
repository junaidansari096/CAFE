import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, isAdmin } = useAuth();
  const location = useLocation();

  // For initial dev, let's allow access if no user is set yet, 
  // or use the isAdmin check for real security.
  // In a real app, you'd wait for loading.
  
  if (!user) {
    // Redirect to login but save the location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    // If user is logged in but not an admin, send to profile or home
    return <Navigate to="/" replace />;
  }

  return children;
}
