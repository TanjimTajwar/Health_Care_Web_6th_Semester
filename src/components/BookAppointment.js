import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './BookAppointment.css';

const BookAppointment = () => {
  const { user, getUsersByRole, addAppointment } = useAuth();
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const doctors = getUsersByRole('doctor');
  
  const availableTimes = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const selectedDoctorData = doctors.find(d => d.id.toString() === selectedDoctor);
      
      const appointmentData = {
        patientId: user.id,
        doctorId: parseInt(selectedDoctor),
        patientName: user.name,
        doctorName: selectedDoctorData.name,
        date: appointmentDate,
        time: appointmentTime,
        reason: reason,
        status: 'pending'
      };

      addAppointment(appointmentData);
      setMessage('Appointment booked successfully! You will receive a confirmation soon.');
      
      // Reset form
      setSelectedDoctor('');
      setAppointmentDate('');
      setAppointmentTime('');
      setReason('');
    } catch (error) {
      setMessage('Error booking appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Minimum tomorrow
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30); // Maximum 30 days from now
    return maxDate.toISOString().split('T')[0];
  };

  return (
    <div className="book-appointment">
      <div className="appointment-header">
        <h1>Book an Appointment</h1>
        <p>Schedule a consultation with one of our experienced doctors</p>
      </div>

      <div className="appointment-content">
        <div className="appointment-form-section">
          <div className="form-card">
            <h2>Appointment Details</h2>
            
            {message && (
              <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="appointment-form">
              <div className="form-group">
                <label htmlFor="doctor">Select Doctor</label>
                <select
                  id="doctor"
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  required
                  className="form-control"
                >
                  <option value="">Choose a doctor...</option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialization} ({doctor.experience} experience)
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Appointment Date</label>
                  <input
                    type="date"
                    id="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    min={getMinDate()}
                    max={getMaxDate()}
                    required
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="time">Preferred Time</label>
                  <select
                    id="time"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    required
                    className="form-control"
                  >
                    <option value="">Select time...</option>
                    {availableTimes.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="reason">Reason for Visit</label>
                <textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                  className="form-control"
                  rows="4"
                  placeholder="Please describe the reason for your appointment..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary submit-btn"
              >
                {loading ? 'Booking Appointment...' : 'Book Appointment'}
              </button>
            </form>
          </div>
        </div>

        <div className="doctors-section">
          <h2>Available Doctors</h2>
          <div className="doctors-grid">
            {doctors.map(doctor => (
              <div key={doctor.id} className="doctor-card">
                <div className="doctor-avatar">
                  <span className="avatar-icon">👨‍⚕️</span>
                </div>
                <div className="doctor-info">
                  <h3>{doctor.name}</h3>
                  <p className="specialization">{doctor.specialization}</p>
                  <p className="experience">{doctor.experience} experience</p>
                  <div className="doctor-rating">
                    <span className="rating-stars">⭐ {doctor.rating}</span>
                    <span className="patients-count">({doctor.patientsCount} patients)</span>
                  </div>
                </div>
                <div className="doctor-actions">
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => setSelectedDoctor(doctor.id.toString())}
                  >
                    Select Doctor
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="appointment-info">
        <div className="info-card">
          <h3>Appointment Guidelines</h3>
          <ul className="guidelines-list">
            <li>📅 Appointments can be booked up to 30 days in advance</li>
            <li>⏰ Please arrive 15 minutes before your scheduled time</li>
            <li>📞 You will receive a confirmation call within 24 hours</li>
            <li>🔄 You can reschedule or cancel up to 24 hours before your appointment</li>
            <li>📋 Please bring a valid ID and insurance card (if applicable)</li>
            <li>💊 Bring a list of current medications and medical history</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
