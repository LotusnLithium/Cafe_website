import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShoppingBag, 
  Calendar, 
  Sliders, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Bike, 
  Utensils, 
  Phone, 
  AlertCircle,
  X,
  Power
} from 'lucide-react';
import { getStoredOrders, getStoredReservations } from '../utils/storageHelper';

export function OwnerDashboard({
  onClose,
  menuItems,
  onToggleItemStock,
  outOfStockMap = {}
}) {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'reservations' | 'stock' | 'analytics'
  const [orders, setOrders] = useState(getStoredOrders());
  const [reservations, setReservations] = useState(getStoredReservations());

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const handleUpdateResStatus = (resId, newStatus) => {
    setReservations(reservations.map(r => r.id === resId ? { ...r, status: newStatus } : r));
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(10, 8, 7, 0.98)',
        backdropFilter: 'blur(20px)',
        overflowY: 'auto',
        color: '#faf5ed',
        animation: 'modal-fade-in 0.25s ease'
      }}
    >
      {/* Top Admin Bar */}
      <div
        style={{
          background: 'linear-gradient(to right, #171311, #231c17)',
          borderBottom: '1px solid var(--border-gold)',
          padding: '1rem 1.5rem',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'rgba(16, 185, 129, 0.2)',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ShieldCheck size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="brand-font" style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                  CAFE OWNER LIVE DESK
                </span>
                <span
                  style={{
                    background: '#10b981',
                    color: '#062013',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    padding: '0.1rem 0.5rem',
                    borderRadius: 'var(--radius-full)'
                  }}
                >
                  DEMO MODE
                </span>
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Break a Leg Cafe • Mahim Road, Palghar
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem' }} className="hide-on-mobile">
            <button
              onClick={() => setActiveTab('orders')}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: activeTab === 'orders' ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
                background: activeTab === 'orders' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                color: activeTab === 'orders' ? 'var(--accent-gold)' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.84rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <ShoppingBag size={15} />
              <span>Live Orders ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('reservations')}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: activeTab === 'reservations' ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
                background: activeTab === 'reservations' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                color: activeTab === 'reservations' ? 'var(--accent-gold)' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.84rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <Calendar size={15} />
              <span>Table Bookings ({reservations.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('stock')}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: activeTab === 'stock' ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
                background: activeTab === 'stock' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                color: activeTab === 'stock' ? 'var(--accent-gold)' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.84rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <Sliders size={15} />
              <span>Menu Stock</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: activeTab === 'analytics' ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
                background: activeTab === 'analytics' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                color: activeTab === 'analytics' ? 'var(--accent-gold)' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.84rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <TrendingUp size={15} />
              <span>Sales Insights</span>
            </button>
          </div>

          {/* Close Dashboard Button */}
          <button
            onClick={onClose}
            className="btn btn-crimson btn-sm"
            style={{ padding: '0.45rem 1rem' }}
          >
            <Power size={14} />
            <span>Exit Owner View</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="container" style={{ padding: '2.5rem 1.25rem' }}>
        {/* Mobile Tab Selector */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
            marginBottom: '1.5rem',
            paddingBottom: '0.5rem'
          }}
          className="show-on-mobile"
        >
          {['orders', 'reservations', 'stock', 'analytics'].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              style={{
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                border: activeTab === t ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
                background: activeTab === t ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.05)',
                color: activeTab === t ? '#120d09' : '#faf5ed',
                fontWeight: 700,
                fontSize: '0.82rem',
                whiteSpace: 'nowrap'
              }}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {/* 1. ORDERS TAB */}
        {activeTab === 'orders' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Live Orders Kitchen Stream</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                  Orders placed via WhatsApp or Website direct link
                </p>
              </div>
              <span className="live-pulse-dot" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="glass-panel order-card-grid"
                  style={{
                    padding: '1.5rem',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)',
                    gap: '1.5rem',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 800, color: 'var(--accent-gold)', fontSize: '1.1rem' }}>
                        #{ord.id}
                      </span>
                      <span
                        style={{
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.6rem',
                          borderRadius: 'var(--radius-full)',
                          background: ord.status === 'Preparing' ? 'rgba(245, 158, 11, 0.2)' : ord.status === 'Ready' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                          color: ord.status === 'Preparing' ? 'var(--accent-gold)' : ord.status === 'Ready' ? '#10b981' : '#60a5fa',
                          border: '1px solid currentColor'
                        }}
                      >
                        ● {ord.status}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {ord.time}
                      </span>
                    </div>

                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#faf5ed', marginBottom: '0.25rem' }}>
                      {ord.customerName} ({ord.phone})
                    </div>
                    <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                      📍 <strong>{ord.type}:</strong> {ord.address}
                    </div>

                    {/* Items List */}
                    <div
                      style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                        padding: '0.65rem 0.9rem',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.85rem'
                      }}
                    >
                      {Array.isArray(ord.items) ? ord.items.join(' • ') : ord.items}
                    </div>
                  </div>

                  {/* Actions & Bill */}
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--accent-gold)', marginBottom: '0.85rem' }}>
                      ₹{ord.total}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => handleUpdateOrderStatus(ord.id, 'Preparing')}
                        className="btn btn-secondary btn-sm"
                        style={{ fontSize: '0.78rem' }}
                      >
                        Preparing
                      </button>
                      <button
                        onClick={() => handleUpdateOrderStatus(ord.id, 'Ready')}
                        className="btn btn-secondary btn-sm"
                        style={{ fontSize: '0.78rem', borderColor: '#10b981', color: '#10b981' }}
                      >
                        Ready for Pickup
                      </button>
                      <button
                        onClick={() => handleUpdateOrderStatus(ord.id, 'Delivered')}
                        className="btn btn-primary btn-sm"
                        style={{ fontSize: '0.78rem' }}
                      >
                        Completed ✔
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. RESERVATIONS TAB */}
        {activeTab === 'reservations' && (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Table & Party Bookings</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                Upcoming diner reservations and backstage party bookings
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
              {reservations.map((res) => (
                <div
                  key={res.id}
                  className="glass-panel"
                  style={{ padding: '1.5rem', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span style={{ fontWeight: 800, color: 'var(--accent-gold)' }}>#{res.id}</span>
                      <span style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 700 }}>
                        ● {res.status || 'Confirmed'}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#faf5ed', marginBottom: '0.2rem' }}>
                      {res.name}
                    </h4>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
                      📞 {res.phone}
                    </div>

                    <div style={{ fontSize: '0.86rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', color: 'var(--text-secondary)' }}>
                      <div>👥 <strong>Party Size:</strong> {res.guests} Guests</div>
                      <div>⏰ <strong>Slot:</strong> {res.date} @ {res.time}</div>
                      <div>🎭 <strong>Zone:</strong> {res.zone}</div>
                      <div>🎉 <strong>Occasion:</strong> {res.occasion}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem', paddingTop: '0.85rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <button
                      onClick={() => handleUpdateResStatus(res.id, 'Seated')}
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1 }}
                    >
                      Seat Guests
                    </button>
                    <a
                      href={`tel:${res.phone}`}
                      className="btn btn-secondary btn-sm"
                      style={{ textDecoration: 'none' }}
                    >
                      <Phone size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. MENU STOCK TOGGLE TAB */}
        {activeTab === 'stock' && (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Live Menu Stock Manager</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                Toggle any dish out of stock in real-time if an ingredient runs out during busy dinner hours
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
              {menuItems.map((item) => {
                const isOutOfStock = outOfStockMap[item.id];
                return (
                  <div
                    key={item.id}
                    className="glass-panel"
                    style={{
                      padding: '1rem',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      opacity: isOutOfStock ? 0.6 : 1
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#faf5ed' }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold)' }}>
                          ₹{item.price}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onToggleItemStock(item.id)}
                      style={{
                        padding: '0.4rem 0.85rem',
                        borderRadius: 'var(--radius-full)',
                        border: 'none',
                        background: isOutOfStock ? '#e11d48' : '#10b981',
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '0.76rem',
                        cursor: 'pointer'
                      }}
                    >
                      {isOutOfStock ? 'Sold Out' : 'In Stock'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 4. SALES ANALYTICS TAB */}
        {activeTab === 'analytics' && (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Palghar Daily Performance Snapshot</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                Simulated business analytics and high-margin dishes
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
              <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '20px' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '0.35rem' }}>Today's Gross Sales</div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent-gold)' }}>₹14,850</div>
                <div style={{ fontSize: '0.76rem', color: '#10b981', marginTop: '0.25rem' }}>▲ +18% vs Yesterday</div>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '20px' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '0.35rem' }}>Total Orders Today</div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#faf5ed' }}>46 Orders</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>31 Delivery • 15 Dine-In</div>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '20px' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '0.35rem' }}>Average Order Value</div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#60a5fa' }}>₹322</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Top Combo: Momos + Shake</div>
              </div>
            </div>

            {/* Top Sellers Table */}
            <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '20px' }}>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem' }}>
                Top 5 Spotlight Dishes Sold Today
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { name: 'Afghani Malai Momos', sold: '38 plates', rev: '₹6,840' },
                  { name: 'Break-a-Leg Monster Smash Burger', sold: '24 burgers', rev: '₹5,040' },
                  { name: 'KitKat Overload Monster Shake', sold: '29 glasses', rev: '₹4,640' },
                  { name: 'Kurkure Tandoori Momos', sold: '21 plates', rev: '₹3,570' },
                  { name: 'Loaded Peri-Peri Volcano Fries', sold: '19 buckets', rev: '₹2,850' }
                ].map((dish, i) => (
                  <div
                    key={dish.name}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(255, 255, 255, 0.03)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <span style={{ fontWeight: 800, color: 'var(--accent-gold)' }}>#{i + 1}</span>
                      <span style={{ fontWeight: 600 }}>{dish.name}</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 700, color: '#faf5ed' }}>{dish.rev}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{dish.sold}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 800px) {
          .order-card-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
