// Import React and useState hook for component state management
import React, { useState } from 'react';
// Import navigation components from react-router-dom
// useNavigate: Hook for programmatic navigation
// Link: Component for creating navigation links
import { useNavigate, Link } from 'react-router-dom';
// Import useAuth hook to access authentication functions
import { useAuth } from '../contexts/AuthContext';
// Import CSS styles for the Register component
import './Register.css';

// Register component - Handles user registration for new accounts
const Register = () => {
  // State to store all form input data
  const [formData, setFormData] = useState({
    name: '', // User's full name
    email: '', // User's email address
    password: '', // User's password
    confirmPassword: '', // Password confirmation
    role: 'patient', // User role (default to patient)
    phone: '', // User's phone number
    specialization: '', // Doctor's medical specialization
    experience: '', // Doctor's years of experience
    age: '', // Patient's age
    gender: '', // Patient's gender
    medicalHistory: '', // Patient's medical history
    allergies: '' // Patient's known allergies
  });
  // State to store and display error messages
  const [error, setError] = useState('');
  // State to track loading state during registration process
  const [loading, setLoading] = useState(false);
  
  // Get register function from authentication context
  const { register } = useAuth();
  // Get navigate function for programmatic navigation
  const navigate = useNavigate();

  // Handle input field changes
  const handleChange = (e) => {
    // Update form data with new input value
    // Uses computed property name to update the correct field
    setFormData({
      ...formData, // Spread existing form data
      [e.target.name]: e.target.value // Update the specific field that changed
    });
    // Clear any existing error messages when user starts typing
    setError('');
  };

  // Handle form submission for registration
  const handleSubmit = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();
    // Set loading state to true to show loading indicator
    setLoading(true);
    // Clear any existing error messages
    setError('');

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      // Check if passwords match
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      // Check minimum password length
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      // Create user data object with basic information
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phone: formData.phone
      };

      // Add role-specific fields based on selected role
      if (formData.role === 'doctor') {
        // Add doctor-specific information
        userData.specialization = formData.specialization;
        userData.experience = formData.experience;
      } else if (formData.role === 'patient') {
        // Add patient-specific information
        userData.age = formData.age;
        userData.gender = formData.gender;
        userData.medicalHistory = formData.medicalHistory;
        userData.allergies = formData.allergies;
      }

      // Attempt to register the new user
      const result = register(userData);
      if (result.success) {
        // If registration successful, redirect to login page
        navigate('/login');
      } else {
        // If registration failed, display error message
        setError(result.message || 'Registration failed');
      }
    } catch (err) {
      // If an unexpected error occurs, display generic error message
      setError('An error occurred during registration');
    } finally {
      // Always set loading to false when done (success or error)
      setLoading(false);
    }
  };

  // Return the JSX for the Register component
  return (
    // Main container for the registration page
    <div className="register-container">
      {/* Registration card containing the form */}
      <div className="register-card">
        {/* Header section with title and subtitle */}
        <div className="register-header">
          <h2>Jobra Healthcare</h2>
          <p>Create your account</p>
        </div>

        {/* Error message display - only shows if there's an error */}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {/* Registration form */}
        <form onSubmit={handleSubmit} className="register-form">
          {/* First row of form fields */}
          <div className="form-row">
            {/* Full name input field */}
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text" // Text input type
                id="name" // ID for label association
                name="name" // Name attribute for form data
                value={formData.name} // Controlled input value
                onChange={handleChange} // Handle input changes
                required // Required field validation
                className="form-control" // Bootstrap styling class
                placeholder="Enter your full name" // Placeholder text
              />
            </div>

            {/* Email input field */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email" // HTML5 email input type for validation
                id="email" // ID for label association
                name="email" // Name attribute for form data
                value={formData.email} // Controlled input value
                onChange={handleChange} // Handle input changes
                required // Required field validation
                className="form-control" // Bootstrap styling class
                placeholder="Enter your email" // Placeholder text
              />
            </div>
          </div>

          {/* Second row of form fields */}
          <div className="form-row">
            {/* Password input field */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password" // Password input type (hides characters)
                id="password" // ID for label association
                name="password" // Name attribute for form data
                value={formData.password} // Controlled input value
                onChange={handleChange} // Handle input changes
                required // Required field validation
                className="form-control" // Bootstrap styling class
                placeholder="Create a password" // Placeholder text
              />
            </div>

            {/* Password confirmation input field */}
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password" // Password input type (hides characters)
                id="confirmPassword" // ID for label association
                name="confirmPassword" // Name attribute for form data
                value={formData.confirmPassword} // Controlled input value
                onChange={handleChange} // Handle input changes
                required // Required field validation
                className="form-control" // Bootstrap styling class
                placeholder="Confirm your password" // Placeholder text
              />
            </div>
          </div>

          {/* Third row of form fields */}
          <div className="form-row">
            {/* Role selection dropdown */}
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role" // ID for label association
                name="role" // Name attribute for form data
                value={formData.role} // Controlled select value
                onChange={handleChange} // Handle selection changes
                required // Required field validation
                className="form-control" // Bootstrap styling class
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>

            {/* Phone number input field */}
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel" // HTML5 telephone input type
                id="phone" // ID for label association
                name="phone" // Name attribute for form data
                value={formData.phone} // Controlled input value
                onChange={handleChange} // Handle input changes
                required // Required field validation
                className="form-control" // Bootstrap styling class
                placeholder="Enter your phone number" // Placeholder text
              />
            </div>
          </div>

          {/* Doctor-specific fields - only shown when role is 'doctor' */}
          {formData.role === 'doctor' && (
            <div className="role-specific-fields">
              <h5>Doctor Information</h5>
              <div className="form-row">
                {/* Medical specialization dropdown */}
                <div className="form-group">
                  <label htmlFor="specialization">Specialization</label>
                  <select
                    id="specialization" // ID for label association
                    name="specialization" // Name attribute for form data
                    value={formData.specialization} // Controlled select value
                    onChange={handleChange} // Handle selection changes
                    required // Required field validation
                    className="form-control" // Bootstrap styling class
                  >
                    <option value="">Select specialization</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Gynecology">Gynecology</option>
                    <option value="General Medicine">General Medicine</option>
                    <option value="Psychiatry">Psychiatry</option>
                  </select>
                </div>

                {/* Years of experience input field */}
                <div className="form-group">
                  <label htmlFor="experience">Years of Experience</label>
                  <input
                    type="number" // Number input type for numeric values
                    id="experience" // ID for label association
                    name="experience" // Name attribute for form data
                    value={formData.experience} // Controlled input value
                    onChange={handleChange} // Handle input changes
                    required // Required field validation
                    className="form-control" // Bootstrap styling class
                    placeholder="Years of experience" // Placeholder text
                    min="0" // Minimum value constraint
                  />
                </div>
              </div>
            </div>
          )}

          {/* Patient-specific fields - only shown when role is 'patient' */}
          {formData.role === 'patient' && (
            <div className="role-specific-fields">
              <h5>Patient Information</h5>
              <div className="form-row">
                {/* Age input field */}
                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <input
                    type="number" // Number input type for numeric values
                    id="age" // ID for label association
                    name="age" // Name attribute for form data
                    value={formData.age} // Controlled input value
                    onChange={handleChange} // Handle input changes
                    required // Required field validation
                    className="form-control" // Bootstrap styling class
                    placeholder="Enter your age" // Placeholder text
                    min="1" // Minimum age constraint
                    max="120" // Maximum age constraint
                  />
                </div>

                {/* Gender selection dropdown */}
                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender" // ID for label association
                    name="gender" // Name attribute for form data
                    value={formData.gender} // Controlled select value
                    onChange={handleChange} // Handle selection changes
                    required // Required field validation
                    className="form-control" // Bootstrap styling class
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Medical history textarea */}
              <div className="form-group">
                <label htmlFor="medicalHistory">Medical History</label>
                <textarea
                  id="medicalHistory" // ID for label association
                  name="medicalHistory" // Name attribute for form data
                  value={formData.medicalHistory} // Controlled textarea value
                  onChange={handleChange} // Handle input changes
                  className="form-control" // Bootstrap styling class
                  placeholder="Enter your medical history (optional)" // Placeholder text
                  rows="3" // Number of visible text lines
                />
              </div>

              {/* Allergies textarea */}
              <div className="form-group">
                <label htmlFor="allergies">Allergies</label>
                <textarea
                  id="allergies" // ID for label association
                  name="allergies" // Name attribute for form data
                  value={formData.allergies} // Controlled textarea value
                  onChange={handleChange} // Handle input changes
                  className="form-control" // Bootstrap styling class
                  placeholder="Enter any known allergies (optional)" // Placeholder text
                  rows="2" // Number of visible text lines
                />
              </div>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit" // Form submit button
            disabled={loading} // Disable button while loading
            className="btn btn-primary register-btn" // Bootstrap styling classes
          >
            {/* Show loading text or normal text based on loading state */}
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Footer section with login link */}
        <div className="register-footer">
          <p>
            Already have an account?{' '}
            {/* Link to login page */}
            <Link to="/login" className="login-link">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// Export the Register component as the default export
// This allows other files to import and use this component
export default Register;
