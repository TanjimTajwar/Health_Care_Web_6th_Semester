import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = login(formData.email, formData.password);
      if (result.success) {
        // Redirect based on role
        switch (result.user.role) {
          case 'admin':
            navigate('/admin/dashboard');
            break;
          case 'doctor':
            navigate('/doctor/dashboard');
            break;
          case 'patient':
            navigate('/patient/dashboard');
            break;
          default:
            navigate('/');
        }
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (role) => {
    let email, password;
    switch (role) {
      case 'admin':
        email = 'admin@jobra.com';
        password = 'admin123';
        break;
      case 'doctor':
        email = 'dr.smith@jobra.com';
        password = 'doctor123';
        break;
      case 'patient':
        email = 'patient1@jobra.com';
        password = 'patient123';
        break;
      default:
        return;
    }
    
    setFormData({ email, password });
    const result = login(email, password);
    if (result.success) {
      switch (result.user.role) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'doctor':
          navigate('/doctor/dashboard');
          break;
        case 'patient':
          navigate('/patient/dashboard');
          break;
        default:
          navigate('/');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Jobra Healthcare</h2>
          <p>Sign in to your account</p>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary login-btn"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="demo-credentials">
          <h5>Demo Credentials</h5>
          <div className="demo-buttons">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={() => handleDemoLogin('admin')}
            >
              Admin Demo
            </button>
            <button
              type="button"
              className="btn btn-outline-success btn-sm"
              onClick={() => handleDemoLogin('doctor')}
            >
              Doctor Demo
            </button>
            <button
              type="button"
              className="btn btn-outline-info btn-sm"
              onClick={() => handleDemoLogin('patient')}
            >
              Patient Demo
            </button>
          </div>
        </div>

        <div className="login-footer">
          <p>
            Don't have an account?{' '}
            <a href="/register" className="register-link">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
