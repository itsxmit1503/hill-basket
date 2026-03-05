import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin, ShoppingCart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-black/40 border-t border-white/20 dark:border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg">
                <ShoppingCart size={24} />
              </div>
              <span className="text-2xl font-poppins font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Hill Basket
              </span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 max-w-xs">
              Fast, fresh, and reliable grocery delivery within 10-15 km radius. Quality products delivered to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-primary"><Facebook size={20} /></a>
              <a href="#" className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-primary"><Twitter size={20} /></a>
              <a href="#" className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-primary"><Instagram size={20} /></a>
              <a href="#" className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-primary"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-bold font-poppins mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-500 dark:text-gray-400">
              <li><Link to="/products" className="hover:text-primary transition-colors">Shop All</Link></li>
              <li><Link to="/categories" className="hover:text-primary transition-colors">Categories</Link></li>
              <li><Link to="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-bold font-poppins mb-6">Categories</h4>
            <ul className="space-y-4 text-gray-500 dark:text-gray-400">
              <li><Link to="/products?category=Fruits" className="hover:text-primary transition-colors">Fresh Fruits</Link></li>
              <li><Link to="/products?category=Vegetables" className="hover:text-primary transition-colors">Vegetables</Link></li>
              <li><Link to="/products?category=Dairy" className="hover:text-primary transition-colors">Dairy & Eggs</Link></li>
              <li><Link to="/products?category=Bakery" className="hover:text-primary transition-colors">Bakery</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold font-poppins mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400">
                <Phone className="text-primary" size={20} />
                <span>+1 (234) 567-890</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400">
                <Mail className="text-primary" size={20} />
                <span>support@hillbasket.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400">
                <MapPin className="text-primary" size={20} />
                <span>123 Market St, Local City, 12345</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© 2026 Hill Basket. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
