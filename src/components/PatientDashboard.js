import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import './PatientDashboard.css';

const PatientDashboard = () => {
  const { user, getAppointmentsByUser, getReportsByUser } = useAuth();
  
  const appointments = getAppointmentsByUser(user.id, 'patient');
  const reports = getReportsByUser(user.id, 'patient');
  
  const upcomingAppointments = appointments.filter(apt => 
    new Date(apt.date) >= new Date() && apt.status === 'confirmed'
  );
  
  const recentReports = reports.slice(0, 3);

  return (
    <div className="patient-dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user.name}!</h1>
        <p>Here's your healthcare overview</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3>{upcomingAppointments.length}</h3>
            <p>Upcoming Appointments</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <h3>{reports.length}</h3>
            <p>Medical Reports</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">👨‍⚕️</div>
          <div className="stat-content">
            <h3>{new Set(appointments.map(apt => apt.doctorId)).size}</h3>
            <p>Doctors Consulted</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🏥</div>
          <div className="stat-content">
            <h3>{appointments.length}</h3>
            <p>Total Visits</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Upcoming Appointments</h2>
            <a href="/patient/appointments" className="view-all-link">View All</a>
          </div>
          
          <div className="appointments-list">
            {upcomingAppointments.length > 0 ? (
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
                    <span className={`status-badge ${appointment.status}`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>No upcoming appointments</p>
                <a href="/patient/book-appointment" className="btn btn-primary">
                  Book an Appointment
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Medical Reports</h2>
            <a href="/patient/reports" className="view-all-link">View All</a>
          </div>
          
          <div className="reports-list">
            {recentReports.length > 0 ? (
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
                    <span className={`status-badge ${report.status}`}>
                      {report.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>No medical reports available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="dashboard-actions">
        <div className="action-cards">
          <a href="/patient/book-appointment" className="action-card">
            <div className="action-icon">➕</div>
            <h3>Book Appointment</h3>
            <p>Schedule a new appointment with a doctor</p>
          </a>
          
          <a href="/patient/doctors" className="action-card">
            <div className="action-icon">👨‍⚕️</div>
            <h3>Find Doctors</h3>
            <p>Browse available doctors and specializations</p>
          </a>
          
          <a href="/patient/reviews" className="action-card">
            <div className="action-icon">⭐</div>
            <h3>Write Review</h3>
            <p>Share your experience with doctors</p>
          </a>
        </div>
      </div>

      <div className="patient-info-section">
        <div className="info-card">
          <h3>Personal Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Name:</span>
              <span className="info-value">{user.name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{user.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Phone:</span>
              <span className="info-value">{user.phone}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Age:</span>
              <span className="info-value">{user.age} years</span>
            </div>
            <div className="info-item">
              <span className="info-label">Gender:</span>
              <span className="info-value">{user.gender}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Medical History:</span>
              <span className="info-value">{user.medicalHistory || 'None'}</span>
            </div>
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

export default PatientDashboard;
