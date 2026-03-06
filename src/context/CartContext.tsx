import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  stockStatus: 'In Stock' | 'Out of Stock';
  rating: number;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
  itemCount: number;
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Helper to get storage keys based on user session
  const getStorageKey = (type: 'cart' | 'wishlist') => {
    const prefix = user ? `user_${user.id}` : 'guest';
    return `${prefix}_${type}`;
  };

  // Load data when user changes
  useEffect(() => {
    const loadData = () => {
      const cartKey = getStorageKey('cart');
      const wishlistKey = getStorageKey('wishlist');

      try {
        const savedCart = localStorage.getItem(cartKey);
        const savedWishlist = localStorage.getItem(wishlistKey);
        
        setItems(savedCart ? JSON.parse(savedCart) : []);
        setWishlist(savedWishlist ? JSON.parse(savedWishlist) : []);
      } catch (e) {
        console.error('Error loading cart/wishlist', e);
        setItems([]);
        setWishlist([]);
      } finally {
        setIsInitialized(true);
      }
    };

    loadData();
  }, [user?.id]);

  // Save cart data when items change
  useEffect(() => {
    if (!isInitialized) return;
    const cartKey = getStorageKey('cart');
    localStorage.setItem(cartKey, JSON.stringify(items));
  }, [items, user?.id, isInitialized]);

  // Save wishlist data when wishlist changes
  useEffect(() => {
    if (!isInitialized) return;
    const wishlistKey = getStorageKey('wishlist');
    localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
  }, [wishlist, user?.id, isInitialized]);

  const addToCart = (product: Product) => {
    if (product.stockStatus === 'Out of Stock') return;
    
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(prev => prev.filter(i => i.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prev => prev.map(i => i.id === productId ? { ...i, quantity } : i));
  };

  const clearCart = () => setItems([]);

  const addToWishlist = (product: Product) => {
    setWishlist(prev => {
      if (prev.some(item => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      totalPrice,
      itemCount,
      wishlist,
      addToWishlist,
      removeFromWishlist,
      isInWishlist
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
