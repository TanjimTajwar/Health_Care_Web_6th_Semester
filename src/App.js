import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navigation from './components/Navigation';

// Authentication Components
import Login from './components/Login';
import Register from './components/Register';

// Patient Components
import PatientDashboard from './components/PatientDashboard';
import PatientReports from './components/PatientReports';
import PatientAppointments from './components/PatientAppointments';
import BookAppointment from './components/BookAppointment';
import DoctorInfo from './components/DoctorInfo';
import Reviews from './components/Reviews';

// Doctor Components
import DoctorDashboard from './components/DoctorDashboard';

// Admin Components
import AdminDashboard from './components/AdminDashboard';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navigation />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Default redirect */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              
              {/* Patient Routes */}
              <Route 
                path="/patient/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['patient']}>
                    <PatientDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/patient/reports" 
                element={
                  <ProtectedRoute allowedRoles={['patient']}>
                    <PatientReports />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/patient/appointments" 
                element={
                  <ProtectedRoute allowedRoles={['patient']}>
                    <PatientAppointments />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/patient/book-appointment" 
                element={
                  <ProtectedRoute allowedRoles={['patient']}>
                    <BookAppointment />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/patient/doctors" 
                element={
                  <ProtectedRoute allowedRoles={['patient']}>
                    <DoctorInfo />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/patient/reviews" 
                element={
                  <ProtectedRoute allowedRoles={['patient']}>
                    <Reviews />
                  </ProtectedRoute>
                } 
              />
              
              {/* Doctor Routes */}
              <Route 
                path="/doctor/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['doctor']}>
                    <DoctorDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/doctor/patients" 
                element={
                  <ProtectedRoute allowedRoles={['doctor']}>
                    <div className="coming-soon">
                      <h2>Patient Management</h2>
                      <p>This feature is coming soon!</p>
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/doctor/reports" 
                element={
                  <ProtectedRoute allowedRoles={['doctor']}>
                    <div className="coming-soon">
                      <h2>Medical Reports Management</h2>
                      <p>This feature is coming soon!</p>
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/doctor/appointments" 
                element={
                  <ProtectedRoute allowedRoles={['doctor']}>
                    <div className="coming-soon">
                      <h2>Appointment Management</h2>
                      <p>This feature is coming soon!</p>
                    </div>
                  </ProtectedRoute>
                } 
              />
              
              {/* Admin Routes */}
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/users" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/reviews" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/statistics" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
