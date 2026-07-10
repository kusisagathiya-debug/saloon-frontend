import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const CAROUSEL_IMAGES = [
  {
    url: '/assets/images/hero/1.png',
    title: 'Precision Styling & Hair Artistry',
    subtitle: 'Crafted by Master Stylists',
    quote: 'Where sophistication meets expertise.'
  },
  {
    url: '/assets/images/hero/2.png',
    title: 'Luxury Rejuvenation & Treatments',
    subtitle: 'Nourish Your Body & Soul',
    quote: 'Indulge in absolute pampering and elite skincare.'
  },
  {
    url: '/assets/images/hero/3.png',
    title: 'Immersive Luxury Salon Experience',
    subtitle: 'Sadhana Luxury Salon & Spa',
    quote: 'Step into a world of timeless beauty.'
  },
  {
    url: '/assets/images/hero/4.png',
    title: 'Elite Wellness & Rejuvenating Therapy',
    subtitle: 'Uncompromising Quality',
    quote: 'Exquisite rituals tailored for your lifestyle.'
  }
];

export default function HeroCarousel({ onExploreServices }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? CAROUSEL_IMAGES.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === CAROUSEL_IMAGES.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section id="home" className="hero-carousel-section">
      <div className="hero-carousel-container">
        {CAROUSEL_IMAGES.map((slide, idx) => (
          <div 
            key={idx} 
            className={`hero-slide ${idx === currentIndex ? 'active' : ''}`}
          >
            <img 
              src={slide.url} 
              alt={slide.title} 
              className="hero-slide-image"
              loading={idx === 0 ? "eager" : "lazy"}
            />
            <div className="hero-overlay"></div>
          </div>
        ))}
      </div>

      <div className="hero-content">
        <span className="hero-subtitle animate-fade-in">
          <Sparkles size={14} style={{ marginRight: '6px', color: 'var(--primary)' }} />
          {CAROUSEL_IMAGES[currentIndex].subtitle}
        </span>
        
        <h1 className="hero-title animate-fade-in">
          Beauty That Speaks <span>For Itself</span>
        </h1>
        
        <p className="hero-quote animate-fade-in">
          "{CAROUSEL_IMAGES[currentIndex].quote}"
        </p>

        <p className="hero-description animate-fade-in">
          {CAROUSEL_IMAGES[currentIndex].title}
        </p>

        <div className="hero-buttons animate-fade-in">
          <button className="btn btn-primary" onClick={onExploreServices}>
            Explore Services
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button className="hero-arrow hero-arrow-left" onClick={handlePrev} aria-label="Previous Slide">
        <ChevronLeft size={24} />
      </button>
      <button className="hero-arrow hero-arrow-right" onClick={handleNext} aria-label="Next Slide">
        <ChevronRight size={24} />
      </button>

      {/* Bottom Slide Indicators */}
      <div className="hero-indicators">
        {CAROUSEL_IMAGES.map((_, idx) => (
          <button
            key={idx}
            className={`hero-indicator ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
