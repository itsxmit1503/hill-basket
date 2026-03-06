import React, { useState, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { INITIAL_PRODUCTS, CATEGORIES } from '../utils/mockData';
import { ProductCard } from '../components/ProductCard';
import { Search, Filter, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';

const ProductListingPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  
  const categoryFilter = searchParams.get('category') || 'All';
  const searchQuery = searchParams.get('search') || '';

  const filteredProducts = useMemo(() => {
    let result = [...INITIAL_PRODUCTS];

    if (categoryFilter !== 'All') {
      result = result.filter(p => p.category === categoryFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [categoryFilter, searchQuery, sortBy]);

  const setCategory = (category: string) => {
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setSearchParams({});
    setSortBy('featured');
  };

  return (
    <div className="container mx-auto px-4 py-12 flex-grow">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-poppins font-bold mb-2">
            {categoryFilter !== 'All' ? `${categoryFilter} Products` : 'All Products'}
          </h1>
          <p className="text-gray-500">Showing {filteredProducts.length} results</p>
        </div>

        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-6 py-3 pr-12 font-medium focus:ring-2 focus:ring-primary/50 outline-none w-full"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Best Rated</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" size={18} />
          </div>

          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:hidden bg-primary text-white p-3 rounded-xl shadow-lg"
          >
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar Filters - Desktop */}
        <aside className="hidden lg:block w-72 shrink-0 space-y-8">
          <GlassCard className="p-8 sticky top-32">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold font-poppins">Filters</h3>
              {(categoryFilter !== 'All' || searchQuery) && (
                <button onClick={clearFilters} className="text-xs text-primary font-bold hover:underline">Clear All</button>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-4 flex items-center">
                  <SlidersHorizontal size={16} className="mr-2" />
                  Categories
                </h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setCategory('All')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex justify-between items-center ${categoryFilter === 'All' ? 'bg-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                  >
                    <span>All Products</span>
                    <span className="text-xs opacity-60">{INITIAL_PRODUCTS.length}</span>
                  </button>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.name)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex justify-between items-center ${categoryFilter === cat.name ? 'bg-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs opacity-60">
                        {INITIAL_PRODUCTS.filter(p => p.category === cat.name).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              
              {searchQuery && (
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                  <h4 className="font-semibold mb-4">Search results for:</h4>
                  <div className="inline-flex items-center bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium">
                    "{searchQuery}"
                    <button onClick={() => {
                      searchParams.delete('search');
                      setSearchParams(searchParams);
                    }} className="ml-2 hover:text-primary-dark">
                      <X size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </GlassCard>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <GlassCard className="p-16 text-center">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                <Search size={40} />
              </div>
              <h2 className="text-2xl font-bold mb-2">No products found</h2>
              <p className="text-gray-500 mb-8">Try adjusting your filters or search query to find what you're looking for.</p>
              <button onClick={clearFilters} className="btn-primary">Clear all filters</button>
            </GlassCard>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white dark:bg-gray-900 z-[70] shadow-2xl p-8"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold">Filters</h3>
                <button onClick={() => setIsFilterOpen(false)} className="p-2">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className="font-bold mb-4">Categories</h4>
                  <div className="grid grid-cols-1 gap-2">
                    <button
                      onClick={() => { setCategory('All'); setIsFilterOpen(false); }}
                      className={`text-left px-4 py-3 rounded-xl ${categoryFilter === 'All' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
                    >
                      All Products
                    </button>
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => { setCategory(cat.name); setIsFilterOpen(false); }}
                        className={`text-left px-4 py-3 rounded-xl ${categoryFilter === cat.name ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute bottom-8 left-8 right-8">
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="btn-primary w-full py-4"
                >
                  Show Results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductListingPage;
