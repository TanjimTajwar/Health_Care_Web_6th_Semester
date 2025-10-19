import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import './DoctorDashboard.css';

const DoctorDashboard = () => {
  const { user, getAppointmentsByUser, getReportsByUser, getReviewsByUser } = useAuth();
  
  const appointments = getAppointmentsByUser(user.id, 'doctor');
  const reports = getReportsByUser(user.id, 'doctor');
  const reviews = getReviewsByUser(user.id, 'doctor');
  
  const todayAppointments = appointments.filter(apt => 
    new Date(apt.date).toDateString() === new Date().toDateString()
  );
  
  const upcomingAppointments = appointments.filter(apt => 
    new Date(apt.date) >= new Date() && apt.status === 'confirmed'
  );
  
  const pendingAppointments = appointments.filter(apt => apt.status === 'pending');
  
  const recentReports = reports.slice(0, 3);
  const recentReviews = reviews.slice(0, 3);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return '✅';
      case 'pending':
        return '⏳';
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
      case 'completed':
        return '#17a2b8';
      default:
        return '#6c757d';
    }
  };

  return (
    <div className="doctor-dashboard">
      <div className="dashboard-header">
        <h1>Welcome, Dr. {user.name.split(' ')[1]}!</h1>
        <p>Here's your practice overview and patient management</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{user.patientsCount}</h3>
            <p>Total Patients</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3>{todayAppointments.length}</h3>
            <p>Today's Appointments</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>{pendingAppointments.length}</h3>
            <p>Pending Approvals</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3>{user.rating}</h3>
            <p>Average Rating</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Today's Appointments</h2>
            <a href="/doctor/appointments" className="view-all-link">View All</a>
          </div>
          
          <div className="appointments-list">
            {todayAppointments.length > 0 ? (
              todayAppointments.map(appointment => (
                <div key={appointment.id} className="appointment-card">
                  <div className="appointment-info">
                    <h4>{appointment.patientName}</h4>
                    <p className="appointment-time">
                      🕐 {appointment.time}
                    </p>
                    <p className="appointment-reason">{appointment.reason}</p>
                  </div>
                  <div className="appointment-status">
                    <span className={`status-badge ${appointment.status}`}>
                      {getStatusIcon(appointment.status)} {appointment.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>No appointments scheduled for today</p>
              </div>
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Medical Reports</h2>
            <a href="/doctor/reports" className="view-all-link">View All</a>
          </div>
          
          <div className="reports-list">
            {recentReports.length > 0 ? (
              recentReports.map(report => (
                <div key={report.id} className="report-card">
                  <div className="report-info">
                    <h4>{report.type}</h4>
                    <p className="report-patient">👤 {report.patientName}</p>
                    <p className="report-date">
                      📅 {new Date(report.date).toLocaleDateString()}
                    </p>
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
                <p>No recent reports</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Upcoming Appointments</h2>
            <a href="/doctor/appointments" className="view-all-link">View All</a>
          </div>
          
          <div className="appointments-list">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.slice(0, 3).map(appointment => (
                <div key={appointment.id} className="appointment-card">
                  <div className="appointment-info">
                    <h4>{appointment.patientName}</h4>
                    <p className="appointment-date">
                      📅 {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                    </p>
                    <p className="appointment-reason">{appointment.reason}</p>
                  </div>
                  <div className="appointment-status">
                    <span className={`status-badge ${appointment.status}`}>
                      {getStatusIcon(appointment.status)} {appointment.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>No upcoming appointments</p>
              </div>
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Reviews</h2>
            <a href="/doctor/reviews" className="view-all-link">View All</a>
          </div>
          
          <div className="reviews-list">
            {recentReviews.length > 0 ? (
              recentReviews.map(review => (
                <div key={review.id} className="review-card">
                  <div className="review-info">
                    <h4>{review.patientName}</h4>
                    <p className="review-rating">
                      ⭐ {review.rating}/5
                    </p>
                    <p className="review-comment">{review.comment}</p>
                    <p className="review-date">
                      📅 {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="review-status">
                    <span className={`status-badge ${review.status}`}>
                      {review.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>No recent reviews</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="dashboard-actions">
        <div className="action-cards">
          <a href="/doctor/patients" className="action-card">
            <div className="action-icon">👥</div>
            <h3>My Patients</h3>
            <p>View and manage your patient information</p>
          </a>
          
          <a href="/doctor/reports" className="action-card">
            <div className="action-icon">📋</div>
            <h3>Medical Reports</h3>
            <p>Create and review medical reports</p>
          </a>
          
          <a href="/doctor/appointments" className="action-card">
            <div className="action-icon">📅</div>
            <h3>Appointments</h3>
            <p>Manage your appointment schedule</p>
          </a>
        </div>
      </div>

      <div className="doctor-info-section">
        <div className="info-card">
          <h3>Doctor Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Name:</span>
              <span className="info-value">{user.name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Specialization:</span>
              <span className="info-value">{user.specialization}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Experience:</span>
              <span className="info-value">{user.experience}</span>
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
              <span className="info-label">Rating:</span>
              <span className="info-value">⭐ {user.rating}/5</span>
            </div>
            <div className="info-item">
              <span className="info-label">Patients Treated:</span>
              <span className="info-value">{user.patientsCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
