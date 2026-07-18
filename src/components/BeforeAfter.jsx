import React, { useState, useRef, useEffect } from 'react';
import { db } from '../services/db.js';
import { Sparkles, Eye } from 'lucide-react';

export default function BeforeAfter() {
  const [gallery, setGallery] = useState([]);
  const [activeCategory, setActiveCategory] = useState('hair');
  const [sliderPos, setSliderPos] = useState(50); // percentage 0-100
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  useEffect(() => {
    setGallery(db.getGallery());
  }, []);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => {
      isDragging.current = false;
    };
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  const categories = [
    { id: 'hair', label: 'Hair Styles' },
    { id: 'facial', label: 'Facial Glow' },
    { id: 'makeup', label: 'Bridal Makeup' }
  ];

  // Get active item based on selected category filter
  const activeItem = gallery.find(item => item.category === activeCategory);
  const activeCategoryCount = gallery.filter(item => item.category === activeCategory).length;

  return (
    <section id="gallery" className="section" style={{ backgroundColor: 'var(--secondary)' }}>
      <div className="container">
        <div className="section-title">
          <h2>Transformations Gallery</h2>
          <p>Real before-and-after results showing our hair, skin, and makeup artistry.</p>
        </div>

        {/* Category Filter Tabs */}
        <div className="gallery-tabs">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory(cat.id);
                setSliderPos(50); // reset position
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {activeItem ? (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
              <span className="review-service-tag" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Eye size={12} />
                {activeItem.title}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>({activeCategoryCount} item verified)</span>
            </div>

            {/* Split Screen Slider Box */}
            <div 
              ref={containerRef}
              className="ba-container"
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onMouseDown={(e) => {
                e.preventDefault();
                isDragging.current = true;
                handleMove(e.clientX);
              }}
              onTouchStart={(e) => {
                isDragging.current = true;
                if (e.touches.length > 0) {
                  handleMove(e.touches[0].clientX);
                }
              }}
              style={{ '--slider-pos': `${sliderPos}%` }}
            >
              {/* After Image (Background layer) */}
              <img 
                src={activeItem.after} 
                alt="After transformation" 
                className="ba-image" 
              />
              <div className="ba-label ba-label-after">After Treatment</div>

              {/* Before Image (Clipping layer) */}
              <img 
                src={activeItem.before} 
                alt="Before transformation" 
                className="ba-image ba-image-before" 
              />
              <div className="ba-label ba-label-before">Before Treatment</div>

              {/* Drag Handle Divider Line */}
              <div className="ba-handle">
                <div className="ba-handle-button">
                  <Sparkles size={16} />
                </div>
              </div>
            </div>

            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '8px', fontWeight: 600 }}>
              ← Drag slider handle to compare before and after →
            </p>
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No transformations available for this category.</p>
        )}
      </div>
    </section>
  );
}
