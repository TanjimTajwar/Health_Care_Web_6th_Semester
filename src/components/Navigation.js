import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navigation.css';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getNavItems = () => {
    if (!user) return [];

    switch (user.role) {
      case 'admin':
        return [
          { path: '/admin/dashboard', label: 'Dashboard', icon: '🏠' },
          { path: '/admin/users', label: 'User Management', icon: '👥' },
          { path: '/admin/reviews', label: 'Review Management', icon: '⭐' },
          { path: '/admin/statistics', label: 'Statistics', icon: '📊' }
        ];
      case 'doctor':
        return [
          { path: '/doctor/dashboard', label: 'Dashboard', icon: '🏠' },
          { path: '/doctor/patients', label: 'My Patients', icon: '👥' },
          { path: '/doctor/reports', label: 'Reports', icon: '📋' },
          { path: '/doctor/appointments', label: 'Appointments', icon: '📅' }
        ];
      case 'patient':
        return [
          { path: '/patient/dashboard', label: 'Dashboard', icon: '🏠' },
          { path: '/patient/reports', label: 'My Reports', icon: '📋' },
          { path: '/patient/appointments', label: 'Appointments', icon: '📅' },
          { path: '/patient/book-appointment', label: 'Book Appointment', icon: '➕' },
          { path: '/patient/doctors', label: 'Doctors', icon: '👨‍⚕️' },
          { path: '/patient/reviews', label: 'Reviews', icon: '⭐' }
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="brand-link">
            <span className="brand-icon">🏥</span>
            <span className="brand-text">Jobra Healthcare</span>
          </Link>
        </div>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className={`hamburger ${isOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>

        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <div className="navbar-nav">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="navbar-user">
            <div className="user-info">
              <span className="user-role">{user?.role?.toUpperCase()}</span>
              <span className="user-name">{user?.name}</span>
            </div>
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

export default Navigation;
