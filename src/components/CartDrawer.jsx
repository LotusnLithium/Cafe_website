import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Bike, 
  Utensils, 
  Package, 
  ArrowRight, 
  Tag, 
  Check, 
  Phone, 
  User, 
  MapPin, 
  FileText,
  Sparkles,
  QrCode
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateWhatsAppOrderUrl } from '../utils/whatsappHelper';
import { saveOrder } from '../utils/storageHelper';
import { CAFE_INFO } from '../data/menuData';

export function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  appliedReward
}) {
  if (!isOpen) return null;

  const [orderType, setOrderType] = useState('delivery'); // 'delivery' | 'dine_in' | 'takeaway'
  const [tableNumber, setTableNumber] = useState('');
  const [customerName, setCustomerName] = useState(localStorage.getItem('bal_cust_name') || '');
  const [phone, setPhone] = useState(localStorage.getItem('bal_cust_phone') || '');
  const [address, setAddress] = useState(localStorage.getItem('bal_cust_addr') || '');
  const [selectedArea, setSelectedArea] = useState(CAFE_INFO.deliveryAreas[0]);
  const [notes, setNotes] = useState('');
  const [couponInput, setCouponInput] = useState(appliedReward ? appliedReward.code : '');
  const [couponApplied, setCouponApplied] = useState(appliedReward || null);
  const [couponError, setCouponError] = useState('');
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [lastOrderDetails, setLastOrderDetails] = useState(null);

  // Subtotal calculation
  const subtotal = cartItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);

  // Calculate discount
  let discount = 0;
  if (couponApplied && subtotal > 0) {
    if (couponApplied.type === 'percent') {
      discount = Math.round((subtotal * couponApplied.value) / 100);
    } else if (couponApplied.type === 'flat') {
      discount = Math.min(couponApplied.value, subtotal);
    }
  }

  // Delivery fee
  const deliveryFee = orderType === 'delivery' && subtotal > 0 ? (subtotal >= 399 ? 0 : 30) : 0;
  const grandTotal = Math.max(0, subtotal - discount + deliveryFee);

  const handleApplyCoupon = () => {
    setCouponError('');
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    if (code === 'SPOTLIGHT10') {
      setCouponApplied({ code: 'SPOTLIGHT10', description: '10% Off on Spotlight Dishes', type: 'percent', value: 10 });
    } else if (code === 'PALGHAR50') {
      if (subtotal < 299) {
        setCouponError('Minimum order of ₹299 required for PALGHAR50');
        return;
      }
      setCouponApplied({ code: 'PALGHAR50', description: 'Flat ₹50 Off on Order', type: 'flat', value: 50 });
    } else if (code === 'FREEDIP') {
      setCouponApplied({ code: 'FREEDIP', description: 'Complimentary ₹30 Dip Discount', type: 'flat', value: 30 });
    } else {
      setCouponError('Invalid coupon code. Try SPOTLIGHT10 or PALGHAR50.');
    }
  };

  const handleCheckoutWhatsApp = () => {
    if (cartItems.length === 0) return;

    if (!customerName.trim()) {
      alert('Please enter your name to proceed with the order.');
      return;
    }
    if (!phone.trim() || phone.length < 8) {
      alert('Please enter a valid phone number for order updates.');
      return;
    }
    if (orderType === 'delivery' && !address.trim()) {
      alert('Please enter your delivery address in Palghar.');
      return;
    }
    if (orderType === 'dine_in' && !tableNumber.trim()) {
      alert('Please enter your Table Number for Dine-In.');
      return;
    }

    // Save info locally
    localStorage.setItem('bal_cust_name', customerName);
    localStorage.setItem('bal_cust_phone', phone);
    if (orderType === 'delivery') {
      localStorage.setItem('bal_cust_addr', address);
    }

    const finalAddress = orderType === 'delivery' ? `${address}, ${selectedArea}, Palghar` : '';

    const orderPayload = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName,
      phone,
      orderType: orderType === 'dine_in' ? 'Dine-In' : orderType === 'takeaway' ? 'Takeaway' : 'Home Delivery',
      address: finalAddress || `Table #${tableNumber}` || 'Self Pickup',
      items: cartItems.map(i => `${i.name} (x${i.quantity})`),
      subtotal,
      discount,
      deliveryFee,
      total: grandTotal,
      time: 'Just now',
      status: 'Preparing'
    };

    // Save to order history for Owner Dashboard Demo
    saveOrder(orderPayload);
    setLastOrderDetails(orderPayload);

    // Confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Generate WhatsApp URL
    const whatsappUrl = generateWhatsAppOrderUrl({
      items: cartItems,
      orderType,
      tableNumber,
      customerName,
      phone,
      address: finalAddress,
      notes,
      discount,
      subtotal,
      total: grandTotal,
      couponCode: couponApplied ? couponApplied.code : ''
    });

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    setIsSuccessModal(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '580px',
          height: '92vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 0
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(23, 19, 17, 0.95)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'var(--gradient-gold)',
                color: '#120d09',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800
              }}
            >
              <ShoppingBag size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Your Spotlight Order</h2>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {cartItems.length} {cartItems.length === 1 ? 'dish' : 'dishes'} in your cart
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {cartItems.length > 0 && (
              <button
                onClick={onClearCart}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent-crimson)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: '0.4rem'
                }}
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Cart Content */}
        <div
          style={{
            flexGrow: 1,
            overflowY: 'auto',
            padding: '1.25rem 1.5rem'
          }}
        >
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🥟</div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>Your Cart is Empty</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.8rem' }}>
                Add our famous Afghani momos, smash burgers, or cold coffee to get started!
              </p>
              <button onClick={onClose} className="btn btn-primary">
                Explore Spotlight Menu
              </button>
            </div>
          ) : (
            <>
              {/* 1. Order Type Switcher (Delivery, Dine-In, Takeaway) */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div className="form-label" style={{ marginBottom: '0.6rem', color: '#faf5ed' }}>
                  Select Dining / Delivery Mode:
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '0.5rem',
                    background: 'rgba(0, 0, 0, 0.4)',
                    padding: '0.35rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <button
                    onClick={() => setOrderType('delivery')}
                    style={{
                      padding: '0.65rem 0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      border: 'none',
                      background: orderType === 'delivery' ? 'var(--gradient-gold)' : 'transparent',
                      color: orderType === 'delivery' ? '#120d09' : 'var(--text-secondary)',
                      fontWeight: 700,
                      fontSize: '0.84rem',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    <Bike size={18} />
                    <span>Home Delivery</span>
                  </button>

                  <button
                    onClick={() => setOrderType('dine_in')}
                    style={{
                      padding: '0.65rem 0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      border: 'none',
                      background: orderType === 'dine_in' ? 'var(--gradient-gold)' : 'transparent',
                      color: orderType === 'dine_in' ? '#120d09' : 'var(--text-secondary)',
                      fontWeight: 700,
                      fontSize: '0.84rem',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    <Utensils size={18} />
                    <span>Dine-In (Cafe)</span>
                  </button>

                  <button
                    onClick={() => setOrderType('takeaway')}
                    style={{
                      padding: '0.65rem 0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      border: 'none',
                      background: orderType === 'takeaway' ? 'var(--gradient-gold)' : 'transparent',
                      color: orderType === 'takeaway' ? '#120d09' : 'var(--text-secondary)',
                      fontWeight: 700,
                      fontSize: '0.84rem',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    <Package size={18} />
                    <span>Takeaway</span>
                  </button>
                </div>
              </div>

              {/* 2. Order Items List */}
              <div style={{ marginBottom: '1.75rem' }}>
                <div className="form-label" style={{ marginBottom: '0.65rem', color: '#faf5ed' }}>
                  Ordered Items:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {cartItems.map((item) => (
                    <div
                      key={item.cartId || item.id}
                      style={{
                        display: 'flex',
                        gap: '0.9rem',
                        alignItems: 'center',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-md)',
                        padding: '0.75rem'
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: '64px',
                          height: '64px',
                          borderRadius: '10px',
                          objectFit: 'cover'
                        }}
                      />
                      <div style={{ flexGrow: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.15rem' }}>
                          {item.isVeg ? <span className="badge-veg" /> : <span className="badge-nonveg" />}
                          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#faf5ed', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {item.name}
                          </h4>
                        </div>

                        {/* Customization Details */}
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                          {item.selectedOption && <span>{item.selectedOption.name} &bull; </span>}
                          {item.selectedSpice && <span>{item.selectedSpice}</span>}
                          {item.addons && item.addons.length > 0 && (
                            <div>+{item.addons.map(a => a.name).join(', ')}</div>
                          )}
                        </div>

                        <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent-gold)', marginTop: '0.25rem' }}>
                          ₹{item.unitPrice * item.quantity}
                        </div>
                      </div>

                      {/* Quantity Controller */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            background: 'rgba(255, 255, 255, 0.08)',
                            borderRadius: 'var(--radius-full)',
                            padding: '0.15rem'
                          }}
                        >
                          <button
                            onClick={() => onUpdateQuantity(item.cartId || item.id, item.quantity - 1)}
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              border: 'none',
                              background: 'none',
                              color: '#ffffff',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Minus size={12} />
                          </button>
                          <span style={{ fontWeight: 800, fontSize: '0.85rem', padding: '0 0.4rem' }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.cartId || item.id, item.quantity + 1)}
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              border: 'none',
                              background: 'var(--accent-gold)',
                              color: '#120d09',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.cartId || item.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            padding: '0.35rem'
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Customer Details Form */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.1rem',
                  marginBottom: '1.5rem'
                }}
              >
                <div style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: '0.9rem', color: '#faf5ed' }}>
                  Customer Details:
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div>
                    <label className="form-label">Your Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      placeholder="e.g. 9823456789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                {orderType === 'dine_in' && (
                  <div style={{ marginBottom: '0.75rem' }}>
                    <label className="form-label">Table Number in Cafe *</label>
                    <input
                      type="text"
                      placeholder="e.g. Table 4 or Spotlight Booth"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="form-input"
                    />
                  </div>
                )}

                {orderType === 'delivery' && (
                  <>
                    <div style={{ marginBottom: '0.75rem' }}>
                      <label className="form-label">Palghar Delivery Area *</label>
                      <select
                        value={selectedArea}
                        onChange={(e) => setSelectedArea(e.target.value)}
                        className="form-select"
                      >
                        {CAFE_INFO.deliveryAreas.map((area) => (
                          <option key={area} value={area}>{area}</option>
                        ))}
                      </select>
                    </div>

                    <div style={{ marginBottom: '0.75rem' }}>
                      <label className="form-label">House / Flat / Landmark Address *</label>
                      <input
                        type="text"
                        placeholder="e.g. Flat 302, Sai Kripa Apts, Near Valan Naka"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="form-label">Cooking Instructions / Notes (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Extra spicy, less mayo, send napkins..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              {/* 4. Promo Coupon Box */}
              <div
                style={{
                  background: 'rgba(245, 158, 11, 0.05)',
                  border: '1px dashed var(--border-gold)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.9rem',
                  marginBottom: '1.5rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-gold)' }}>
                    Have a Promo Code?
                  </span>
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    Use <strong>SPOTLIGHT10</strong> for 10% Off
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    placeholder="Enter SPOTLIGHT10 or PALGHAR50"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="form-input"
                    style={{ textTransform: 'uppercase' }}
                  />
                  <button onClick={handleApplyCoupon} className="btn btn-secondary" style={{ whiteSpace: 'nowrap' }}>
                    Apply
                  </button>
                </div>

                {couponError && (
                  <div style={{ fontSize: '0.76rem', color: '#f87171', marginTop: '0.4rem' }}>
                    {couponError}
                  </div>
                )}

                {couponApplied && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '0.5rem',
                      background: 'rgba(16, 185, 129, 0.15)',
                      padding: '0.4rem 0.65rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.8rem',
                      color: '#10b981'
                    }}
                  >
                    <span>🎉 Applied: <strong>{couponApplied.code}</strong> ({couponApplied.description})</span>
                    <button
                      onClick={() => { setCouponApplied(null); setCouponInput(''); }}
                      style={{ background: 'none', border: 'none', color: '#10b981', cursor: 'pointer', fontWeight: 800 }}
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              {/* 5. Bill Summary Breakdown */}
              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  fontSize: '0.9rem',
                  marginBottom: '1rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Items Subtotal:</span>
                  <span style={{ fontWeight: 600 }}>₹{subtotal}</span>
                </div>

                {discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem', color: '#10b981' }}>
                    <span>Promo Discount:</span>
                    <span>-₹{discount}</span>
                  </div>
                )}

                {orderType === 'delivery' && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Palghar Delivery:</span>
                    <span style={{ color: deliveryFee === 0 ? '#10b981' : 'inherit', fontWeight: 600 }}>
                      {deliveryFee === 0 ? 'FREE (Orders ₹399+)' : `₹${deliveryFee}`}
                    </span>
                  </div>
                )}

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '0.65rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    fontSize: '1.15rem',
                    fontWeight: 800
                  }}
                >
                  <span style={{ color: '#faf5ed' }}>Grand Total:</span>
                  <span style={{ color: 'var(--accent-gold)' }}>₹{grandTotal}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Checkout Action */}
        {cartItems.length > 0 && (
          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderTop: '1px solid var(--border-subtle)',
              background: 'rgba(23, 19, 17, 0.98)'
            }}
          >
            <button
              onClick={handleCheckoutWhatsApp}
              className="btn btn-whatsapp"
              style={{
                width: '100%',
                padding: '0.95rem 1.4rem',
                fontSize: '1.05rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.65rem'
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>💬</span>
              <span>Send Order to Cafe via WhatsApp • ₹{grandTotal}</span>
              <ArrowRight size={18} />
            </button>
            <div
              style={{
                textAlign: 'center',
                fontSize: '0.74rem',
                color: 'var(--text-muted)',
                marginTop: '0.55rem'
              }}
            >
              Direct kitchen order to +91 92844 62524 &bull; Cash / UPI on delivery or counter
            </div>
          </div>
        )}

        {/* Success Modal / QR Confirmation */}
        {isSuccessModal && lastOrderDetails && (
          <div
            className="modal-overlay"
            style={{ zIndex: 1200 }}
            onClick={() => setIsSuccessModal(false)}
          >
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              style={{ padding: '2rem', textAlign: 'center' }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(37, 211, 102, 0.2)',
                  color: '#25d366',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem auto'
                }}
              >
                <Check size={36} strokeWidth={3} />
              </div>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Order Transmitted!
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                Your order receipt <strong>#{lastOrderDetails.id}</strong> was opened in WhatsApp to send directly to <strong>Break a Leg Cafe Palghar</strong>.
              </p>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'left',
                  fontSize: '0.86rem',
                  marginBottom: '1.5rem'
                }}
              >
                <div><strong>Order ID:</strong> {lastOrderDetails.id}</div>
                <div><strong>Customer:</strong> {lastOrderDetails.customerName} ({lastOrderDetails.phone})</div>
                <div><strong>Total Bill:</strong> ₹{lastOrderDetails.total}</div>
                <div><strong>Delivery/Table:</strong> {lastOrderDetails.address}</div>
              </div>

              <button
                onClick={() => {
                  setIsSuccessModal(false);
                  onClose();
                }}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                Back to Cafe Menu
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
