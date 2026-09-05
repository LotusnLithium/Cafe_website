import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Calendar, 
  Menu as MenuIcon, 
  X, 
  PhoneCall, 
  MapPin,
  Clock,
  Utensils
} from 'lucide-react';
import { CAFE_INFO } from '../data/menuData';

export function Navbar({
  cartCount,
  onOpenCart,
  onOpenReservation
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Calculate open status based on Indian standard time / local hours
    const currentHour = new Date().getHours();
    setIsOpenNow(currentHour >= CAFE_INFO.openHour24 && currentHour < CAFE_INFO.closeHour24);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Spotlight Menu', href: '#menu' },
    { label: 'Book Table', href: '#reservation' },
    { label: 'Ambience', href: '#experience' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Location', href: '#location' },
  ];

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 800,
          transition: 'all 0.3s ease',
          background: isScrolled
            ? 'rgba(13, 11, 10, 0.94)'
            : 'linear-gradient(to bottom, rgba(13, 11, 10, 0.95), rgba(13, 11, 10, 0))',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(245, 158, 11, 0.2)' : 'none',
          boxShadow: isScrolled ? '0 10px 30px rgba(0, 0, 0, 0.6)' : 'none'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: isScrolled ? '68px' : '78px',
              transition: 'height 0.3s ease'
            }}
          >
            {/* Brand Logo */}
            <a
              href="#"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #f59e0b, #e11d48)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.35rem',
                  boxShadow: '0 0 20px rgba(245, 158, 11, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                🎭
              </div>
              <div>
                <div
                  className="brand-font"
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    letterSpacing: '0.01em',
                    lineHeight: 1.1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <span style={{ color: '#faf5ed' }}>BREAK A LEG</span>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      background: 'rgba(245, 158, 11, 0.18)',
                      border: '1px solid rgba(245, 158, 11, 0.4)',
                      color: 'var(--accent-gold)',
                      padding: '0.1rem 0.45rem',
                      borderRadius: 'var(--radius-full)',
                      fontWeight: 700,
                      textTransform: 'uppercase'
                    }}
                  >
                    Palghar
                  </span>
                </div>
                <div
                  style={{
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.04em',
                    fontWeight: 500
                  }}
                >
                  Artisan Cafe &amp; Bistro
                </div>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.6rem'
              }}
              className="desktop-nav"
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    transition: 'color var(--transition-fast)',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-gold)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Actions & Cart */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem'
              }}
            >
              {/* Reserve Table CTA (Desktop) */}
              <button
                onClick={onOpenReservation}
                className="btn btn-secondary hide-on-mobile"
                style={{
                  padding: '0.55rem 1.05rem',
                  fontSize: '0.86rem'
                }}
              >
                <Calendar size={15} />
                <span>Book Table</span>
              </button>

              {/* Cart Drawer Trigger */}
              <button
                onClick={onOpenCart}
                className="btn btn-primary"
                style={{
                  padding: '0.55rem 1.15rem',
                  fontSize: '0.88rem',
                  gap: '0.45rem'
                }}
                aria-label="Shopping Cart"
              >
                <ShoppingBag size={16} />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span
                    style={{
                      background: '#FFFFFF',
                      color: 'var(--bg-primary)',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      padding: '0.1rem 0.45rem',
                      borderRadius: 'var(--radius-full)',
                      minWidth: '18px',
                      textAlign: 'center'
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="btn btn-secondary btn-icon show-on-mobile"
                aria-label="Toggle Mobile Navigation Menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Side Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 850,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            justifyContent: 'flex-end',
            animation: 'fadeIn 0.2s ease forwards'
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            style={{
              width: '82%',
              maxWidth: '320px',
              height: '100%',
              background: 'var(--bg-secondary)',
              borderLeft: '1px solid var(--border-gold)',
              padding: '2rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '-10px 0 35px rgba(0, 0, 0, 0.8)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Drawer Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '1.25rem',
                  borderBottom: '1px solid var(--border-subtle)',
                  marginBottom: '1.5rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>🎭</span>
                  <div className="brand-font" style={{ fontWeight: 800, fontSize: '1.15rem' }}>
                    BREAK A LEG
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn btn-secondary btn-icon"
                  style={{ width: '36px', height: '36px' }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Status Badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  background: isOpenNow ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                  border: `1px solid ${isOpenNow ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                  color: isOpenNow ? '#34d399' : '#f87171',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  marginBottom: '1.5rem'
                }}
              >
                <Clock size={15} />
                <span>{isOpenNow ? 'Open Now (11 AM - 11 PM)' : 'Currently Closed (Opens 11 AM)'}</span>
              </div>

              {/* Navigation Links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                      fontSize: '0.96rem',
                      fontWeight: 600,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>{link.label}</span>
                    <span style={{ color: 'var(--accent-gold)' }}>→</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Drawer Bottom Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}
              >
                <Calendar size={16} />
                <span>Reserve a Table</span>
              </button>

              <a
                href={`tel:${CAFE_INFO.phonePrimary}`}
                className="btn btn-secondary"
                style={{ width: '100%', justifyContent: 'center', padding: '0.75rem', textDecoration: 'none' }}
              >
                <PhoneCall size={16} />
                <span>Call Cafe Desk</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
