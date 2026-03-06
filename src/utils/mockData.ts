import { Product } from '../context/CartContext';

export const CATEGORIES = [
  { id: '1', name: 'Fruits', icon: '🍎', color: 'bg-red-50 text-red-600' },
  { id: '2', name: 'Vegetables', icon: '🥦', color: 'bg-green-50 text-green-600' },
  { id: '3', name: 'Dairy', icon: '🥛', color: 'bg-blue-50 text-blue-600' },
  { id: '4', name: 'Bakery', icon: '🥐', color: 'bg-yellow-50 text-yellow-600' },
  { id: '5', name: 'Meat', icon: '🥩', color: 'bg-orange-50 text-orange-600' },
  { id: '6', name: 'Beverages', icon: '🥤', color: 'bg-purple-50 text-purple-600' },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Organic Red Apples',
    price: 4.99,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6bcd6?w=400&q=80',
    stockStatus: 'In Stock',
    rating: 4.8,
    description: 'Fresh, crispy organic red apples from local orchards. High in fiber and vitamins.'
  },
  {
    id: 'p2',
    name: 'Fresh Spinach',
    price: 2.49,
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80',
    stockStatus: 'In Stock',
    rating: 4.5,
    description: 'Freshly harvested baby spinach leaves. Perfect for salads and smoothies.'
  },
  {
    id: 'p3',
    name: 'Whole Milk (1L)',
    price: 1.89,
    category: 'Dairy',
    image: 'https://images.unsplash.com/photo-1563636619-e910ef49e9d3?w=400&q=80',
    stockStatus: 'In Stock',
    rating: 4.9,
    description: 'Pasteurized whole milk from grass-fed cows. Rich in calcium and nutrients.'
  },
  {
    id: 'p4',
    name: 'Butter Croissants',
    price: 3.99,
    category: 'Bakery',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80',
    stockStatus: 'In Stock',
    rating: 4.7,
    description: 'Flaky, buttery croissants baked fresh daily. Pack of 4.'
  },
  {
    id: 'p5',
    name: 'Organic Bananas',
    price: 1.29,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1571771894821-ad996211fdf4?w=400&q=80',
    stockStatus: 'In Stock',
    rating: 4.6,
    description: 'Premium organic bananas, perfectly ripened and sweet.'
  },
  {
    id: 'p6',
    name: 'Broccoli Florets',
    price: 2.99,
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&q=80',
    stockStatus: 'Out of Stock',
    rating: 4.4,
    description: 'Clean, ready-to-cook broccoli florets. Great for steaming or stir-frying.'
  }
];

export const MOCK_ADDRESSES = [
  {
    id: 'a1',
    type: 'Home',
    street: '123 Maple Avenue',
    city: 'Springfield',
    state: 'IL',
    zip: '62704',
    isDefault: true
  },
  {
    id: 'a2',
    type: 'Work',
    street: '456 Business Center Dr',
    city: 'Springfield',
    state: 'IL',
    zip: '62701',
    isDefault: false
  }
];

export const MOCK_ORDERS = [
  {
    id: 'ORD-9872',
    date: '2024-03-01',
    status: 'Delivered',
    total: 42.50,
    items: [
      { name: 'Organic Red Apples', quantity: 2, price: 4.99 },
      { name: 'Whole Milk (1L)', quantity: 1, price: 1.89 }
    ]
  },
  {
    id: 'ORD-9845',
    date: '2024-02-15',
    status: 'Delivered',
    total: 18.25,
    items: [
      { name: 'Butter Croissants', quantity: 1, price: 3.99 },
      { name: 'Fresh Spinach', quantity: 2, price: 2.49 }
    ]
  }
];

export const MOCK_NOTIFICATIONS = [
  {
    id: 'n1',
    title: 'Order Delivered',
    message: 'Your order #ORD-9872 has been delivered successfully.',
    time: '2 hours ago',
    read: false,
    type: 'order'
  },
  {
    id: 'n2',
    title: 'Flash Sale!',
    message: 'Get 20% off on all organic fruits today.',
    time: '5 hours ago',
    read: true,
    type: 'promo'
  }
];

export const MOCK_REVIEWS = [
  {
    id: 'r1',
    productName: 'Organic Red Apples',
    rating: 5,
    comment: 'Best apples I have ever tasted! So fresh.',
    date: '2024-02-20'
  },
  {
    id: 'r2',
    productName: 'Fresh Spinach',
    rating: 4,
    comment: 'Very fresh, but the bag was a bit small.',
    date: '2024-02-18'
  }
];
