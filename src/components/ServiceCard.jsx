import React from 'react';
import { Scissors, Sparkles, Smile, Star } from 'lucide-react';

const getCategoryIcon = (category) => {
  switch (category) {
    case 'hair': return <Scissors size={16} className="text-gold" />;
    case 'facial': return <Smile size={16} className="text-gold" />;
    case 'treatment': return <Sparkles size={16} className="text-gold" />;
    case 'makeup': return <Star size={16} className="text-gold" />;
    default: return <Sparkles size={16} className="text-gold" />;
  }
};

export default function ServiceCard({ service }) {
  const { name, description, category } = service;

  return (
    <div className="card-glass service-card animate-fade-in">
      <div className="service-header" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {getCategoryIcon(category)}
        <h3 className="service-title" style={{ margin: 0 }}>{name}</h3>
      </div>
      <p className="service-desc" style={{ marginTop: '12px' }}>{description}</p>
    </div>
  );
}
