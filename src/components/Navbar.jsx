import React, { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';

export default function Navbar({ activeSection, onNavigate, onToggleAdmin, isAdminMode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Monitor scroll height to apply compact shadow style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body scroll lock for mobile menu
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'staff', label: 'Staff' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleLinkClick = (id) => {
    setIsSidebarOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo */}
          <a href="#home" className="logo" onClick={() => handleLinkClick('home')}>
            <img src="./logo.png" alt="Sadhana Salon Logo" className="logo-img" />
            <div className="logo-text-wrapper">
              <span>Sadhana</span>
              <span className="logo-sub">Luxury Salon</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="nav-links">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${activeSection === item.id && !isAdminMode ? 'active' : ''}`}
                onClick={() => handleLinkClick(item.id)}
              >
                {item.label}
              </a>
            ))}

            {/* Admin Dashboard Navigation Toggle */}
            <a
              href="#dashboard"
              className={`nav-link ${isAdminMode ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                onToggleAdmin();
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <User size={16} />
              Dashboard
            </a>
          </nav>

          {/* Mobile Hamburger Button */}
          <button 
            className="mobile-menu-btn" 
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Sidebar overlay */}
      <div 
        className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} 
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Mobile Slide-in Sidebar */}
      <div className={`mobile-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button 
          className="sidebar-close-btn" 
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close navigation menu"
        >
          <X size={24} />
        </button>

        <ul className="sidebar-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`sidebar-link ${activeSection === item.id && !isAdminMode ? 'active' : ''}`}
                onClick={() => handleLinkClick(item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#dashboard"
              className={`sidebar-link ${isAdminMode ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setIsSidebarOpen(false);
                onToggleAdmin();
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <User size={18} />
              Admin Dashboard
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
