-- =====================================================
-- Jobra Healthcare Management System Database Schema
-- =====================================================
-- Database: jobra_healthcare_db
-- Description: Complete database schema for healthcare management system
-- Author: Healthcare Development Team
-- Date: 2024
-- =====================================================

-- Create Database
CREATE DATABASE IF NOT EXISTS jobra_healthcare_db;
USE jobra_healthcare_db;

-- =====================================================
-- 1. USERS TABLE
-- =====================================================
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'doctor', 'patient') NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- =====================================================
-- 2. DOCTORS TABLE (Extended user information for doctors)
-- =====================================================
CREATE TABLE doctors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    specialization VARCHAR(255) NOT NULL,
    experience VARCHAR(50),
    rating DECIMAL(3,2) DEFAULT 0.00,
    patients_count INT DEFAULT 0,
    hospital VARCHAR(255),
    license_number VARCHAR(100),
    consultation_fee DECIMAL(10,2),
    available_days JSON,
    available_times JSON,
    bio TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =====================================================
-- 3. PATIENTS TABLE (Extended user information for patients)
-- =====================================================
CREATE TABLE patients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    age INT,
    gender ENUM('Male', 'Female', 'Other'),
    medical_history TEXT,
    allergies TEXT,
    address TEXT,
    emergency_contact VARCHAR(20),
    emergency_contact_name VARCHAR(255),
    blood_type VARCHAR(10),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =====================================================
-- 4. APPOINTMENTS TABLE
-- =====================================================
CREATE TABLE appointments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
    reason TEXT,
    notes TEXT,
    consultation_fee DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =====================================================
-- 5. MEDICAL REPORTS TABLE
-- =====================================================
CREATE TABLE medical_reports (
    id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    report_date DATE NOT NULL,
    report_type VARCHAR(255) NOT NULL,
    results TEXT NOT NULL,
    status ENUM('normal', 'abnormal', 'critical') DEFAULT 'normal',
    file_path VARCHAR(500),
    lab_name VARCHAR(255),
    technician_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =====================================================
-- 6. REVIEWS TABLE
-- =====================================================
CREATE TABLE reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    comment TEXT,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    review_date DATE DEFAULT (CURRENT_DATE),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =====================================================
-- 7. PRESCRIPTIONS TABLE
-- =====================================================
CREATE TABLE prescriptions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    appointment_id INT NOT NULL,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    prescription_date DATE DEFAULT (CURRENT_DATE),
    medications JSON,
    instructions TEXT,
    follow_up_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE,
    FOREIGN KEY (patient_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =====================================================
-- 8. PAYMENTS TABLE
-- =====================================================
CREATE TABLE payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    appointment_id INT NOT NULL,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method ENUM('cash', 'card', 'mobile_banking', 'bank_transfer') NOT NULL,
    payment_status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    transaction_id VARCHAR(255),
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE,
    FOREIGN KEY (patient_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =====================================================
-- 9. NOTIFICATIONS TABLE
-- =====================================================
CREATE TABLE notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('appointment', 'report', 'payment', 'general') NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =====================================================
-- 10. SYSTEM SETTINGS TABLE
-- =====================================================
CREATE TABLE system_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(255) UNIQUE NOT NULL,
    setting_value TEXT,
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_appointments_patient ON appointments(patient_id);
CREATE INDEX idx_appointments_doctor ON appointments(doctor_id);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_reports_patient ON medical_reports(patient_id);
CREATE INDEX idx_reports_doctor ON medical_reports(doctor_id);
CREATE INDEX idx_reviews_doctor ON reviews(doctor_id);
CREATE INDEX idx_reviews_patient ON reviews(patient_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);

-- =====================================================
-- SAMPLE DATA INSERTION
-- =====================================================

-- Insert Admin User
INSERT INTO users (email, password, role, name, phone, location) VALUES
('admin@jobra.com', 'admin123', 'admin', 'Mohammad Rahman Ahmed', '+880-1712-345678', 'Dhanmondi, Dhaka');

-- Insert Doctor Users
INSERT INTO users (email, password, role, name, phone, location) VALUES
('dr.rahman@jobra.com', 'doctor123', 'doctor', 'Dr. Mohammad Abdul Rahman', '+880-1712-345679', 'Banani, Dhaka'),
('dr.karim@jobra.com', 'doctor123', 'doctor', 'Dr. Fatema Begum', '+880-1712-345680', 'Gulshan, Dhaka'),
('dr.hasan@jobra.com', 'doctor123', 'doctor', 'Dr. Mohammad Hasan Ali', '+880-1712-345681', 'Mirpur, Dhaka'),
('dr.ahmed@jobra.com', 'doctor123', 'doctor', 'Dr. Nasir Uddin Ahmed', '+880-1712-345682', 'Uttara, Dhaka'),
('dr.khan@jobra.com', 'doctor123', 'doctor', 'Dr. Rokhsana Khan', '+880-1712-345683', 'Ramna, Dhaka');

-- Insert Patient Users
INSERT INTO users (email, password, role, name, phone, location) VALUES
('patient1@jobra.com', 'patient123', 'patient', 'Rokhsana Begum', '+880-1712-345684', 'Mohammadpur, Dhaka'),
('patient2@jobra.com', 'patient123', 'patient', 'Mohammad Karim Uddin', '+880-1712-345685', 'Lalbagh, Dhaka'),
('patient3@jobra.com', 'patient123', 'patient', 'Fatema Khatun', '+880-1712-345686', 'Kamrangirchar, Dhaka'),
('patient4@jobra.com', 'patient123', 'patient', 'Mohammad Selim Mia', '+880-1712-345687', 'Badda, Dhaka'),
('patient5@jobra.com', 'patient123', 'patient', 'Nasira Begum', '+880-1712-345688', 'Dhanmondi, Dhaka'),
('patient6@jobra.com', 'patient123', 'patient', 'Mohammad Abul Kalam', '+880-1712-345689', 'Mirpur, Dhaka');

-- Insert Doctor Details
INSERT INTO doctors (user_id, specialization, experience, rating, patients_count, hospital, license_number, consultation_fee) VALUES
(2, 'Cardiology Specialist', '15 years', 4.8, 150, 'Bangladesh Heart Institute', 'DHMC-001', 1500.00),
(3, 'Neurology Specialist', '12 years', 4.9, 120, 'National Institute of Neurosciences', 'DHMC-002', 2000.00),
(4, 'Orthopedic Specialist', '10 years', 4.7, 95, 'National Institute of Traumatology', 'DHMC-003', 1800.00),
(5, 'Pediatric Specialist', '8 years', 4.6, 80, 'Children Hospital', 'DHMC-004', 1200.00),
(6, 'Gynecology Specialist', '14 years', 4.8, 110, 'Bangabandhu Sheikh Mujib Medical University', 'DHMC-005', 1600.00);

-- Insert Patient Details
INSERT INTO patients (user_id, age, gender, medical_history, allergies, address, emergency_contact, emergency_contact_name, blood_type) VALUES
(7, 35, 'Female', 'No significant medical history', 'No known allergies', 'House No. 12, Road No. 7, Mohammadpur', '+880-1712-345690', 'Mohammad Ali', 'O+'),
(8, 42, 'Male', 'Hypertension, Diabetes Type 2', 'Penicillin', 'House No. 25, Road No. 3, Lalbagh', '+880-1712-345691', 'Karima Begum', 'A+'),
(9, 28, 'Female', 'Asthma', 'Shrimp', 'House No. 8, Road No. 5, Kamrangirchar', '+880-1712-345692', 'Abdul Rahman', 'B+'),
(10, 55, 'Male', 'Heart disease, High cholesterol', 'No allergies', 'House No. 15, Road No. 2, Badda', '+880-1712-345693', 'Fatema Khatun', 'AB+'),
(11, 31, 'Female', 'Thyroid problems', 'No allergies', 'House No. 20, Road No. 8, Dhanmondi', '+880-1712-345694', 'Mohammad Hasan', 'O-'),
(12, 38, 'Male', 'Kidney stones', 'No allergies', 'House No. 30, Road No. 1, Mirpur', '+880-1712-345695', 'Nasira Begum', 'A-');

-- Insert Appointments
INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, status, reason, consultation_fee) VALUES
(7, 2, '2024-01-15', '10:00:00', 'confirmed', 'Regular health checkup', 1500.00),
(8, 3, '2024-01-16', '14:00:00', 'pending', 'Neurology consultation', 2000.00),
(9, 4, '2024-01-17', '11:30:00', 'confirmed', 'Knee pain evaluation', 1800.00),
(10, 2, '2024-01-18', '09:00:00', 'confirmed', 'Heart disease follow-up', 1500.00),
(11, 6, '2024-01-19', '15:00:00', 'pending', 'Gynecology consultation', 1600.00),
(12, 4, '2024-01-20', '10:30:00', 'confirmed', 'Kidney stone treatment', 1800.00);

-- Insert Medical Reports
INSERT INTO medical_reports (patient_id, doctor_id, report_date, report_type, results, status, lab_name) VALUES
(7, 2, '2024-01-10', 'Blood Test', 'All values within normal range', 'normal', 'Dhaka Medical College Lab'),
(8, 3, '2024-01-08', 'MRI Scan', 'No abnormalities detected', 'normal', 'National Institute of Neurosciences'),
(9, 4, '2024-01-05', 'X-Ray', 'Minor inflammation in left knee', 'abnormal', 'National Institute of Traumatology'),
(10, 2, '2024-01-12', 'ECG', 'Heart function normal', 'normal', 'Bangladesh Heart Institute'),
(11, 6, '2024-01-14', 'Thyroid Function Test', 'Thyroid hormone levels slightly elevated', 'abnormal', 'Bangabandhu Sheikh Mujib Medical University'),
(12, 4, '2024-01-13', 'Kidney Ultrasound', 'Small stones detected in kidney', 'abnormal', 'National Institute of Traumatology');

-- Insert Reviews
INSERT INTO reviews (patient_id, doctor_id, rating, comment, status, review_date) VALUES
(7, 2, 5, 'Excellent doctor, very professional and caring.', 'approved', '2024-01-12'),
(8, 3, 4, 'Good consultation, but waiting time was long.', 'pending', '2024-01-11'),
(9, 4, 5, 'Very thorough examination and clear explanation.', 'approved', '2024-01-09'),
(10, 2, 5, 'Very skilled and experienced in heart disease treatment.', 'approved', '2024-01-08'),
(11, 6, 4, 'Very good as a gynecology specialist.', 'pending', '2024-01-07'),
(12, 4, 5, 'Excellent treatment as an orthopedic specialist.', 'approved', '2024-01-06');

-- Insert Sample Prescriptions
INSERT INTO prescriptions (appointment_id, patient_id, doctor_id, medications, instructions, follow_up_date) VALUES
(1, 7, 2, '{"medications": [{"name": "Multivitamin", "dosage": "1 tablet daily", "duration": "30 days"}]}', 'Take with food. Regular exercise recommended.', '2024-02-15'),
(3, 9, 4, '{"medications": [{"name": "Ibuprofen", "dosage": "400mg twice daily", "duration": "7 days"}, {"name": "Physiotherapy", "dosage": "3 times per week", "duration": "4 weeks"}]}', 'Apply ice pack for 15 minutes, 3 times daily.', '2024-02-17'),
(4, 10, 2, '{"medications": [{"name": "Metoprolol", "dosage": "50mg once daily", "duration": "30 days"}, {"name": "Atorvastatin", "dosage": "20mg once daily", "duration": "30 days"}]}', 'Monitor blood pressure daily. Low salt diet.', '2024-02-18');

-- Insert Sample Payments
INSERT INTO payments (appointment_id, patient_id, doctor_id, amount, payment_method, payment_status, transaction_id) VALUES
(1, 7, 2, 1500.00, 'mobile_banking', 'completed', 'TXN001234567'),
(3, 9, 4, 1800.00, 'card', 'completed', 'TXN001234568'),
(4, 10, 2, 1500.00, 'cash', 'completed', 'TXN001234569'),
(2, 8, 3, 2000.00, 'bank_transfer', 'pending', 'TXN001234570'),
(5, 11, 6, 1600.00, 'mobile_banking', 'pending', 'TXN001234571'),
(6, 12, 4, 1800.00, 'card', 'completed', 'TXN001234572');

-- Insert Sample Notifications
INSERT INTO notifications (user_id, title, message, type, is_read) VALUES
(7, 'Appointment Confirmed', 'Your appointment with Dr. Mohammad Abdul Rahman on 2024-01-15 at 10:00 AM has been confirmed.', 'appointment', FALSE),
(8, 'Appointment Pending', 'Your appointment with Dr. Fatema Begum on 2024-01-16 at 2:00 PM is pending confirmation.', 'appointment', FALSE),
(9, 'Report Available', 'Your X-Ray report is now available. Please check your medical reports section.', 'report', FALSE),
(10, 'Payment Successful', 'Payment of BDT 1,500 for your appointment has been processed successfully.', 'payment', FALSE);

-- Insert System Settings
INSERT INTO system_settings (setting_key, setting_value, description) VALUES
('app_name', 'Jobra Healthcare Management System', 'Application name'),
('app_version', '1.0.0', 'Current application version'),
('max_appointments_per_day', '50', 'Maximum appointments allowed per doctor per day'),
('consultation_duration', '30', 'Default consultation duration in minutes'),
('currency', 'BDT', 'Default currency for the system'),
('timezone', 'Asia/Dhaka', 'System timezone'),
('maintenance_mode', 'false', 'System maintenance mode status');

-- =====================================================
-- USEFUL QUERIES FOR TESTING
-- =====================================================

-- Get all doctors with their specializations
-- SELECT u.name, d.specialization, d.experience, d.rating, d.hospital 
-- FROM users u 
-- JOIN doctors d ON u.id = d.user_id 
-- WHERE u.role = 'doctor';

-- Get all appointments for a specific patient
-- SELECT a.*, u1.name as patient_name, u2.name as doctor_name 
-- FROM appointments a 
-- JOIN users u1 ON a.patient_id = u1.id 
-- JOIN users u2 ON a.doctor_id = u2.id 
-- WHERE a.patient_id = 7;

-- Get all medical reports for a patient
-- SELECT mr.*, u.name as doctor_name 
-- FROM medical_reports mr 
-- JOIN users u ON mr.doctor_id = u.id 
-- WHERE mr.patient_id = 7;

-- Get doctor ratings and reviews
-- SELECT u.name as doctor_name, AVG(r.rating) as avg_rating, COUNT(r.id) as total_reviews 
-- FROM users u 
-- JOIN doctors d ON u.id = d.user_id 
-- LEFT JOIN reviews r ON u.id = r.doctor_id AND r.status = 'approved' 
-- WHERE u.role = 'doctor' 
-- GROUP BY u.id, u.name;

-- Get appointment statistics
-- SELECT 
--     COUNT(*) as total_appointments,
--     COUNT(CASE WHEN status = 'confirmed' THEN 1 END) as confirmed_appointments,
--     COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_appointments,
--     COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled_appointments
-- FROM appointments;

-- =====================================================
-- END OF DATABASE SCHEMA
-- =====================================================
