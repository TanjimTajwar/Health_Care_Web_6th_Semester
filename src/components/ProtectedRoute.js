import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user } = useAuth();
  const location = useLocation();

  // If user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user role is not in allowed roles, redirect to appropriate dashboard
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    switch (user.role) {
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />;
      case 'doctor':
        return <Navigate to="/doctor/dashboard" replace />;
      case 'patient':
        return <Navigate to="/patient/dashboard" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
