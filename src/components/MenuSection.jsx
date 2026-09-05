import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Flame, 
  Star, 
  Plus, 
  Minus, 
  Sparkles, 
  SlidersHorizontal,
  Clock,
  Check
} from 'lucide-react';
import { MENU_CATEGORIES } from '../data/menuData';

export function MenuSection({
  menuItems,
  cartItems,
  onOpenItemModal,
  onAddToCartDirect,
  onUpdateCartQuantity
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dietFilter, setDietFilter] = useState('all'); // 'all' | 'veg' | 'nonveg'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'price-low' | 'price-high' | 'rating'

  // Map cart quantities by item ID for quick lookup
  const cartQuantities = useMemo(() => {
    const map = {};
    cartItems.forEach(item => {
      map[item.id] = (map[item.id] || 0) + item.quantity;
    });
    return map;
  }, [cartItems]);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Diet filter
      if (dietFilter === 'veg' && !item.isVeg) return false;
      if (dietFilter === 'nonveg' && item.isVeg) return false;
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesCat = item.category.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: Bestsellers first
      if (a.isBestseller && !b.isBestseller) return -1;
      if (!a.isBestseller && b.isBestseller) return 1;
      return b.rating - a.rating;
    });
  }, [menuItems, selectedCategory, dietFilter, searchQuery, sortBy]);

  return (
    <section id="menu" className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Sparkles size={15} />
            <span>THE SPOTLIGHT MENU</span>
          </div>
          <h2 className="section-title">
            Crafted for <span className="text-gradient-gold">True Foodies</span>
          </h2>
          <p className="section-desc">
            Every dish is freshly prepared to order using handpicked ingredients, artisanal marinades, and our signature theatrical spices.
          </p>
        </div>

        {/* Search & Diet Filter Controls Bar */}
        <div
          className="glass-panel"
          style={{
            padding: '1.25rem',
            borderRadius: '20px',
            marginBottom: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {/* Search Input */}
          <div
            style={{
              position: 'relative',
              flex: '1 1 280px',
              minWidth: '240px'
            }}
          >
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)'
              }}
            />
            <input
              type="text"
              placeholder="Search Afghani momos, burgers, shakes, fries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{
                paddingLeft: '2.75rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(255, 255, 255, 0.04)'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Diet Toggle Filter (All, Veg, Non-Veg) */}
          <div
            style={{
              display: 'flex',
              background: 'rgba(0, 0, 0, 0.4)',
              padding: '0.3rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <button
              onClick={() => setDietFilter('all')}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: dietFilter === 'all' ? 'var(--accent-gold)' : 'transparent',
                color: dietFilter === 'all' ? '#120d09' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              All Items
            </button>
            <button
              onClick={() => setDietFilter('veg')}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: dietFilter === 'veg' ? '#10b981' : 'transparent',
                color: dietFilter === 'veg' ? '#ffffff' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s ease'
              }}
            >
              <span className="badge-veg" />
              <span>Veg Only</span>
            </button>
            <button
              onClick={() => setDietFilter('nonveg')}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: dietFilter === 'nonveg' ? '#e11d48' : 'transparent',
                color: dietFilter === 'nonveg' ? '#ffffff' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s ease'
              }}
            >
              <span className="badge-nonveg" />
              <span>Non-Veg</span>
            </button>
          </div>

          {/* Sort Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-select"
              style={{
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                width: 'auto'
              }}
            >
              <option value="popular">Spotlight Bestsellers</option>
              <option value="rating">Top Rated (⭐)</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills Carousel */}
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            overflowX: 'auto',
            paddingBottom: '1rem',
            marginBottom: '2.5rem',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
          className="category-scroll"
        >
          {MENU_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  border: isSelected ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
                  background: isSelected
                    ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(225, 29, 72, 0.2))'
                    : 'rgba(255, 255, 255, 0.04)',
                  color: isSelected ? '#faf5ed' : 'var(--text-secondary)',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 4px 15px rgba(245, 158, 11, 0.25)' : 'none'
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                {cat.tag && (
                  <span
                    style={{
                      fontSize: '0.68rem',
                      background: 'var(--accent-crimson)',
                      color: '#ffffff',
                      padding: '0.1rem 0.4rem',
                      borderRadius: 'var(--radius-full)',
                      fontWeight: 800
                    }}
                  >
                    {cat.tag}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Food Items Grid */}
        {filteredItems.length === 0 ? (
          <div
            className="glass-panel"
            style={{
              textAlign: 'center',
              padding: '4rem 1.5rem',
              borderRadius: '24px'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍽️</div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>No dishes found</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              We couldn't find anything matching "{searchQuery}". Try searching for another item or resetting filters!
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setDietFilter('all');
              }}
              className="btn btn-secondary"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.75rem'
            }}
          >
            {filteredItems.map((item) => {
              const qtyInCart = cartQuantities[item.id] || 0;
              const hasOptions = (item.options && item.options.length > 0) || (item.spiceLevels && item.spiceLevels.length > 0);

              return (
                <div
                  key={item.id}
                  className="glass-panel glow-effect"
                  style={{
                    borderRadius: '22px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: '1px solid rgba(255, 255, 255, 0.07)'
                  }}
                >
                  {/* Top Image Container */}
                  <div
                    style={{
                      position: 'relative',
                      height: '210px',
                      overflow: 'hidden',
                      cursor: 'pointer'
                    }}
                    onClick={() => onOpenItemModal(item)}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(17, 14, 12, 0.95) 0%, rgba(17, 14, 12, 0.2) 60%, transparent 100%)'
                      }}
                    />

                    {/* Top Badges (Veg/NonVeg, Bestseller, Spicy) */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '0.85rem',
                        left: '0.85rem',
                        display: 'flex',
                        gap: '0.45rem',
                        alignItems: 'center'
                      }}
                    >
                      <div
                        style={{
                          background: 'rgba(13, 11, 10, 0.85)',
                          backdropFilter: 'blur(8px)',
                          padding: '0.3rem 0.45rem',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        {item.isVeg ? <span className="badge-veg" /> : <span className="badge-nonveg" />}
                      </div>

                      {item.isBestseller && (
                        <div className="badge-tag badge-tag-gold" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Sparkles size={12} />
                          <span>Bestseller</span>
                        </div>
                      )}

                      {item.isSpicy && (
                        <div className="badge-tag badge-tag-crimson" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Flame size={12} />
                          <span>Spicy</span>
                        </div>
                      )}
                    </div>

                    {/* Prep Time pill on image */}
                    {item.prepTime && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '0.85rem',
                          right: '0.85rem',
                          background: 'rgba(13, 11, 10, 0.85)',
                          backdropFilter: 'blur(8px)',
                          padding: '0.25rem 0.6rem',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.74rem',
                          color: 'var(--text-secondary)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}
                      >
                        <Clock size={12} color="var(--accent-gold)" />
                        <span>{item.prepTime}</span>
                      </div>
                    )}

                    {/* Rating Banner on bottom of Image */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '0.75rem',
                        left: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        background: 'rgba(0, 0, 0, 0.65)',
                        backdropFilter: 'blur(6px)',
                        padding: '0.2rem 0.55rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        color: 'var(--accent-gold)'
                      }}
                    >
                      <Star size={13} fill="#f59e0b" color="#f59e0b" />
                      <span>{item.rating}</span>
                      <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({item.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Card Content & Details */}
                  <div
                    style={{
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      flexGrow: 1,
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontSize: '1.18rem',
                          fontWeight: 700,
                          marginBottom: '0.45rem',
                          color: '#faf5ed',
                          cursor: 'pointer'
                        }}
                        onClick={() => onOpenItemModal(item)}
                      >
                        {item.name}
                      </h3>
                      <p
                        style={{
                          fontSize: '0.86rem',
                          color: 'var(--text-muted)',
                          lineHeight: 1.5,
                          marginBottom: '1.2rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom Pricing & Add to Cart button */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '0.85rem',
                        borderTop: '1px solid rgba(255, 255, 255, 0.05)'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.45rem' }}>
                          <span
                            style={{
                              fontSize: '1.35rem',
                              fontWeight: 800,
                              color: 'var(--accent-gold)'
                            }}
                          >
                            ₹{item.price}
                          </span>
                          {item.originalPrice && (
                            <span
                              style={{
                                fontSize: '0.85rem',
                                color: 'var(--text-muted)',
                                textDecoration: 'line-through'
                              }}
                            >
                              ₹{item.originalPrice}
                            </span>
                          )}
                        </div>
                        {hasOptions && (
                          <div style={{ fontSize: '0.72rem', color: 'var(--accent-amber)', fontWeight: 600 }}>
                            Customisable
                          </div>
                        )}
                      </div>

                      {/* Add Button or Quantity Selector */}
                      {qtyInCart > 0 && !hasOptions ? (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.65rem',
                            background: 'rgba(245, 158, 11, 0.15)',
                            border: '1px solid var(--border-gold)',
                            borderRadius: 'var(--radius-full)',
                            padding: '0.25rem 0.5rem'
                          }}
                        >
                          <button
                            onClick={() => onUpdateCartQuantity(item.id, qtyInCart - 1)}
                            style={{
                              width: '26px',
                              height: '26px',
                              borderRadius: '50%',
                              border: 'none',
                              background: 'rgba(255, 255, 255, 0.1)',
                              color: '#faf5ed',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer'
                            }}
                          >
                            <Minus size={14} />
                          </button>
                          <span style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--accent-gold)' }}>
                            {qtyInCart}
                          </span>
                          <button
                            onClick={() => onUpdateCartQuantity(item.id, qtyInCart + 1)}
                            style={{
                              width: '26px',
                              height: '26px',
                              borderRadius: '50%',
                              border: 'none',
                              background: 'var(--accent-gold)',
                              color: '#120d09',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer'
                            }}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            if (hasOptions) {
                              onOpenItemModal(item);
                            } else {
                              onAddToCartDirect(item);
                            }
                          }}
                          className="btn btn-primary btn-sm"
                          style={{
                            padding: '0.5rem 1.1rem',
                            fontSize: '0.88rem'
                          }}
                        >
                          <Plus size={15} />
                          <span>{hasOptions ? 'Customise' : 'Add'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
