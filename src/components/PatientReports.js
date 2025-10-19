import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './PatientReports.css';

const PatientReports = () => {
  const { user, getReportsByUser } = useAuth();
  const [filter, setFilter] = useState('all');
  
  const reports = getReportsByUser(user.id, 'patient');
  
  const filteredReports = reports.filter(report => {
    if (filter === 'all') return true;
    return report.status === filter;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'normal':
        return '✅';
      case 'abnormal':
        return '⚠️';
      default:
        return '📋';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal':
        return '#28a745';
      case 'abnormal':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  return (
    <div className="patient-reports">
      <div className="reports-header">
        <h1>My Medical Reports</h1>
        <p>View and manage your medical test results and reports</p>
      </div>

      <div className="reports-filters">
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Reports ({reports.length})
          </button>
          <button
            className={`filter-btn ${filter === 'normal' ? 'active' : ''}`}
            onClick={() => setFilter('normal')}
          >
            Normal ({reports.filter(r => r.status === 'normal').length})
          </button>
          <button
            className={`filter-btn ${filter === 'abnormal' ? 'active' : ''}`}
            onClick={() => setFilter('abnormal')}
          >
            Abnormal ({reports.filter(r => r.status === 'abnormal').length})
          </button>
        </div>
      </div>

      <div className="reports-content">
        {filteredReports.length > 0 ? (
          <div className="reports-grid">
            {filteredReports.map(report => (
              <div key={report.id} className="report-card">
                <div className="report-header">
                  <div className="report-type">
                    <span className="report-icon">📋</span>
                    <h3>{report.type}</h3>
                  </div>
                  <div className="report-status">
                    <span 
                      className="status-indicator"
                      style={{ color: getStatusColor(report.status) }}
                    >
                      {getStatusIcon(report.status)}
                    </span>
                    <span 
                      className="status-text"
                      style={{ color: getStatusColor(report.status) }}
                    >
                      {report.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="report-details">
                  <div className="detail-item">
                    <span className="detail-label">Date:</span>
                    <span className="detail-value">
                      {new Date(report.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-label">Doctor:</span>
                    <span className="detail-value">{report.doctorName}</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-label">Results:</span>
                    <span className="detail-value">{report.results}</span>
                  </div>
                </div>

                <div className="report-actions">
                  <button className="btn btn-outline-primary btn-sm">
                    📄 View Details
                  </button>
                  <button className="btn btn-outline-secondary btn-sm">
                    📥 Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No Reports Found</h3>
            <p>
              {filter === 'all' 
                ? "You don't have any medical reports yet."
                : `No reports with status "${filter}" found.`
              }
            </p>
            <a href="/patient/book-appointment" className="btn btn-primary">
              Book an Appointment
            </a>
          </div>
        )}
      </div>

      <div className="reports-summary">
        <div className="summary-card">
          <h3>Reports Summary</h3>
          <div className="summary-stats">
            <div className="summary-stat">
              <span className="stat-number">{reports.length}</span>
              <span className="stat-label">Total Reports</span>
            </div>
            <div className="summary-stat">
              <span className="stat-number" style={{ color: '#28a745' }}>
                {reports.filter(r => r.status === 'normal').length}
              </span>
              <span className="stat-label">Normal</span>
            </div>
            <div className="summary-stat">
              <span className="stat-number" style={{ color: '#dc3545' }}>
                {reports.filter(r => r.status === 'abnormal').length}
              </span>
              <span className="stat-label">Abnormal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientReports;
