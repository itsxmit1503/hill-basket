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
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {product.stockStatus === 'Out of Stock' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold bg-red-500 px-3 py-1 rounded-full text-sm">Out of Stock</span>
          </div>
        )}
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <span className="text-xs text-primary font-medium uppercase tracking-wider">{product.category}</span>
          <div className="flex items-center text-yellow-500">
            <Star size={14} fill="currentColor" />
            <span className="text-xs ml-1 font-semibold">{product.rating}</span>
          </div>
        </div>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-poppins font-semibold group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => addToCart(product)}
            disabled={product.stockStatus === 'Out of Stock'}
            className="bg-primary hover:bg-accent text-white p-2 rounded-lg shadow-md transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            aria-label="Add to cart"
          >
            <ShoppingCart size={20} />
          </motion.button>
        </div>
      </div>
    </GlassCard>
  );
};
