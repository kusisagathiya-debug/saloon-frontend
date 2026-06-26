import React, { useEffect, useState } from 'react';
import { db } from '../services/db.js';
import { Tag, Sparkles } from 'lucide-react';

export default function OffersBanner({ onApplyCoupon }) {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    setOffers(db.getOffers());
  }, []);

  if (offers.length === 0) return null;

  // Triplicate the list for seamless infinite marquee loop
  const marqueeItems = [...offers, ...offers, ...offers];

  return (
    <div className="offers-marquee">
      <div className="offers-marquee-track">
        {marqueeItems.map((offer, idx) => (
          <div key={`${offer.id}-${idx}`} className="offers-marquee-item">
            <Sparkles size={14} className="text-gold" />
            <span>{offer.description}</span>
            <span>• Valid till: {offer.validTill}</span>
            <span className="offers-coupon-badge">{offer.code}</span>
            <button 
              className="btn btn-secondary" 
              style={{ 
                padding: '2px 8px', 
                fontSize: '0.75rem', 
                minHeight: '28px',
                borderRadius: '4px' 
              }}
              onClick={() => onApplyCoupon(offer.code)}
            >
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
