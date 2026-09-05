import { CAFE_INFO } from '../data/menuData';

/**
 * Builds a direct WhatsApp order message url
 */
export function generateWhatsAppOrderUrl({
  items,
  orderType, // 'dine_in' | 'takeaway' | 'delivery'
  tableNumber,
  customerName,
  phone,
  address,
  notes,
  discount,
  subtotal,
  total,
  couponCode
}) {
  let message = `🎭 *BREAK A LEG CAFE - NEW ORDER* 🎭\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `📍 *Order Type:* ${
    orderType === 'dine_in'
      ? `🍽️ Dine-In (Table #${tableNumber || 'Pending'})`
      : orderType === 'takeaway'
      ? `🥡 Takeaway (Self Pickup)`
      : `🛵 Home Delivery (Palghar Local)`
  }\n`;
  message += `👤 *Customer Name:* ${customerName || 'Foodie'}\n`;
  message += `📞 *Phone:* ${phone || 'Not provided'}\n`;

  if (orderType === 'delivery' && address) {
    message += `🏠 *Delivery Address:* ${address}\n`;
  }
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `📋 *ORDER ITEMS:*\n`;

  items.forEach((item, index) => {
    const vegBadge = item.isVeg ? '🟢 [Veg]' : '🔴 [Non-Veg]';
    message += `${index + 1}. *${item.name}* ${vegBadge}\n`;
    if (item.selectedOption) {
      message += `   • Variant: ${item.selectedOption.name}\n`;
    }
    if (item.selectedSpice) {
      message += `   • Spice: ${item.selectedSpice}\n`;
    }
    if (item.addons && item.addons.length > 0) {
      message += `   • Add-ons: ${item.addons.map(a => a.name).join(', ')}\n`;
    }
    message += `   • Qty: ${item.quantity} × ₹${item.unitPrice} = *₹${item.quantity * item.unitPrice}*\n`;
  });

  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `💰 *Bill Summary:*\n`;
  message += `• Subtotal: ₹${subtotal}\n`;
  if (discount > 0) {
    message += `• Discount (${couponCode || 'Promo'}): -₹${discount}\n`;
  }
  if (orderType === 'delivery') {
    message += `• Delivery Charges: ₹30 (Palghar Area)\n`;
  }
  message += `⭐ *TOTAL PAYABLE: ₹${total}*\n`;

  if (notes) {
    message += `\n📝 *Special Instructions:* ${notes}\n`;
  }

  message += `\n_Generated via Break a Leg Official Web App_`;

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${CAFE_INFO.phonePrimary.replace('+', '')}?text=${encoded}`;
}

/**
 * Builds a WhatsApp table reservation message url
 */
export function generateWhatsAppReservationUrl({
  name,
  phone,
  guests,
  date,
  time,
  zone,
  occasion,
  specialRequests
}) {
  let message = `🎭 *BREAK A LEG CAFE - TABLE RESERVATION* 🎭\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `👤 *Name:* ${name}\n`;
  message += `📞 *Phone:* ${phone}\n`;
  message += `👥 *Guests:* ${guests} People\n`;
  message += `📅 *Date:* ${date}\n`;
  message += `⏰ *Time:* ${time}\n`;
  message += `🎪 *Preferred Zone:* ${zone}\n`;
  message += `🎉 *Occasion:* ${occasion || 'Casual Dining'}\n`;
  if (specialRequests) {
    message += `✨ *Special Request:* ${specialRequests}\n`;
  }
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `Please confirm my table reservation! ☕`;

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${CAFE_INFO.phonePrimary.replace('+', '')}?text=${encoded}`;
}
