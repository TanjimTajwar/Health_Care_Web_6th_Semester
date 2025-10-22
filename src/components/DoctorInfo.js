import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './DoctorInfo.css';

const DoctorInfo = () => {
  const { getUsersByRole } = useAuth();
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const doctors = getUsersByRole('doctor');
  
  const specializations = ['all', ...new Set(doctors.map(doctor => doctor.specialization))];
  
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSpecialization = selectedSpecialization === 'all' || doctor.specialization === selectedSpecialization;
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSpecialization && matchesSearch;
  });

  const getRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('⭐');
    }
    return stars.join('');
  };

  return (
    <div className="doctor-info">
      <div className="doctors-header">
        <h1>Our Medical Team</h1>
        <p>Meet our experienced doctors and specialists</p>
      </div>

      <div className="doctors-filters">
        <div className="search-section">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search doctors by name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-buttons">
            <button
              className={`filter-btn ${selectedSpecialization === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedSpecialization('all')}
            >
              All Specializations ({doctors.length})
            </button>
            {specializations.slice(1).map(spec => (
              <button
                key={spec}
                className={`filter-btn ${selectedSpecialization === spec ? 'active' : ''}`}
                onClick={() => setSelectedSpecialization(spec)}
              >
                {spec} ({doctors.filter(d => d.specialization === spec).length})
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="doctors-content">
        {filteredDoctors.length > 0 ? (
          <div className="doctors-grid">
            {filteredDoctors.map(doctor => (
              <div key={doctor.id} className="doctor-card">
                <div className="doctor-header">
                  <div className="doctor-avatar">
                    <span className="avatar-icon">👨‍⚕️</span>
                  </div>
                  <div className="doctor-basic-info">
                    <h3>{doctor.name}</h3>
                    <p className="specialization">{doctor.specialization}</p>
                  </div>
                </div>

                <div className="doctor-details">
                  <div className="detail-item">
                    <span className="detail-icon">📅</span>
                    <div className="detail-content">
                      <span className="detail-label">Experience:</span>
                      <span className="detail-value">{doctor.experience}</span>
                    </div>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-icon">⭐</span>
                    <div className="detail-content">
                      <span className="detail-label">Rating:</span>
                      <span className="detail-value">
                        {getRatingStars(doctor.rating)} {doctor.rating}/5
                      </span>
                    </div>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-icon">👥</span>
                    <div className="detail-content">
                      <span className="detail-label">Patients:</span>
                      <span className="detail-value">{doctor.patientsCount} treated</span>
                    </div>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-icon">📞</span>
                    <div className="detail-content">
                      <span className="detail-label">Contact:</span>
                      <span className="detail-value">{doctor.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="doctor-actions">
                  <Link to="/patient/book-appointment" className="btn btn-primary">
                    📅 Book Appointment
                  </Link>
                  <button className="btn btn-outline-secondary">
                    📝 View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">👨‍⚕️</div>
            <h3>No Doctors Found</h3>
            <p>No doctors match your current search criteria.</p>
            <button 
              className="btn btn-primary"
              onClick={() => {
                setSearchTerm('');
                setSelectedSpecialization('all');
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <div className="doctors-summary">
        <div className="summary-card">
          <h3>Medical Team Overview</h3>
          <div className="summary-stats">
            <div className="summary-stat">
              <span className="stat-number">{doctors.length}</span>
              <span className="stat-label">Total Doctors</span>
            </div>
            <div className="summary-stat">
              <span className="stat-number">{specializations.length - 1}</span>
              <span className="stat-label">Specializations</span>
            </div>
            <div className="summary-stat">
              <span className="stat-number">
                {Math.round(doctors.reduce((sum, d) => sum + d.rating, 0) / doctors.length * 10) / 10}
              </span>
              <span className="stat-label">Average Rating</span>
            </div>
            <div className="summary-stat">
              <span className="stat-number">
                {doctors.reduce((sum, d) => sum + d.patientsCount, 0)}
              </span>
              <span className="stat-label">Total Patients</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorInfo;
