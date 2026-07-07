import React, { useEffect, useState } from 'react';
import { db } from '../services/db.js';
import { Tag, Sparkles } from 'lucide-react';

export default function OffersBanner() {
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
          </div>
        ))}
      </div>
    </div>
  );
}
