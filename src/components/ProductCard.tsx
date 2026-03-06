import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product, useCart } from '../context/CartContext';
import { GlassCard } from './GlassCard';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <GlassCard className="overflow-hidden flex flex-col h-full group">
      <Link to={`/product/${product.id}`} className="block relative aspect-video overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {product.stockStatus === 'Out of Stock' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold bg-red-500 px-2 py-0.5 rounded-full text-[10px]">Out of Stock</span>
          </div>
        )}
      </Link>
      
      <div className="p-3 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <span className="text-[10px] text-primary font-bold uppercase tracking-wider">{product.category}</span>
          <div className="flex items-center text-yellow-500">
            <Star size={12} fill="currentColor" />
            <span className="text-[10px] ml-1 font-black">{product.rating}</span>
          </div>
        </div>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-poppins font-black group-hover:text-primary transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-black text-primary">₹{product.price.toFixed(0)}</span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => addToCart(product)}
            disabled={product.stockStatus === 'Out of Stock'}
            className="bg-primary hover:bg-accent text-white p-2 rounded-xl shadow-lg transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
            aria-label="Add to cart"
          >
            <ShoppingCart size={16} />
          </motion.button>
        </div>
      </div>
    </GlassCard>
  );
};
