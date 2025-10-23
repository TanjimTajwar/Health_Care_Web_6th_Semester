// Import React library - the core library for building user interfaces
import React from 'react';
// Import routing components from react-router-dom for navigation
// BrowserRouter: Provides routing functionality using browser history API
// Routes: Container for all route definitions
// Route: Defines individual routes with paths and components
// Navigate: Component for programmatic navigation/redirects
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Import AuthProvider context to manage authentication state across the app
import { AuthProvider } from './contexts/AuthContext';
// Import ProtectedRoute component to protect routes that require authentication
import ProtectedRoute from './components/ProtectedRoute';
// Import Navigation component for the main navigation bar
import Navigation from './components/Navigation';

// Authentication Components - These handle user login and registration
import Login from './components/Login';
import Register from './components/Register';

// Patient Components - These are accessible only to patients
import PatientDashboard from './components/PatientDashboard';
import PatientReports from './components/PatientReports';
import PatientAppointments from './components/PatientAppointments';
import BookAppointment from './components/BookAppointment';
import DoctorInfo from './components/DoctorInfo';
import Reviews from './components/Reviews';

// Doctor Components - These are accessible only to doctors
import DoctorDashboard from './components/DoctorDashboard';

// Admin Components - These are accessible only to administrators
import AdminDashboard from './components/AdminDashboard';

// Import the main CSS file for global styles
import './App.css';

// Main App component - This is the root component of the application
function App() {
  return (
    // AuthProvider wraps the entire app to provide authentication context
    // This allows any component to access user authentication state
    <AuthProvider>
      {/* Router component enables client-side routing */}
      {/* This allows navigation without page refreshes */}
      <Router>
        {/* Main app container with CSS class for styling */}
        <div className="App">
          {/* Navigation component - renders the main navigation bar */}
          <Navigation />
          {/* Main content area where different pages/components will render */}
          <main className="main-content">
            {/* Routes container - defines all possible routes in the application */}
            <Routes>
              {/* Public Routes - These routes are accessible without authentication */}
              {/* Login route - displays the login form */}
              <Route path="/login" element={<Login />} />
              {/* Register route - displays the registration form */}
              <Route path="/register" element={<Register />} />
              
              {/* Default redirect - when user visits root path, redirect to login */}
              {/* 'replace' prop replaces current history entry instead of adding new one */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              
              {/* Patient Routes - These routes are only accessible to patients */}
              {/* Patient Dashboard route - main dashboard for patients */}
              <Route 
                path="/patient/dashboard" 
                element={
                  // ProtectedRoute ensures only users with 'patient' role can access
                  <ProtectedRoute allowedRoles={['patient']}>
                    <PatientDashboard />
                  </ProtectedRoute>
                } 
              />
              {/* Patient Reports route - allows patients to view their medical reports */}
              <Route 
                path="/patient/reports" 
                element={
                  // ProtectedRoute ensures only patients can view their reports
                  <ProtectedRoute allowedRoles={['patient']}>
                    <PatientReports />
                  </ProtectedRoute>
                } 
              />
              {/* Patient Appointments route - shows patient's appointment history */}
              <Route 
                path="/patient/appointments" 
                element={
                  // ProtectedRoute ensures only patients can view their appointments
                  <ProtectedRoute allowedRoles={['patient']}>
                    <PatientAppointments />
                  </ProtectedRoute>
                } 
              />
              {/* Book Appointment route - allows patients to book new appointments */}
              <Route 
                path="/patient/book-appointment" 
                element={
                  // ProtectedRoute ensures only patients can book appointments
                  <ProtectedRoute allowedRoles={['patient']}>
                    <BookAppointment />
                  </ProtectedRoute>
                } 
              />
              {/* Doctor Info route - allows patients to view doctor information */}
              <Route 
                path="/patient/doctors" 
                element={
                  // ProtectedRoute ensures only patients can view doctor info
                  <ProtectedRoute allowedRoles={['patient']}>
                    <DoctorInfo />
                  </ProtectedRoute>
                } 
              />
              {/* Reviews route - allows patients to write reviews for doctors */}
              <Route 
                path="/patient/reviews" 
                element={
                  // ProtectedRoute ensures only patients can write reviews
                  <ProtectedRoute allowedRoles={['patient']}>
                    <Reviews />
                  </ProtectedRoute>
                } 
              />
              
              {/* Doctor Routes - These routes are only accessible to doctors */}
              {/* Doctor Dashboard route - main dashboard for doctors */}
              <Route 
                path="/doctor/dashboard" 
                element={
                  // ProtectedRoute ensures only users with 'doctor' role can access
                  <ProtectedRoute allowedRoles={['doctor']}>
                    <DoctorDashboard />
                  </ProtectedRoute>
                } 
              />
              {/* Doctor Patients route - placeholder for patient management feature */}
              <Route 
                path="/doctor/patients" 
                element={
                  // ProtectedRoute ensures only doctors can access patient management
                  <ProtectedRoute allowedRoles={['doctor']}>
                    {/* Placeholder content for future patient management feature */}
                    <div className="coming-soon">
                      <h2>Patient Management</h2>
                      <p>This feature is coming soon!</p>
                    </div>
                  </ProtectedRoute>
                } 
              />
              {/* Doctor Reports route - placeholder for medical reports management */}
              <Route 
                path="/doctor/reports" 
                element={
                  // ProtectedRoute ensures only doctors can access reports management
                  <ProtectedRoute allowedRoles={['doctor']}>
                    {/* Placeholder content for future reports management feature */}
                    <div className="coming-soon">
                      <h2>Medical Reports Management</h2>
                      <p>This feature is coming soon!</p>
                    </div>
                  </ProtectedRoute>
                } 
              />
              {/* Doctor Appointments route - placeholder for appointment management */}
              <Route 
                path="/doctor/appointments" 
                element={
                  // ProtectedRoute ensures only doctors can access appointment management
                  <ProtectedRoute allowedRoles={['doctor']}>
                    {/* Placeholder content for future appointment management feature */}
                    <div className="coming-soon">
                      <h2>Appointment Management</h2>
                      <p>This feature is coming soon!</p>
                    </div>
                  </ProtectedRoute>
                } 
              />
              
              {/* Admin Routes - These routes are only accessible to administrators */}
              {/* Admin Dashboard route - main dashboard for administrators */}
              <Route 
                path="/admin/dashboard" 
                element={
                  // ProtectedRoute ensures only users with 'admin' role can access
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              {/* Admin Users route - user management for administrators */}
              <Route 
                path="/admin/users" 
                element={
                  // ProtectedRoute ensures only admins can access user management
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              {/* Admin Reviews route - review management for administrators */}
              <Route 
                path="/admin/reviews" 
                element={
                  // ProtectedRoute ensures only admins can access review management
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              {/* Admin Statistics route - system statistics for administrators */}
              <Route 
                path="/admin/statistics" 
                element={
                  // ProtectedRoute ensures only admins can access system statistics
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Catch all route - handles any undefined routes */}
              {/* Redirects to login page for any unmatched routes */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

// Export the App component as the default export
// This allows other files to import and use this component
export default App;
