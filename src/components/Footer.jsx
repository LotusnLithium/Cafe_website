import React from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  ExternalLink, 
  Heart, 
  ShieldCheck, 
  Sparkles,
  Instagram,
  Facebook
} from 'lucide-react';
import { CAFE_INFO } from '../data/menuData';

export function Footer({ onToggleOwnerMode }) {
  return (
    <footer
      style={{
        background: '#090706',
        borderTop: '1px solid rgba(245, 158, 11, 0.2)',
        padding: '4.5rem 0 2.5rem 0',
        color: '#faf5ed',
        position: 'relative'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 0.7fr) minmax(0, 0.8fr) minmax(0, 1.2fr)',
            gap: '2.5rem',
            marginBottom: '3.5rem'
          }}
          className="footer-grid"
        >
          {/* Col 1: Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'var(--gradient-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.3rem'
                }}
              >
                🎭
              </div>
              <span className="brand-font" style={{ fontSize: '1.35rem', fontWeight: 800 }}>
                BREAK A LEG CAFE
              </span>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Palghar's ultimate fast-food destination for gourmet momos, monster burgers, loaded fries, and cozy spotlight gatherings.
            </p>

            <div style={{ display: 'flex', gap: '0.65rem' }}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#faf5ed',
                  textDecoration: 'none'
                }}
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#faf5ed',
                  textDecoration: 'none'
                }}
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--accent-gold)' }}>
              Quick Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem' }}>
              <a href="#menu" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Spotlight Menu</a>
              <a href="#experience" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Cafe Ambience</a>
              <a href="#reservation" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Book a Table</a>
              <a href="#reviews" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Customer Reviews</a>
              <a href="#location" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Map & Directions</a>
            </div>
          </div>

          {/* Col 3: Popular Bites */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--accent-gold)' }}>
              Famous Dishes
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <span>Afghani Malai Momos</span>
              <span>Tandoori Flame Momos</span>
              <span>Kurkure Crunchy Momos</span>
              <span>Monster Smash Burger</span>
              <span>KitKat Monster Shake</span>
              <span>Volcano Peri-Peri Fries</span>
            </div>
          </div>

          {/* Col 4: Location & Hours */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--accent-gold)' }}>
              Contact & Location
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <MapPin size={16} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>{CAFE_INFO.address}, {CAFE_INFO.city}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Phone size={16} color="var(--accent-gold)" />
                <a href={`tel:${CAFE_INFO.phonePrimary}`} style={{ color: '#faf5ed', textDecoration: 'none', fontWeight: 600 }}>
                  {CAFE_INFO.phoneDisplay}
                </a>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Clock size={16} color="var(--accent-gold)" />
                <span>Open Everyday: 10:00 AM – 11:00 PM</span>
              </div>
            </div>

            <div style={{ marginTop: '1.25rem' }}>
              <button
                onClick={onToggleOwnerMode}
                className="btn btn-secondary btn-sm"
                style={{
                  fontSize: '0.78rem',
                  borderColor: 'rgba(16, 185, 129, 0.4)',
                  color: '#10b981',
                  background: 'rgba(16, 185, 129, 0.08)'
                }}
              >
                <ShieldCheck size={14} />
                <span>Cafe Owner Live Desk</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div
          style={{
            paddingTop: '1.75rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.82rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} Break a Leg Cafe, Palghar. All Rights Reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span>Made with</span>
            <Heart size={14} fill="#e11d48" color="#e11d48" />
            <span>for Palghar Foodies & Momo Lovers</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 550px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
