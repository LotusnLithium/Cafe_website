import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  ExternalLink, 
  Bike, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  MessageCircle,
  Sparkles,
  Navigation
} from 'lucide-react';
import { CAFE_INFO } from '../data/menuData';
import { FAQS } from '../data/galleryData';

export function LocationContact() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section id="location" className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <MapPin size={15} />
            <span>FIND US IN PALGHAR</span>
          </div>
          <h2 className="section-title">
            Visit Our <span className="text-gradient-gold">Spotlight Bistro</span>
          </h2>
          <p className="section-desc">
            Conveniently located on Mahim Road, right near Valan Naka. Walk in for a cozy meal or order express home delivery anywhere across Palghar.
          </p>
        </div>

        {/* Location & Map Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
            gap: '2.5rem',
            alignItems: 'stretch',
            marginBottom: '4.5rem'
          }}
          className="location-grid"
        >
          {/* Left: Contact Info & Delivery Areas */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Address Card */}
            <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: '22px' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'rgba(245, 158, 11, 0.15)',
                    color: 'var(--accent-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#faf5ed', marginBottom: '0.4rem' }}>
                    Cafe Address
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                    {CAFE_INFO.address},<br />
                    {CAFE_INFO.city}
                  </p>
                  <a
                    href={CAFE_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary btn-sm"
                    style={{ textDecoration: 'none' }}
                  >
                    <Navigation size={14} />
                    <span>Get Directions on Google Maps</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Contact & Timings Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.6rem' }}>
                  <Phone size={20} color="var(--accent-emerald)" />
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Direct Call</h4>
                </div>
                <a
                  href={`tel:${CAFE_INFO.phonePrimary}`}
                  style={{
                    color: 'var(--accent-gold)',
                    fontWeight: 800,
                    fontSize: '1rem',
                    textDecoration: 'none',
                    display: 'block',
                    marginBottom: '0.2rem'
                  }}
                >
                  {CAFE_INFO.phoneDisplay}
                </a>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                  Alt: {CAFE_INFO.phoneAlt}
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.6rem' }}>
                  <Clock size={20} color="var(--accent-gold)" />
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Hours</h4>
                </div>
                <div style={{ color: '#faf5ed', fontWeight: 700, fontSize: '0.95rem' }}>
                  10:00 AM – 11:00 PM
                </div>
                <div style={{ fontSize: '0.76rem', color: '#10b981', fontWeight: 600 }}>
                  Open All 7 Days
                </div>
              </div>
            </div>

            {/* Delivery Coverage Areas */}
            <div
              className="glass-panel"
              style={{
                padding: '1.5rem',
                borderRadius: '20px',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                background: 'rgba(16, 185, 129, 0.05)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.85rem' }}>
                <Bike size={20} color="#10b981" />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#10b981' }}>
                  Palghar Local Delivery Zones
                </h4>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>
                We deliver hot & crunchy fast food directly to your doorstep in 20-30 minutes across:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                {CAFE_INFO.deliveryAreas.map((area) => (
                  <span
                    key={area}
                    style={{
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.76rem',
                      color: '#faf5ed'
                    }}
                  >
                    📍 {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Stylized Interactive Map Preview Card */}
          <div
            className="glass-panel"
            style={{
              borderRadius: '24px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              position: 'relative'
            }}
          >
            {/* Top Map Header */}
            <div
              style={{
                padding: '1rem 1.25rem',
                background: 'rgba(21, 17, 14, 0.95)',
                borderBottom: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="live-pulse-dot" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#faf5ed' }}>
                  Live Cafe Navigation & Coordinates
                </span>
              </div>
              <a
                href={CAFE_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--accent-gold)',
                  textDecoration: 'none',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                <span>Google Map Link</span>
                <ExternalLink size={12} />
              </a>
            </div>

            {/* Map Canvas / Visual Embed */}
            <div style={{ flexGrow: 1, position: 'relative', minHeight: '340px' }}>
              <iframe
                title="Break a Leg Cafe Palghar Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3753.868748366436!2d72.7562817757962!3d19.696956281639918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be71cdd00000001%3A0x1!2sMahim%20Rd%2C%20Palghar%2C%20Maharashtra%20401404!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)',
                  position: 'absolute',
                  inset: 0
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Floating Center Pin Overlay */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '1.5rem',
                  right: '1.5rem',
                  background: 'rgba(17, 14, 12, 0.95)',
                  backdropFilter: 'blur(16px)',
                  padding: '1rem 1.25rem',
                  borderRadius: '16px',
                  border: '1px solid var(--border-gold)',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#faf5ed' }}>
                    Break a Leg Cafe 🎭
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Shop No. 8, Sai Ashish Apts, Mahim Rd (West)
                  </div>
                </div>

                <a
                  href={CAFE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary btn-sm"
                  style={{ textDecoration: 'none', whiteSpace: 'nowrap' }}
                >
                  <Navigation size={13} />
                  <span>Navigate</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions Accordion */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="section-badge">
              <HelpCircle size={14} />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800 }}>
              Got Questions? We’ve Got Answers!
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.q}
                  className="glass-panel"
                  style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    transition: 'border-color 0.2s ease'
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    style={{
                      width: '100%',
                      padding: '1.25rem',
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      color: '#faf5ed',
                      fontSize: '1rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={18} color="var(--accent-gold)" /> : <ChevronDown size={18} />}
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: '0 1.25rem 1.25rem 1.25rem',
                        color: 'var(--text-secondary)',
                        fontSize: '0.9rem',
                        lineHeight: 1.6,
                        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                        paddingTop: '0.85rem'
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .location-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
