import React, { useState, useEffect } from 'react';
import { db } from '../services/db.js';
import { Star, ThumbsUp, Send } from 'lucide-react';

export default function ReviewSection({ onNewReviewAdded }) {
  const [reviews, setReviews] = useState([]);
  const [services, setServices] = useState([]);
  
  // Review form states
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [helpfulClicked, setHelpfulClicked] = useState({});

  useEffect(() => {
    setReviews(db.getReviews());
    setServices(db.getServices());
  }, []);

  // Recalculate average rating & counts
  const totalReviewsCount = reviews.length;
  const averageRating = totalReviewsCount > 0
    ? parseFloat((reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviewsCount).toFixed(1))
    : 4.8;

  // Star breakdown count
  const starCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach(r => {
    if (starCounts[r.rating] !== undefined) {
      starCounts[r.rating]++;
    }
  });

  const getStarPercentage = (starNum) => {
    if (totalReviewsCount === 0) return starNum === 5 ? 100 : 0;
    return (starCounts[starNum] / totalReviewsCount) * 100;
  };

  const handleHelpfulClick = (reviewId) => {
    if (helpfulClicked[reviewId]) return; // prevent multiple clicks

    db.incrementHelpful(reviewId);
    setReviews(db.getReviews()); // reload
    setHelpfulClicked(prev => ({ ...prev, [reviewId]: true }));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!name || !reviewText || !selectedServiceId) {
      alert("Please fill in all review details.");
      return;
    }

    const srv = services.find(s => s.id === selectedServiceId);
    const serviceName = srv ? srv.name : "General Salon Service";

    const newReview = {
      author: name,
      rating,
      text: reviewText.slice(0, 200), // restrict to 200 chars
      serviceId: selectedServiceId,
      serviceName
    };

    db.addReview(newReview);
    
    // Reset Form
    setName('');
    setRating(5);
    setSelectedServiceId('');
    setReviewText('');

    // Refresh review listings and trigger notify
    setReviews(db.getReviews());
    onNewReviewAdded();
  };

  return (
    <section id="reviews" className="section">
      <div className="container">
        <div className="section-title">
          <h2>Customer Reviews</h2>
          <p>Read what our luxury guests say about their grooming and beauty experiences.</p>
        </div>

        {/* Rating Summary Header */}
        <div className="reviews-summary animate-fade-in">
          <div className="rating-avg-card">
            <span className="rating-avg-num">{averageRating}</span>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map(star => (
                <Star 
                  key={star} 
                  size={18} 
                  fill={star <= Math.round(averageRating) ? "#F1C40F" : "none"} 
                  stroke={star <= Math.round(averageRating) ? "none" : "#F1C40F"} 
                />
              ))}
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Based on {totalReviewsCount} reviews
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {[5, 4, 3, 2, 1].map(stars => (
              <div key={stars} className="rating-bar-row">
                <span style={{ width: '50px', fontWeight: 600 }}>{stars} Star</span>
                <div className="rating-bar-track">
                  <div 
                    className="rating-bar-fill" 
                    style={{ width: `${getStarPercentage(stars)}%` }} 
                  />
                </div>
                <span className="rating-bar-count">{starCounts[stars]}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '48px', alignItems: 'start' }}>
          {/* Reviews List */}
          <div>
            <h3 className="dash-section-title">Recent Feedback</h3>
            
            {reviews.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No reviews available yet. Be the first to write one!</p>
            ) : (
              reviews.map((rev) => (
                <div key={rev.id} className="card-glass review-card animate-fade-in">
                  <div className="review-header">
                    <div>
                      <h4 className="review-author">{rev.author}</h4>
                      <span className="review-date">{rev.date}</span>
                    </div>
                    
                    {/* Stars */}
                    <div style={{ display: 'flex', gap: '2px', color: '#F1C40F' }}>
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star 
                          key={s} 
                          size={14} 
                          fill={s <= rev.rating ? "#F1C40F" : "none"} 
                          stroke={s <= rev.rating ? "none" : "#F1C40F"} 
                        />
                      ))}
                    </div>
                  </div>

                  <span className="review-service-tag">{rev.serviceName}</span>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>"{rev.text}"</p>

                  <div className="review-actions">
                    <button 
                      className="helpful-btn"
                      onClick={() => handleHelpfulClick(rev.id)}
                      disabled={helpfulClicked[rev.id]}
                      style={{ opacity: helpfulClicked[rev.id] ? 0.6 : 1 }}
                    >
                      <ThumbsUp size={14} />
                      <span>Helpful ({rev.helpful})</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Write a Review Form */}
          <div className="card-glass" style={{ padding: '30px' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Share Your Experience
            </h3>

            <form onSubmit={handleSubmitReview}>
              <div className="form-group">
                <label htmlFor="review-name">Your Name</label>
                <input
                  id="review-name"
                  type="text"
                  required
                  className="form-control"
                  placeholder="e.g. Priyanjali Roy"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="review-service">Treatment Received</label>
                <select
                  id="review-service"
                  required
                  className="form-control"
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                >
                  <option value="">-- Choose service --</option>
                  {services.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.gender === 'men' ? "Men's" : "Women's"})</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Rating</label>
                <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                  {[1, 2, 3, 4, 5].map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setRating(num)}
                      style={{ cursor: 'pointer' }}
                    >
                      <Star 
                        size={28} 
                        fill={num <= rating ? "#F1C40F" : "none"} 
                        stroke="#F1C40F" 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <label htmlFor="review-content">Review Description</label>
                  <span style={{ fontSize: '0.75rem', color: reviewText.length > 200 ? 'var(--error)' : 'var(--text-muted)', fontWeight: 600 }}>
                    {reviewText.length}/200 chars
                  </span>
                </div>
                <textarea
                  id="review-content"
                  required
                  rows={4}
                  className="form-control"
                  placeholder="Describe your session, ambiance, and service style... (max 200 characters)"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value.slice(0, 200))}
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', marginTop: '10px' }}
              >
                <Send size={16} />
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
