import React, { useState } from 'react';
import { Clock, Star, Calendar } from 'lucide-react';

export default function ServiceCard({ service, onBook }) {
  const { id, name, description, basePrice, maxPrice, defaultPrice, duration, rating, reviewsCount, hasRange, rangeLabel } = service;
  
  // Track selected price for range services
  const [selectedPrice, setSelectedPrice] = useState(hasRange ? defaultPrice : basePrice);

  // Linear interpolation to determine slider progress percentage
  const getPercentage = () => {
    if (!hasRange) return 0;
    return ((selectedPrice - basePrice) / (maxPrice - basePrice)) * 100;
  };

  const handlePriceChange = (e) => {
    setSelectedPrice(parseInt(e.target.value));
  };

  return (
    <div className="card-glass service-card animate-fade-in">
      <div className="service-header">
        <h3 className="service-title">{name}</h3>
        <span className="service-price">₹{selectedPrice}</span>
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

      {/* Customizable Price Range Slider */}
      {hasRange && (
        <div className="price-slider-wrapper">
          <div className="price-slider-label">
            <span>{rangeLabel || "Customize Service"}</span>
            <span className="text-gold">₹{selectedPrice}</span>
          </div>
          <input
            type="range"
            min={basePrice}
            max={maxPrice}
            step={Math.round((maxPrice - basePrice) / 4) || 50} // 4 increments or 50rs steps
            value={selectedPrice}
            onChange={handlePriceChange}
            className="custom-slider"
            style={{
              background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${getPercentage()}%, var(--accent) ${getPercentage()}%, var(--accent) 100%)`
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginTop: '6px', color: 'var(--text-muted)' }}>
            <span>₹{basePrice} (Basic)</span>
            <span>₹{maxPrice} (Premium)</span>
          </div>
        </div>
      )}

      <div className="service-actions">
        <button 
          className="btn btn-outline"
          style={{ width: '100%' }}
          onClick={() => onBook(service, selectedPrice)}
        >
          <Calendar size={16} />
          Book Appointment
        </button>
      </div>
    </div>
  );
}
