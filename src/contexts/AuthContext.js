// Import React and necessary hooks for context management
// createContext: Creates a new React context for sharing data across components
// useContext: Hook to consume context values in functional components
// useState: Hook to manage component state
// useEffect: Hook to perform side effects in functional components
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the authentication context
// This context will hold all authentication-related state and functions
// Components can access this context to get user info and auth functions
const AuthContext = createContext();

// Mock data for users - This simulates a database of users
// In a real application, this would come from a backend API
// Contains sample users for testing the application
const mockUsers = [
  // Admin user - has access to all system features
  {
    id: 1, // Unique identifier for the user
    email: 'admin@jobra.com', // Email address used for login
    password: 'admin123', // Password for authentication (in real app, this would be hashed)
    role: 'admin', // User role determines what features they can access
    name: 'Mohammad Rahman Ahmed', // Full name of the user
    phone: '+880-1712-345678', // Contact phone number
    location: 'Dhanmondi, Dhaka' // User's location/address
  },
  // Doctor user - has access to doctor-specific features
  {
    id: 2, // Unique identifier for the doctor
    email: 'dr.rahman@jobra.com', // Doctor's email for login
    password: 'doctor123', // Doctor's password
    role: 'doctor', // Role determines access to doctor features
    name: 'Dr. Mohammad Abdul Rahman', // Doctor's full name
    specialization: 'Cardiology Specialist', // Medical specialization area
    phone: '+880-1712-345679', // Doctor's contact number
    experience: '15 years', // Years of medical experience
    rating: 4.8, // Average rating from patients (1-5 scale)
    patientsCount: 150, // Number of patients treated
    location: 'Banani, Dhaka', // Doctor's practice location
    hospital: 'Bangladesh Heart Institute' // Associated hospital
  },
  // Another doctor user with different specialization
  {
    id: 3, // Unique identifier for this doctor
    email: 'dr.karim@jobra.com', // Doctor's email for login
    password: 'doctor123', // Doctor's password
    role: 'doctor', // Role for doctor access
    name: 'Dr. Fatema Begum', // Doctor's full name
    specialization: 'Neurology Specialist', // Medical specialization in neurology
    phone: '+880-1712-345680', // Doctor's contact number
    experience: '12 years', // Years of medical experience
    rating: 4.9, // High rating from patients
    patientsCount: 120, // Number of patients treated
    location: 'Gulshan, Dhaka', // Doctor's practice location
    hospital: 'National Institute of Neurosciences' // Associated hospital
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
  // Patient user - has access to patient-specific features
  {
    id: 7, // Unique identifier for the patient
    email: 'patient1@jobra.com', // Patient's email for login
    password: 'patient123', // Patient's password
    role: 'patient', // Role determines access to patient features
    name: 'Rokhsana Begum', // Patient's full name
    phone: '+880-1712-345684', // Patient's contact number
    age: 35, // Patient's age
    gender: 'Female', // Patient's gender
    medicalHistory: 'No significant medical history', // Patient's medical background
    allergies: 'No known allergies', // Patient's known allergies
    location: 'Mohammadpur, Dhaka', // Patient's general location
    address: 'House No. 12, Road No. 7, Mohammadpur' // Patient's detailed address
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

// Mock data for appointments - Simulates appointment bookings
// In a real application, this would come from a database
// Contains sample appointments for testing the application
const mockAppointments = [
  // Sample appointment between patient and doctor
  {
    id: 1, // Unique identifier for the appointment
    patientId: 7, // ID of the patient who booked the appointment
    doctorId: 2, // ID of the doctor for the appointment
    patientName: 'Rokhsana Begum', // Patient's name for display
    doctorName: 'Dr. Mohammad Abdul Rahman', // Doctor's name for display
    date: '2024-01-15', // Date of the appointment
    time: '10:00 AM', // Time of the appointment
    status: 'confirmed', // Appointment status (pending, confirmed, cancelled, completed)
    reason: 'Regular health checkup' // Reason for the appointment
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

// Mock data for medical reports - Simulates medical test results
// In a real application, this would come from a database
// Contains sample medical reports for testing the application
const mockReports = [
  // Sample medical report for a patient
  {
    id: 1, // Unique identifier for the report
    patientId: 7, // ID of the patient the report belongs to
    doctorId: 2, // ID of the doctor who ordered the test
    patientName: 'Rokhsana Begum', // Patient's name for display
    doctorName: 'Dr. Mohammad Abdul Rahman', // Doctor's name for display
    date: '2024-01-10', // Date when the test was conducted
    type: 'Blood Test', // Type of medical test performed
    results: 'All values within normal range', // Test results description
    status: 'normal' // Report status (normal, abnormal, critical)
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

// Mock data for reviews - Simulates patient reviews for doctors
// In a real application, this would come from a database
// Contains sample reviews for testing the application
const mockReviews = [
  // Sample review from a patient about a doctor
  {
    id: 1, // Unique identifier for the review
    patientId: 7, // ID of the patient who wrote the review
    doctorId: 2, // ID of the doctor being reviewed
    patientName: 'Rokhsana Begum', // Patient's name for display
    doctorName: 'Dr. Mohammad Abdul Rahman', // Doctor's name for display
    rating: 5, // Rating from 1-5 stars
    comment: 'Excellent doctor, very professional and caring.', // Written review comment
    status: 'approved', // Review status (pending, approved, rejected)
    date: '2024-01-12' // Date when the review was written
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

// AuthProvider component - Provides authentication context to all child components
// This component manages the authentication state and provides auth functions
export const AuthProvider = ({ children }) => {
  // State to store the current logged-in user
  // null means no user is logged in
  const [user, setUser] = useState(null);
  // State to track if the app is still loading/checking authentication
  // This prevents showing content before checking if user is logged in
  const [loading, setLoading] = useState(true);

  // useEffect hook runs when the component mounts
  // This checks if there's a saved user in localStorage (browser storage)
  useEffect(() => {
    // Check if user is logged in from localStorage
    // localStorage persists data even after browser is closed
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      // If saved user exists, parse the JSON and set as current user
      setUser(JSON.parse(savedUser));
    }
    // Set loading to false after checking authentication
    setLoading(false);
  }, []); // Empty dependency array means this runs only once on mount

  // Login function - Authenticates user with email and password
  const login = (email, password) => {
    // Search for user in mock data with matching email and password
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    if (foundUser) {
      // If user found, create a copy of user data
      const userData = { ...foundUser };
      // Remove password from stored user data for security
      delete userData.password;
      // Set the user in state
      setUser(userData);
      // Save user data to localStorage for persistence
      localStorage.setItem('user', JSON.stringify(userData));
      // Return success response with user data
      return { success: true, user: userData };
    }
    // Return failure response if user not found
    return { success: false, message: 'Invalid email or password' };
  };

  // Register function - Creates a new user account
  const register = (userData) => {
    // Create new user object with generated ID
    const newUser = {
      id: mockUsers.length + 1, // Generate new ID based on current user count
      ...userData, // Spread all provided user data
      // Add role-specific fields for doctors
      rating: userData.role === 'doctor' ? 0 : undefined, // Start doctors with 0 rating
      patientsCount: userData.role === 'doctor' ? 0 : undefined // Start doctors with 0 patients
    };
    // Add new user to mock data array
    mockUsers.push(newUser);
    // Return success response with new user data
    return { success: true, user: newUser };
  };

  // Logout function - Clears user authentication
  const logout = () => {
    // Clear user from state (set to null)
    setUser(null);
    // Remove user data from localStorage
    localStorage.removeItem('user');
  };

  // Get users by role - Returns all users with a specific role
  const getUsersByRole = (role) => {
    // Filter mock users array to return only users with matching role
    return mockUsers.filter(u => u.role === role);
  };

  // Get appointments by user - Returns appointments for a specific user
  const getAppointmentsByUser = (userId, userRole) => {
    if (userRole === 'patient') {
      // For patients, return appointments where they are the patient
      return mockAppointments.filter(a => a.patientId === userId);
    } else if (userRole === 'doctor') {
      // For doctors, return appointments where they are the doctor
      return mockAppointments.filter(a => a.doctorId === userId);
    }
    // For admins, return all appointments
    return mockAppointments;
  };

  // Get reports by user - Returns medical reports for a specific user
  const getReportsByUser = (userId, userRole) => {
    if (userRole === 'patient') {
      // For patients, return reports where they are the patient
      return mockReports.filter(r => r.patientId === userId);
    } else if (userRole === 'doctor') {
      // For doctors, return reports where they are the doctor
      return mockReports.filter(r => r.doctorId === userId);
    }
    // For admins, return all reports
    return mockReports;
  };

  // Get reviews by user - Returns reviews for a specific user
  const getReviewsByUser = (userId, userRole) => {
    if (userRole === 'patient') {
      // For patients, return reviews they wrote
      return mockReviews.filter(r => r.patientId === userId);
    } else if (userRole === 'doctor') {
      // For doctors, return reviews about them
      return mockReviews.filter(r => r.doctorId === userId);
    }
    // For admins, return all reviews
    return mockReviews;
  };

  // Add appointment - Creates a new appointment booking
  const addAppointment = (appointmentData) => {
    // Create new appointment with generated ID
    const newAppointment = {
      id: mockAppointments.length + 1, // Generate new ID
      ...appointmentData, // Spread provided appointment data
      status: 'pending' // Set initial status as pending
    };
    // Add new appointment to mock data
    mockAppointments.push(newAppointment);
    // Return the created appointment
    return newAppointment;
  };

  // Add review - Creates a new patient review
  const addReview = (reviewData) => {
    // Create new review with generated ID
    const newReview = {
      id: mockReviews.length + 1, // Generate new ID
      ...reviewData, // Spread provided review data
      status: 'pending', // Set initial status as pending (needs approval)
      date: new Date().toISOString().split('T')[0] // Set current date
    };
    // Add new review to mock data
    mockReviews.push(newReview);
    // Return the created review
    return newReview;
  };

  // Update review status - Changes the approval status of a review
  const updateReviewStatus = (reviewId, status) => {
    // Find the review by ID
    const review = mockReviews.find(r => r.id === reviewId);
    if (review) {
      // Update the review status
      review.status = status;
      // Return the updated review
      return review;
    }
    // Return null if review not found
    return null;
  };

  // Create the context value object with all authentication functions and data
  const value = {
    user, // Current logged-in user
    login, // Function to authenticate user
    register, // Function to create new user
    logout, // Function to log out user
    getUsersByRole, // Function to get users by role
    getAppointmentsByUser, // Function to get appointments for a user
    getReportsByUser, // Function to get reports for a user
    getReviewsByUser, // Function to get reviews for a user
    addAppointment, // Function to create new appointment
    addReview, // Function to create new review
    updateReviewStatus, // Function to update review status
    mockUsers, // Mock users data
    mockAppointments, // Mock appointments data
    mockReports, // Mock reports data
    mockReviews // Mock reviews data
  };

  // Return the AuthContext.Provider with the value
  // This makes all the authentication functions and data available to child components
  return (
    <AuthContext.Provider value={value}>
      {/* Only render children when not loading */}
      {/* This prevents showing content before authentication is checked */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the authentication context
// This hook provides easy access to authentication functions and data
export const useAuth = () => {
  // Get the context value
  const context = useContext(AuthContext);
  // Check if the hook is being used within an AuthProvider
  if (!context) {
    // Throw error if used outside of AuthProvider
    throw new Error('useAuth must be used within an AuthProvider');
  }
  // Return the context value (all auth functions and data)
  return context;
};
