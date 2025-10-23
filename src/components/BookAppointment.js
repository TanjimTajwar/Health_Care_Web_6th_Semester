// Import React and useState hook for component state management
import React, { useState } from 'react';
// Import useAuth hook to access authentication context
import { useAuth } from '../contexts/AuthContext';
// Import CSS styles for the BookAppointment component
import './BookAppointment.css';

// BookAppointment component - Allows patients to book new appointments
const BookAppointment = () => {
  // Get user data and functions from authentication context
  const { user, getUsersByRole, addAppointment } = useAuth();
  // State for selected doctor ID
  const [selectedDoctor, setSelectedDoctor] = useState('');
  // State for appointment date
  const [appointmentDate, setAppointmentDate] = useState('');
  // State for appointment time
  const [appointmentTime, setAppointmentTime] = useState('');
  // State for appointment reason
  const [reason, setReason] = useState('');
  // State to track loading state during booking process
  const [loading, setLoading] = useState(false);
  // State to store success/error messages
  const [message, setMessage] = useState('');

  // Get all doctors from the system
  const doctors = getUsersByRole('doctor');
  
  // Available time slots for appointments
  const availableTimes = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  // Handle form submission for booking appointment
  const handleSubmit = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();
    // Set loading state to true to show loading indicator
    setLoading(true);
    // Clear any existing messages
    setMessage('');

    try {
      // Find the selected doctor's data
      const selectedDoctorData = doctors.find(d => d.id.toString() === selectedDoctor);
      
      // Create appointment data object
      const appointmentData = {
        patientId: user.id, // Current patient's ID
        doctorId: parseInt(selectedDoctor), // Selected doctor's ID
        patientName: user.name, // Current patient's name
        doctorName: selectedDoctorData.name, // Selected doctor's name
        date: appointmentDate, // Selected appointment date
        time: appointmentTime, // Selected appointment time
        reason: reason, // Reason for appointment
        status: 'pending' // Initial status is pending
      };

      // Add the appointment to the system
      addAppointment(appointmentData);
      // Show success message
      setMessage('Appointment booked successfully! You will receive a confirmation soon.');
      
      // Reset form fields after successful booking
      setSelectedDoctor('');
      setAppointmentDate('');
      setAppointmentTime('');
      setReason('');
    } catch (error) {
      // Show error message if booking fails
      setMessage('Error booking appointment. Please try again.');
    } finally {
      // Always set loading to false when done (success or error)
      setLoading(false);
    }
  };

  // Get minimum date for appointment (tomorrow)
  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Minimum tomorrow
    return today.toISOString().split('T')[0];
  };

  // Get maximum date for appointment (30 days from now)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30); // Maximum 30 days from now
    return maxDate.toISOString().split('T')[0];
  };

  // Return the JSX for the BookAppointment component
  return (
    // Main container for the booking page
    <div className="book-appointment">
      {/* Header section with title and description */}
      <div className="appointment-header">
        <h1>Book an Appointment</h1>
        <p>Schedule a consultation with one of our experienced doctors</p>
      </div>

      {/* Main content area */}
      <div className="appointment-content">
        {/* Form section */}
        <div className="appointment-form-section">
          <div className="form-card">
            <h2>Appointment Details</h2>
            
            {/* Success/error message display */}
            {message && (
              <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>
                {message}
              </div>
            )}

            {/* Appointment booking form */}
            <form onSubmit={handleSubmit} className="appointment-form">
              {/* Doctor selection dropdown */}
              <div className="form-group">
                <label htmlFor="doctor">Select Doctor</label>
                <select
                  id="doctor" // ID for label association
                  value={selectedDoctor} // Controlled select value
                  onChange={(e) => setSelectedDoctor(e.target.value)} // Handle selection changes
                  required // Required field validation
                  className="form-control" // Bootstrap styling class
                >
                  <option value="">Choose a doctor...</option>
                  {/* Map through doctors to create options */}
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialization} ({doctor.experience} experience)
                    </option>
                  ))}
                </select>
              </div>

              {/* Date and time selection row */}
              <div className="form-row">
                {/* Appointment date input */}
                <div className="form-group">
                  <label htmlFor="date">Appointment Date</label>
                  <input
                    type="date" // HTML5 date input type
                    id="date" // ID for label association
                    value={appointmentDate} // Controlled input value
                    onChange={(e) => setAppointmentDate(e.target.value)} // Handle date changes
                    min={getMinDate()} // Minimum date (tomorrow)
                    max={getMaxDate()} // Maximum date (30 days from now)
                    required // Required field validation
                    className="form-control" // Bootstrap styling class
                  />
                </div>

                {/* Preferred time selection */}
                <div className="form-group">
                  <label htmlFor="time">Preferred Time</label>
                  <select
                    id="time" // ID for label association
                    value={appointmentTime} // Controlled select value
                    onChange={(e) => setAppointmentTime(e.target.value)} // Handle time changes
                    required // Required field validation
                    className="form-control" // Bootstrap styling class
                  >
                    <option value="">Select time...</option>
                    {/* Map through available time slots */}
                    {availableTimes.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Reason for visit textarea */}
              <div className="form-group">
                <label htmlFor="reason">Reason for Visit</label>
                <textarea
                  id="reason" // ID for label association
                  value={reason} // Controlled textarea value
                  onChange={(e) => setReason(e.target.value)} // Handle text changes
                  required // Required field validation
                  className="form-control" // Bootstrap styling class
                  rows="4" // Number of visible text lines
                  placeholder="Please describe the reason for your appointment..." // Placeholder text
                />
              </div>

              {/* Submit button */}
              <button
                type="submit" // Form submit button
                disabled={loading} // Disable button while loading
                className="btn btn-primary submit-btn" // Bootstrap styling classes
              >
                {/* Show loading text or normal text based on loading state */}
                {loading ? 'Booking Appointment...' : 'Book Appointment'}
              </button>
            </form>
          </div>
        </div>

        {/* Available doctors section */}
        <div className="doctors-section">
          <h2>Available Doctors</h2>
          <div className="doctors-grid">
            {/* Map through doctors to display doctor cards */}
            {doctors.map(doctor => (
              <div key={doctor.id} className="doctor-card">
                {/* Doctor avatar */}
                <div className="doctor-avatar">
                  <span className="avatar-icon">👨‍⚕️</span>
                </div>
                {/* Doctor information */}
                <div className="doctor-info">
                  <h3>{doctor.name}</h3>
                  <p className="specialization">{doctor.specialization}</p>
                  <p className="experience">{doctor.experience} experience</p>
                  <div className="doctor-rating">
                    <span className="rating-stars">⭐ {doctor.rating}</span>
                    <span className="patients-count">({doctor.patientsCount} patients)</span>
                  </div>
                </div>
                {/* Doctor selection button */}
                <div className="doctor-actions">
                  <button
                    type="button" // Button type (not submit)
                    className="btn btn-outline-primary btn-sm" // Bootstrap styling classes
                    onClick={() => setSelectedDoctor(doctor.id.toString())} // Handle doctor selection
                  >
                    Select Doctor
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Appointment guidelines section */}
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

// Export the BookAppointment component as the default export
// This allows other files to import and use this component
export default BookAppointment;
