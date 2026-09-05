import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Sparkles, 
  Check, 
  Heart, 
  PartyPopper, 
  Coffee, 
  Phone, 
  Send,
  Ticket
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateWhatsAppReservationUrl } from '../utils/whatsappHelper';
import { saveReservation } from '../utils/storageHelper';
import { CAFE_INFO } from '../data/menuData';

export function ReservationSection() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('Today');
  const [time, setTime] = useState('07:30 PM');
  const [zone, setZone] = useState('The Spotlight Booth');
  const [occasion, setOccasion] = useState('Casual Dining');
  const [specialRequests, setSpecialRequests] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const zones = [
    {
      id: 'The Spotlight Booth',
      title: 'The Spotlight Booth',
      icon: '🎭',
      desc: 'Central energetic zone under neon signs & signature stage ambiance.'
    },
    {
      id: 'Cozy Couple Corner',
      title: 'Cozy Couple Corner',
      icon: '☕',
      desc: 'Intimate, warm study and quiet conversation nook with soft lighting.'
    },
    {
      id: 'Backstage Party Lounge',
      title: 'Backstage Party Lounge',
      icon: '🎪',
      desc: 'Spacious section ideal for birthday bashes, group treats & game nights.'
    }
  ];

  const timeSlots = [
    '11:30 AM', '01:00 PM', '03:30 PM', '05:00 PM', 
    '06:30 PM', '07:30 PM', '08:30 PM', '09:30 PM', '10:00 PM'
  ];

  const occasions = [
    'Casual Hangout', 'Birthday Bash 🎉', 'Anniversary 💖', 
    'Date Night ✨', 'Work & Coffee 💻', 'Family Gathering 👨‍👩‍👧‍👦'
  ];

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter your name for table reservation.');
      return;
    }
    if (!phone.trim()) {
      alert('Please enter your contact number.');
      return;
    }

    const bookingData = {
      id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      phone,
      guests,
      date,
      time,
      zone,
      occasion,
      specialRequests,
      status: 'Confirmed'
    };

    saveReservation(bookingData);
    setConfirmedBooking(bookingData);

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 }
    });
  };

  const handleSendWhatsAppNotification = () => {
    if (!confirmedBooking) return;
    const url = generateWhatsAppReservationUrl(confirmedBooking);
    window.open(url, '_blank');
  };

  return (
    <section id="reservation" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <CalendarIcon size={15} />
            <span>VIP TABLE & BACKSTAGE BOOKING</span>
          </div>
          <h2 className="section-title">
            Reserve Your <span className="text-gradient-crimson">Spotlight Table</span>
          </h2>
          <p className="section-desc">
            Planning a birthday bash, date night, or weekend momo treat with friends? Guarantee your preferred seating with instant VIP booking.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)',
            gap: '2.5rem',
            alignItems: 'flex-start'
          }}
          className="reservation-grid"
        >
          {/* Left: Booking Form */}
          <div
            className="glass-panel"
            style={{
              padding: '2rem',
              borderRadius: '24px',
              border: '1px solid rgba(245, 158, 11, 0.25)'
            }}
          >
            <form onSubmit={handleSubmitBooking}>
              {/* 1. Zone Selection */}
              <div style={{ marginBottom: '1.75rem' }}>
                <div className="form-label" style={{ marginBottom: '0.75rem', color: '#faf5ed' }}>
                  1. Choose Seating Ambiance:
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                    gap: '0.75rem'
                  }}
                >
                  {zones.map((z) => {
                    const isSelected = zone === z.id;
                    return (
                      <div
                        key={z.id}
                        onClick={() => setZone(z.id)}
                        style={{
                          padding: '1rem',
                          borderRadius: 'var(--radius-md)',
                          background: isSelected ? 'rgba(245, 158, 11, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                          border: isSelected ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ fontSize: '1.6rem', marginBottom: '0.35rem' }}>{z.icon}</div>
                        <div style={{ fontSize: '0.92rem', fontWeight: 700, color: isSelected ? 'var(--accent-gold)' : '#faf5ed', marginBottom: '0.2rem' }}>
                          {z.title}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                          {z.desc}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. Guests & Date & Time */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}
              >
                <div>
                  <label className="form-label">Number of Guests</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="form-select"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label">Date</label>
                  <select
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="form-select"
                  >
                    <option value="Today">Today (Same Day)</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="This Friday Evening">This Friday</option>
                    <option value="This Saturday (Weekend)">This Saturday (Weekend)</option>
                    <option value="This Sunday (Weekend)">This Sunday (Weekend)</option>
                    <option value="Custom Upcoming Date">Custom Date</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Time Slot</label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="form-select"
                  >
                    {timeSlots.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 3. Occasion */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Select Occasion</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {occasions.map(occ => {
                    const isSelected = occasion === occ;
                    return (
                      <button
                        type="button"
                        key={occ}
                        onClick={() => setOccasion(occ)}
                        style={{
                          padding: '0.45rem 0.9rem',
                          borderRadius: 'var(--radius-full)',
                          border: isSelected ? '1px solid var(--accent-crimson)' : '1px solid var(--border-subtle)',
                          background: isSelected ? 'rgba(225, 29, 72, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                          color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                          fontSize: '0.84rem',
                          fontWeight: isSelected ? 700 : 500,
                          cursor: 'pointer'
                        }}
                      >
                        {occ}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Contact Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Varun Suthar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 98200 12345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              {/* 5. Special Requests */}
              <div style={{ marginBottom: '1.75rem' }}>
                <label className="form-label">Special Requests (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Birthday cake arrangement, balloon decor, song request..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="form-input"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '0.95rem',
                  fontSize: '1.05rem'
                }}
              >
                <CalendarIcon size={18} />
                <span>Confirm VIP Table Booking (Free)</span>
              </button>
            </form>
          </div>

          {/* Right: Perks & Backstage Pass Preview */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Spotlight Backstage Pass Card */}
            <div
              className="glass-panel"
              style={{
                padding: '1.75rem',
                borderRadius: '24px',
                background: 'linear-gradient(145deg, rgba(35, 28, 23, 0.95) 0%, rgba(21, 17, 14, 0.9) 100%)',
                border: '1px solid rgba(245, 158, 11, 0.35)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-30px',
                  right: '-30px',
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'rgba(245, 158, 11, 0.15)',
                  filter: 'blur(30px)'
                }}
              />

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <Ticket size={22} color="var(--accent-gold)" />
                <span className="brand-font" style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                  THE BACKSTAGE EXPERIENCE
                </span>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                We don’t just serve fast food; we create memories. Break a Leg is designed as a stage for conversations, celebrations, and unbeatable taste.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.86rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: '#10b981' }}>✔</span>
                  <span><strong>Zero Booking Fee:</strong> Tables held for up to 20 mins</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: '#10b981' }}>✔</span>
                  <span><strong>Birthday Special:</strong> Free customized photo moment & dessert</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: '#10b981' }}>✔</span>
                  <span><strong>Study & Remote Work:</strong> Power sockets at every booth</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: '#10b981' }}>✔</span>
                  <span><strong>Board Games:</strong> Uno, Chess, Jenga & Cards on the house</span>
                </div>
              </div>

              <div
                style={{
                  marginTop: '1.5rem',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Direct Inquiry Hotline</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#faf5ed' }}>{CAFE_INFO.phoneDisplay}</div>
                </div>
                <a
                  href={`tel:${CAFE_INFO.phonePrimary}`}
                  className="btn btn-secondary btn-sm"
                  style={{ textDecoration: 'none' }}
                >
                  <Phone size={14} />
                  <span>Call Us</span>
                </a>
              </div>
            </div>

            {/* Birthday Celebration Callout */}
            <div
              className="glass-panel"
              style={{
                padding: '1.5rem',
                borderRadius: '20px',
                border: '1px solid rgba(225, 29, 72, 0.35)',
                background: 'rgba(225, 29, 72, 0.08)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <PartyPopper size={20} color="#f43f5e" />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fda4af' }}>
                  Hosting a Birthday or Group Treat?
                </h4>
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Reserve the entire Backstage Lounge for groups of 10+ people with custom balloon decor, private music playlist & special party platters!
              </p>
            </div>
          </div>
        </div>

        {/* Booking Confirmed Digital Ticket Modal */}
        {confirmedBooking && (
          <div className="modal-overlay" onClick={() => setConfirmedBooking(null)}>
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              style={{ padding: '2rem', textAlign: 'center', maxWidth: '480px' }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(245, 158, 11, 0.2)',
                  color: 'var(--accent-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem auto'
                }}
              >
                <Check size={32} strokeWidth={3} />
              </div>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.4rem' }}>
                Table Reserved!
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                Your VIP Backstage pass has been registered for <strong>{confirmedBooking.name}</strong>.
              </p>

              {/* Digital Ticket Pass */}
              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px dashed var(--border-gold)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.25rem',
                  textAlign: 'left',
                  fontSize: '0.88rem',
                  marginBottom: '1.5rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Booking Ref:</span>
                  <strong style={{ color: 'var(--accent-gold)' }}>#{confirmedBooking.id}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Date & Time:</span>
                  <span>{confirmedBooking.date} @ {confirmedBooking.time}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Party Size:</span>
                  <span>{confirmedBooking.guests} Guests</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Seating Zone:</span>
                  <span>{confirmedBooking.zone}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Occasion:</span>
                  <span>{confirmedBooking.occasion}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button
                  onClick={handleSendWhatsAppNotification}
                  className="btn btn-whatsapp"
                  style={{ width: '100%' }}
                >
                  <Send size={16} />
                  <span>Send WhatsApp Confirmation to Cafe</span>
                </button>

                <button
                  onClick={() => setConfirmedBooking(null)}
                  className="btn btn-secondary"
                  style={{ width: '100%' }}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .reservation-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
