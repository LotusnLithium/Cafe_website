import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Calendar, 
  MessageCircle, 
  Utensils 
} from 'lucide-react';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { ItemModal } from './components/ItemModal';
import { CartDrawer } from './components/CartDrawer';
import { ReservationSection } from './components/ReservationSection';
import { ExperienceGallery } from './components/ExperienceGallery';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationContact } from './components/LocationContact';
import { OwnerDashboard } from './components/OwnerDashboard';
import { Footer } from './components/Footer';

import { INITIAL_MENU_ITEMS, CAFE_INFO } from './data/menuData';
import { 
  getStoredCart, 
  saveStoredCart, 
  getStoredReward 
} from './utils/storageHelper';

export default function App() {
  const [menuItems] = useState(INITIAL_MENU_ITEMS);
  const [cartItems, setCartItems] = useState(getStoredCart);
  const [selectedItemModal, setSelectedItemModal] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOwnerMode, setIsOwnerMode] = useState(false);
  const [appliedReward, setAppliedReward] = useState(getStoredReward);
  const [outOfStockMap, setOutOfStockMap] = useState({});

  // Sync cart to localStorage whenever updated
  useEffect(() => {
    saveStoredCart(cartItems);
  }, [cartItems]);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Cart operations
  const handleAddToCart = (itemWithOptions) => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(i => i.cartId === itemWithOptions.cartId);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += itemWithOptions.quantity;
        return updated;
      }
      return [...prev, itemWithOptions];
    });
  };

  const handleAddToCartDirect = (item) => {
    const itemPayload = {
      ...item,
      cartId: `${item.id}-def-def-`,
      selectedOption: null,
      selectedSpice: null,
      addons: [],
      unitPrice: item.price,
      quantity: 1
    };
    handleAddToCart(itemPayload);
  };

  const handleUpdateCartQuantity = (cartIdOrId, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartIdOrId);
    } else {
      setCartItems(prev => prev.map(item => {
        if (item.cartId === cartIdOrId || item.id === cartIdOrId) {
          return { ...item, quantity: newQty };
        }
        return item;
      }));
    }
  };

  const handleRemoveCartItem = (cartIdOrId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartIdOrId && item.id !== cartIdOrId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleToggleItemStock = (itemId) => {
    setOutOfStockMap(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleScrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToReservation = () => {
    const el = document.getElementById('reservation');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app-root">
      {/* Top Main Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={handleScrollToReservation}
      />

      <main>
        {/* Hero Section */}
        <Hero
          onExploreMenu={handleScrollToMenu}
          onOpenReservation={handleScrollToReservation}
        />

        {/* Master Menu Section */}
        <MenuSection
          menuItems={menuItems}
          cartItems={cartItems}
          onOpenItemModal={(item) => setSelectedItemModal(item)}
          onAddToCartDirect={handleAddToCartDirect}
          onUpdateCartQuantity={handleUpdateCartQuantity}
        />

        {/* Cafe Ambience & Experience Gallery */}
        <ExperienceGallery />

        {/* VIP Table Reservation Section */}
        <ReservationSection />

        {/* Google Reviews & Foodie Social Proof */}
        <ReviewsSection />

        {/* Location, Google Maps & Contact */}
        <LocationContact />
      </main>

      {/* Footer */}
      <Footer onToggleOwnerMode={() => setIsOwnerMode(true)} />

      {/* Item Customization Modal */}
      {selectedItemModal && (
        <ItemModal
          item={selectedItemModal}
          onClose={() => setSelectedItemModal(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        appliedReward={appliedReward}
      />

      {/* Cafe Owner Live Admin Desk View */}
      {isOwnerMode && (
        <OwnerDashboard
          onClose={() => setIsOwnerMode(false)}
          menuItems={menuItems}
          outOfStockMap={outOfStockMap}
          onToggleItemStock={handleToggleItemStock}
        />
      )}

      {/* Floating Bottom Action Dock (Menu, Book Table, WhatsApp & Cart) */}
      <div className="floating-dock">
        <button
          onClick={handleScrollToMenu}
          className="dock-btn"
          title="Browse Spotlight Menu"
        >
          <Utensils size={16} color="var(--accent-gold)" />
          <span>Menu</span>
        </button>

        <button
          onClick={handleScrollToReservation}
          className="dock-btn"
          title="Reserve a Table"
        >
          <Calendar size={16} color="var(--accent-crimson)" />
          <span>Book Table</span>
        </button>

        <a
          href={`https://wa.me/${CAFE_INFO.phonePrimary.replace('+', '')}?text=Hi%20Break%20a%20Leg%20Cafe%20Palghar!%20I%20would%20like%20to%20order.`}
          target="_blank"
          rel="noreferrer"
          className="dock-btn dock-btn-whatsapp"
          title="Direct WhatsApp Kitchen Order"
        >
          <MessageCircle size={16} />
          <span>WhatsApp</span>
        </a>

        {totalCartCount > 0 && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="dock-btn dock-btn-cart"
            title="View Cart & Checkout"
          >
            <ShoppingBag size={16} />
            <span>Cart</span>
            <span className="dock-cart-badge">{totalCartCount}</span>
          </button>
        )}
      </div>
    </div>
  );
}
