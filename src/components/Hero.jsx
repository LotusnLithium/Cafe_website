import React from 'react';
import { 
  Sparkles, 
  Flame, 
  Star, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Utensils, 
  ShoppingBag,
  Award,
  Bike
} from 'lucide-react';
import { CAFE_INFO } from '../data/menuData';

export function Hero({ onExploreMenu, onOpenReservation }) {
  return (
    <section
      style={{
        position: 'relative',
        paddingTop: '130px',
        paddingBottom: '70px',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(245, 158, 11, 0.22), rgba(225, 29, 72, 0.08) 55%, rgba(13, 11, 10, 0.95) 90%)',
        borderBottom: '1px solid var(--border-subtle)'
      }}
    >
      {/* Decorative Stage Lighting Glows */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '15%',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'rgba(245, 158, 11, 0.15)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '25%',
          right: '12%',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          background: 'rgba(225, 29, 72, 0.12)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
            gap: '3rem',
            alignItems: 'center'
          }}
          className="hero-grid"
        >
          {/* Left Column: Theatrical Pitch & Actions */}
          <div>
            {/* Top Spotlight Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(245, 158, 11, 0.12)',
                border: '1px solid var(--border-gold)',
                color: 'var(--accent-gold)',
                fontSize: '0.86rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                marginBottom: '1.4rem'
              }}
            >
              <Sparkles size={16} color="#fbbf24" />
              <span>PALGHAR'S #1 SPOTLIGHT BISTRO & ARTISAN MOMOS</span>
            </div>

            {/* Main Headline */}
            <h1
              className="brand-font"
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
                fontWeight: 800,
                lineHeight: 1.08,
                marginBottom: '1.25rem',
                letterSpacing: '-0.02em'
              }}
            >
              Taste The Drama. <br />
              <span className="text-gradient-gold">Savor The Spotlight.</span>
            </h1>

            {/* Sub-description */}
            <p
              style={{
                fontSize: '1.12rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.65,
                marginBottom: '1.8rem',
                maxWidth: '560px'
              }}
            >
              From velvety <strong>Afghani Malai Momos</strong> and fiery <strong>Tandoori Charred Dumplings</strong> to our towering <strong>Monster Smash Burgers</strong> and rich <strong>Hazelnut Frappes</strong> — experience Palghar’s most talked-about culinary stage.
            </p>

            {/* Address & Live Hours Quick Bar */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '2.2rem',
                fontSize: '0.88rem',
                color: 'var(--text-muted)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <MapPin size={16} color="var(--accent-gold)" />
                <span>Shop No. 8, Sai Ashish Apts, Mahim Rd (West), Palghar</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Clock size={16} color="var(--accent-emerald)" />
                <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>10:00 AM – 11:00 PM Daily</span>
              </div>
            </div>

            {/* Main CTAs */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '2.5rem'
              }}
            >
              <button
                onClick={onExploreMenu}
                className="btn btn-primary"
                style={{
                  padding: '0.9rem 1.8rem',
                  fontSize: '1.05rem',
                  boxShadow: '0 8px 30px rgba(245, 158, 11, 0.45)'
                }}
              >
                <Utensils size={18} />
                <span>Explore Spotlight Menu</span>
                <ChevronRight size={18} />
              </button>

              <button
                onClick={onOpenReservation}
                className="btn btn-secondary"
                style={{
                  padding: '0.9rem 1.6rem',
                  fontSize: '1.05rem'
                }}
              >
                <span>Book Backstage Table</span>
              </button>

              <a
                href={`https://wa.me/${CAFE_INFO.phonePrimary.replace('+', '')}?text=Hi%20Break%20a%20Leg%20Cafe%20Palghar!%20I%20would%20like%20to%20order.`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp"
                style={{
                  padding: '0.9rem 1.4rem',
                  fontSize: '1.02rem',
                  textDecoration: 'none'
                }}
              >
                <span>💬 WhatsApp Order</span>
              </a>
            </div>

            {/* Proof Badges */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-subtle)'
              }}
              className="hero-stats"
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    color: 'var(--accent-gold)'
                  }}
                >
                  <Star size={18} fill="#f59e0b" color="#f59e0b" />
                  <span>4.8 / 5</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                  1,240+ Google & Justdial Reviews
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    color: 'var(--text-primary)'
                  }}
                >
                  25+ Varieties
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                  Signature Momos & Platters
                </div>
              </div>

              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    color: '#10b981'
                  }}
                >
                  <Bike size={18} color="#10b981" />
                  <span>15-25 min</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                  Fast Palghar WhatsApp Delivery
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Montage & Floating Showcase Cards */}
          <div style={{ position: 'relative' }}>
            {/* Spotlight Glow behind Image */}
            <div
              style={{
                position: 'absolute',
                inset: '-15px',
                borderRadius: '35px',
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.4), rgba(225, 29, 72, 0.3))',
                filter: 'blur(30px)',
                zIndex: 0
              }}
            />

            {/* Main Showcase Hero Card */}
            <div
              className="glass-panel"
              style={{
                position: 'relative',
                zIndex: 1,
                padding: '1rem',
                borderRadius: '28px',
                background: 'rgba(23, 19, 17, 0.85)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)'
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '380px',
                  borderRadius: '20px',
                  overflow: 'hidden'
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80"
                  alt="Break a Leg Afghani Momos"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(13, 11, 10, 0.9) 0%, rgba(13, 11, 10, 0.1) 60%, transparent 100%)'
                  }}
                />

                {/* Tag Overlay on Image */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    background: 'rgba(13, 11, 10, 0.75)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(245, 158, 11, 0.4)',
                    padding: '0.4rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: 'var(--accent-gold)'
                  }}
                >
                  <Flame size={15} color="#f59e0b" />
                  <span>Chef's Spotlight Bestseller</span>
                </div>

                {/* Bottom Overlay Info */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1.25rem',
                    left: '1.25rem',
                    right: '1.25rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#faf5ed' }}>
                        Afghani Malai Momos
                      </h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        Silky Cashew Cream & Garlic Butter Glaze
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
                        ₹180
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                        ₹210
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Perks Strip */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem 0.5rem 0.25rem 0.5rem',
                  fontSize: '0.82rem',
                  color: 'var(--text-secondary)'
                }}
              >
                <span>✨ 100% Fresh Daily Prep</span>
                <span>🔥 Charcoal Spiced Flavors</span>
                <span>🧀 Real Mozzarella Melt</span>
              </div>
            </div>

            {/* Floating Mini Badge 1: Customer Love */}
            <div
              className="animate-float"
              style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                zIndex: 2,
                background: 'rgba(21, 17, 14, 0.95)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--border-gold)',
                borderRadius: '16px',
                padding: '0.75rem 1rem',
                boxShadow: '0 12px 30px rgba(0,0,0,0.6)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem'
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(245, 158, 11, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-gold)'
                }}
              >
                🏆
              </div>
              <div>
                <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#faf5ed' }}>
                  Best Momos in Palghar
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Ranked #1 by Local Foodies
                </div>
              </div>
            </div>

            {/* Floating Mini Badge 2: Direct WhatsApp Ordering */}
            <div
              className="animate-float"
              style={{
                position: 'absolute',
                bottom: '-25px',
                left: '-20px',
                zIndex: 2,
                animationDelay: '1.5s',
                background: 'rgba(21, 17, 14, 0.95)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(37, 211, 102, 0.5)',
                borderRadius: '16px',
                padding: '0.75rem 1rem',
                boxShadow: '0 12px 30px rgba(0,0,0,0.6)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem'
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(37, 211, 102, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem'
                }}
              >
                💬
              </div>
              <div>
                <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#25d366' }}>
                  Instant WhatsApp Checkout
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Zero commissions • Direct kitchen ping
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Spotlight Announcement Bar */}
      <div
        className="marquee-container"
        style={{
          marginTop: '4rem',
          borderTop: '1px solid rgba(0,0,0,0.15)',
          borderBottom: '1px solid rgba(0,0,0,0.15)'
        }}
      >
        <div className="marquee-content">
          🎭 TODAY’S SPOTLIGHT: GET COMPLIMENTARY PERI-PERI DIP ON ALL MOMO ORDERS &bull; 🥟 PALGHAR’S FAMOUS AFGHANI & TANDOORI MOMOS &bull; 🛵 FREE LOCAL DELIVERY ON ORDERS ABOVE ₹399 &bull; ☕ HIGH SPEED WI-FI & STUDY NOOK AVAILABLE &bull; 🎉 HOST YOUR BIRTHDAY AT OUR BACKSTAGE LOUNGE &bull; 🎭 TASTE THE DRAMA AT BREAK A LEG CAFE PALGHAR &bull;&nbsp;
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 3.5rem !important;
          }
        }
        @media (max-width: 600px) {
          .hero-stats {
            grid-template-columns: 1fr !important;
            gap: 0.75rem !important;
          }
        }
      `}</style>
    </section>
  );
}
