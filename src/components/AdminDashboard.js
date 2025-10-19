import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user, mockUsers, mockAppointments, mockReports, mockReviews, updateReviewStatus } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const doctors = mockUsers.filter(u => u.role === 'doctor');
  const patients = mockUsers.filter(u => u.role === 'patient');
  const pendingReviews = mockReviews.filter(r => r.status === 'pending');

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return '✅';
      case 'pending':
        return '⏳';
      case 'rejected':
        return '❌';
      default:
        return '📝';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return '#28a745';
      case 'pending':
        return '#ffc107';
      case 'rejected':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const handleReviewAction = (reviewId, action) => {
    updateReviewStatus(reviewId, action);
  };

  const renderOverview = () => (
    <div className="overview-content">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{mockUsers.length}</h3>
            <p>Total Users</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">👨‍⚕️</div>
          <div className="stat-content">
            <h3>{doctors.length}</h3>
            <p>Doctors</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">👤</div>
          <div className="stat-content">
            <h3>{patients.length}</h3>
            <p>Patients</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3>{mockAppointments.length}</h3>
            <p>Appointments</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <h3>{mockReports.length}</h3>
            <p>Medical Reports</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3>{mockReviews.length}</h3>
            <p>Reviews</p>
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-icon">📅</span>
            <div className="activity-content">
              <p><strong>New appointment</strong> booked by {mockAppointments[0]?.patientName}</p>
              <span className="activity-time">2 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <span className="activity-icon">⭐</span>
            <div className="activity-content">
              <p><strong>New review</strong> submitted by {mockReviews[0]?.patientName}</p>
              <span className="activity-time">4 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <span className="activity-icon">📋</span>
            <div className="activity-content">
              <p><strong>Medical report</strong> created by {mockReports[0]?.doctorName}</p>
              <span className="activity-time">6 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="user-management-content">
      <div className="users-section">
        <h3>Doctors</h3>
        <div className="users-grid">
          {doctors.map(doctor => (
            <div key={doctor.id} className="user-card">
              <div className="user-avatar">👨‍⚕️</div>
              <div className="user-info">
                <h4>{doctor.name}</h4>
                <p>{doctor.specialization}</p>
                <p>{doctor.experience}</p>
                <p>⭐ {doctor.rating}/5</p>
              </div>
              <div className="user-actions">
                <button className="btn btn-outline-primary btn-sm">Edit</button>
                <button className="btn btn-outline-danger btn-sm">Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="users-section">
        <h3>Patients</h3>
        <div className="users-grid">
          {patients.map(patient => (
            <div key={patient.id} className="user-card">
              <div className="user-avatar">👤</div>
              <div className="user-info">
                <h4>{patient.name}</h4>
                <p>{patient.email}</p>
                <p>{patient.phone}</p>
                <p>Age: {patient.age}</p>
              </div>
              <div className="user-actions">
                <button className="btn btn-outline-primary btn-sm">Edit</button>
                <button className="btn btn-outline-danger btn-sm">Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReviewManagement = () => (
    <div className="review-management-content">
      <div className="pending-reviews">
        <h3>Pending Reviews ({pendingReviews.length})</h3>
        {pendingReviews.length > 0 ? (
          <div className="reviews-list">
            {pendingReviews.map(review => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div className="review-info">
                    <h4>{review.patientName}</h4>
                    <p>Review for: {review.doctorName}</p>
                    <p>Rating: ⭐ {review.rating}/5</p>
                    <p>Date: {new Date(review.date).toLocaleDateString()}</p>
                  </div>
                  <div className="review-status">
                    <span className="status-badge pending">⏳ Pending</span>
                  </div>
                </div>
                <div className="review-content">
                  <p>"{review.comment}"</p>
                </div>
                <div className="review-actions">
                  <button 
                    className="btn btn-success btn-sm"
                    onClick={() => handleReviewAction(review.id, 'approved')}
                  >
                    ✅ Approve
                  </button>
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => handleReviewAction(review.id, 'rejected')}
                  >
                    ❌ Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No pending reviews</p>
          </div>
        )}
      </div>

      <div className="all-reviews">
        <h3>All Reviews</h3>
        <div className="reviews-list">
          {mockReviews.map(review => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="review-info">
                  <h4>{review.patientName}</h4>
                  <p>Review for: {review.doctorName}</p>
                  <p>Rating: ⭐ {review.rating}/5</p>
                  <p>Date: {new Date(review.date).toLocaleDateString()}</p>
                </div>
                <div className="review-status">
                  <span 
                    className={`status-badge ${review.status}`}
                    style={{ color: getStatusColor(review.status) }}
                  >
                    {getStatusIcon(review.status)} {review.status}
                  </span>
                </div>
              </div>
              <div className="review-content">
                <p>"{review.comment}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStatistics = () => (
    <div className="statistics-content">
      <div className="stats-overview">
        <h3>System Statistics</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <h4>Appointment Statistics</h4>
            <p>Total: {mockAppointments.length}</p>
            <p>Confirmed: {mockAppointments.filter(a => a.status === 'confirmed').length}</p>
            <p>Pending: {mockAppointments.filter(a => a.status === 'pending').length}</p>
          </div>
          <div className="stat-item">
            <h4>Report Statistics</h4>
            <p>Total: {mockReports.length}</p>
            <p>Normal: {mockReports.filter(r => r.status === 'normal').length}</p>
            <p>Abnormal: {mockReports.filter(r => r.status === 'abnormal').length}</p>
          </div>
          <div className="stat-item">
            <h4>Review Statistics</h4>
            <p>Total: {mockReviews.length}</p>
            <p>Approved: {mockReviews.filter(r => r.status === 'approved').length}</p>
            <p>Pending: {mockReviews.filter(r => r.status === 'pending').length}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>System administration and management</p>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          👥 User Management
        </button>
        <button 
          className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          ⭐ Review Management
        </button>
        <button 
          className={`tab-btn ${activeTab === 'statistics' ? 'active' : ''}`}
          onClick={() => setActiveTab('statistics')}
        >
          📈 Statistics
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'users' && renderUserManagement()}
        {activeTab === 'reviews' && renderReviewManagement()}
        {activeTab === 'statistics' && renderStatistics()}
      </div>
    </div>
  );
};

export default AdminDashboard;
