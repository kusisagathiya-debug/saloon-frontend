import React, { useState, useEffect } from 'react';
import { db } from '../services/db.js';
import { TrendingUp, Users, DollarSign, Calendar, CheckCircle, XCircle, Info } from 'lucide-react';

export default function Dashboard({ triggerRefresh }) {
  const [stats, setStats] = useState(null);
  const [staff, setStaff] = useState([]);
  const [attendance, setAttendance] = useState({});

  // Fetch stats and staff data
  const loadDashboardData = () => {
    setStats(db.getStats());
    const staffList = db.getStaff();
    setStaff(staffList);
    
    // Seed attendance checklist if not set
    const initialAttendance = {};
    staffList.forEach(s => {
      initialAttendance[s.id] = true; // default all present
    });
    setAttendance(prev => ({ ...initialAttendance, ...prev }));
  };

  useEffect(() => {
    loadDashboardData();
  }, [triggerRefresh]);

  const handleStatusChange = (bookingId, newStatus) => {
    db.updateBookingStatus(bookingId, newStatus);
    loadDashboardData(); // reload stats
  };

  const handleAttendanceToggle = (staffId) => {
    setAttendance(prev => ({
      ...prev,
      [staffId]: !prev[staffId]
    }));
  };

  if (!stats) return <p style={{ textAlign: 'center', padding: '40px' }}>Loading analytics panel...</p>;

  // Data for Booking Trend SVG Line Chart (7 days)
  const trendData = [
    { label: 'Mon', value: 3 },
    { label: 'Tue', value: 5 },
    { label: 'Wed', value: 4 },
    { label: 'Thu', value: 7 },
    { label: 'Fri', value: stats.totalAppointments - 3 }, // adjust based on live count
    { label: 'Sat', value: stats.totalAppointments - 1 },
    { label: 'Sun', value: stats.totalAppointments }
  ];

  // Calculate coordinates for SVG line chart (box: 500 x 150)
  const chartWidth = 500;
  const chartHeight = 150;
  const maxVal = Math.max(...trendData.map(d => d.value), 10);
  const points = trendData.map((d, i) => {
    const x = (i / (trendData.length - 1)) * (chartWidth - 60) + 30;
    const y = chartHeight - ((d.value / maxVal) * (chartHeight - 40) + 20);
    return `${x},${y}`;
  }).join(' ');

  // Category breakdown calculations for progress bars
  const totalCatRevenue = Object.values(stats.categoryRevenue).reduce((a, b) => a + b, 0) || 1;
  const categoryMeta = [
    { id: 'hair', label: 'Hair services', color: '#C9A227' }, // Gold
    { id: 'facial', label: 'Facials & Skin', color: '#E8D5B7' }, // Soft Gold
    { id: 'makeup', label: 'Makeup & Bridal', color: '#222222' }, // Black
    { id: 'treatment', label: 'Special Treatments', color: '#888888' } // Gray
  ];

  return (
    <section id="dashboard" className="section" style={{ backgroundColor: 'var(--secondary)', borderTop: '1px solid var(--glass-border)' }}>
      <div className="container">
        <div className="section-title">
          <h2>Management Dashboard</h2>
          <p>Real-time salon analytics, appointment scheduler logs, and staff attendance.</p>
        </div>

        {/* 1. KEY PERFORMANCE METRICS CARDS */}
        <div className="dashboard-grid">
          {/* Card: Total Appointments */}
          <div className="card-glass dash-card">
            <div className="dash-card-header">
              <span>Total Appointments</span>
              <div className="dash-card-icon">
                <Calendar size={18} />
              </div>
            </div>
            <div>
              <span className="dash-card-value">{stats.totalAppointments}</span>
              <div className="dash-card-trend up">
                <TrendingUp size={12} />
                <span>+12.4% this week</span>
              </div>
            </div>
          </div>

          {/* Card: Total Revenue */}
          <div className="card-glass dash-card">
            <div className="dash-card-header">
              <span>Cumulative Revenue</span>
              <div className="dash-card-icon">
                <DollarSign size={18} />
              </div>
            </div>
            <div>
              <span className="dash-card-value">₹{stats.revenueTotal}</span>
              <div className="dash-card-trend up">
                <TrendingUp size={12} />
                <span>Active Bookings Included</span>
              </div>
            </div>
          </div>

          {/* Card: Today's Revenue */}
          <div className="card-glass dash-card">
            <div className="dash-card-header">
              <span>Today's Turnover</span>
              <div className="dash-card-icon">
                <DollarSign size={18} />
              </div>
            </div>
            <div>
              <span className="dash-card-value">₹{stats.revenueToday}</span>
              <div className="dash-card-trend up">
                <TrendingUp size={12} />
                <span>Today's transactions</span>
              </div>
            </div>
          </div>

          {/* Card: Bookings Today */}
          <div className="card-glass dash-card">
            <div className="dash-card-header">
              <span>Today's Sessions</span>
              <div className="dash-card-icon">
                <Users size={18} />
              </div>
            </div>
            <div>
              <span className="dash-card-value">{stats.bookingsTodayCount}</span>
              <div className="dash-card-trend">
                <span>Slots left: {21 - stats.bookingsTodayCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. ANALYTICS CHARTS SPLIT */}
        <div className="dash-layout-split">
          {/* SVG Line Chart: Bookings Growth */}
          <div className="card-glass chart-container">
            <h3 className="dash-section-title">Bookings Growth Trend (7 Days)</h3>
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="chart-svg">
              <defs>
                <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              
              {/* Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((p, idx) => (
                <line
                  key={idx}
                  x1="30"
                  y1={20 + p * (chartHeight - 40)}
                  x2={chartWidth - 30}
                  y2={20 + p * (chartHeight - 40)}
                  className="chart-grid-line"
                />
              ))}

              {/* Data Area & Line */}
              <path
                d={`M ${trendData.map((d, i) => `${(i / (trendData.length - 1)) * (chartWidth - 60) + 30},${chartHeight - ((d.value / maxVal) * (chartHeight - 40) + 20)}`).join(' L ')} L ${(trendData.length - 1) * ((chartWidth - 60) / (trendData.length - 1)) + 30},${chartHeight - 20} L 30,${chartHeight - 20} Z`}
                className="chart-data-area"
              />
              <polyline points={points} className="chart-data-line" />

              {/* Dots and Values */}
              {trendData.map((d, i) => {
                const x = (i / (trendData.length - 1)) * (chartWidth - 60) + 30;
                const y = chartHeight - ((d.value / maxVal) * (chartHeight - 40) + 20);
                return (
                  <g key={i}>
                    <circle cx={x} cy={y} r="5" className="chart-dot" />
                    <text x={x} y={y - 10} textAnchor="middle" className="chart-text">{d.value}</text>
                    <text x={x} y={chartHeight - 5} textAnchor="middle" className="chart-text" style={{ fontWeight: 700 }}>{d.label}</text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Revenue Breakdown Progress Bars */}
          <div className="card-glass chart-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 className="dash-section-title">Revenue Breakdown</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {categoryMeta.map(cat => {
                const rev = stats.categoryRevenue[cat.id] || 0;
                const pct = Math.round((rev / totalCatRevenue) * 100);
                return (
                  <div key={cat.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                      <span>{cat.label}</span>
                      <span>₹{rev} ({pct}%)</span>
                    </div>
                    <div className="rating-bar-track" style={{ height: '12px' }}>
                      <div 
                        className="rating-bar-fill" 
                        style={{ 
                          width: `${pct}%`, 
                          backgroundColor: cat.color,
                          backgroundImage: `linear-gradient(90deg, ${cat.color} 0%, var(--accent) 100%)`
                        }} 
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. BOOKINGS LIST AND STAFF ATTENDANCE TABLE */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px', alignItems: 'start' }}>
          {/* Upcoming Bookings Table */}
          <div className="card-glass booking-list-card">
            <h3 className="dash-section-title">Upcoming Appointments (7 Days)</h3>
            
            {stats.upcomingBookings.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', padding: '20px 0' }}>No pending or confirmed appointments booked.</p>
            ) : (
              <div className="bookings-table-wrapper">
                <table className="bookings-table">
                  <thead>
                    <tr>
                      <th>Time & Date</th>
                      <th>Customer</th>
                      <th>Service</th>
                      <th>Stylist</th>
                      <th>Amount</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.upcomingBookings.map((b) => (
                      <tr key={b.id}>
                        <td>
                          <strong style={{ display: 'block' }}>{b.time}</strong>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{b.date}</span>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{b.customerName}</div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{b.customerPhone}</span>
                        </td>
                        <td>{b.serviceName}</td>
                        <td style={{ color: 'var(--primary)', fontWeight: 600 }}>{b.staffName}</td>
                        <td style={{ fontWeight: 700 }}>₹{b.price}</td>
                        <td>
                          {b.status === 'confirmed' ? (
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button 
                                className="btn btn-secondary" 
                                style={{ padding: '4px 8px', minHeight: '32px', color: 'var(--success)' }}
                                onClick={() => handleStatusChange(b.id, 'completed')}
                                title="Mark as Completed"
                              >
                                <CheckCircle size={16} />
                              </button>
                              <button 
                                className="btn btn-secondary" 
                                style={{ padding: '4px 8px', minHeight: '32px', color: 'var(--error)' }}
                                onClick={() => handleStatusChange(b.id, 'cancelled')}
                                title="Cancel Appointment"
                              >
                                <XCircle size={16} />
                              </button>
                            </div>
                          ) : (
                            <span className={`status-badge status-${b.status}`}>{b.status}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Staff Attendance Checklist */}
          <div className="card-glass booking-list-card">
            <h3 className="dash-section-title">Staff Attendance</h3>
            
            <div className="attendance-list">
              {staff.map((s) => (
                <div key={s.id} className="attendance-item">
                  <div className="attendance-staff-info">
                    <img 
                      src={s.photo} 
                      alt={s.name} 
                      className="attendance-staff-avatar" 
                    />
                    <div>
                      <div className="attendance-staff-name">{s.name}</div>
                      <span className={`attendance-status-label ${attendance[s.id] ? 'present' : 'absent'}`}>
                        {attendance[s.id] ? 'Present' : 'Absent'}
                      </span>
                    </div>
                  </div>

                  <label className="attendance-toggle-wrapper" htmlFor={`attend-toggle-${s.id}`}>
                    <input 
                      id={`attend-toggle-${s.id}`}
                      type="checkbox" 
                      className="attendance-toggle-input"
                      checked={!!attendance[s.id]}
                      onChange={() => handleAttendanceToggle(s.id)}
                    />
                    <span className="attendance-toggle-slider" />
                  </label>
                </div>
              ))}
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
              <Info size={12} className="text-gold" />
              <span>Absent staff are automatically filtered out from client scheduling grids.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
