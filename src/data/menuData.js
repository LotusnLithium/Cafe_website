export const MENU_CATEGORIES = [
  { id: 'all', name: 'All Spotlight Items', icon: '✨' },
  { id: 'momos', name: 'Signature Momos', icon: '🥟', tag: "Palghar's #1" },
  { id: 'burgers', name: 'Gourmet Burgers', icon: '🍔' },
  { id: 'sandwiches', name: 'Grilled Sandwiches', icon: '🥪' },
  { id: 'starters', name: 'Crispy Bites & Fries', icon: '🍟' },
  { id: 'chinese', name: 'Wok & Street Fusion', icon: '🍜' },
  { id: 'beverages', name: 'Shakes & Coolers', icon: '🥤' },
  { id: 'desserts', name: 'Sweet Endings', icon: '🍫' },
];

export const INITIAL_MENU_ITEMS = [
  // --- SIGNATURE MOMOS ---
  {
    id: 'momo-1',
    name: 'Afghani Malai Cream Momos',
    category: 'momos',
    price: 180,
    originalPrice: 210,
    rating: 4.9,
    reviewsCount: 312,
    isVeg: true,
    isSpicy: false,
    isBestseller: true,
    description: 'Tender steamed momos tossed in a rich, velvety cashew cream, butter garlic, and aromatic herbs with melted mozzarella drizzle.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
    options: [
      { name: 'Paneer & Cheese (Veg)', priceDiff: 0 },
      { name: 'Juicy Herb Chicken (Non-Veg)', priceDiff: 30 }
    ],
    spiceLevels: ['Mild Butter Cream', 'Medium Zest'],
    prepTime: '12-15 min'
  },
  {
    id: 'momo-2',
    name: 'Tandoori Flame Charred Momos',
    category: 'momos',
    price: 170,
    originalPrice: 199,
    rating: 4.8,
    reviewsCount: 248,
    isVeg: true,
    isSpicy: true,
    isBestseller: true,
    description: 'Clay-oven style tandoori spiced momos charred to smoky perfection, garnished with mint mayo, chaat masala, and pickled onions.',
    image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=600&q=80',
    options: [
      { name: 'Classic Veg Dumpling', priceDiff: 0 },
      { name: 'Smoked Chicken Tikka', priceDiff: 30 },
      { name: 'Paneer Makhani', priceDiff: 20 }
    ],
    spiceLevels: ['Medium Spiced', 'Fiery Hot Tandoor 🔥'],
    prepTime: '12-15 min'
  },
  {
    id: 'momo-3',
    name: 'Kurkure Crunchy Crispy Momos',
    category: 'momos',
    price: 160,
    originalPrice: 185,
    rating: 4.9,
    reviewsCount: 195,
    isVeg: true,
    isSpicy: true,
    isBestseller: true,
    description: 'Coated in a double layer of spiced crispy flakes and fried till super crunchy on the outside, bursting with juicy filling inside.',
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80',
    options: [
      { name: 'Crunchy Veg Mix', priceDiff: 0 },
      { name: 'Crunchy Cheese Corn', priceDiff: 20 },
      { name: 'Crunchy Spicy Chicken', priceDiff: 30 }
    ],
    spiceLevels: ['Peri-Peri Crunch', 'Schezwan Crunch'],
    prepTime: '10-12 min'
  },
  {
    id: 'momo-4',
    name: 'Cheesy Pizza Momos Supreme',
    category: 'momos',
    price: 190,
    originalPrice: 220,
    rating: 4.7,
    reviewsCount: 140,
    isVeg: true,
    isSpicy: false,
    isBestseller: false,
    description: 'Deep fried dumplings baked under a blanket of marinara sauce, Italian herbs, bell peppers, olives, and golden bubbling cheese.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
    options: [
      { name: 'Veggie Supreme (Veg)', priceDiff: 0 },
      { name: 'Chicken Pepperoni (Non-Veg)', priceDiff: 40 }
    ],
    prepTime: '15 min'
  },
  {
    id: 'momo-5',
    name: 'Classic Steamed Momos (8 Pcs)',
    category: 'momos',
    price: 120,
    originalPrice: 140,
    rating: 4.6,
    reviewsCount: 180,
    isVeg: true,
    isSpicy: false,
    isBestseller: false,
    description: 'Traditional thin-wrapper steamed dumplings served piping hot with fiery chili-garlic dip and silky mayonnaise.',
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80',
    options: [
      { name: 'Farm Fresh Vegetables', priceDiff: 0 },
      { name: 'Juicy Chicken Mince', priceDiff: 20 },
      { name: 'Spiced Soya & Herbs', priceDiff: 0 }
    ],
    prepTime: '10 min'
  },
  {
    id: 'momo-6',
    name: 'Schezwan Pan-Tossed Momos',
    category: 'momos',
    price: 160,
    originalPrice: 180,
    rating: 4.8,
    reviewsCount: 162,
    isVeg: true,
    isSpicy: true,
    isBestseller: false,
    description: 'Crispy fried momos wok-tossed with spring onions, garlic, capsicum, and house-made tangy Schezwan glaze.',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
    options: [
      { name: 'Veggie Tossed', priceDiff: 0 },
      { name: 'Chicken Tossed', priceDiff: 30 }
    ],
    prepTime: '12 min'
  },

  // --- GOURMET BURGERS ---
  {
    id: 'burger-1',
    name: 'Break-a-Leg Monster Smash Burger',
    category: 'burgers',
    price: 210,
    originalPrice: 249,
    rating: 4.9,
    reviewsCount: 220,
    isVeg: false,
    isSpicy: true,
    isBestseller: true,
    description: 'Double grilled seasoned chicken patties, double cheddar cheese melt, caramelized onions, crisp lettuce, jalapeños & signature spotlight BBQ sauce on a brioche bun.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    options: [
      { name: 'Double Chicken Beast', priceDiff: 0 },
      { name: 'Double Paneer & Cheese Royale (Veg)', priceDiff: -10 }
    ],
    prepTime: '15 min'
  },
  {
    id: 'burger-2',
    name: 'Crispy Peri-Peri Chicken Burger',
    category: 'burgers',
    price: 170,
    originalPrice: 199,
    rating: 4.8,
    reviewsCount: 175,
    isVeg: false,
    isSpicy: true,
    isBestseller: true,
    description: 'Golden fried chicken fillet dusted in fiery African bird’s eye peri-peri spice, crunchy coleslaw, and garlic chipotle dressing.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80',
    options: [
      { name: 'Crispy Chicken Fillet', priceDiff: 0 },
      { name: 'Crispy Herb Paneer Patty (Veg)', priceDiff: -20 }
    ],
    prepTime: '12 min'
  },
  {
    id: 'burger-3',
    name: 'Palghar Special Veg Tikki Burger',
    category: 'burgers',
    price: 110,
    originalPrice: 130,
    rating: 4.6,
    reviewsCount: 130,
    isVeg: true,
    isSpicy: false,
    isBestseller: false,
    description: 'Spiced potato and green pea herb patty crisped to perfection, layered with sliced tomatoes, onions, cheese slice, and creamy mint sauce.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
    options: [
      { name: 'Single Patty Delight', priceDiff: 0 },
      { name: 'Loaded Cheese Burst', priceDiff: 30 }
    ],
    prepTime: '10 min'
  },

  // --- GRILLED SANDWICHES ---
  {
    id: 'sandwich-1',
    name: 'Triple Decker Cheesy Club Sandwich',
    category: 'sandwiches',
    price: 170,
    originalPrice: 195,
    rating: 4.9,
    reviewsCount: 205,
    isVeg: true,
    isSpicy: false,
    isBestseller: true,
    description: '3 layers of toasted butter bread packed with cucumber, tomatoes, spiced potato stuffing, grated mozzarella, cheddar, and green chutney.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
    options: [
      { name: 'Jumbo Veg Club', priceDiff: 0 },
      { name: 'Smoked Chicken & Egg Club', priceDiff: 30 }
    ],
    prepTime: '12 min'
  },
  {
    id: 'sandwich-2',
    name: 'Paneer Makhani Cheese Melt Grill',
    category: 'sandwiches',
    price: 160,
    originalPrice: 180,
    rating: 4.8,
    reviewsCount: 160,
    isVeg: true,
    isSpicy: true,
    isBestseller: true,
    description: 'Marinated cottage cheese cubes in rich makhani gravy, capsicum, and gooey mozzarella grilled on brown sourdough or white bread.',
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=600&q=80',
    options: [
      { name: 'Paneer Makhani (Veg)', priceDiff: 0 },
      { name: 'Chicken Makhani (Non-Veg)', priceDiff: 30 }
    ],
    prepTime: '12 min'
  },

  // --- STARTERS & FRIES ---
  {
    id: 'starter-1',
    name: 'Loaded Peri-Peri Cheese Volcano Fries',
    category: 'starters',
    price: 150,
    originalPrice: 180,
    rating: 4.9,
    reviewsCount: 280,
    isVeg: true,
    isSpicy: true,
    isBestseller: true,
    description: 'Crispy skin-on french fries tossed in spicy peri-peri dust, drenched in liquid cheddar cheese sauce and jalapeño bits.',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=600&q=80',
    options: [
      { name: 'Regular Loaded (Veg)', priceDiff: 0 },
      { name: 'Topped with BBQ Chicken Bits', priceDiff: 40 }
    ],
    prepTime: '10 min'
  },
  {
    id: 'starter-2',
    name: 'Crispy Corn & Pepper Crunch',
    category: 'starters',
    price: 140,
    originalPrice: 160,
    rating: 4.7,
    reviewsCount: 110,
    isVeg: true,
    isSpicy: true,
    isBestseller: false,
    description: 'Sweet golden corn kernels flash fried until crunchy, tossed with cracked black pepper, garlic, curry leaves, and lemon zest.',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80',
    prepTime: '10 min'
  },
  {
    id: 'starter-3',
    name: 'Fiery BBQ Chicken Wings (6 Pcs)',
    category: 'starters',
    price: 210,
    originalPrice: 240,
    rating: 4.8,
    reviewsCount: 145,
    isVeg: false,
    isSpicy: true,
    isBestseller: true,
    description: 'Crisp fried chicken wings glazed in smokey sweet BBQ sauce and roasted sesame seeds, served with garlic ranch.',
    image: 'https://images.unsplash.com/photo-1527477321005-4d45d724b8c4?auto=format&fit=crop&w=600&q=80',
    prepTime: '15 min'
  },

  // --- WOK & STREET FUSION ---
  {
    id: 'chinese-1',
    name: 'Wok-Tossed Schezwan Fried Rice',
    category: 'chinese',
    price: 160,
    originalPrice: 180,
    rating: 4.7,
    reviewsCount: 155,
    isVeg: true,
    isSpicy: true,
    isBestseller: false,
    description: 'Fragrant long-grain basmati wok-seared with diced bell peppers, carrots, spring onions, and spicy Schezwan paste.',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80',
    options: [
      { name: 'Veg Schezwan Rice', priceDiff: 0 },
      { name: 'Egg & Chicken Schezwan', priceDiff: 40 },
      { name: 'Paneer Schezwan', priceDiff: 30 }
    ],
    prepTime: '12 min'
  },
  {
    id: 'chinese-2',
    name: 'Chilli Garlic Hakka Noodles',
    category: 'chinese',
    price: 150,
    originalPrice: 175,
    rating: 4.8,
    reviewsCount: 190,
    isVeg: true,
    isSpicy: true,
    isBestseller: true,
    description: 'Smoky wok tossed noodles with shredded vegetables, roasted garlic chips, red chilies, and dark soy seasoning.',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80',
    options: [
      { name: 'Veg Hakka Delight', priceDiff: 0 },
      { name: 'Chicken Hakka Twist', priceDiff: 40 }
    ],
    prepTime: '12 min'
  },

  // --- SHAKES & COOLERS ---
  {
    id: 'bev-1',
    name: 'KitKat Overload Monster Shake',
    category: 'beverages',
    price: 160,
    originalPrice: 190,
    rating: 4.9,
    reviewsCount: 310,
    isVeg: true,
    isSpicy: false,
    isBestseller: true,
    description: 'Creamy chocolate milkshake blended with crunchy KitKat bars, topped with whipped cream, chocolate syrup, and wafer sticks.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
    prepTime: '8 min'
  },
  {
    id: 'bev-2',
    name: 'Artisanal Hazelnut Frappe Cold Coffee',
    category: 'beverages',
    price: 140,
    originalPrice: 165,
    rating: 4.8,
    reviewsCount: 225,
    isVeg: true,
    isSpicy: false,
    isBestseller: true,
    description: 'Rich roasted Arabica espresso blended with cold milk, hazelnut syrup, ice cream, and dusted with dark cocoa.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
    options: [
      { name: 'Roasted Hazelnut', priceDiff: 0 },
      { name: 'Irish Cream Flavor', priceDiff: 10 },
      { name: 'Classic Cold Coffee', priceDiff: -20 }
    ],
    prepTime: '6 min'
  },
  {
    id: 'bev-3',
    name: 'Electric Blue Curacao & Mint Mojito',
    category: 'beverages',
    price: 120,
    originalPrice: 140,
    rating: 4.7,
    reviewsCount: 130,
    isVeg: true,
    isSpicy: false,
    isBestseller: false,
    description: 'Refreshing sparkling cooler with crushed garden mint, fresh lime juice, blue curacao infusion, and chilled club soda.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    prepTime: '5 min'
  },

  // --- DESSERTS ---
  {
    id: 'dessert-1',
    name: 'Sizzling Chocolate Brownie with Vanilla Ice Cream',
    category: 'desserts',
    price: 180,
    originalPrice: 210,
    rating: 4.9,
    reviewsCount: 290,
    isVeg: true,
    isSpicy: false,
    isBestseller: true,
    description: 'Warm, gooey walnut fudge brownie served on a piping hot sizzler plate, crowned with vanilla bean ice cream and simmering hot dark chocolate fudge.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    prepTime: '10 min'
  },
  {
    id: 'dessert-2',
    name: 'Nutella Belgian Waffle Tower',
    category: 'desserts',
    price: 160,
    originalPrice: 185,
    rating: 4.8,
    reviewsCount: 175,
    isVeg: true,
    isSpicy: false,
    isBestseller: false,
    description: 'Freshly baked golden waffle smothered in authentic Ferrero Nutella, banana slices, and roasted almonds.',
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=600&q=80',
    prepTime: '12 min'
  }
];

export const CAFE_INFO = {
  name: 'Break a Leg Cafe',
  tagline: "Palghar's Spotlight Bistro & Artisan Momos",
  phonePrimary: '+919284462524',
  phoneDisplay: '+91 92844 62524',
  phoneAlt: '+91 99231 17509',
  address: 'Shop No. 8, Sai Ashish Apartment, Mahim Road, Kuldeep Nagar, Palghar (West)',
  city: 'Palghar, Maharashtra 401404',
  googleMapsUrl: 'https://share.google/MZPWZAXG6zlNC4sWi',
  googleReviewScore: 4.8,
  totalReviews: 1240,
  openingTime: '10:00 AM',
  closingTime: '11:00 PM',
  openHour24: 10,
  closeHour24: 23,
  amenities: [
    { icon: 'Wifi', label: 'High Speed Wi-Fi' },
    { icon: 'Snowflake', label: 'Fully Air Conditioned' },
    { icon: 'Music', label: 'Acoustic / Lo-Fi Lounge' },
    { icon: 'Gamepad2', label: 'Board Games & Uno' },
    { icon: 'Sparkles', label: 'Birthday & Event Setup' },
    { icon: 'Bike', label: 'Fast Local Delivery' }
  ],
  deliveryAreas: [
    'Kuldeep Nagar',
    'Valan Naka',
    'Mahim Road',
    'Palghar Station (West & East)',
    'Tembhode Road',
    'Kacheri Road',
    'Manor Road'
  ]
};
