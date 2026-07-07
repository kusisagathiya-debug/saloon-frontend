import React from 'react';
import { Clock, Star } from 'lucide-react';

export default function ServiceCard({ service }) {
  const { id, name, description, duration, rating, reviewsCount } = service;

  return (
    <div className="card-glass service-card animate-fade-in">
      <div className="service-header">
        <h3 className="service-title">{name}</h3>
      </div>

      <div className="service-meta">
        <div className="service-meta-item">
          <Clock size={14} className="text-gold" />
          <span>{duration} Mins</span>
        </div>
        
        {rating && (
          <div className="service-meta-item">
            <Star size={14} className="service-rating" fill="#F1C40F" stroke="none" />
            <span>{rating} ({reviewsCount} reviews)</span>
          </div>
        )}
      </div>

      <p className="service-desc">{description}</p>

    </div>
  );
}
