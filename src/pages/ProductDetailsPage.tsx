import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { INITIAL_PRODUCTS } from '../utils/mockData';
import { useCart } from '../context/CartContext';
import { GlassCard } from '../components/GlassCard';
import { Star, ShoppingCart, ArrowLeft, Plus, Minus, ShieldCheck, Zap, Heart, Share2, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, updateQuantity, items } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = useMemo(() => INITIAL_PRODUCTS.find(p => p.id === id), [id]);
  const cartItem = useMemo(() => items.find(i => i.id === id), [items, id]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-6">Product Not Found</h1>
        <Link to="/products" className="btn-primary">Back to Shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/products" className="inline-flex items-center text-primary font-bold mb-8 hover:underline">
        <ArrowLeft size={18} className="mr-2" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative group"
        >
          <GlassCard className="p-4 overflow-hidden h-[400px] md:h-[600px] flex items-center justify-center bg-white/50 dark:bg-black/50">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
            />
          </GlassCard>
          {product.stockStatus === 'Out of Stock' && (
            <div className="absolute top-8 left-8 bg-red-500 text-white font-bold px-4 py-2 rounded-xl shadow-lg z-10">
              Out of Stock
            </div>
          )}
          <button className="absolute top-8 right-8 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:text-red-500 transition-colors">
            <Heart size={20} />
          </button>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col"
        >
          <div className="mb-6">
            <span className="inline-block bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-4">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-gray-800 dark:text-white mb-4 leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1.5 rounded-lg border border-yellow-100 dark:border-yellow-900/50">
                <Star size={18} fill="currentColor" />
                <span className="ml-2 font-bold text-lg">{product.rating}</span>
                <span className="ml-2 text-sm text-gray-500">(120 Reviews)</span>
              </div>
              <div className="flex items-center text-primary bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20">
                <ShieldCheck size={18} />
                <span className="ml-2 font-bold text-sm">Verified Product</span>
              </div>
            </div>
          </div>

          <div className="mb-10 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg italic">
              "{product.description}"
            </p>
          </div>

          <div className="flex items-center justify-between mb-10 bg-white/30 dark:bg-black/30 p-8 rounded-3xl border border-white/20 dark:border-white/10 shadow-xl backdrop-blur-xl">
            <div>
              <span className="block text-gray-500 dark:text-gray-400 text-sm mb-1 uppercase tracking-widest font-bold">Total Price</span>
              <span className="text-4xl font-bold text-primary font-poppins">₹{product.price.toFixed(0)}</span>
            </div>
            
            <div className="flex items-center bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-2 shadow-inner">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors text-primary"
              >
                <Minus size={20} />
              </button>
              <span className="w-16 text-center font-bold text-2xl">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors text-primary"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <button
              onClick={handleAddToCart}
              disabled={product.stockStatus === 'Out of Stock'}
              className="btn-primary flex-1 py-5 text-xl font-bold shadow-xl shadow-primary/20 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:scale-100"
            >
              <ShoppingCart size={24} />
              <span>Add to Cart</span>
            </button>
            <button className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center justify-center group shadow-lg">
              <Share2 size={24} className="group-hover:text-primary transition-colors" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto">
            <div className="p-4 bg-primary/5 rounded-xl flex items-center space-x-4 border border-primary/10">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <Zap size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm">Instant Delivery</h4>
                <p className="text-xs text-gray-500">Delivered within 30 min</p>
              </div>
            </div>
            <div className="p-4 bg-accent/5 rounded-xl flex items-center space-x-4 border border-accent/10">
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                <Info size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm">Product Info</h4>
                <p className="text-xs text-gray-500">Freshly sourced today</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs / Extra Sections */}
      <section className="mt-20">
        <div className="border-b border-gray-200 dark:border-gray-800 mb-10 flex space-x-12">
          <button className="text-primary font-bold border-b-2 border-primary pb-4">Description</button>
          <button className="text-gray-500 font-bold pb-4 hover:text-primary transition-colors">Reviews (120)</button>
          <button className="text-gray-500 font-bold pb-4 hover:text-primary transition-colors">Delivery Info</button>
        </div>
        <div className="prose prose-lg dark:prose-invert max-w-4xl">
          <h3 className="text-2xl font-bold mb-4">Detailed Product Information</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Our {product.name} is sourced directly from certified local organic farms. We ensure that every item meets our strict quality standards before it reaches your doorstep. This product is harvested daily to maintain its nutritional value and freshness.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
            <li className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>100% Organic & Pesticide-free</span>
            </li>
            <li className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>Sourced within 20km radius</span>
            </li>
            <li className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>Packed in eco-friendly materials</span>
            </li>
            <li className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>Freshness guarantee or money back</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailsPage;
