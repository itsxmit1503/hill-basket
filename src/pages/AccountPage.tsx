import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { GlassCard } from '../components/GlassCard';
import { User, MapPin, Settings, Bell, Star, Shield, HelpCircle, LogOut, ChevronRight, Moon, Sun, Globe, Heart, FileText, Award, Plus, Trash2, Edit2, ShoppingBag, Clock, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_ADDRESSES, MOCK_ORDERS, MOCK_NOTIFICATIONS, MOCK_REVIEWS, INITIAL_PRODUCTS } from '../utils/mockData';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const AccountPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { wishlist, removeFromWishlist, addToCart } = useCart();
  const [activeTab, setActiveTab] = useState('profile');

  const menuItems = [
    { id: 'profile', label: 'Edit Profile', icon: <User size={20} /> },
    { id: 'addresses', label: 'Addresses', icon: <MapPin size={20} /> },
    { id: 'orders', label: 'Order History', icon: <FileText size={20} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
    { id: 'reviews', label: 'My Reviews', icon: <Star size={20} /> },
    { id: 'wishlist', label: 'Wishlist', icon: <Heart size={20} /> },
    { id: 'settings', label: 'Language Settings', icon: <Globe size={20} /> },
    { id: 'privacy', label: 'Terms & Policies', icon: <Shield size={20} /> },
    { id: 'licenses', label: 'Licenses', icon: <Award size={20} /> },
    { id: 'help', label: 'Help Center', icon: <HelpCircle size={20} /> },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Sidebar */}
          <aside className="w-full md:w-80 shrink-0">
            <GlassCard className="p-8 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16" />
              
              <div className="flex flex-col items-center mb-10 relative z-10">
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-4 border-4 border-white dark:border-gray-800 shadow-xl">
                  <User size={48} />
                </div>
                <h2 className="text-2xl font-poppins font-bold text-gray-800 dark:text-white">{user?.name}</h2>
                <p className="text-gray-500 text-sm font-medium">{user?.email}</p>
                <div className="mt-4 px-4 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest">
                  Gold Member
                </div>
              </div>

              <nav className="space-y-2 relative z-10">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${activeTab === item.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
                  >
                    <div className="flex items-center space-x-3">
                      {item.icon}
                      <span className="font-bold text-sm">{item.label}</span>
                    </div>
                    <ChevronRight size={16} className={activeTab === item.id ? 'opacity-100' : 'opacity-30'} />
                  </button>
                ))}
                
                <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800">
                  <button
                    onClick={toggleTheme}
                    className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all"
                  >
                    <div className="flex items-center space-x-3 font-bold text-sm">
                      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                      <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                    </div>
                    <div className={`w-10 h-6 rounded-full relative transition-colors ${theme === 'dark' ? 'bg-primary' : 'bg-gray-300'}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${theme === 'dark' ? 'left-5' : 'left-1'}`} />
                    </div>
                  </button>
                  
                  <button
                    onClick={logout}
                    className="w-full flex items-center space-x-3 p-4 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all mt-2 font-bold text-sm"
                  >
                    <LogOut size={20} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </nav>
            </GlassCard>
          </aside>

          {/* Main Content Area */}
          <main className="flex-grow">
            <GlassCard className="p-10 h-full min-h-[600px]">
              <h1 className="text-3xl font-poppins font-black mb-10 text-gray-800 dark:text-white capitalize">
                {activeTab.replace('-', ' ')}
              </h1>

              {activeTab === 'profile' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                      <input type="text" defaultValue={user?.name} className="input-field py-4 font-bold" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                      <input type="email" defaultValue={user?.email} className="input-field py-4 font-bold" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                      <input type="tel" placeholder="+1 (234) 567-890" className="input-field py-4 font-bold" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Birthday</label>
                      <input type="date" className="input-field py-4 font-bold" />
                    </div>
                  </div>
                  <div className="pt-10 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                    <button className="btn-primary px-12 py-4 text-lg font-bold">Save Changes</button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'addresses' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Your Saved Addresses</h3>
                    <button className="flex items-center space-x-2 text-primary font-bold hover:underline">
                      <Plus size={18} />
                      <span>Add New Address</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {MOCK_ADDRESSES.map((addr) => (
                      <GlassCard key={addr.id} className={`p-6 border-2 transition-all ${addr.isDefault ? 'border-primary' : 'border-transparent'}`}>
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center space-x-2">
                            <MapPin size={18} className="text-primary" />
                            <span className="font-bold text-lg">{addr.type}</span>
                            {addr.isDefault && (
                              <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">Default</span>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-primary">
                              <Edit2 size={16} />
                            </button>
                            <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-gray-400 hover:text-red-500">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 font-medium">
                          {addr.street}<br />
                          {addr.city}, {addr.state} {addr.zip}
                        </p>
                      </GlassCard>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  {MOCK_ORDERS.map((order) => (
                    <GlassCard key={order.id} className="p-6">
                      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                            <ShoppingBag size={24} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Order ID</p>
                            <p className="text-lg font-black">{order.id}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-8">
                          <div>
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Date</p>
                            <p className="font-bold">{new Date(order.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Total</p>
                            <p className="font-black text-primary">${order.total.toFixed(2)}</p>
                          </div>
                          <div>
                            <span className="px-4 py-2 bg-green-500/10 text-green-500 rounded-full text-xs font-black uppercase tracking-widest flex items-center space-x-1">
                              <CheckCircle2 size={12} />
                              <span>{order.status}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center text-xs font-bold">
                                {item.quantity}x
                              </div>
                              <span className="font-bold">{item.name}</span>
                            </div>
                            <span className="font-bold text-gray-500">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-8 flex justify-end">
                        <button className="text-primary font-bold hover:underline">Download Invoice</button>
                      </div>
                    </GlassCard>
                  ))}
                </motion.div>
              )}

              {activeTab === 'notifications' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  {MOCK_NOTIFICATIONS.map((notif) => (
                    <div key={notif.id} className={`p-6 rounded-2xl flex items-start space-x-4 transition-all ${notif.read ? 'bg-transparent' : 'bg-primary/5 border border-primary/10'}`}>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${notif.type === 'order' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                        {notif.type === 'order' ? <ShoppingBag size={20} /> : <Award size={20} />}
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-lg">{notif.title}</h4>
                          <span className="text-xs font-bold text-gray-400 flex items-center space-x-1">
                            <Clock size={12} />
                            <span>{notif.time}</span>
                          </span>
                        </div>
                        <p className="text-gray-500 font-medium">{notif.message}</p>
                        {!notif.read && (
                          <button className="text-xs text-primary font-black uppercase tracking-widest mt-2 hover:underline">Mark as read</button>
                        )}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  {MOCK_REVIEWS.map((review) => (
                    <GlassCard key={review.id} className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-xl font-bold mb-1">{review.productName}</h4>
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm font-bold text-gray-400">{review.date}</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed italic">
                        "{review.comment}"
                      </p>
                      <div className="mt-4 flex space-x-4">
                        <button className="text-sm text-primary font-bold hover:underline">Edit Review</button>
                        <button className="text-sm text-red-500 font-bold hover:underline">Delete</button>
                      </div>
                    </GlassCard>
                  ))}
                </motion.div>
              )}

              {activeTab === 'wishlist' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  {wishlist.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[400px] text-center">
                      <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-3xl flex items-center justify-center text-gray-300 mb-6">
                        <Heart size={40} />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Your Wishlist is Empty</h3>
                      <p className="text-gray-500 max-w-sm mb-8">Save your favorite items to find them easily later.</p>
                      <Link to="/products" className="btn-primary px-8 py-3 font-bold">Start Shopping</Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {wishlist.map((item) => (
                        <GlassCard key={item.id} className="p-4 flex items-center space-x-4">
                          <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
                          <div className="flex-grow">
                            <h4 className="font-bold text-lg mb-1">{item.name}</h4>
                            <p className="text-primary font-black mb-3">${item.price.toFixed(2)}</p>
                            <div className="flex space-x-3">
                              <button 
                                onClick={() => addToCart(item)}
                                className="text-xs bg-primary text-white px-4 py-2 rounded-lg font-bold hover:opacity-90 transition-opacity"
                              >
                                Add to Cart
                              </button>
                              <button 
                                onClick={() => removeFromWishlist(item.id)}
                                className="text-xs bg-red-50 text-red-500 px-4 py-2 rounded-lg font-bold hover:bg-red-100 transition-colors"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </GlassCard>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center space-x-2">
                      <Globe size={20} className="text-primary" />
                      <span>Language Preference</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['English (US)', 'English (UK)', 'Spanish', 'French', 'German', 'Chinese'].map((lang) => (
                        <button key={lang} className={`p-4 rounded-xl border-2 font-bold transition-all ${lang === 'English (US)' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 dark:border-gray-800 hover:border-primary/30'}`}>
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4 pt-10 border-t border-gray-100 dark:border-gray-800">
                    <h3 className="text-xl font-bold flex items-center space-x-2">
                      <Bell size={20} className="text-primary" />
                      <span>Email Notifications</span>
                    </h3>
                    <div className="space-y-4">
                      {[
                        { label: 'Order Updates', desc: 'Get notified about your order status and delivery.' },
                        { label: 'Promotions', desc: 'Receive emails about sales, coupons, and special offers.' },
                        { label: 'Newsletter', desc: 'Weekly digest of new products and healthy living tips.' }
                      ].map((item) => (
                        <div key={item.label} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                          <div>
                            <p className="font-bold">{item.label}</p>
                            <p className="text-xs text-gray-500 font-medium">{item.desc}</p>
                          </div>
                          <div className="w-12 h-6 bg-primary rounded-full relative">
                            <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'privacy' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                  <div className="prose dark:prose-invert max-w-none">
                    <div className="space-y-6">
                      <section>
                        <h3 className="text-2xl font-black mb-4">Terms of Service</h3>
                        <p className="text-gray-500 font-medium leading-relaxed">
                          Welcome to Hill Basket. By using our services, you agree to comply with and be bound by the following terms and conditions. Please review them carefully.
                        </p>
                      </section>
                      <section>
                        <h4 className="text-xl font-bold mb-3">1. Use of Service</h4>
                        <p className="text-gray-500 font-medium leading-relaxed">
                          You must be at least 18 years old or visiting under the supervision of a parent or guardian. We grant you a limited, revocable, non-transferable license to use this site for personal shopping only.
                        </p>
                      </section>
                      <section>
                        <h4 className="text-xl font-bold mb-3">2. Privacy Policy</h4>
                        <p className="text-gray-500 font-medium leading-relaxed">
                          Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information when you use our website.
                        </p>
                      </section>
                      <section>
                        <h4 className="text-xl font-bold mb-3">3. Returns & Refunds</h4>
                        <p className="text-gray-500 font-medium leading-relaxed">
                          If you are not satisfied with your purchase, you may return it within 24 hours for perishable items and 7 days for non-perishable items.
                        </p>
                      </section>
                    </div>
                    <div className="mt-10 p-6 bg-primary/5 rounded-2xl border border-primary/10">
                      <p className="text-sm text-gray-500 font-medium italic text-center">
                        Last updated: March 2024. For the full legal documents, please contact our support team.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'licenses' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                  <div className="flex flex-col items-center text-center mb-10">
                    <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-6">
                      <Award size={40} />
                    </div>
                    <h3 className="text-2xl font-black">Open Source Licenses</h3>
                    <p className="text-gray-500 font-medium max-w-md mt-2">
                      Hill Basket is built with love using amazing open source technologies.
                    </p>
                  </div>
                  <div className="space-y-4">
                    {[
                      { name: 'React', version: '18.2.0', license: 'MIT' },
                      { name: 'Tailwind CSS', version: '3.3.0', license: 'MIT' },
                      { name: 'Lucide React', version: '0.284.0', license: 'ISC' },
                      { name: 'Framer Motion', version: '10.16.4', license: 'MIT' },
                      { name: 'Vite', version: '4.4.5', license: 'MIT' }
                    ].map((lib) => (
                      <div key={lib.name} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
                        <div>
                          <p className="font-bold">{lib.name}</p>
                          <p className="text-xs text-gray-400 font-medium">v{lib.version}</p>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full">
                          {lib.license}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'help' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center h-[400px] text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-6">
                    <HelpCircle size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Need Assistance?</h3>
                  <p className="text-gray-500 max-w-sm mb-8">Our support team is here to help you with any questions or issues.</p>
                  <Link to="/help" className="btn-primary px-10 py-4 font-bold flex items-center space-x-2">
                    <span>Go to Help Center</span>
                    <ChevronRight size={18} />
                  </Link>
                </motion.div>
              )}
            </GlassCard>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
