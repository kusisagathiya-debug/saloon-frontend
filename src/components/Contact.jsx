import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, AlertCircle } from 'lucide-react';

export default function Contact() {
  const address = "Sadhana Salon, 1st Floor, Luxury Tower, MG Road, Bengaluru, Karnataka 560001";
  const phone = "+91 98765 43210";
  const email = "contact@sadhanasalon.in";
  
  // WhatsApp link generator
  const getWhatsAppLink = () => {
    const text = "Hello Sadhana Salon, I'd like to inquire about your services and available slots.";
    return `https://wa.me/919876543210?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="contact" className="section" style={{ borderTop: '1px solid var(--secondary)' }}>
      <div className="container">
        <div className="section-title">
          <h2>Location & Contact</h2>
          <p>Visit our flagship luxury salon or get in touch for corporate bookings.</p>
        </div>

        <div className="contact-grid">
          {/* Contact Details Card */}
          <div className="card-glass contact-info-card animate-fade-in">
            {/* Address */}
            <div className="contact-detail-row">
              <div className="contact-icon-wrapper">
                <MapPin size={20} />
              </div>
              <div className="contact-text">
                <h4>Our Address</h4>
                <p>{address}</p>
                <a 
                  href="https://maps.google.com/?q=MG+Road+Bengaluru" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gold"
                  style={{ display: 'inline-block', marginTop: '8px', fontSize: '0.85rem', fontWeight: 600 }}
                >
                  Get Directions →
                </a>
              </div>
            </div>

            {/* Phone & WhatsApp */}
            <div className="contact-detail-row">
              <div className="contact-icon-wrapper">
                <Phone size={20} />
              </div>
              <div className="contact-text">
                <h4>Phone Call & Chat</h4>
                <p>Call: <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-gold" style={{ fontWeight: 700 }}>{phone}</a></p>
                
                <a 
                  href={getWhatsAppLink()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ 
                    marginTop: '12px', 
                    background: 'rgba(39, 174, 96, 0.1)', 
                    color: '#27AE60', 
                    border: '1px solid rgba(39, 174, 96, 0.3)',
                    padding: '8px 16px',
                    fontSize: '0.85rem',
                    minHeight: '38px'
                  }}
                >
                  <MessageCircle size={16} fill="#27AE60" stroke="none" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="contact-detail-row">
              <div className="contact-icon-wrapper">
                <Mail size={20} />
              </div>
              <div className="contact-text">
                <h4>Email Support</h4>
                <p><a href={`mailto:${email}`} className="text-gold">{email}</a></p>
              </div>
            </div>

            {/* Hours */}
            <div className="contact-detail-row">
              <div className="contact-icon-wrapper">
                <Clock size={20} />
              </div>
              <div className="contact-text">
                <h4>Opening Hours</h4>
                <p>Monday - Sunday: 10:00 AM - 08:30 PM</p>
                
                {/* Holiday notice */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  <AlertCircle size={14} className="text-gold" />
                  <span>Open on all national holidays. Prior booking advised.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Google Map Embed */}
          <div className="map-container animate-fade-in delay-1" style={{ position: 'relative', background: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', textAlign: 'center', padding: '20px' }}>
              <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Map preview unavailable.</p>
              <a 
                href="https://maps.google.com/?q=MG+Road+Bengaluru" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Open Google Maps
              </a>
            </div>
            <iframe 
              title="Sadhana Salon Google Map Location"
              src="https://maps.google.com/maps?q=MG+Road+Bengaluru&t=&z=13&ie=UTF8&iwloc=&output=embed" 
              className="map-iframe"
              style={{ position: 'relative', zIndex: 2 }}
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
