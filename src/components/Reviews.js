import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Reviews.css';

const Reviews = () => {
  const { user, getUsersByRole, getReviewsByUser, addReview } = useAuth();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const doctors = getUsersByRole('doctor');
  const userReviews = getReviewsByUser(user.id, 'patient');

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const selectedDoctorData = doctors.find(d => d.id.toString() === selectedDoctor);
      
      const reviewData = {
        patientId: user.id,
        doctorId: parseInt(selectedDoctor),
        patientName: user.name,
        doctorName: selectedDoctorData.name,
        rating: rating,
        comment: comment
      };

      addReview(reviewData);
      setMessage('Review submitted successfully! It will be reviewed by admin before being published.');
      
      // Reset form
      setSelectedDoctor('');
      setRating(5);
      setComment('');
      setShowReviewForm(false);
    } catch (error) {
      setMessage('Error submitting review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= rating ? 'filled' : ''}`}
          onClick={() => setRating(i)}
        >
          ⭐
        </span>
      );
    }
    return stars;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return '✅';
      case 'pending':
        return '⏳';
      case 'rejected':
        return '❌';
      default:
        return '📝';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return '#28a745';
      case 'pending':
        return '#ffc107';
      case 'rejected':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  return (
    <div className="reviews">
      <div className="reviews-header">
        <h1>Reviews & Feedback</h1>
        <p>Share your experience and read reviews from other patients</p>
      </div>

      <div className="reviews-content">
        <div className="reviews-actions">
          <button
            className="btn btn-primary"
            onClick={() => setShowReviewForm(!showReviewForm)}
          >
            {showReviewForm ? 'Cancel' : 'Write a Review'}
          </button>
        </div>

        {showReviewForm && (
          <div className="review-form-section">
            <div className="form-card">
              <h2>Write a Review</h2>
              
              {message && (
                <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmitReview} className="review-form">
                <div className="form-group">
                  <label htmlFor="doctor">Select Doctor</label>
                  <select
                    id="doctor"
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    required
                    className="form-control"
                  >
                    <option value="">Choose a doctor...</option>
                    {doctors.map(doctor => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name} - {doctor.specialization}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Rating</label>
                  <div className="rating-input">
                    {getRatingStars(rating)}
                    <span className="rating-text">({rating}/5)</span>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="comment">Your Review</label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    className="form-control"
                    rows="5"
                    placeholder="Share your experience with this doctor..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary submit-btn"
                >
                  {loading ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="my-reviews-section">
          <h2>My Reviews</h2>
          
          {userReviews.length > 0 ? (
            <div className="reviews-list">
              {userReviews.map(review => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <div className="review-doctor">
                      <span className="doctor-icon">👨‍⚕️</span>
                      <div className="doctor-info">
                        <h3>{review.doctorName}</h3>
                        <p className="review-date">
                          📅 {new Date(review.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="review-status">
                      <span 
                        className="status-indicator"
                        style={{ color: getStatusColor(review.status) }}
                      >
                        {getStatusIcon(review.status)}
                      </span>
                      <span 
                        className="status-text"
                        style={{ color: getStatusColor(review.status) }}
                      >
                        {review.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="review-content">
                    <div className="review-rating">
                      <span className="rating-stars">
                        {'⭐'.repeat(review.rating)}
                      </span>
                      <span className="rating-number">({review.rating}/5)</span>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>No Reviews Yet</h3>
              <p>You haven't written any reviews yet. Share your experience with our doctors!</p>
            </div>
          )}
        </div>
      </div>

      <div className="reviews-summary">
        <div className="summary-card">
          <h3>Review Summary</h3>
          <div className="summary-stats">
            <div className="summary-stat">
              <span className="stat-number">{userReviews.length}</span>
              <span className="stat-label">Total Reviews</span>
            </div>
            <div className="summary-stat">
              <span className="stat-number" style={{ color: '#28a745' }}>
                {userReviews.filter(r => r.status === 'approved').length}
              </span>
              <span className="stat-label">Approved</span>
            </div>
            <div className="summary-stat">
              <span className="stat-number" style={{ color: '#ffc107' }}>
                {userReviews.filter(r => r.status === 'pending').length}
              </span>
              <span className="stat-label">Pending</span>
            </div>
            <div className="summary-stat">
              <span className="stat-number">
                {userReviews.length > 0 
                  ? Math.round(userReviews.reduce((sum, r) => sum + r.rating, 0) / userReviews.length * 10) / 10
                  : 0
                }
              </span>
              <span className="stat-label">Average Rating</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
