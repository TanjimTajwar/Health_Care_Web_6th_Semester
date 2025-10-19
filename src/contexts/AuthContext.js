import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Mock data for users
const mockUsers = [
  {
    id: 1,
    email: 'admin@jobra.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User',
    phone: '+1-555-0100'
  },
  {
    id: 2,
    email: 'dr.smith@jobra.com',
    password: 'doctor123',
    role: 'doctor',
    name: 'Dr. John Smith',
    specialization: 'Cardiology',
    phone: '+1-555-0101',
    experience: '15 years',
    rating: 4.8,
    patientsCount: 150
  },
  {
    id: 3,
    email: 'dr.johnson@jobra.com',
    password: 'doctor123',
    role: 'doctor',
    name: 'Dr. Sarah Johnson',
    specialization: 'Neurology',
    phone: '+1-555-0102',
    experience: '12 years',
    rating: 4.9,
    patientsCount: 120
  },
  {
    id: 4,
    email: 'dr.wilson@jobra.com',
    password: 'doctor123',
    role: 'doctor',
    name: 'Dr. Michael Wilson',
    specialization: 'Orthopedics',
    phone: '+1-555-0103',
    experience: '10 years',
    rating: 4.7,
    patientsCount: 95
  },
  {
    id: 5,
    email: 'patient1@jobra.com',
    password: 'patient123',
    role: 'patient',
    name: 'Alice Johnson',
    phone: '+1-555-0201',
    age: 35,
    gender: 'Female',
    medicalHistory: 'No significant medical history',
    allergies: 'None known'
  },
  {
    id: 6,
    email: 'patient2@jobra.com',
    password: 'patient123',
    role: 'patient',
    name: 'Bob Smith',
    phone: '+1-555-0202',
    age: 42,
    gender: 'Male',
    medicalHistory: 'Hypertension, Diabetes Type 2',
    allergies: 'Penicillin'
  },
  {
    id: 7,
    email: 'patient3@jobra.com',
    password: 'patient123',
    role: 'patient',
    name: 'Carol Davis',
    phone: '+1-555-0203',
    age: 28,
    gender: 'Female',
    medicalHistory: 'Asthma',
    allergies: 'Shellfish'
  }
];

// Mock data for appointments
const mockAppointments = [
  {
    id: 1,
    patientId: 5,
    doctorId: 2,
    patientName: 'Alice Johnson',
    doctorName: 'Dr. John Smith',
    date: '2024-01-15',
    time: '10:00 AM',
    status: 'confirmed',
    reason: 'Regular checkup'
  },
  {
    id: 2,
    patientId: 6,
    doctorId: 3,
    patientName: 'Bob Smith',
    doctorName: 'Dr. Sarah Johnson',
    date: '2024-01-16',
    time: '2:00 PM',
    status: 'pending',
    reason: 'Neurological consultation'
  },
  {
    id: 3,
    patientId: 7,
    doctorId: 4,
    patientName: 'Carol Davis',
    doctorName: 'Dr. Michael Wilson',
    date: '2024-01-17',
    time: '11:30 AM',
    status: 'confirmed',
    reason: 'Knee pain evaluation'
  }
];

// Mock data for medical reports
const mockReports = [
  {
    id: 1,
    patientId: 5,
    doctorId: 2,
    patientName: 'Alice Johnson',
    doctorName: 'Dr. John Smith',
    date: '2024-01-10',
    type: 'Blood Test',
    results: 'All values within normal range',
    status: 'normal'
  },
  {
    id: 2,
    patientId: 6,
    doctorId: 3,
    patientName: 'Bob Smith',
    doctorName: 'Dr. Sarah Johnson',
    date: '2024-01-08',
    type: 'MRI Scan',
    results: 'No abnormalities detected',
    status: 'normal'
  },
  {
    id: 3,
    patientId: 7,
    doctorId: 4,
    patientName: 'Carol Davis',
    doctorName: 'Dr. Michael Wilson',
    date: '2024-01-05',
    type: 'X-Ray',
    results: 'Minor inflammation in left knee',
    status: 'abnormal'
  }
];

// Mock data for reviews
const mockReviews = [
  {
    id: 1,
    patientId: 5,
    doctorId: 2,
    patientName: 'Alice Johnson',
    doctorName: 'Dr. John Smith',
    rating: 5,
    comment: 'Excellent doctor, very professional and caring.',
    status: 'approved',
    date: '2024-01-12'
  },
  {
    id: 2,
    patientId: 6,
    doctorId: 3,
    patientName: 'Bob Smith',
    doctorName: 'Dr. Sarah Johnson',
    rating: 4,
    comment: 'Good consultation, but waiting time was long.',
    status: 'pending',
    date: '2024-01-11'
  },
  {
    id: 3,
    patientId: 7,
    doctorId: 4,
    patientName: 'Carol Davis',
    doctorName: 'Dr. Michael Wilson',
    rating: 5,
    comment: 'Very thorough examination and clear explanation.',
    status: 'approved',
    date: '2024-01-09'
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const userData = { ...foundUser };
      delete userData.password; // Remove password from stored user data
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, user: userData };
    }
    return { success: false, message: 'Invalid email or password' };
  };

  const register = (userData) => {
    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      rating: userData.role === 'doctor' ? 0 : undefined,
      patientsCount: userData.role === 'doctor' ? 0 : undefined
    };
    mockUsers.push(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const getUsersByRole = (role) => {
    return mockUsers.filter(u => u.role === role);
  };

  const getAppointmentsByUser = (userId, userRole) => {
    if (userRole === 'patient') {
      return mockAppointments.filter(a => a.patientId === userId);
    } else if (userRole === 'doctor') {
      return mockAppointments.filter(a => a.doctorId === userId);
    }
    return mockAppointments;
  };

  const getReportsByUser = (userId, userRole) => {
    if (userRole === 'patient') {
      return mockReports.filter(r => r.patientId === userId);
    } else if (userRole === 'doctor') {
      return mockReports.filter(r => r.doctorId === userId);
    }
    return mockReports;
  };

  const getReviewsByUser = (userId, userRole) => {
    if (userRole === 'patient') {
      return mockReviews.filter(r => r.patientId === userId);
    } else if (userRole === 'doctor') {
      return mockReviews.filter(r => r.doctorId === userId);
    }
    return mockReviews;
  };

  const addAppointment = (appointmentData) => {
    const newAppointment = {
      id: mockAppointments.length + 1,
      ...appointmentData,
      status: 'pending'
    };
    mockAppointments.push(newAppointment);
    return newAppointment;
  };

  const addReview = (reviewData) => {
    const newReview = {
      id: mockReviews.length + 1,
      ...reviewData,
      status: 'pending',
      date: new Date().toISOString().split('T')[0]
    };
    mockReviews.push(newReview);
    return newReview;
  };

  const updateReviewStatus = (reviewId, status) => {
    const review = mockReviews.find(r => r.id === reviewId);
    if (review) {
      review.status = status;
      return review;
    }
    return null;
  };

  const value = {
    user,
    login,
    register,
    logout,
    getUsersByRole,
    getAppointmentsByUser,
    getReportsByUser,
    getReviewsByUser,
    addAppointment,
    addReview,
    updateReviewStatus,
    mockUsers,
    mockAppointments,
    mockReports,
    mockReviews
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
