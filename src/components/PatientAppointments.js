import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './PatientAppointments.css';

const PatientAppointments = () => {
  const { user, getAppointmentsByUser } = useAuth();
  const [filter, setFilter] = useState('all');
  
  const appointments = getAppointmentsByUser(user.id, 'patient');
  
  const filteredAppointments = appointments.filter(appointment => {
    if (filter === 'all') return true;
    return appointment.status === filter;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return '✅';
      case 'pending':
        return '⏳';
      case 'cancelled':
        return '❌';
      case 'completed':
        return '✅';
      default:
        return '📅';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return '#28a745';
      case 'pending':
        return '#ffc107';
      case 'cancelled':
        return '#dc3545';
      case 'completed':
        return '#17a2b8';
      default:
        return '#6c757d';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isUpcoming = (dateString) => {
    return new Date(dateString) >= new Date();
  };

  return (
    <div className="patient-appointments">
      <div className="appointments-header">
        <h1>My Appointments</h1>
        <p>Manage your medical appointments and consultations</p>
      </div>

      <div className="appointments-filters">
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({appointments.length})
          </button>
          <button
            className={`filter-btn ${filter === 'upcoming' ? 'active' : ''}`}
            onClick={() => setFilter('upcoming')}
          >
            Upcoming ({appointments.filter(a => isUpcoming(a.date) && a.status === 'confirmed').length})
          </button>
          <button
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending ({appointments.filter(a => a.status === 'pending').length})
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed ({appointments.filter(a => a.status === 'completed').length})
          </button>
        </div>
      </div>

      <div className="appointments-content">
        {filteredAppointments.length > 0 ? (
          <div className="appointments-list">
            {filteredAppointments
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map(appointment => (
                <div key={appointment.id} className="appointment-card">
                  <div className="appointment-header">
                    <div className="appointment-doctor">
                      <span className="doctor-icon">👨‍⚕️</span>
                      <div className="doctor-info">
                        <h3>{appointment.doctorName}</h3>
                        <p className="appointment-reason">{appointment.reason}</p>
                      </div>
                    </div>
                    <div className="appointment-status">
                      <span 
                        className="status-indicator"
                        style={{ color: getStatusColor(appointment.status) }}
                      >
                        {getStatusIcon(appointment.status)}
                      </span>
                      <span 
                        className="status-text"
                        style={{ color: getStatusColor(appointment.status) }}
                      >
                        {appointment.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="appointment-details">
                    <div className="detail-item">
                      <span className="detail-icon">📅</span>
                      <div className="detail-content">
                        <span className="detail-label">Date:</span>
                        <span className="detail-value">{formatDate(appointment.date)}</span>
                      </div>
                    </div>
                    
                    <div className="detail-item">
                      <span className="detail-icon">🕐</span>
                      <div className="detail-content">
                        <span className="detail-label">Time:</span>
                        <span className="detail-value">{appointment.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="appointment-actions">
                    {appointment.status === 'pending' && (
                      <button className="btn btn-warning btn-sm">
                        ⏳ Pending Confirmation
                      </button>
                    )}
                    {appointment.status === 'confirmed' && isUpcoming(appointment.date) && (
                      <button className="btn btn-danger btn-sm">
                        ❌ Cancel Appointment
                      </button>
                    )}
                    {appointment.status === 'completed' && (
                      <button className="btn btn-outline-primary btn-sm">
                        📝 Write Review
                      </button>
                    )}
                    <button className="btn btn-outline-secondary btn-sm">
                      📄 View Details
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📅</div>
            <h3>No Appointments Found</h3>
            <p>
              {filter === 'all' 
                ? "You don't have any appointments yet."
                : `No appointments with status "${filter}" found.`
              }
            </p>
            <Link to="/patient/book-appointment" className="btn btn-primary">
              Book an Appointment
            </Link>
          </div>
        )}
      </div>

      <div className="appointments-summary">
        <div className="summary-card">
          <h3>Appointments Summary</h3>
          <div className="summary-stats">
            <div className="summary-stat">
              <span className="stat-number">{appointments.length}</span>
              <span className="stat-label">Total Appointments</span>
            </div>
            <div className="summary-stat">
              <span className="stat-number" style={{ color: '#28a745' }}>
                {appointments.filter(a => a.status === 'confirmed').length}
              </span>
              <span className="stat-label">Confirmed</span>
            </div>
            <div className="summary-stat">
              <span className="stat-number" style={{ color: '#ffc107' }}>
                {appointments.filter(a => a.status === 'pending').length}
              </span>
              <span className="stat-label">Pending</span>
            </div>
            <div className="summary-stat">
              <span className="stat-number" style={{ color: '#17a2b8' }}>
                {appointments.filter(a => a.status === 'completed').length}
              </span>
              <span className="stat-label">Completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientAppointments;
