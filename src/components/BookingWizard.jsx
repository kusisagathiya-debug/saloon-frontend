import React, { useState, useEffect } from 'react';
import { db } from '../services/db.js';
import { X, Calendar, Clock, User, Check, Percent, ArrowLeft, ArrowRight, MessageSquare } from 'lucide-react';

export default function BookingWizard({ service, initialPrice, initialCoupon, onClose, onSuccess }) {
  const [step, setStep] = useState(1);
  const [servicesList, setServicesList] = useState([]);
  const [selectedService, setSelectedService] = useState(service || null);
  const [selectedPrice, setSelectedPrice] = useState(initialPrice || (service ? service.basePrice : 0));
  
  // Date & Time selection states
  const [datesList, setDatesList] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Staff states
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null); // null means "Any Available"

  // Customer states
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [whatsappConfirm, setWhatsappConfirm] = useState(true);

  // Coupon states
  const [couponInput, setCouponInput] = useState(initialCoupon || '');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  // 1. Initial Data Fetching
  useEffect(() => {
    setServicesList(db.getServices());
    setStaffList(db.getStaff());

    // Generate next 30 days list for the calendar
    const dates = [];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let i = 0; i < 30; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const dateString = d.toISOString().split('T')[0];
      
      dates.push({
        fullDate: dateString,
        dayNum: d.getDate(),
        dayName: weekdays[d.getDay()],
        monthName: months[d.getMonth()]
      });
    }

    setDatesList(dates);
    setSelectedDate(dates[0].fullDate); // default to today
  }, []);

  // Set default pricing if service changes
  useEffect(() => {
    if (selectedService && !initialPrice) {
      setSelectedPrice(selectedService.hasRange ? selectedService.defaultPrice : selectedService.basePrice);
    }
  }, [selectedService]);

  // React to initialCoupon change
  useEffect(() => {
    if (initialCoupon) {
      setCouponInput(initialCoupon);
      handleApplyCoupon(initialCoupon);
    }
  }, [initialCoupon, selectedService]);

  // 2. Generate Time Slots (10:00 AM to 8:00 PM, 30-min intervals)
  const timeSlots = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
    '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM',
    '08:00 PM'
  ];

  // 3. Coupon Logic
  const handleApplyCoupon = (code = couponInput) => {
    setCouponError('');
    setCouponSuccess('');
    setAppliedDiscount(0);

    if (!code) {
      setCouponError('Please enter a coupon code.');
      return;
    }

    const coupons = db.getOffers();
    const active = coupons.find(c => c.code.toUpperCase() === code.toUpperCase());

    if (!active) {
      setCouponError('Invalid coupon code.');
      return;
    }

    // Validate applicability
    if (selectedService && active.applicableServices && active.applicableServices.length > 0) {
      const isApplicable = active.applicableServices.includes(selectedService.id);
      if (!isApplicable) {
        setCouponError(`This coupon is only valid for specified services.`);
        return;
      }
    }

    // Calculate discount amount
    let discountAmount = 0;
    if (active.type === 'percentage') {
      const percentage = parseInt(active.discount);
      discountAmount = Math.round((selectedPrice * percentage) / 100);
    } else if (active.type === 'flat') {
      discountAmount = parseInt(active.discount.replace('₹', ''));
    }

    setAppliedDiscount(discountAmount);
    setCouponSuccess(`Coupon ${active.code} applied! Saved ₹${discountAmount}.`);
  };

  const finalTotal = Math.max(selectedPrice - appliedDiscount, 0);

  // 4. Booking Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedService || !selectedDate || !selectedTime || !customerName || !customerPhone || !customerEmail) {
      alert("Please fill in all details before submitting.");
      return;
    }

    const bookingPayload = {
      date: selectedDate,
      time: selectedTime,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      price: finalTotal,
      staffId: selectedStaff ? selectedStaff.id : 'any',
      staffName: selectedStaff ? selectedStaff.name : 'Any Available Stylist',
      customerName,
      customerPhone,
      customerEmail
    };

    db.addBooking(bookingPayload);

    // If WhatsApp confirmation is checked, open custom WhatsApp API message link
    if (whatsappConfirm) {
      const formattedDate = new Date(selectedDate).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      const text = `Hello Sadhana Salon,\n\nI have successfully booked an appointment via your website!\n\n📋 *Booking Details:*\n- *Customer:* ${customerName}\n- *Service:* ${selectedService.name}\n- *Date:* ${formattedDate}\n- *Time:* ${selectedTime}\n- *Stylist:* ${bookingPayload.staffName}\n- *Total Amount:* ₹${finalTotal}\n\nLooking forward to my session! ✨`;
      const encodedText = encodeURIComponent(text);
      const waLink = `https://wa.me/919876543210?text=${encodedText}`;
      
      // Delay opening to prevent popup blocking before modal transition completes
      setTimeout(() => {
        window.open(waLink, '_blank');
      }, 1000);
    }

    onSuccess(bookingPayload);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-fade-in">
        <button className="modal-close-btn" onClick={onClose} aria-label="Close booking modal">
          <X size={20} />
        </button>

        {/* Header with progress steps */}
        <div className="booking-header">
          <h2 className="booking-title">Schedule Appointment</h2>
          <div className="booking-steps">
            <div className={`booking-step-node ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
              {step > 1 ? <Check size={16} /> : '1'}
            </div>
            <div className={`booking-step-node ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
              {step > 2 ? <Check size={16} /> : '2'}
            </div>
            <div className={`booking-step-node ${step >= 3 ? 'active' : ''}`}>
              3
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>
            <span>Date & Time</span>
            <span>Beautician</span>
            <span>Confirm Info</span>
          </div>
        </div>

        {/* Step Body */}
        <div className="booking-body">
          {/* STEP 1: Date & Time Picker */}
          {step === 1 && (
            <div>
              {/* Service Confirmation / Selection */}
              <div className="form-group">
                <label>Selected Treatment</label>
                {selectedService ? (
                  <div className="card-glass" style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ display: 'block' }}>{selectedService.name}</strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Duration: {selectedService.duration} mins</span>
                    </div>
                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>₹{selectedPrice}</span>
                  </div>
                ) : (
                  <select 
                    className="form-control" 
                    onChange={(e) => {
                      const s = servicesList.find(item => item.id === e.target.value);
                      setSelectedService(s);
                    }}
                  >
                    <option value="">-- Choose a Service --</option>
                    {servicesList.map(s => (
                      <option key={s.id} value={s.id}>{s.name} (₹{s.basePrice})</option>
                    ))}
                  </select>
                )}
              </div>

              {/* Custom 30-Day Calendar Slider */}
              <div className="form-group">
                <label>Select Date</label>
                <div style={{ overflowX: 'auto', display: 'flex', gap: '8px', paddingBottom: '8px' }}>
                  {datesList.map((date) => (
                    <button
                      key={date.fullDate}
                      type="button"
                      className={`calendar-day-btn ${selectedDate === date.fullDate ? 'selected' : ''}`}
                      onClick={() => setSelectedDate(date.fullDate)}
                      style={{ flexShrink: 0, width: '60px' }}
                    >
                      <span className="calendar-day-name">{date.dayName}</span>
                      <span className="calendar-day-number">{date.dayNum}</span>
                      <span className="calendar-day-name">{date.monthName}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots grid */}
              <div className="form-group">
                <label>Select Time Slot</label>
                <div className="slots-grid">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      className={`slot-btn ${selectedTime === time ? 'selected' : ''}`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Beautician / Stylist Selection */}
          {step === 2 && (
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '16px' }}>Select Stylist or Expert</label>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Option: Any Available */}
                <div 
                  className={`card-glass ${selectedStaff === null ? 'active' : ''}`}
                  onClick={() => setSelectedStaff(null)}
                  style={{
                    padding: '16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    borderColor: selectedStaff === null ? 'var(--primary)' : 'var(--glass-border)'
                  }}
                >
                  <div className="contact-icon-wrapper" style={{ background: selectedStaff === null ? 'var(--primary)' : 'var(--secondary)', color: selectedStaff === null ? '#FFFFFF' : 'var(--primary)' }}>
                    <User size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700 }}>Any Available Stylist</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Choose this for maximum slot availability.</p>
                  </div>
                </div>

                {/* List Staff */}
                {staffList
                  .filter(staff => {
                    // Simple check if staff is available on this date's weekday
                    if (!selectedDate) return true;
                    const d = new Date(selectedDate);
                    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    const dayName = weekdays[d.getDay()];
                    return staff.availableDays.includes(dayName);
                  })
                  .map((staff) => (
                    <div 
                      key={staff.id}
                      className={`card-glass ${selectedStaff?.id === staff.id ? 'active' : ''}`}
                      onClick={() => setSelectedStaff(staff)}
                      style={{
                        padding: '16px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        borderColor: selectedStaff?.id === staff.id ? 'var(--primary)' : 'var(--glass-border)'
                      }}
                    >
                      <img 
                        src={staff.photo} 
                        alt={staff.name} 
                        style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} 
                      />
                      <div style={{ flexGrow: 1 }}>
                        <h4 style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {staff.name}
                          <span style={{ fontSize: '0.75rem', fontWeight: 600, background: 'var(--secondary)', padding: '2px 8px', borderRadius: '4px', color: 'var(--primary)' }}>★ {staff.rating}</span>
                        </h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 500 }}>{staff.specialty}</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Exp: {staff.experience} Years • {staff.availableHours}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* STEP 3: Customer Details & Confirm Summary */}
          {step === 3 && (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="customer-name">Full Name *</label>
                  <input
                    id="customer-name"
                    type="text"
                    required
                    className="form-control"
                    placeholder="Enter your name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="customer-phone">Phone Number *</label>
                  <input
                    id="customer-phone"
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    className="form-control"
                    placeholder="10-digit mobile"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="customer-email">Email Address *</label>
                <input
                  id="customer-email"
                  type="email"
                  required
                  className="form-control"
                  placeholder="yourname@domain.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
              </div>

              {/* Coupon code application */}
              <div className="form-group" style={{ backgroundColor: 'var(--secondary)', padding: '16px', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                <label htmlFor="coupon-code" style={{ marginBottom: '8px', fontSize: '0.85rem' }}>Have a Promo Coupon?</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    id="coupon-code"
                    type="text"
                    className="form-control"
                    placeholder="e.g. GOLD20"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    style={{ flexGrow: 1 }}
                  />
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => handleApplyCoupon()}
                    style={{ padding: '0 16px' }}
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p style={{ fontSize: '0.75rem', color: 'var(--error)', marginTop: '4px', fontWeight: 600 }}>{couponError}</p>}
                {couponSuccess && <p style={{ fontSize: '0.75rem', color: 'var(--success)', marginTop: '4px', fontWeight: 600 }}>{couponSuccess}</p>}
              </div>

              {/* Order Summary Card */}
              <div className="card-glass" style={{ padding: '20px', marginTop: '20px', backgroundColor: 'rgba(201, 162, 39, 0.03)' }}>
                <h4 style={{ fontWeight: 700, borderBottom: '1px solid var(--secondary)', paddingBottom: '8px', marginBottom: '12px' }}>Summary Details</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Treatment:</span>
                    <strong>{selectedService?.name}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Date & Time:</span>
                    <span>{new Date(selectedDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })} at {selectedTime}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Stylist Expert:</span>
                    <span>{selectedStaff ? selectedStaff.name : 'Any Available'}</span>
                  </div>
                  
                  {appliedDiscount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--success)', fontWeight: 600 }}>
                      <span>Coupon Discount:</span>
                      <span>- ₹{appliedDiscount}</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--secondary)', paddingTop: '8px', marginTop: '8px', fontSize: '1.1rem', fontWeight: 800 }}>
                    <span>Amount Payable:</span>
                    <span className="text-gold">₹{finalTotal}</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Confirmation Checkbox */}
              <div className="whatsapp-checkbox">
                <input
                  id="whatsapp-confirm"
                  type="checkbox"
                  checked={whatsappConfirm}
                  onChange={(e) => setWhatsappConfirm(e.target.checked)}
                />
                <label htmlFor="whatsapp-confirm" style={{ margin: 0, fontWeight: 500, fontSize: '0.85rem', color: 'var(--text)', cursor: 'pointer' }}>
                  Send booking details via WhatsApp
                </label>
              </div>
            </form>
          )}
        </div>

        {/* Footer controls */}
        <div className="booking-footer">
          {step > 1 ? (
            <button className="btn btn-secondary" onClick={() => setStep(step - 1)}>
              <ArrowLeft size={16} />
              Back
            </button>
          ) : (
            <div /> // spacing placeholder
          )}

          {step < 3 ? (
            <button 
              className="btn btn-primary" 
              onClick={() => setStep(step + 1)}
              disabled={step === 1 && (!selectedService || !selectedDate || !selectedTime)}
            >
              Next Step
              <ArrowRight size={16} />
            </button>
          ) : (
            <button 
              type="button" 
              className="btn btn-primary" 
              style={{ backgroundColor: 'var(--success)' }}
              onClick={handleSubmit}
            >
              Confirm Appointment
              <Check size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
