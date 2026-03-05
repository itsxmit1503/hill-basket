import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, INITIAL_PRODUCTS } from '../utils/mockData';
import { GlassCard } from '../components/GlassCard';
import { ArrowRight, ShoppingBag, LayoutGrid, Search, ChevronRight, Zap, ShieldCheck, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const CategoriesPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 border border-primary/20">
            <LayoutGrid size={16} />
            <span className="text-sm font-semibold uppercase tracking-wider">Browse Our Categories</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-poppins font-black leading-tight mb-6">
            Everything Fresh <br />
            <span className="text-primary">In One Place</span>
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">
            Explore our curated selection of fresh local produce, dairy, bakery items and more. 
            All sourced from certified local farms within a 20km radius.
          </p>
        </div>
        
        <div className="flex bg-white dark:bg-gray-800 p-3 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-2xl w-full md:w-auto min-w-[300px]">
          <div className="p-3 text-gray-400">
            <Search size={24} />
          </div>
          <input
            type="text"
            placeholder="Search categories..."
            className="bg-transparent border-none focus:ring-0 flex-1 px-2 font-bold text-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {CATEGORIES.map((category, index) => {
          const productCount = INITIAL_PRODUCTS.filter(p => p.category === category.name).length;
          
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={`/products?category=${category.name}`} className="block group">
                <GlassCard className="p-10 relative overflow-hidden h-[300px] flex flex-col justify-between group-hover:border-primary/50 group-hover:shadow-2xl group-hover:shadow-primary/10 transition-all duration-500">
                  <div className={`absolute -right-10 -top-10 w-48 h-48 ${category.color.split(' ')[0]} rounded-full opacity-10 group-hover:scale-150 transition-transform duration-700 blur-3xl`} />
                  
                  <div className="relative z-10">
                    <div className={`w-20 h-20 ${category.color} rounded-3xl flex items-center justify-center text-4xl mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl shadow-black/5`}>
                      {category.icon}
                    </div>
                    <h3 className="text-3xl font-poppins font-black mb-3 group-hover:text-primary transition-colors">{category.name}</h3>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs flex items-center">
                      <ShoppingBag size={14} className="mr-2" />
                      {productCount} Products Available
                    </p>
                  </div>

                  <div className="relative z-10 flex items-center text-primary font-black text-lg group-hover:translate-x-2 transition-transform duration-300">
                    <span>Shop Category</span>
                    <ChevronRight size={24} className="ml-2" />
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Why Shop With Us Section */}
      <section className="mt-32">
        <GlassCard className="p-12 md:p-20 overflow-hidden relative border-none bg-gradient-to-br from-gray-900 to-black text-white">
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[120%] bg-primary rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[120%] bg-accent rounded-full blur-[120px]" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-poppins font-black mb-8 leading-tight">
                Freshness That <br />
                <span className="text-primary">Matters To You</span>
              </h2>
              <div className="space-y-8">
                <div className="flex items-start space-x-6 group">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-xl">
                    <Zap size={32} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold mb-2">Hyper-Local Delivery</h4>
                    <p className="text-gray-400 text-lg">Delivered within 10-15km to ensure maximum freshness and zero quality loss.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6 group">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-accent group-hover:scale-110 transition-transform shadow-xl">
                    <ShieldCheck size={32} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold mb-2">Certified Quality</h4>
                    <p className="text-gray-400 text-lg">Every item is handpicked and quality-checked by our experts before delivery.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6 group">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform shadow-xl">
                    <Heart size={32} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold mb-2">Support Local</h4>
                    <p className="text-gray-400 text-lg">Every purchase supports local farmers and helps build a sustainable food chain.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="w-[300px] h-[400px] md:w-[400px] md:h-[550px] bg-primary/20 rounded-[40px] border border-white/10 relative overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80"
                  alt="Fresh produce"
                  className="w-full h-full object-cover opacity-60 hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20">
                  <p className="text-2xl font-poppins font-black mb-2 italic">"The freshest items I've ever ordered online!"</p>
                  <p className="text-primary font-bold uppercase tracking-widest text-sm">— Sarah Johnson</p>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
};

export default CategoriesPage;
