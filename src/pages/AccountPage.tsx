import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { GlassCard } from '../components/GlassCard';
import { User, MapPin, Settings, Bell, Star, Shield, HelpCircle, LogOut, ChevronRight, Moon, Sun, Globe, Heart, FileText, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const AccountPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
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
                <div className="space-y-8">
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
                </div>
              )}

              {activeTab !== 'profile' && (
                <div className="flex flex-col items-center justify-center h-[400px] text-center">
                  <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-3xl flex items-center justify-center text-gray-300 mb-6">
                    <Settings size={40} className="animate-spin-slow" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Section Under Development</h3>
                  <p className="text-gray-500 max-w-sm">We're working hard to bring you the best experience. Check back soon!</p>
                </div>
              )}
            </GlassCard>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
