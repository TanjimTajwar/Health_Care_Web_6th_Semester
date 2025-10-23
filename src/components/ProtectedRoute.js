// Import React for component creation
import React from 'react';
// Import navigation components from react-router-dom
// Navigate: Component for programmatic navigation/redirects
// useLocation: Hook to get current location information
import { Navigate, useLocation } from 'react-router-dom';
// Import useAuth hook to access authentication context
import { useAuth } from '../contexts/AuthContext';

// ProtectedRoute component - Protects routes that require authentication
// This component checks if user is logged in and has the right role
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  // Get current user from authentication context
  const { user } = useAuth();
  // Get current location for redirect purposes
  const location = useLocation();

  // If user is not logged in, redirect to login page
  if (!user) {
    // Navigate to login with current location state
    // This allows redirecting back to the original page after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user role is not in allowed roles, redirect to appropriate dashboard
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect user to their role-specific dashboard
    switch (user.role) {
      case 'admin':
        // Redirect admin to admin dashboard
        return <Navigate to="/admin/dashboard" replace />;
      case 'doctor':
        // Redirect doctor to doctor dashboard
        return <Navigate to="/doctor/dashboard" replace />;
      case 'patient':
        // Redirect patient to patient dashboard
        return <Navigate to="/patient/dashboard" replace />;
      default:
        // Default redirect to login if role is unknown
        return <Navigate to="/login" replace />;
    }
  }

  // If user is authenticated and has the right role, render the protected content
  return children;
};

// Export the ProtectedRoute component as the default export
// This allows other files to import and use this component
export default ProtectedRoute;
