import React, { useState } from 'react';
import { 
  Sparkles, 
  Wifi, 
  Snowflake, 
  Music, 
  Gamepad2, 
  PartyPopper, 
  Bike, 
  Camera,
  Coffee
} from 'lucide-react';
import { GALLERY_ITEMS } from '../data/galleryData';
import { CAFE_INFO } from '../data/menuData';

export function ExperienceGallery() {
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Moments' },
    { id: 'food', label: 'Artisan Food' },
    { id: 'ambiance', label: 'Cafe Ambience' },
    { id: 'drinks', label: 'Shakes & Coffee' },
    { id: 'events', label: 'Celebrations' }
  ];

  const filteredGallery = activeFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeFilter);

  const amenitiesIcons = {
    'Wifi': <Wifi size={22} color="var(--accent-gold)" />,
    'Snowflake': <Snowflake size={22} color="#38bdf8" />,
    'Music': <Music size={22} color="var(--accent-crimson)" />,
    'Gamepad2': <Gamepad2 size={22} color="#a855f7" />,
    'Sparkles': <PartyPopper size={22} color="#fbbf24" />,
    'Bike': <Bike size={22} color="#10b981" />
  };

  return (
    <section id="experience" className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Camera size={15} />
            <span>THE CAFE AMBIENCE</span>
          </div>
          <h2 className="section-title">
            Step Into The <span className="text-gradient-gold">Spotlight</span>
          </h2>
          <p className="section-desc">
            More than just delicious food — Break a Leg is designed as a warm, neon-lit sanctuary for friends, couples, students, and creators in Palghar.
          </p>
        </div>

        {/* Amenities Highlights Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
            gap: '1.25rem',
            marginBottom: '3.5rem'
          }}
        >
          {CAFE_INFO.amenities.map((item) => (
            <div
              key={item.label}
              className="glass-panel"
              style={{
                padding: '1.25rem 1rem',
                borderRadius: '18px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.65rem'
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {amenitiesIcons[item.icon] || <Sparkles size={20} />}
              </div>
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#faf5ed' }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Filter Pills */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.65rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem'
          }}
        >
          {categories.map((cat) => {
            const isSelected = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                style={{
                  padding: '0.55rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  border: isSelected ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
                  background: isSelected ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                  color: isSelected ? 'var(--accent-gold)' : 'var(--text-secondary)',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              className="glass-panel"
              style={{
                borderRadius: '22px',
                overflow: 'hidden',
                position: 'relative',
                height: '320px'
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(13, 11, 10, 0.95) 0%, rgba(13, 11, 10, 0.2) 60%, transparent 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.5rem'
                }}
              >
                <div
                  style={{
                    fontSize: '0.72rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--accent-gold)',
                    fontWeight: 700,
                    marginBottom: '0.3rem'
                  }}
                >
                  {item.category}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#faf5ed', marginBottom: '0.35rem' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
