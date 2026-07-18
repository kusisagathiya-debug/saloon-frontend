import React, { useState, useEffect } from 'react';
import { db } from '../services/db.js';
import { Award, Clock, Star } from 'lucide-react';

export default function StaffCarousel() {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    setStaff(db.getStaff());
  }, []);

  return (
    <section id="staff" className="section">
      <div className="container">
        <div className="section-title">
          <h2>Stylists & Beauticians</h2>
          <p>Meet our premium grooming and beauty experts who redefine style and rejuvenation.</p>
        </div>

        <div className="staff-grid">
          {staff.map((member) => (
            <div key={member.id} className="card-glass staff-card animate-fade-in">
              <div className="staff-img-container">
                <img 
                  src={member.photo} 
                  alt={member.name} 
                  className="staff-img" 
                />
                
                {/* Special Certifications Badge */}
                {member.certifications && member.certifications.length > 0 && (
                  <span className="staff-cert-badge">
                    {member.certifications[0]}
                  </span>
                )}
              </div>

              <div className="staff-info">
                <h3 className="staff-name">{member.name}</h3>
                <p className="staff-specialty">{member.specialty}</p>
                <p className="staff-experience">{member.experience} Years Salon Experience</p>
                
                {/* Average ratings */}
                <div style={{ marginBottom: '8px' }}>
                  <span className="staff-rating">
                    <Star size={14} fill="#F1C40F" stroke="none" />
                    <span>{member.rating} Rating</span>
                  </span>
                </div>

                <div 
                  style={{ 
                    borderTop: '1px solid var(--secondary)', 
                    paddingTop: '12px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '6px', 
                    fontSize: '0.75rem', 
                    color: 'var(--text-muted)',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={12} className="text-gold" />
                    <span>{member.availableHours}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Award size={12} className="text-gold" />
                    <span>Days: {member.availableDays.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
