import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Mock data for users
const mockUsers = [
  {
    id: 1,
    email: 'admin@jobra.com',
    password: 'admin123',
    role: 'admin',
    name: 'Mohammad Rahman Ahmed',
    phone: '+880-1712-345678',
    location: 'Dhanmondi, Dhaka'
  },
  {
    id: 2,
    email: 'dr.rahman@jobra.com',
    password: 'doctor123',
    role: 'doctor',
    name: 'Dr. Mohammad Abdul Rahman',
    specialization: 'Cardiology Specialist',
    phone: '+880-1712-345679',
    experience: '15 years',
    rating: 4.8,
    patientsCount: 150,
    location: 'Banani, Dhaka',
    hospital: 'Bangladesh Heart Institute'
  },
  {
    id: 3,
    email: 'dr.karim@jobra.com',
    password: 'doctor123',
    role: 'doctor',
    name: 'Dr. Fatema Begum',
    specialization: 'Neurology Specialist',
    phone: '+880-1712-345680',
    experience: '12 years',
    rating: 4.9,
    patientsCount: 120,
    location: 'Gulshan, Dhaka',
    hospital: 'National Institute of Neurosciences'
  },
  {
    id: 4,
    email: 'dr.hasan@jobra.com',
    password: 'doctor123',
    role: 'doctor',
    name: 'Dr. Mohammad Hasan Ali',
    specialization: 'Orthopedic Specialist',
    phone: '+880-1712-345681',
    experience: '10 years',
    rating: 4.7,
    patientsCount: 95,
    location: 'Mirpur, Dhaka',
    hospital: 'National Institute of Traumatology'
  },
  {
    id: 5,
    email: 'dr.ahmed@jobra.com',
    password: 'doctor123',
    role: 'doctor',
    name: 'Dr. Nasir Uddin Ahmed',
    specialization: 'Pediatric Specialist',
    phone: '+880-1712-345682',
    experience: '8 years',
    rating: 4.6,
    patientsCount: 80,
    location: 'Uttara, Dhaka',
    hospital: 'Children Hospital'
  },
  {
    id: 6,
    email: 'dr.khan@jobra.com',
    password: 'doctor123',
    role: 'doctor',
    name: 'Dr. Rokhsana Khan',
    specialization: 'Gynecology Specialist',
    phone: '+880-1712-345683',
    experience: '14 years',
    rating: 4.8,
    patientsCount: 110,
    location: 'Ramna, Dhaka',
    hospital: 'Bangabandhu Sheikh Mujib Medical University'
  },
  {
    id: 7,
    email: 'patient1@jobra.com',
    password: 'patient123',
    role: 'patient',
    name: 'Rokhsana Begum',
    phone: '+880-1712-345684',
    age: 35,
    gender: 'Female',
    medicalHistory: 'No significant medical history',
    allergies: 'No known allergies',
    location: 'Mohammadpur, Dhaka',
    address: 'House No. 12, Road No. 7, Mohammadpur'
  },
  {
    id: 8,
    email: 'patient2@jobra.com',
    password: 'patient123',
    role: 'patient',
    name: 'Mohammad Karim Uddin',
    phone: '+880-1712-345685',
    age: 42,
    gender: 'Male',
    medicalHistory: 'Hypertension, Diabetes Type 2',
    allergies: 'Penicillin',
    location: 'Lalbagh, Dhaka',
    address: 'House No. 25, Road No. 3, Lalbagh'
  },
  {
    id: 9,
    email: 'patient3@jobra.com',
    password: 'patient123',
    role: 'patient',
    name: 'Fatema Khatun',
    phone: '+880-1712-345686',
    age: 28,
    gender: 'Female',
    medicalHistory: 'Asthma',
    allergies: 'Shrimp',
    location: 'Kamrangirchar, Dhaka',
    address: 'House No. 8, Road No. 5, Kamrangirchar'
  },
  {
    id: 10,
    email: 'patient4@jobra.com',
    password: 'patient123',
    role: 'patient',
    name: 'Mohammad Selim Mia',
    phone: '+880-1712-345687',
    age: 55,
    gender: 'Male',
    medicalHistory: 'Heart disease, High cholesterol',
    allergies: 'No allergies',
    location: 'Badda, Dhaka',
    address: 'House No. 15, Road No. 2, Badda'
  },
  {
    id: 11,
    email: 'patient5@jobra.com',
    password: 'patient123',
    role: 'patient',
    name: 'Nasira Begum',
    phone: '+880-1712-345688',
    age: 31,
    gender: 'Female',
    medicalHistory: 'Thyroid problems',
    allergies: 'No allergies',
    location: 'Dhanmondi, Dhaka',
    address: 'House No. 20, Road No. 8, Dhanmondi'
  },
  {
    id: 12,
    email: 'patient6@jobra.com',
    password: 'patient123',
    role: 'patient',
    name: 'Mohammad Abul Kalam',
    phone: '+880-1712-345689',
    age: 38,
    gender: 'Male',
    medicalHistory: 'Kidney stones',
    allergies: 'No allergies',
    location: 'Mirpur, Dhaka',
    address: 'House No. 30, Road No. 1, Mirpur'
  }
];

// Mock data for appointments
const mockAppointments = [
  {
    id: 1,
    patientId: 7,
    doctorId: 2,
    patientName: 'Rokhsana Begum',
    doctorName: 'Dr. Mohammad Abdul Rahman',
    date: '2024-01-15',
    time: '10:00 AM',
    status: 'confirmed',
    reason: 'Regular health checkup'
  },
  {
    id: 2,
    patientId: 8,
    doctorId: 3,
    patientName: 'Mohammad Karim Uddin',
    doctorName: 'Dr. Fatema Begum',
    date: '2024-01-16',
    time: '2:00 PM',
    status: 'pending',
    reason: 'Neurology consultation'
  },
  {
    id: 3,
    patientId: 9,
    doctorId: 4,
    patientName: 'Fatema Khatun',
    doctorName: 'Dr. Mohammad Hasan Ali',
    date: '2024-01-17',
    time: '11:30 AM',
    status: 'confirmed',
    reason: 'Knee pain evaluation'
  },
  {
    id: 4,
    patientId: 10,
    doctorId: 2,
    patientName: 'Mohammad Selim Mia',
    doctorName: 'Dr. Mohammad Abdul Rahman',
    date: '2024-01-18',
    time: '9:00 AM',
    status: 'confirmed',
    reason: 'Heart disease follow-up'
  },
  {
    id: 5,
    patientId: 11,
    doctorId: 6,
    patientName: 'Nasira Begum',
    doctorName: 'Dr. Rokhsana Khan',
    date: '2024-01-19',
    time: '3:00 PM',
    status: 'pending',
    reason: 'Gynecology consultation'
  },
  {
    id: 6,
    patientId: 12,
    doctorId: 4,
    patientName: 'Mohammad Abul Kalam',
    doctorName: 'Dr. Mohammad Hasan Ali',
    date: '2024-01-20',
    time: '10:30 AM',
    status: 'confirmed',
    reason: 'Kidney stone treatment'
  }
];

// Mock data for medical reports
const mockReports = [
  {
    id: 1,
    patientId: 7,
    doctorId: 2,
    patientName: 'Rokhsana Begum',
    doctorName: 'Dr. Mohammad Abdul Rahman',
    date: '2024-01-10',
    type: 'Blood Test',
    results: 'All values within normal range',
    status: 'normal'
  },
  {
    id: 2,
    patientId: 8,
    doctorId: 3,
    patientName: 'Mohammad Karim Uddin',
    doctorName: 'Dr. Fatema Begum',
    date: '2024-01-08',
    type: 'MRI Scan',
    results: 'No abnormalities detected',
    status: 'normal'
  },
  {
    id: 3,
    patientId: 9,
    doctorId: 4,
    patientName: 'Fatema Khatun',
    doctorName: 'Dr. Mohammad Hasan Ali',
    date: '2024-01-05',
    type: 'X-Ray',
    results: 'Minor inflammation in left knee',
    status: 'abnormal'
  },
  {
    id: 4,
    patientId: 10,
    doctorId: 2,
    patientName: 'Mohammad Selim Mia',
    doctorName: 'Dr. Mohammad Abdul Rahman',
    date: '2024-01-12',
    type: 'ECG',
    results: 'Heart function normal',
    status: 'normal'
  },
  {
    id: 5,
    patientId: 11,
    doctorId: 6,
    patientName: 'Nasira Begum',
    doctorName: 'Dr. Rokhsana Khan',
    date: '2024-01-14',
    type: 'Thyroid Function Test',
    results: 'Thyroid hormone levels slightly elevated',
    status: 'abnormal'
  },
  {
    id: 6,
    patientId: 12,
    doctorId: 4,
    patientName: 'Mohammad Abul Kalam',
    doctorName: 'Dr. Mohammad Hasan Ali',
    date: '2024-01-13',
    type: 'Kidney Ultrasound',
    results: 'Small stones detected in kidney',
    status: 'abnormal'
  }
];

// Mock data for reviews
const mockReviews = [
  {
    id: 1,
    patientId: 7,
    doctorId: 2,
    patientName: 'Rokhsana Begum',
    doctorName: 'Dr. Mohammad Abdul Rahman',
    rating: 5,
    comment: 'Excellent doctor, very professional and caring.',
    status: 'approved',
    date: '2024-01-12'
  },
  {
    id: 2,
    patientId: 8,
    doctorId: 3,
    patientName: 'Mohammad Karim Uddin',
    doctorName: 'Dr. Fatema Begum',
    rating: 4,
    comment: 'Good consultation, but waiting time was long.',
    status: 'pending',
    date: '2024-01-11'
  },
  {
    id: 3,
    patientId: 9,
    doctorId: 4,
    patientName: 'Fatema Khatun',
    doctorName: 'Dr. Mohammad Hasan Ali',
    rating: 5,
    comment: 'Very thorough examination and clear explanation.',
    status: 'approved',
    date: '2024-01-09'
  },
  {
    id: 4,
    patientId: 10,
    doctorId: 2,
    patientName: 'Mohammad Selim Mia',
    doctorName: 'Dr. Mohammad Abdul Rahman',
    rating: 5,
    comment: 'Very skilled and experienced in heart disease treatment.',
    status: 'approved',
    date: '2024-01-08'
  },
  {
    id: 5,
    patientId: 11,
    doctorId: 6,
    patientName: 'Nasira Begum',
    doctorName: 'Dr. Rokhsana Khan',
    rating: 4,
    comment: 'Very good as a gynecology specialist.',
    status: 'pending',
    date: '2024-01-07'
  },
  {
    id: 6,
    patientId: 12,
    doctorId: 4,
    patientName: 'Mohammad Abul Kalam',
    doctorName: 'Dr. Mohammad Hasan Ali',
    rating: 5,
    comment: 'Excellent treatment as an orthopedic specialist.',
    status: 'approved',
    date: '2024-01-06'
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
