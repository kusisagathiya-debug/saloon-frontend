import React, { useState, useEffect } from 'react';
import { db } from '../services/db.js';
import { Star } from 'lucide-react';

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Only keep the top 3 feedbacks
    setReviews(db.getReviews().slice(0, 3));
  }, []);

  return (
    <section id="reviews" className="section" style={{ backgroundColor: 'var(--secondary)' }}>
      <div className="container">
        <div className="section-title">
          <h2>Client Feedback</h2>
          <p>Read what our guests say about their luxury grooming and beauty experiences.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '40px' }}>
          {reviews.map((rev) => (
            <div key={rev.id} className="card-glass review-card animate-fade-in" style={{ padding: '30px' }}>
              <div className="review-header" style={{ marginBottom: '15px' }}>
                <div>
                  <h4 className="review-author" style={{ fontSize: '1.2rem', margin: '0 0 5px 0' }}>{rev.author}</h4>
                  <span className="review-service-tag" style={{ fontSize: '0.85rem' }}>{rev.serviceName}</span>
                </div>
                
                {/* Stars */}
                <div style={{ display: 'flex', gap: '2px', color: '#F1C40F' }}>
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star 
                      key={s} 
                      size={16} 
                      fill={s <= rev.rating ? "#F1C40F" : "none"} 
                      stroke={s <= rev.rating ? "none" : "#F1C40F"} 
                    />
                  ))}
                </div>
              </div>

              <p style={{ fontSize: '1rem', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: '1.6' }}>
                "{rev.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
