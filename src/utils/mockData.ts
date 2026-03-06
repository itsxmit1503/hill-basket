import { Product } from '../context/CartContext';

export const CATEGORIES = [
  { id: '1', name: 'Energy Drink', icon: '⚡', color: 'bg-yellow-50 text-yellow-600' },
  { id: '2', name: 'Rice', icon: '🌾', color: 'bg-orange-50 text-orange-600' },
  { id: '3', name: 'Dry Fruits', icon: '🥜', color: 'bg-amber-50 text-amber-600' },
  { id: '4', name: 'Biscuits', icon: '🍪', color: 'bg-brown-50 text-amber-900' },
  { id: '5', name: 'Juice', icon: '🧃', color: 'bg-red-50 text-red-600' },
];

export const INITIAL_PRODUCTS: Product[] = [
  // Energy Drinks
  {
    id: 'p1',
    name: 'Red Bull Energy Drink',
    price: 110.00,
    category: 'Energy Drink',
    image: 'https://images.unsplash.com/photo-1622543925917-763c34d15384?w=400&q=80',
    stockStatus: 'In Stock',
    rating: 4.8,
    description: 'Vitalizes body and mind. High caffeine content.'
  },
  {
    id: 'p2',
    name: 'Monster Energy Drink',
    price: 120.00,
    category: 'Energy Drink',
    image: 'https://images.unsplash.com/photo-1625505704077-336783d7f950?w=400&q=80',
    stockStatus: 'In Stock',
    rating: 4.7,
    description: 'Tear into a can of the meanest energy drink on the planet.'
  },
  {
    id: 'p3',
    name: 'Prime Hydration Drink',
    price: 350.00,
    category: 'Energy Drink',
    image: 'https://images.unsplash.com/photo-1695462512693-e57929a008c3?w=400&q=80',
    stockStatus: 'In Stock',
    rating: 4.9,
    description: 'Prime Hydration is a better-for-you hydration option.'
  },
  {
    id: 'p4',
    name: 'Hell Energy Drink',
    price: 60.00,
    category: 'Energy Drink',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80',
    stockStatus: 'In Stock',
    rating: 4.5,
    description: 'Active lifestyle energy drink with vitamins.'
  },
  // Rice
  {
    id: 'p5',
    name: 'India Gate Basmati Rice',
    price: 150.00,
    category: 'Rice',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80',
    stockStatus: 'In Stock',
    rating: 4.9,
    description: 'Premium aged Basmati rice with long grains and rich aroma.'
  },
  {
    id: 'p6',
    name: 'Silver Rice',
    price: 80.00,
    category: 'Rice',
    image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&q=80',
    stockStatus: 'In Stock',
    rating: 4.6,
    description: 'High-quality polished white rice for daily use.'
  },
  {
    id: 'p7',
    name: 'Dawat Basmati Rice',
    price: 130.00,
    category: 'Rice',
    image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400&q=80',
    stockStatus: 'In Stock',
    rating: 4.8,
    description: 'Authentic Basmati rice known for its exceptional taste.'
  },
  // Dry Fruits
  {
    id: 'p8',
    name: 'Premium Almonds',
    price: 450.00,
    category: 'Dry Fruits',
    image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=400&q=80',
    stockStatus: 'In Stock',
    rating: 4.9,
    description: 'California almonds, rich in protein and Vitamin E.'
  },
  {
    id: 'p9',
    name: 'Roasted Cashews',
    price: 550.00,
    category: 'Dry Fruits',
    image: 'https://images.unsplash.com/photo-1558961363-fa4f2323a22d?w=400&q=80',
    stockStatus: 'In Stock',
    rating: 4.8,
    description: 'Creamy and crunchy roasted cashews, perfect for snacking.'
  },
  {
    id: 'p10',
    name: 'Crunchy Peanuts',
    price: 120.00,
    category: 'Dry Fruits',
    image: 'https://images.unsplash.com/photo-1567333090944-10477ce74677?w=400&q=80',
    stockStatus: 'In Stock',
    rating: 4.5,
    description: 'Nutritious and delicious peanuts, roasted to perfection.'
  },
  // Biscuits
  {
    id: 'p11',
    name: 'Marie Gold Biscuits',
    price: 10.00,
    category: 'Biscuits',
    image: 'https://images.unsplash.com/photo-1558961363-fa4f2323a22d?w=400&q=80',
    stockStatus: 'In Stock',
    rating: 4.6,
    description: 'Crispy and light tea-time biscuits.'
  },
  {
    id: 'p12',
    name: '50-50 Biscuits',
    price: 10.00,
    category: 'Biscuits',
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=400&q=80',
    stockStatus: 'In Stock',
    rating: 4.7,
    description: 'The perfect blend of sweet and salty.'
  },
  {
    id: 'p13',
    name: 'Milk Bikies',
    price: 10.00,
    category: 'Biscuits',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&q=80',
    stockStatus: 'In Stock',
    rating: 4.8,
    description: 'Delicious milk-enriched biscuits for kids.'
  },
  {
    id: 'p14',
    name: 'Digestive Biscuits',
    price: 30.00,
    category: 'Biscuits',
    image: 'https://images.unsplash.com/photo-1532117182044-031e7da8965d?w=400&q=80',
    stockStatus: 'In Stock',
    rating: 4.5,
    description: 'High-fiber biscuits for better digestion.'
  },
  // Juice
  {
    id: 'p15',
    name: 'Real Cranberry Juice',
    price: 110.00,
    category: 'Juice',
    image: 'https://images.unsplash.com/photo-1563223552-30d01fda3ea6?w=400&q=80',
    stockStatus: 'In Stock',
    rating: 4.7,
    description: '100% natural cranberry juice, rich in antioxidants.'
  },
  {
    id: 'p16',
    name: 'Pomegranate Juice',
    price: 120.00,
    category: 'Juice',
    image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&q=80',
    stockStatus: 'In Stock',
    rating: 4.8,
    description: 'Freshly squeezed pomegranate juice, packed with vitamins.'
  },
  {
    id: 'p17',
    name: 'Mango Juice',
    price: 90.00,
    category: 'Juice',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&q=80',
    stockStatus: 'In Stock',
    rating: 4.9,
    description: 'Sweet and luscious mango nectar from selected mangoes.'
  }
];

export const MOCK_ADDRESSES = [];

export const MOCK_ORDERS = [];

export const MOCK_NOTIFICATIONS = [];

export const MOCK_REVIEWS = [];

export const MOCK_ADMIN_USERS = [];

export const MOCK_ADMIN_COUPONS = [];

export const MOCK_ADMIN_ORDERS = [];
