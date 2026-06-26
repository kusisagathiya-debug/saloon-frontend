import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import OffersBanner from './components/OffersBanner.jsx';
import ServiceCard from './components/ServiceCard.jsx';
import BeforeAfter from './components/BeforeAfter.jsx';
import StaffCarousel from './components/StaffCarousel.jsx';
import ReviewSection from './components/ReviewSection.jsx';
import Contact from './components/Contact.jsx';
import Dashboard from './components/Dashboard.jsx';
import BookingWizard from './components/BookingWizard.jsx';
import Door3D from './components/Door3D.jsx';
import { db } from './services/db.js';
import { Calendar, Phone, Clock, ArrowRight, Eye, RefreshCw, Scissors, Sparkles, Smile, ShieldAlert } from 'lucide-react';

export default function App() {
  const [showDoor, setShowDoor] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [activeGender, setActiveGender] = useState('men'); // 'men' or 'women'
  const [activeCategory, setActiveCategory] = useState('all'); // 'all', 'hair', 'facial', 'treatment', 'makeup'
  
  // Data lists
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  
  // Booking modal states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingService, setBookingService] = useState(null);
  const [bookingPrice, setBookingPrice] = useState(0);
  const [bookingCoupon, setBookingCoupon] = useState('');

  // Admin Mode states
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Toast States
  const [toasts, setToasts] = useState([]);
  
  // Trigger triggers for analytics updates
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // 1. Initial Data load
  useEffect(() => {
    setServices(db.getServices());
  }, [refreshTrigger]);

  // 2. Service filtering logic
  useEffect(() => {
    let list = services.filter(s => s.gender === activeGender);
    if (activeCategory !== 'all') {
      list = list.filter(s => s.category === activeCategory);
    }
    setFilteredServices(list);
  }, [services, activeGender, activeCategory]);

  // 3. Navigation handling
  const handleNavigate = (sectionId) => {
    setIsAdminMode(false);
    setActiveSection(sectionId);
    
    // Smooth scroll offset to section
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 80; // navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // 4. Toast notifications helper
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    
    // Auto remove after 3.5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  // 5. Booking Handlers
  const handleOpenBookingForService = (service, selectedPrice) => {
    setBookingService(service);
    setBookingPrice(selectedPrice);
    setBookingCoupon('');
    setIsBookingOpen(true);
  };

  const handleApplyCouponFromTicker = (couponCode) => {
    setBookingCoupon(couponCode);
    setBookingService(null);
    setBookingPrice(0);
    setIsBookingOpen(true);
    addToast(`Coupon "${couponCode}" applied to scheduler!`, 'success');
  };

  const handleBookingSuccess = (bookingDetails) => {
    setIsBookingOpen(false);
    setRefreshTrigger(prev => prev + 1); // trigger dashboard updates
    addToast(`Appointment confirmed for ${bookingDetails.time}! Check WhatsApp.`, 'success');
  };

  // Re-open 3D doors
  const handleReopenDoor = () => {
    setShowDoor(true);
    addToast("Resetting 3D salon gates.", "success");
  };

  // If 3D entry door is active, render it
  if (showDoor) {
    return (
      <Door3D 
        onComplete={() => {
          setShowDoor(false);
          addToast("Welcome to Sadhana Salon & Spa", "success");
        }} 
      />
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Toast Overlay */}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast toast-${t.type}`}>
            {t.type === 'success' ? <Sparkles size={16} /> : <ShieldAlert size={16} />}
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      {/* Glassmorphic Navbar */}
      <Navbar 
        activeSection={activeSection}
        isAdminMode={isAdminMode}
        onNavigate={handleNavigate}
        onOpenBooking={() => {
          setBookingService(null);
          setBookingPrice(0);
          setBookingCoupon('');
          setIsBookingOpen(true);
        }}
        onToggleAdmin={() => setIsAdminMode(!isAdminMode)}
      />

      {/* Offers marquee scrolling banner */}
      <OffersBanner onApplyCoupon={handleApplyCouponFromTicker} />

      {/* Main Container Layout */}
      <main style={{ marginTop: 'var(--nav-height)', minHeight: 'calc(100vh - var(--nav-height) - 100px)' }}>
        
        {isAdminMode ? (
          /* ======================================================== */
          /* ADMIN DASHBOARD VIEW                                      */
          /* ======================================================== */
          <Dashboard triggerRefresh={refreshTrigger} />
        ) : (
          /* ======================================================== */
          /* CLIENT SALON INTERFACE                                   */
          /* ======================================================== */
          <>
            {/* HERO HERO SECTION */}
            <section id="home" className="section" style={{ padding: '100px 0', textAlign: 'center', background: 'radial-gradient(circle at center, var(--secondary) 0%, var(--background) 100%)' }}>
              <div className="container animate-fade-in">
                <span className="review-service-tag" style={{ marginBottom: '16px', background: 'var(--accent)', color: 'var(--text)' }}>
                  ✨ Luxury Grooming & Rejuvenation
                </span>
                <h1 className="heading-display heading-gold" style={{ fontSize: '3.5rem', marginBottom: '20px' }}>
                  Sadhana Salon & Spa
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 36px auto' }}>
                  Experience premium haircuts, high-end skincare, and wedding makeup artistry delivered by certified experts in a cozy ambiance.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                  <button className="btn btn-primary" onClick={() => handleNavigate('services')}>
                    Explore Services
                    <ArrowRight size={16} />
                  </button>
                  <button className="btn btn-secondary" onClick={handleReopenDoor}>
                    <RefreshCw size={16} />
                    Reset Entry Door
                  </button>
                </div>
              </div>
            </section>

            {/* SERVICES & PRICING SECTIONS */}
            <section id="services" className="section">
              <div className="container">
                <div className="section-title">
                  <h2>Our Treatments & Services</h2>
                  <p>Browse our complete list of customized men's and women's grooming treatments.</p>
                </div>

                {/* Tab: Men's vs Women's Salon */}
                <div className="gender-tabs-container">
                  <div className="gender-tabs">
                    <button 
                      className={`gender-tab ${activeGender === 'men' ? 'active' : ''}`}
                      onClick={() => {
                        setActiveGender('men');
                        setActiveCategory('all');
                      }}
                    >
                      Men's Salon
                    </button>
                    <button 
                      className={`gender-tab ${activeGender === 'women' ? 'active' : ''}`}
                      onClick={() => {
                        setActiveGender('women');
                        setActiveCategory('all');
                      }}
                    >
                      Women's Salon
                    </button>
                  </div>
                </div>

                {/* Category filters */}
                <div className="category-filter-container">
                  <button 
                    className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('all')}
                  >
                    All Services
                  </button>
                  <button 
                    className={`category-btn ${activeCategory === 'hair' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('hair')}
                  >
                    Hair Care
                  </button>
                  <button 
                    className={`category-btn ${activeCategory === 'facial' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('facial')}
                  >
                    Facials & Skin
                  </button>
                  <button 
                    className={`category-btn ${activeCategory === 'treatment' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('treatment')}
                  >
                    Treatments
                  </button>
                  
                  {activeGender === 'women' && (
                    <button 
                      className={`category-btn ${activeCategory === 'makeup' ? 'active' : ''}`}
                      onClick={() => setActiveCategory('makeup')}
                    >
                      Bridal & Makeup
                    </button>
                  )}
                </div>

                {/* Services Card Grid */}
                <div className="services-grid">
                  {filteredServices.map(srv => (
                    <ServiceCard
                      key={srv.id}
                      service={srv}
                      onBook={handleOpenBookingForService}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* BEFORE/AFTER TRANSFORMATION GALLERY */}
            <BeforeAfter />

            {/* STAFF SHOWCASE PANEL */}
            <StaffCarousel />

            {/* REVIEWS & FEEDBACK FORM */}
            <ReviewSection onNewReviewAdded={() => {
              setRefreshTrigger(prev => prev + 1);
              addToast("Feedback submitted successfully. Thank you!", "success");
            }} />

            {/* MAPS & DIRECT CONTACT DETAILS */}
            <Contact />
          </>
        )}
      </main>

      {/* FOOTER */}
      <footer style={{ backgroundColor: 'var(--text)', color: '#FFFFFF', padding: '40px 0', textAlign: 'center', borderTop: '2px solid var(--primary)' }}>
        <div className="container">
          <h3 style={{ textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 800 }}>Sadhana</h3>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginTop: '8px' }}>
            © 2026 Sadhana Luxury Salon & Spa. All Rights Reserved. Designed for Visual Excellence.
          </p>
        </div>
      </footer>

      {/* BOOKING WIZARD DIALOG */}
      {isBookingOpen && (
        <BookingWizard
          service={bookingService}
          initialPrice={bookingPrice}
          initialCoupon={bookingCoupon}
          onClose={() => setIsBookingOpen(false)}
          onSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
}
