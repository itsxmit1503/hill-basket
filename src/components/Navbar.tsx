import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Sun, Moon, Search, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const { itemCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-white/20 dark:border-white/10">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
            <ShoppingCart size={24} />
          </div>
          <span className="text-2xl font-poppins font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Hill Basket
          </span>
        </Link>

        {/* Desktop Search */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8 relative">
          <input
            type="text"
            placeholder="Search fresh groceries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-full py-2.5 px-12 focus:ring-2 focus:ring-primary/50 transition-all text-sm"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </form>

        <div className="hidden md:flex items-center space-x-6">
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
          </button>

          <Link to="/cart" className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
            <ShoppingCart size={22} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md animate-bounce">
                {itemCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center space-x-4">
              <Link to={isAdmin ? "/admin" : "/account"} className="flex items-center space-x-2 p-1 pl-1 pr-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors border border-gray-200 dark:border-gray-700">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <User size={18} />
                </div>
                <span className="text-sm font-medium">{user.name}</span>
              </Link>
              <button
                onClick={logout}
                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-primary text-sm flex items-center space-x-2">
              <User size={18} />
              <span>Sign In</span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <Link to="/cart" className="relative p-2">
            <ShoppingCart size={22} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {itemCount}
              </span>
            )}
          </Link>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-black border-t border-gray-100 dark:border-gray-800 overflow-hidden"
          >
            <div className="p-4 space-y-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-xl py-2 px-10"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </form>
              
              <div className="grid grid-cols-2 gap-4">
                <Link to="/categories" className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl text-center">
                  <span className="block font-medium">Categories</span>
                </Link>
                <Link to="/products" className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl text-center">
                  <span className="block font-medium">Shop All</span>
                </Link>
              </div>

              <div className="flex items-center justify-between p-2 border-t border-gray-100 dark:border-gray-800 pt-4">
                <button onClick={toggleTheme} className="flex items-center space-x-2">
                  {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                  <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                </button>
                {user ? (
                  <button onClick={logout} className="flex items-center space-x-2 text-red-500">
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                ) : (
                  <Link to="/login" className="text-primary font-medium">Sign In</Link>
                )}
              </div>
              
              {user && (
                <Link
                  to={isAdmin ? "/admin" : "/account"}
                  className="flex items-center space-x-3 p-4 bg-primary/10 rounded-xl text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {isAdmin ? <LayoutDashboard size={20} /> : <User size={20} />}
                  <span className="font-medium">{isAdmin ? 'Admin Dashboard' : 'My Account'}</span>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
