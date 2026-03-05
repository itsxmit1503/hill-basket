import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { GlassCard } from '../components/GlassCard';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft, Ticket, Truck, ShieldCheck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CartPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, itemCount } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[70vh]">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-8"
        >
          <ShoppingBag size={64} />
        </motion.div>
        <h1 className="text-4xl font-poppins font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-8 max-w-md text-center">
          Looks like you haven't added anything to your cart yet. Browse our products to find the best local groceries.
        </p>
        <Link to="/products" className="btn-primary py-4 px-10 text-lg flex items-center space-x-2">
          <ArrowLeft size={20} />
          <span>Start Shopping</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-poppins font-bold mb-10 flex items-center space-x-4">
        <ShoppingBag className="text-primary" size={40} />
        <span>Shopping Cart</span>
        <span className="text-lg bg-primary/10 text-primary px-3 py-1 rounded-full ml-4">{itemCount} items</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                layout
              >
                <GlassCard className="p-6 flex flex-col md:flex-row items-center gap-6 group hover:border-primary/30 transition-colors">
                  <div className="w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  
                  <div className="flex-grow text-center md:text-left">
                    <span className="text-xs font-bold text-primary uppercase tracking-widest">{item.category}</span>
                    <h3 className="text-xl font-bold font-poppins group-hover:text-primary transition-colors">{item.name}</h3>
                    <p className="text-gray-500 text-sm mt-1 font-medium">${item.price.toFixed(2)} / unit</p>
                  </div>

                  <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1 border border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-all text-primary"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-12 text-center font-bold text-lg">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-all text-primary"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <div className="w-32 text-center md:text-right shrink-0">
                    <span className="block text-lg font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
          
          <Link to="/products" className="inline-flex items-center text-primary font-bold hover:underline py-4 px-2">
            <ArrowLeft size={18} className="mr-2" />
            Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="space-y-8">
          <GlassCard className="p-8 sticky top-32">
            <h3 className="text-2xl font-bold font-poppins mb-8">Order Summary</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-500 font-medium">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500 font-medium">
                <span>Delivery Fee</span>
                <span className="text-primary font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-gray-500 font-medium">
                <span>Estimated Tax</span>
                <span>${(totalPrice * 0.05).toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between">
                <span className="text-xl font-bold">Total Amount</span>
                <span className="text-3xl font-bold text-primary">${(totalPrice * 1.05).toFixed(2)}</span>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 ml-1">Promo Code</label>
              <div className="flex bg-gray-100 dark:bg-gray-800 p-2 rounded-xl border border-gray-200 dark:border-gray-700 shadow-inner">
                <div className="p-3 text-gray-400">
                  <Ticket size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Enter code"
                  className="bg-transparent border-none focus:ring-0 flex-1 px-2 font-medium"
                />
                <button className="bg-primary text-white font-bold px-6 py-2 rounded-lg hover:bg-primary-dark transition-all shadow-md">
                  Apply
                </button>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="btn-primary w-full py-5 text-xl font-bold shadow-xl shadow-primary/20 flex items-center justify-center space-x-3 group"
            >
              <span>Go to Checkout</span>
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="mt-8 space-y-4">
              <div className="flex items-center space-x-3 text-sm text-gray-500 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl">
                <Truck className="text-primary shrink-0" size={18} />
                <span>Free delivery on orders over $50 within 15km.</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-500 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl">
                <ShieldCheck className="text-accent shrink-0" size={18} />
                <span>Secure payment and 100% fresh guarantee.</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-500 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl">
                <Zap className="text-yellow-500 shrink-0" size={18} />
                <span>Average delivery time: 45 minutes.</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
