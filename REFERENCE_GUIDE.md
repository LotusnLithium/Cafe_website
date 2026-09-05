# 📖 Break a Leg Cafe — Project Architecture & Reference Manual

**Brand:** Break a Leg Cafe (Palghar)  
**Stack:** React 18, Vite 6, Lucide Icons, Canvas Confetti, Vanilla CSS  
**Target Viewports:** Mobile (320px - 480px), Tablet (768px - 1024px), Desktop (1200px+)  

---

## 1. Directory Structure

```
break-a-leg-cafe/
├── dist/                        # Production compiled bundle
├── index.html                   # HTML5 Entrypoint with viewport meta
├── package.json                 # Project dependencies & scripts
├── test_defense_security.js     # Automated defense & security audit runner
├── DEFENSE_SECURITY_REPORT.md   # Security & threat defense documentation
├── REFERENCE_GUIDE.md           # This comprehensive architecture reference
└── src/
    ├── App.jsx                  # Main application orchestrator & state container
    ├── index.css                # Global design system tokens & mobile media queries
    ├── main.jsx                 # React root renderer
    ├── components/
    │   ├── Navbar.jsx           # Responsive header & mobile navigation drawer
    │   ├── Hero.jsx             # Hero spotlight banner with responsive CTAs
    │   ├── MenuSection.jsx      # Spotlight menu with search, category & diet filters
    │   ├── ItemModal.jsx        # Food customization modal (options, spice, add-ons)
    │   ├── CartDrawer.jsx       # Slide-over cart drawer & WhatsApp order generator
    │   ├── ReservationSection.jsx# VIP table booking & digital pass generator
    │   ├── ExperienceGallery.jsx# Cafe ambience & amenities showcase
    │   ├── ReviewsSection.jsx   # Google reviews scorecard & feedback submission
    │   ├── LocationContact.jsx  # Palghar map embed, delivery zones & FAQs
    │   ├── OwnerDashboard.jsx   # Cafe manager live desk & order history
    │   └── Footer.jsx           # Brand footer, opening hours & quick links
    ├── data/
    │   ├── menuData.js          # Menu catalog (21+ dishes), cafe info & delivery zones
    │   ├── galleryData.js       # Ambience photos, amenities & FAQs
    │   └── reviewsData.js       # Customer ratings & review testimonials
    └── utils/
        ├── storageHelper.js     # LocalStorage wrappers for cart & orders
        └── whatsappHelper.js    # WhatsApp message formatter & URI encoder
```

---

## 2. Core User Flows

### A. Food Ordering Flow
1. Customer browses menu categories or searches dishes in `MenuSection.jsx`.
2. Customer clicks **Add** (direct) or **Customise** (opens `ItemModal.jsx` to choose spice, variants, and extra dips).
3. Cart badge in `Navbar.jsx` and mobile floating dock increments.
4. Customer opens `CartDrawer.jsx`, chooses mode (**Home Delivery**, **Dine-In**, or **Takeaway**), applies promo code (e.g. `SPOTLIGHT10`), and fills in name/phone.
5. Clicking **Send Order to Cafe via WhatsApp** triggers `generateWhatsAppOrderUrl()` and launches WhatsApp with a pre-filled, itemized order receipt.

### B. VIP Table Reservation Flow
1. Customer scrolls to `ReservationSection.jsx` (or clicks "Book Table").
2. Selects ambiance zone (**The Spotlight Booth**, **Cozy Couple Corner**, or **Backstage Party Lounge**).
3. Chooses party size (1–20+ guests), date, and time slot.
4. Submits form to instantly generate a digital **VIP Backstage Pass** with unique reference ID.
5. Customer can click **Send WhatsApp Confirmation** to notify the cafe team.

---

## 3. How to Run & Validate

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run automated threat defense & test suite
node test_defense_security.js

# Build production bundle
npm run build
```
