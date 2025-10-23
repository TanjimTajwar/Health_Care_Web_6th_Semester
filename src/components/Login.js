// Import React and useState hook for component state management
import React, { useState } from 'react';
// Import navigation hooks from react-router-dom
// useNavigate: Hook for programmatic navigation
// Link: Component for creating navigation links
import { useNavigate, Link } from 'react-router-dom';
// Import useAuth hook to access authentication functions
import { useAuth } from '../contexts/AuthContext';
// Import CSS styles for the Login component
import './Login.css';

// Login component - Handles user authentication
const Login = () => {
  // State to store form input data (email and password)
  const [formData, setFormData] = useState({
    email: '', // User's email address
    password: '' // User's password
  });
  // State to store and display error messages
  const [error, setError] = useState('');
  // State to track loading state during login process
  const [loading, setLoading] = useState(false);
  
  // Get login function from authentication context
  const { login } = useAuth();
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

  // Handle form submission for login
  const handleSubmit = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();
    // Set loading state to true to show loading indicator
    setLoading(true);
    // Clear any existing error messages
    setError('');

    try {
      // Attempt to login with provided credentials
      const result = login(formData.email, formData.password);
      if (result.success) {
        // If login successful, redirect user based on their role
        switch (result.user.role) {
          case 'admin':
            // Redirect admin to admin dashboard
            navigate('/admin/dashboard');
            break;
          case 'doctor':
            // Redirect doctor to doctor dashboard
            navigate('/doctor/dashboard');
            break;
          case 'patient':
            // Redirect patient to patient dashboard
            navigate('/patient/dashboard');
            break;
          default:
            // Default redirect to home page
            navigate('/');
        }
      } else {
        // If login failed, display error message
        setError(result.message);
      }
    } catch (err) {
      // If an unexpected error occurs, display generic error message
      setError('An error occurred during login');
    } finally {
      // Always set loading to false when done (success or error)
      setLoading(false);
    }
  };

  // Handle demo login for testing purposes
  // This function provides quick access to different user roles
  const handleDemoLogin = (role) => {
    let email, password;
    // Set credentials based on the selected role
    switch (role) {
      case 'admin':
        // Admin demo credentials
        email = 'admin@jobra.com';
        password = 'admin123';
        break;
      case 'doctor':
        // Doctor demo credentials
        email = 'dr.rahman@jobra.com';
        password = 'doctor123';
        break;
      case 'patient':
        // Patient demo credentials
        email = 'patient1@jobra.com';
        password = 'patient123';
        break;
      default:
        // If invalid role, exit function
        return;
    }
    
    // Update form data with demo credentials
    setFormData({ email, password });
    // Attempt login with demo credentials
    const result = login(email, password);
    if (result.success) {
      // If login successful, redirect based on user role
      switch (result.user.role) {
        case 'admin':
          // Redirect admin to admin dashboard
          navigate('/admin/dashboard');
          break;
        case 'doctor':
          // Redirect doctor to doctor dashboard
          navigate('/doctor/dashboard');
          break;
        case 'patient':
          // Redirect patient to patient dashboard
          navigate('/patient/dashboard');
          break;
        default:
          // Default redirect to home page
          navigate('/');
      }
    }
  };

  // Return the JSX for the Login component
  return (
    // Main container for the login page
    <div className="login-container">
      {/* Login card containing the form */}
      <div className="login-card">
        {/* Header section with title and subtitle */}
        <div className="login-header">
          <h2>Jobra Healthcare</h2>
          <p>Sign in to your account</p>
        </div>

        {/* Error message display - only shows if there's an error */}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {/* Login form */}
        <form onSubmit={handleSubmit} className="login-form">
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
              placeholder="Enter your password" // Placeholder text
            />
          </div>

          {/* Submit button */}
          <button
            type="submit" // Form submit button
            disabled={loading} // Disable button while loading
            className="btn btn-primary login-btn" // Bootstrap styling classes
          >
            {/* Show loading text or normal text based on loading state */}
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Demo credentials section for testing */}
        <div className="demo-credentials">
          <h5>Demo Credentials</h5>
          <div className="demo-buttons">
            {/* Admin demo button */}
            <button
              type="button" // Button type (not submit)
              className="btn btn-outline-primary btn-sm" // Bootstrap styling classes
              onClick={() => handleDemoLogin('admin')} // Handle admin demo login
            >
              Admin Demo
            </button>
            {/* Doctor demo button */}
            <button
              type="button" // Button type (not submit)
              className="btn btn-outline-success btn-sm" // Bootstrap styling classes
              onClick={() => handleDemoLogin('doctor')} // Handle doctor demo login
            >
              Doctor Demo
            </button>
            {/* Patient demo button */}
            <button
              type="button" // Button type (not submit)
              className="btn btn-outline-info btn-sm" // Bootstrap styling classes
              onClick={() => handleDemoLogin('patient')} // Handle patient demo login
            >
              Patient Demo
            </button>
          </div>
        </div>

        {/* Footer section with registration link */}
        <div className="login-footer">
          <p>
            Don't have an account?{' '}
            {/* Link to registration page */}
            <Link to="/register" className="register-link">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// Export the Login component as the default export
// This allows other files to import and use this component
export default Login;
