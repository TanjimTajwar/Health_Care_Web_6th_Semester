// Import React and useState hook for component state management
import React, { useState } from 'react';
// Import navigation components from react-router-dom
// Link: Component for creating navigation links
// useLocation: Hook to get current location information
// useNavigate: Hook for programmatic navigation
import { Link, useLocation, useNavigate } from 'react-router-dom';
// Import useAuth hook to access authentication context
import { useAuth } from '../contexts/AuthContext';
// Import CSS styles for the Navigation component
import './Navigation.css';

// Navigation component - Provides the main navigation bar for the application
const Navigation = () => {
  // State to control mobile menu visibility
  const [isOpen, setIsOpen] = useState(false);
  // Get user data and logout function from authentication context
  const { user, logout } = useAuth();
  // Get current location to highlight active navigation item
  const location = useLocation();
  // Get navigate function for programmatic navigation
  const navigate = useNavigate();

  // Handle user logout
  const handleLogout = () => {
    // Call logout function from auth context
    logout();
    // Navigate to login page after logout
    navigate('/login');
  };

  // Toggle mobile menu visibility
  const toggleMenu = () => {
    // Toggle the isOpen state (true becomes false, false becomes true)
    setIsOpen(!isOpen);
  };

  // Get navigation items based on user role
  const getNavItems = () => {
    // If no user is logged in, return empty array (no navigation items)
    if (!user) return [];

    // Return different navigation items based on user role
    switch (user.role) {
      case 'admin':
        // Admin navigation items
        return [
          { path: '/admin/dashboard', label: 'Dashboard', icon: '🏠' },
          { path: '/admin/users', label: 'User Management', icon: '👥' },
          { path: '/admin/reviews', label: 'Review Management', icon: '⭐' },
          { path: '/admin/statistics', label: 'Statistics', icon: '📊' }
        ];
      case 'doctor':
        // Doctor navigation items
        return [
          { path: '/doctor/dashboard', label: 'Dashboard', icon: '🏠' },
          { path: '/doctor/patients', label: 'My Patients', icon: '👥' },
          { path: '/doctor/reports', label: 'Reports', icon: '📋' },
          { path: '/doctor/appointments', label: 'Appointments', icon: '📅' }
        ];
      case 'patient':
        // Patient navigation items
        return [
          { path: '/patient/dashboard', label: 'Dashboard', icon: '🏠' },
          { path: '/patient/reports', label: 'My Reports', icon: '📋' },
          { path: '/patient/appointments', label: 'Appointments', icon: '📅' },
          { path: '/patient/book-appointment', label: 'Book Appointment', icon: '➕' },
          { path: '/patient/doctors', label: 'Doctors', icon: '👨‍⚕️' },
          { path: '/patient/reviews', label: 'Reviews', icon: '⭐' }
        ];
      default:
        // Default case - return empty array for unknown roles
        return [];
    }
  };

  // Get navigation items for the current user
  const navItems = getNavItems();

  // Return the JSX for the Navigation component
  return (
    // Main navigation bar
    <nav className="navbar">
      {/* Navigation container */}
      <div className="navbar-container">
        {/* Brand/logo section */}
        <div className="navbar-brand">
          {/* Link to home page with brand information */}
          <Link to="/" className="brand-link">
            <span className="brand-icon">🏥</span>
            <span className="brand-text">Jobra Healthcare</span>
          </Link>
        </div>

        {/* Mobile menu toggle button */}
        <div className="navbar-toggle" onClick={toggleMenu}>
          {/* Hamburger menu icon */}
          <span className={`hamburger ${isOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>

        {/* Navigation menu (hidden on mobile when closed) */}
        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          {/* Navigation links */}
          <div className="navbar-nav">
            {/* Map through navigation items and create links */}
            {navItems.map((item) => (
              <Link
                key={item.path} // Unique key for React list rendering
                to={item.path} // Link destination
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`} // Active class for current page
                onClick={() => setIsOpen(false)} // Close mobile menu when link is clicked
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* User information and logout section */}
          <div className="navbar-user">
            {/* User information display */}
            <div className="user-info">
              <span className="user-role">{user?.role?.toUpperCase()}</span>
              <span className="user-name">{user?.name}</span>
            </div>
            {/* Logout button */}
            <button className="logout-btn" onClick={handleLogout}>
              <span className="logout-icon">🚪</span>
              <span className="logout-text">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Export the Navigation component as the default export
// This allows other files to import and use this component
export default Navigation;
