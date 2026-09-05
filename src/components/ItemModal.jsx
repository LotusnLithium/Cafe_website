import React, { useState } from 'react';
import { 
  X, 
  Flame, 
  Star, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Clock, 
  Check, 
  Sparkles 
} from 'lucide-react';

export function ItemModal({ item, onClose, onAddToCart }) {
  if (!item) return null;

  const [selectedOption, setSelectedOption] = useState(
    item.options && item.options.length > 0 ? item.options[0] : null
  );
  const [selectedSpice, setSelectedSpice] = useState(
    item.spiceLevels && item.spiceLevels.length > 0 ? item.spiceLevels[0] : null
  );
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const availableAddons = [
    { id: 'cheese', name: 'Extra Liquid Cheddar & Mozzarella Melt', price: 35 },
    { id: 'dip-tandoori', name: 'Signature Smoky Tandoori Mayo Dip', price: 20 },
    { id: 'dip-peri', name: 'African Peri-Peri Garlic Dip', price: 25 },
    { id: 'extra-crispy', name: 'Double Crunchy Flake Coating', price: 20 }
  ];

  const handleToggleAddon = (addon) => {
    if (selectedAddons.some(a => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  // Calculate unit price based on base price + option diff + addons
  const optionDiff = selectedOption ? selectedOption.priceDiff : 0;
  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const unitPrice = item.price + optionDiff + addonsTotal;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    onAddToCart({
      ...item,
      cartId: `${item.id}-${selectedOption ? selectedOption.name : 'def'}-${selectedSpice || 'def'}-${selectedAddons.map(a => a.id).sort().join('-')}`,
      selectedOption,
      selectedSpice,
      addons: selectedAddons,
      unitPrice,
      quantity
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ overflow: 'hidden' }}
      >
        {/* Top Image Banner */}
        <div style={{ position: 'relative', height: '240px', width: '100%' }}>
          <img
            src={item.image}
            alt={item.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(21, 17, 14, 1) 0%, rgba(21, 17, 14, 0.3) 60%, transparent 100%)'
            }}
          />

          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(0, 0, 0, 0.7)',
              border: '1px solid var(--border-subtle)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>

          {/* Badges on Modal Image */}
          <div
            style={{
              position: 'absolute',
              bottom: '1rem',
              left: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem'
            }}
          >
            <div
              style={{
                background: 'rgba(13, 11, 10, 0.9)',
                padding: '0.35rem 0.6rem',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {item.isVeg ? <span className="badge-veg" /> : <span className="badge-nonveg" />}
            </div>

            {item.isBestseller && (
              <span className="badge-tag badge-tag-gold">
                ⭐ Spotlight Bestseller
              </span>
            )}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ padding: '1.25rem 1.5rem 1.5rem 1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#faf5ed' }}>
              {item.name}
            </h2>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
              ₹{unitPrice}
            </div>
          </div>

          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
            {item.description}
          </p>

          {/* 1. Variant / Option Choice */}
          {item.options && item.options.length > 0 && (
            <div style={{ marginBottom: '1.4rem' }}>
              <div className="form-label" style={{ marginBottom: '0.5rem', color: '#faf5ed' }}>
                Choose Your Variation:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {item.options.map((opt) => {
                  const isChosen = selectedOption?.name === opt.name;
                  return (
                    <label
                      key={opt.name}
                      onClick={() => setSelectedOption(opt)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        background: isChosen ? 'rgba(245, 158, 11, 0.12)' : 'rgba(255, 255, 255, 0.04)',
                        border: isChosen ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
                        cursor: 'pointer',
                        transition: 'all 0.18s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <div
                          style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            border: isChosen ? '5px solid var(--accent-gold)' : '2px solid var(--text-muted)',
                            background: '#15110e'
                          }}
                        />
                        <span style={{ fontSize: '0.92rem', fontWeight: isChosen ? 700 : 500 }}>
                          {opt.name}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.88rem', color: isChosen ? 'var(--accent-gold)' : 'var(--text-muted)' }}>
                        {opt.priceDiff > 0 ? `+₹${opt.priceDiff}` : opt.priceDiff < 0 ? `-₹${Math.abs(opt.priceDiff)}` : 'Included'}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. Spice Level Choice */}
          {item.spiceLevels && item.spiceLevels.length > 0 && (
            <div style={{ marginBottom: '1.4rem' }}>
              <div className="form-label" style={{ marginBottom: '0.5rem', color: '#faf5ed' }}>
                Select Flavor / Spice Style:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {item.spiceLevels.map((spice) => {
                  const isChosen = selectedSpice === spice;
                  return (
                    <button
                      key={spice}
                      onClick={() => setSelectedSpice(spice)}
                      style={{
                        padding: '0.5rem 0.95rem',
                        borderRadius: 'var(--radius-full)',
                        border: isChosen ? '1px solid var(--accent-crimson)' : '1px solid var(--border-subtle)',
                        background: isChosen ? 'rgba(225, 29, 72, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                        color: isChosen ? '#ffffff' : 'var(--text-secondary)',
                        fontSize: '0.86rem',
                        fontWeight: isChosen ? 700 : 500,
                        cursor: 'pointer'
                      }}
                    >
                      {spice}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. Extra Add-ons & Dips */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div className="form-label" style={{ marginBottom: '0.5rem', color: '#faf5ed' }}>
              Add Extra Deliciousness:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {availableAddons.map((addon) => {
                const isSelected = selectedAddons.some(a => a.id === addon.id);
                return (
                  <label
                    key={addon.id}
                    onClick={() => handleToggleAddon(addon)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.65rem 0.9rem',
                      borderRadius: 'var(--radius-md)',
                      background: isSelected ? 'rgba(245, 158, 11, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                      border: isSelected ? '1px solid var(--border-gold)' : '1px solid var(--border-subtle)',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <div
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '4px',
                          border: isSelected ? 'none' : '2px solid var(--text-muted)',
                          background: isSelected ? 'var(--accent-gold)' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#120d09'
                        }}
                      >
                        {isSelected && <Check size={14} strokeWidth={3} />}
                      </div>
                      <span style={{ fontSize: '0.88rem' }}>{addon.name}</span>
                    </div>
                    <span style={{ fontSize: '0.84rem', color: 'var(--accent-gold)', fontWeight: 600 }}>
                      +₹{addon.price}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--border-subtle)'
            }}
          >
            {/* Quantity Selector */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                background: 'rgba(255, 255, 255, 0.06)',
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  border: 'none',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Minus size={15} />
              </button>
              <span style={{ fontWeight: 800, fontSize: '1rem' }}>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{
                  width: '28px',
                  height: '28px',
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
                <Plus size={15} />
              </button>
            </div>

            {/* Add to Cart Submit Button */}
            <button
              onClick={handleAdd}
              className="btn btn-primary"
              style={{
                flex: 1,
                padding: '0.85rem 1.4rem',
                fontSize: '1rem'
              }}
            >
              <ShoppingBag size={18} />
              <span>Add to Cart • ₹{totalPrice}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
