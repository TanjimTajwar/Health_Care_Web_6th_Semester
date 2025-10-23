// Import React for component creation
import React from 'react';
// Import Link component for navigation
import { Link } from 'react-router-dom';
// Import useAuth hook to access authentication context
import { useAuth } from '../contexts/AuthContext';
// Import CSS styles for the PatientDashboard component
import './PatientDashboard.css';

// PatientDashboard component - Main dashboard for patients
const PatientDashboard = () => {
  // Get user data and functions from authentication context
  const { user, getAppointmentsByUser, getReportsByUser } = useAuth();
  
  // Get all appointments for the current patient
  const appointments = getAppointmentsByUser(user.id, 'patient');
  // Get all medical reports for the current patient
  const reports = getReportsByUser(user.id, 'patient');
  
  // Filter appointments to get only upcoming confirmed appointments
  const upcomingAppointments = appointments.filter(apt => 
    new Date(apt.date) >= new Date() && apt.status === 'confirmed'
  );
  
  // Get the 3 most recent reports for display
  const recentReports = reports.slice(0, 3);

  // Return the JSX for the PatientDashboard component
  return (
    // Main dashboard container
    <div className="patient-dashboard">
      {/* Dashboard header with welcome message */}
      <div className="dashboard-header">
        <h1>Welcome back, {user.name}!</h1>
        <p>Here's your healthcare overview</p>
      </div>

      {/* Statistics cards showing key metrics */}
      <div className="dashboard-stats">
        {/* Upcoming appointments stat card */}
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3>{upcomingAppointments.length}</h3>
            <p>Upcoming Appointments</p>
          </div>
        </div>
        
        {/* Medical reports stat card */}
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <h3>{reports.length}</h3>
            <p>Medical Reports</p>
          </div>
        </div>
        
        {/* Doctors consulted stat card */}
        <div className="stat-card">
          <div className="stat-icon">👨‍⚕️</div>
          <div className="stat-content">
            {/* Count unique doctors by creating a Set of doctor IDs */}
            <h3>{new Set(appointments.map(apt => apt.doctorId)).size}</h3>
            <p>Doctors Consulted</p>
          </div>
        </div>
        
        {/* Total visits stat card */}
        <div className="stat-card">
          <div className="stat-icon">🏥</div>
          <div className="stat-content">
            <h3>{appointments.length}</h3>
            <p>Total Visits</p>
          </div>
        </div>
      </div>

      {/* Main dashboard content sections */}
      <div className="dashboard-content">
        {/* Upcoming appointments section */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Upcoming Appointments</h2>
            {/* Link to view all appointments */}
            <Link to="/patient/appointments" className="view-all-link">View All</Link>
          </div>
          
          <div className="appointments-list">
            {/* Conditional rendering based on whether appointments exist */}
            {upcomingAppointments.length > 0 ? (
              // Map through upcoming appointments (limit to 3 for dashboard)
              upcomingAppointments.slice(0, 3).map(appointment => (
                <div key={appointment.id} className="appointment-card">
                  <div className="appointment-info">
                    <h4>{appointment.doctorName}</h4>
                    <p className="appointment-date">
                      📅 {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                    </p>
                    <p className="appointment-reason">{appointment.reason}</p>
                  </div>
                  <div className="appointment-status">
                    {/* Status badge with dynamic styling based on status */}
                    <span className={`status-badge ${appointment.status}`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              // Empty state when no appointments exist
              <div className="empty-state">
                <p>No upcoming appointments</p>
                {/* Link to book new appointment */}
                <Link to="/patient/book-appointment" className="btn btn-primary">
                  Book an Appointment
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent medical reports section */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Medical Reports</h2>
            {/* Link to view all reports */}
            <Link to="/patient/reports" className="view-all-link">View All</Link>
          </div>
          
          <div className="reports-list">
            {/* Conditional rendering based on whether reports exist */}
            {recentReports.length > 0 ? (
              // Map through recent reports
              recentReports.map(report => (
                <div key={report.id} className="report-card">
                  <div className="report-info">
                    <h4>{report.type}</h4>
                    <p className="report-date">
                      📅 {new Date(report.date).toLocaleDateString()}
                    </p>
                    <p className="report-doctor">👨‍⚕️ {report.doctorName}</p>
                    <p className="report-results">{report.results}</p>
                  </div>
                  <div className="report-status">
                    {/* Status badge with dynamic styling based on status */}
                    <span className={`status-badge ${report.status}`}>
                      {report.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              // Empty state when no reports exist
              <div className="empty-state">
                <p>No medical reports available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick action cards for common tasks */}
      <div className="dashboard-actions">
        <div className="action-cards">
          {/* Book appointment action card */}
          <Link to="/patient/book-appointment" className="action-card">
            <div className="action-icon">➕</div>
            <h3>Book Appointment</h3>
            <p>Schedule a new appointment with a doctor</p>
          </Link>
          
          {/* Find doctors action card */}
          <Link to="/patient/doctors" className="action-card">
            <div className="action-icon">👨‍⚕️</div>
            <h3>Find Doctors</h3>
            <p>Browse available doctors and specializations</p>
          </Link>
          
          {/* Write review action card */}
          <Link to="/patient/reviews" className="action-card">
            <div className="action-icon">⭐</div>
            <h3>Write Review</h3>
            <p>Share your experience with doctors</p>
          </Link>
        </div>
      </div>

      {/* Patient personal information section */}
      <div className="patient-info-section">
        <div className="info-card">
          <h3>Personal Information</h3>
          <div className="info-grid">
            {/* Patient name */}
            <div className="info-item">
              <span className="info-label">Name:</span>
              <span className="info-value">{user.name}</span>
            </div>
            {/* Patient email */}
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{user.email}</span>
            </div>
            {/* Patient phone */}
            <div className="info-item">
              <span className="info-label">Phone:</span>
              <span className="info-value">{user.phone}</span>
            </div>
            {/* Patient age */}
            <div className="info-item">
              <span className="info-label">Age:</span>
              <span className="info-value">{user.age} years</span>
            </div>
            {/* Patient gender */}
            <div className="info-item">
              <span className="info-label">Gender:</span>
              <span className="info-value">{user.gender}</span>
            </div>
            {/* Patient medical history */}
            <div className="info-item">
              <span className="info-label">Medical History:</span>
              <span className="info-value">{user.medicalHistory || 'None'}</span>
            </div>
            {/* Patient allergies */}
            <div className="info-item">
              <span className="info-label">Allergies:</span>
              <span className="info-value">{user.allergies || 'None known'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the PatientDashboard component as the default export
// This allows other files to import and use this component
export default PatientDashboard;
