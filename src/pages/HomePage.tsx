import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, INITIAL_PRODUCTS } from '../utils/mockData';
import { ProductCard } from '../components/ProductCard';
import { GlassCard } from '../components/GlassCard';
import { MapPin, Search, ArrowRight, ShieldCheck, Zap, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&q=80"
            alt="Hero background"
            className="w-full h-full object-cover opacity-20 dark:opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background-light via-background-light/80 to-transparent dark:from-background-dark dark:via-background-dark/80" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div
            className="max-w-2xl"
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 border border-primary/20">
              <MapPin size={16} />
              <span className="text-sm font-semibold uppercase tracking-wider">Delivering within 10-15km radius</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-poppins font-bold leading-tight mb-6">
              Freshness Delivered <br />
              <span className="text-primary">To Your Doorstep</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
              Get premium quality groceries from local farms and markets. Fast, reliable, and always fresh.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/products" className="btn-primary py-4 px-8 text-lg flex items-center justify-center space-x-2 group">
                <span>Shop Now</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/categories" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 py-4 px-8 rounded-xl text-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center">
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Features */}
      <section className="container mx-auto px-4 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-6 flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <Zap size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Fast Delivery</h3>
              <p className="text-sm text-gray-500">Within 30-60 minutes</p>
            </div>
          </GlassCard>
          <GlassCard className="p-6 flex items-center space-x-4">
            <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Quality Assured</h3>
              <p className="text-sm text-gray-500">100% fresh products</p>
            </div>
          </GlassCard>
          <GlassCard className="p-6 flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500">
              <Heart size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Locally Sourced</h3>
              <p className="text-sm text-gray-500">Support local farmers</p>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-poppins font-bold mb-2">Shop by Category</h2>
            <p className="text-gray-500">Find everything you need in one place</p>
          </div>
          <Link to="/categories" className="text-primary font-bold hover:underline flex items-center space-x-1">
            <span>View All</span>
            <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {CATEGORIES.map((category) => (
            <Link key={category.id} to={`/products?category=${category.name}`}>
              <GlassCard className="p-6 text-center hover:bg-primary hover:text-white group transition-all duration-300">
                <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="font-bold font-poppins">{category.name}</h3>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-poppins font-bold mb-2">Featured Products</h2>
            <p className="text-gray-500">Handpicked fresh items for you</p>
          </div>
          <Link to="/products" className="text-primary font-bold hover:underline flex items-center space-x-1">
            <span>Shop All</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
          {INITIAL_PRODUCTS.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Delivery Radius Banner */}
      <section className="container mx-auto px-4 py-20">
        <GlassCard className="p-12 overflow-hidden relative bg-primary/90 text-white border-none">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
            <div className="mb-8 md:mb-0 max-w-xl">
              <h2 className="text-4xl font-poppins font-bold mb-4">Are we in your area?</h2>
              <p className="text-lg opacity-90 mb-6">
                We currently deliver fresh groceries within a 10-15 km radius of our central hub. Check your location to see if you qualify for fast delivery!
              </p>
              <div className="flex bg-white/20 p-2 rounded-2xl backdrop-blur-sm max-w-md mx-auto md:mx-0">
                <input
                  type="text"
                  placeholder="Enter your zip code"
                  className="bg-transparent border-none focus:ring-0 placeholder:text-white/60 flex-1 px-4 text-white"
                />
                <button className="bg-white text-primary font-bold px-6 py-3 rounded-xl hover:bg-opacity-90 transition-all">
                  Check Now
                </button>
              </div>
            </div>
            <div className="w-64 h-64 bg-white/10 rounded-full flex items-center justify-center blur-2xl absolute -right-20 -bottom-20" />
            <MapPin size={180} className="text-white/10 absolute -right-10 -bottom-10 rotate-12" />
          </div>
        </GlassCard>
      </section>
    </div>
  );
};

export default HomePage;
