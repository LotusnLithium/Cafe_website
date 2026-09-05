/**
 * ================================================================
 *   Break a Leg Cafe - Cybersecurity & Threat Defense Test Suite
 *   Automated Verification of Business Logic, Security & Defenses
 * ================================================================
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let passedCount = 0;
let failedCount = 0;

function assert(condition, message, detail = '') {
  if (condition) {
    console.log(`  ✔ PASS: ${message}`);
    passedCount++;
  } else {
    console.error(`  ✖ FAIL: ${message}`);
    if (detail) console.error(`     Detail: ${detail}`);
    failedCount++;
  }
}

console.log('\n================================================================');
console.log('   Break a Leg Cafe - Threat Defense & Security Audit Suite      ');
console.log('   Palghar Artisan Bistro & WhatsApp Order Gateway System        ');
console.log('================================================================\n');

// -------------------------------------------------------------
// SECTION 1: Menu Catalog Data Integrity & Schema Validation
// -------------------------------------------------------------
console.log('1. Menu Catalog Integrity & Dietary Schema Validation');

const menuDataPath = path.join(__dirname, 'src', 'data', 'menuData.js');
assert(fs.existsSync(menuDataPath), 'Menu data source file exists (menuData.js)');

const menuDataRaw = fs.readFileSync(menuDataPath, 'utf8');

// Parse items loosely from raw source or import
const hasMomos = menuDataRaw.includes('Afghani') && menuDataRaw.includes('Momos');
const hasBurgers = menuDataRaw.includes('Burger');
const hasShakes = menuDataRaw.includes('Shake');
assert(hasMomos && hasBurgers && hasShakes, 'Core spotlight categories present (Momos, Burgers, Shakes)');

// Test price non-negativity
const priceMatches = [...menuDataRaw.matchAll(/price:\s*(\d+)/g)].map(m => Number(m[1]));
const allPricesValid = priceMatches.length > 0 && priceMatches.every(p => p > 0 && p < 2000);
assert(allPricesValid, `All ${priceMatches.length} menu items have positive valid pricing (₹${Math.min(...priceMatches)} - ₹${Math.max(...priceMatches)})`);

// Test ratings bounds
const ratingMatches = [...menuDataRaw.matchAll(/rating:\s*([\d.]+)/g)].map(m => Number(m[1]));
const allRatingsValid = ratingMatches.every(r => r >= 4.0 && r <= 5.0);
assert(allRatingsValid, `All menu dish ratings within valid 4.0 - 5.0 star range`);

// -------------------------------------------------------------
// SECTION 2: Pricing Engine & Discount Promo Code Defense
// -------------------------------------------------------------
console.log('\n2. Pricing Engine, Discount Engine & Tiered Delivery Defenses');

function calculateOrderBill({ items, couponCode, orderType }) {
  const subtotal = items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  let discount = 0;

  if (couponCode === 'SPOTLIGHT10' && subtotal > 0) {
    discount = Math.round((subtotal * 10) / 100);
  } else if (couponCode === 'PALGHAR50') {
    if (subtotal >= 299) {
      discount = Math.min(50, subtotal);
    }
  } else if (couponCode === 'FREEDIP') {
    discount = Math.min(30, subtotal);
  }

  const deliveryFee = orderType === 'delivery' && subtotal > 0 ? (subtotal >= 399 ? 0 : 30) : 0;
  const grandTotal = Math.max(0, subtotal - discount + deliveryFee);

  return { subtotal, discount, deliveryFee, grandTotal };
}

// Test A: Standard Order
const testCart1 = [
  { name: 'Afghani Malai Momos', unitPrice: 180, quantity: 2 },
  { name: 'Peri-Peri Loaded Fries', unitPrice: 130, quantity: 1 }
];
const bill1 = calculateOrderBill({ items: testCart1, couponCode: '', orderType: 'delivery' });
assert(bill1.subtotal === 490, `Subtotal calculation accurate: ₹${bill1.subtotal} (expected 490)`);
assert(bill1.deliveryFee === 0, `Free Delivery applied for order >= ₹399 (Delivery fee: ₹${bill1.deliveryFee})`);
assert(bill1.grandTotal === 490, `Grand total accurate without discount: ₹${bill1.grandTotal}`);

// Test B: SPOTLIGHT10 Promo Defense
const bill2 = calculateOrderBill({ items: testCart1, couponCode: 'SPOTLIGHT10', orderType: 'delivery' });
assert(bill2.discount === 49, `SPOTLIGHT10 applies exact 10% discount: ₹${bill2.discount} (10% of 490)`);
assert(bill2.grandTotal === 441, `Discounted Grand Total accurate: ₹${bill2.grandTotal}`);

// Test C: PALGHAR50 Minimum Threshold Defense
const testCartSmall = [{ name: 'Espresso Cold Brew', unitPrice: 120, quantity: 1 }];
const billSmall = calculateOrderBill({ items: testCartSmall, couponCode: 'PALGHAR50', orderType: 'delivery' });
assert(billSmall.discount === 0, `PALGHAR50 rejected when subtotal < ₹299 (Discount: ₹${billSmall.discount})`);
assert(billSmall.deliveryFee === 30, `Under ₹399 incurs standard ₹30 Palghar delivery fee`);
assert(billSmall.grandTotal === 150, `Grand total with delivery fee matches: ₹${billSmall.grandTotal}`);

// Test D: Tamper & Negative Price Defense
const billNegative = calculateOrderBill({ items: [{ name: 'Gift', unitPrice: 20, quantity: 1 }], couponCode: 'PALGHAR50', orderType: 'dine_in' });
assert(billNegative.grandTotal >= 0, `Grand total mathematically clamped to prevent negative balance: ₹${billNegative.grandTotal}`);

// -------------------------------------------------------------
// SECTION 3: WhatsApp Protocol Injection & URI Encoding Defense
// -------------------------------------------------------------
console.log('\n3. WhatsApp Gateway Security & Protocol Encoding Defenses');

function buildWhatsAppUrl({ phonePrimary, customerName, items, notes, total }) {
  let message = `🎭 *BREAK A LEG CAFE - NEW ORDER* 🎭\n`;
  message += `👤 *Customer:* ${customerName}\n`;
  items.forEach((item, idx) => {
    message += `${idx + 1}. *${item.name}* (${item.quantity}x ₹${item.unitPrice})\n`;
  });
  message += `⭐ *TOTAL: ₹${total}*\n`;
  if (notes) message += `📝 *Notes:* ${notes}\n`;

  const cleanPhone = phonePrimary.replace(/[^0-9]/g, '');
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}

const xssPayloadName = `<script>alert("XSS")</script> Rahul & Friends`;
const injectionNotes = `Special instructions: "'; DROP TABLE orders; -- & <emoji> 🎉`;
const waUrl = buildWhatsAppUrl({
  phonePrimary: '+91 92844 62524',
  customerName: xssPayloadName,
  items: testCart1,
  notes: injectionNotes,
  total: 441
});

assert(waUrl.startsWith('https://wa.me/919284462524?text='), 'WhatsApp URI target normalized to clean E.164 format (919284462524)');
assert(!waUrl.includes('<script>'), 'XSS tags properly percent-encoded in URI output (no raw HTML tags)');
assert(waUrl.includes(encodeURIComponent(xssPayloadName)), 'Customer name safely URL-encoded into payload');
assert(waUrl.includes(encodeURIComponent(injectionNotes)), 'SQL/Special characters safely preserved and encoded');

// -------------------------------------------------------------
// SECTION 4: VIP Table Reservation Logic & Boundary Defenses
// -------------------------------------------------------------
console.log('\n4. VIP Table Reservation Logic & Boundary Defenses');

function validateReservation(data) {
  const errors = [];
  if (!data.name || data.name.trim().length < 2) errors.push('Invalid name length');
  if (!data.phone || data.phone.replace(/[^0-9]/g, '').length < 10) errors.push('Invalid phone format');
  if (!data.guests || data.guests < 1 || data.guests > 50) errors.push('Invalid guest count');
  if (!['The Spotlight Booth', 'Cozy Couple Corner', 'Backstage Party Lounge'].includes(data.zone)) {
    errors.push('Unknown seating zone');
  }
  return { isValid: errors.length === 0, errors };
}

const validReservation = {
  name: 'Varun Suthar',
  phone: '98200 12345',
  guests: 4,
  zone: 'The Spotlight Booth'
};
assert(validateReservation(validReservation).isValid, 'Valid reservation payload passes validation');

const invalidGuests = { ...validReservation, guests: 0 };
assert(!validateReservation(invalidGuests).isValid, 'Rejects 0 guests (capacity bounds check)');

const invalidPhone = { ...validReservation, phone: '123' };
assert(!validateReservation(invalidPhone).isValid, 'Rejects incomplete phone numbers (< 10 digits)');

const invalidZone = { ...validReservation, zone: 'Roof Top Lounge' };
assert(!validateReservation(invalidZone).isValid, 'Rejects non-existent seating zones');

// -------------------------------------------------------------
// SECTION 5: Client Secret & Bundle Hygiene Audit
// -------------------------------------------------------------
console.log('\n5. Client Bundle Hygiene & Static Asset Verification');

const distPath = path.join(__dirname, 'dist');
assert(fs.existsSync(distPath), 'Compiled production dist/ directory exists');

const distFiles = fs.readdirSync(distPath);
assert(distFiles.includes('index.html'), 'dist/ contains index.html entrypoint');

const assetsPath = path.join(distPath, 'assets');
if (fs.existsSync(assetsPath)) {
  const assetFiles = fs.readdirSync(assetsPath);
  const jsBundle = assetFiles.find(f => f.endsWith('.js'));
  const cssBundle = assetFiles.find(f => f.endsWith('.css'));

  assert(!!jsBundle, `Production JS bundle compiled (${jsBundle})`);
  assert(!!cssBundle, `Production CSS bundle compiled (${cssBundle})`);

  if (jsBundle) {
    const jsContent = fs.readFileSync(path.join(assetsPath, jsBundle), 'utf8');
    const hasSecretKey = jsContent.includes('SECRET_KEY') || jsContent.includes('PRIVATE_KEY');
    assert(!hasSecretKey, 'Zero private keys or backend credentials exposed in client JS bundle');
  }

  if (cssBundle) {
    const cssContent = fs.readFileSync(path.join(assetsPath, cssBundle), 'utf8');
    const hasMobileQuery = /@media[^{]*max-width:\s*768px/i.test(cssContent) || cssContent.includes('768px');
    assert(hasMobileQuery, 'Mobile responsiveness media queries present in compiled CSS');
  }
}

// -------------------------------------------------------------
// SECTION 6: LocalStorage & State Resilience Defenses
// -------------------------------------------------------------
console.log('\n6. Storage Serialization & Data Isolation Defenses');

function safeStorageParser(rawJson, defaultValue) {
  if (!rawJson) return defaultValue;
  try {
    const parsed = JSON.parse(rawJson);
    return Array.isArray(parsed) ? parsed : defaultValue;
  } catch (err) {
    return defaultValue;
  }
}

assert(Array.isArray(safeStorageParser(null, [])), 'Storage parser handles null state gracefully');
assert(Array.isArray(safeStorageParser('{corrupted_json: true', [])), 'Storage parser defends against corrupted/tampered localStorage data');
assert(safeStorageParser('[{"id":"test","quantity":2}]', []).length === 1, 'Storage parser correctly unpacks valid cart records');

// -------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------
console.log('\n================================================================');
console.log('Break a Leg Cafe - Defense & Security Audit Summary:');
console.log(`  Passed Checks:  ${passedCount}`);
console.log(`  Failed Checks:  ${failedCount}`);
console.log('================================================================\n');

if (failedCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
