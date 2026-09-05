const CART_KEY = 'break_a_leg_cart_v1';
const RESERVATIONS_KEY = 'break_a_leg_reservations_v1';
const ORDERS_KEY = 'break_a_leg_orders_v1';
const REWARD_KEY = 'break_a_leg_spin_reward_v1';

export function getStoredCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveStoredCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) {}
}

export function getStoredReservations() {
  try {
    const raw = localStorage.getItem(RESERVATIONS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}

  // Initial seed reservations for Owner Demo View
  return [
    {
      id: 'RES-8821',
      name: 'Sahil Deshmukh',
      phone: '+91 98201 44321',
      guests: 4,
      date: 'Today',
      time: '07:30 PM',
      zone: 'The Spotlight Booth',
      occasion: 'Birthday Party',
      status: 'Confirmed'
    },
    {
      id: 'RES-8822',
      name: 'Ananya Sharma',
      phone: '+91 97654 11200',
      guests: 2,
      date: 'Today',
      time: '08:15 PM',
      zone: 'Cozy Couple Corner',
      occasion: 'Date Night',
      status: 'Confirmed'
    }
  ];
}

export function saveReservation(res) {
  try {
    const current = getStoredReservations();
    const updated = [res, ...current];
    localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
}

export function getStoredOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}

  // Initial mock orders for Owner Demo View
  return [
    {
      id: 'ORD-1049',
      customerName: 'Priya Mehta',
      phone: '+91 98920 11842',
      type: 'Home Delivery',
      address: 'Near Valan Naka, Flat 302, Palghar',
      items: ['Afghani Malai Momos (Veg)', 'KitKat Monster Shake'],
      total: 370,
      time: '12 mins ago',
      status: 'Preparing'
    },
    {
      id: 'ORD-1048',
      customerName: 'Kunal Patil',
      phone: '+91 99231 99812',
      type: 'Dine-In (Table 4)',
      address: 'Table #4',
      items: ['Monster Smash Burger', 'Peri-Peri Volcano Fries'],
      total: 360,
      time: '25 mins ago',
      status: 'Ready'
    },
    {
      id: 'ORD-1047',
      customerName: 'Vikram Joshi',
      phone: '+91 91374 88123',
      type: 'Takeaway',
      address: 'Self Pickup',
      items: ['Kurkure Momos', 'Chilli Garlic Hakka Noodles'],
      total: 310,
      time: '40 mins ago',
      status: 'Delivered'
    }
  ];
}

export function saveOrder(order) {
  try {
    const current = getStoredOrders();
    const updated = [order, ...current];
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
}

export function getStoredReward() {
  try {
    const raw = localStorage.getItem(REWARD_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function saveStoredReward(reward) {
  try {
    localStorage.setItem(REWARD_KEY, JSON.stringify(reward));
  } catch (e) {}
}
