import React, { useState, useEffect } from 'react';
import { GlassCard } from '../components/GlassCard';
import { LayoutDashboard, ShoppingBag, Users, Ticket, LifeBuoy, TrendingUp, DollarSign, Package, AlertCircle, Plus, Edit2, Trash2, CheckCircle2, Search, Filter, ArrowUpRight, ArrowDownRight, MoreHorizontal, Sun, Moon, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { INITIAL_PRODUCTS, MOCK_ADMIN_USERS, MOCK_ADMIN_COUPONS, MOCK_ADMIN_ORDERS } from '../utils/mockData';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [tickets, setTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem('support_tickets') || '[]');
    setTickets(savedTickets);
  }, []);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { label: 'Total Revenue', value: '$12,450.00', change: '+12.5%', icon: <DollarSign className="text-primary" />, trend: 'up' },
    { label: 'Total Orders', value: '145', change: '+8.2%', icon: <ShoppingBag className="text-accent" />, trend: 'up' },
    { label: 'Total Users', value: '1,240', change: '+15.3%', icon: <Users className="text-blue-500" />, trend: 'up' },
    { label: 'Pending Support', value: tickets.filter(t => t.status === 'Open').length.toString(), change: '-2.4%', icon: <AlertCircle className="text-red-500" />, trend: 'down' },
  ];

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'products', label: 'Products', icon: <Package size={20} /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingBag size={20} /> },
    { id: 'users', label: 'Users', icon: <Users size={20} /> },
    { id: 'coupons', label: 'Coupons', icon: <Ticket size={20} /> },
    { id: 'tickets', label: 'Support Tickets', icon: <LifeBuoy size={20} /> },
  ];

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const toggleStock = (id: string) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, stockStatus: p.stockStatus === 'In Stock' ? 'Out of Stock' : 'In Stock' } : p
    ));
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-[#0A0A0A] flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-80 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col p-8 z-50">
        <div className="flex items-center space-x-3 mb-12">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl">
            <LayoutDashboard size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-poppins font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Admin Panel</h2>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Management Suite</p>
          </div>
        </div>

        <nav className="flex-grow space-y-3">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 font-bold ${activeTab === item.id ? 'bg-primary text-white shadow-2xl shadow-primary/30 scale-105' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary'}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="pt-8 mt-8 border-t border-gray-100 dark:border-gray-800 space-y-4">
          <button onClick={toggleTheme} className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
            <div className="flex items-center space-x-3 font-bold text-gray-500">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
            </div>
            <div className={`w-10 h-6 rounded-full relative transition-colors ${theme === 'dark' ? 'bg-primary' : 'bg-gray-300'}`}>
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${theme === 'dark' ? 'left-5' : 'left-1'}`} />
            </div>
          </button>
          
          <div className="flex items-center space-x-4 p-4 bg-primary/5 rounded-2xl">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black">A</div>
            <div className="flex-grow min-w-0">
              <p className="font-black text-sm truncate">{user?.name}</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Administrator</p>
            </div>
          </div>

          <button
            onClick={() => { logout(); navigate('/login'); }}
            className="w-full flex items-center space-x-4 p-4 rounded-2xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all font-bold"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-grow p-8 md:p-12 overflow-y-auto max-h-screen">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
          <div>
            <h1 className="text-5xl font-poppins font-black text-gray-800 dark:text-white mb-2 capitalize">{activeTab} Dashboard</h1>
            <p className="text-gray-500 font-medium">Welcome back, Admin! Here's what's happening today.</p>
          </div>
          
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search everything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-80 bg-white dark:bg-gray-900 border-none rounded-2xl py-4 px-12 shadow-xl focus:ring-4 focus:ring-primary/20 transition-all font-bold"
              />
            </div>
            <button className="p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-xl hover:text-primary transition-all">
              <Filter size={24} />
            </button>
            <Link to="/" className="p-4 bg-primary text-white rounded-2xl shadow-xl hover:bg-primary-dark transition-all">
              <ArrowUpRight size={24} />
            </Link>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, idx) => (
                  <GlassCard key={idx} className="p-8 group hover:scale-105 transition-transform duration-500 cursor-pointer">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center shadow-inner group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-500">
                        {stat.icon}
                      </div>
                      <div className={`flex items-center space-x-1 text-sm font-black ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {stat.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                        <span>{stat.change}</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs font-black uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                    <h3 className="text-3xl font-poppins font-black text-gray-800 dark:text-white">{stat.value}</h3>
                  </GlassCard>
                ))}
              </div>

              {/* Charts Mockup */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <GlassCard className="p-10 h-[400px] flex flex-col">
                  <div className="flex justify-between items-center mb-10">
                    <h3 className="text-2xl font-poppins font-black">Sales Analytics</h3>
                    <select className="bg-gray-50 dark:bg-gray-800 border-none rounded-xl px-4 py-2 font-bold text-xs">
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                    </select>
                  </div>
                  <div className="flex-grow flex items-end justify-between gap-2">
                    {[40, 70, 45, 90, 65, 85, 55].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="w-full bg-primary/20 hover:bg-primary rounded-t-xl transition-all cursor-pointer relative group"
                      >
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                          ${h * 10}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard className="p-10 h-[400px]">
                  <h3 className="text-2xl font-poppins font-black mb-10">Recent Orders</h3>
                  <div className="space-y-6">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-2xl transition-colors cursor-pointer group">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                            <ShoppingBag size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-sm">Order #HB-948{i}</p>
                            <p className="text-xs text-gray-400">2 mins ago • Local City</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-primary">$45.00</p>
                          <p className="text-[10px] font-black uppercase text-green-500 bg-green-500/10 px-2 py-1 rounded-full">Delivered</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          )}

          {activeTab === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-poppins font-black">Manage Products</h3>
                <button className="btn-primary py-4 px-8 flex items-center space-x-3 shadow-2xl shadow-primary/20">
                  <Plus size={24} />
                  <span>Add New Product</span>
                </button>
              </div>

              <GlassCard className="overflow-hidden border-none shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800/50">
                        <th className="p-6 text-xs font-black uppercase tracking-[0.2em] text-gray-400">Product Info</th>
                        <th className="p-6 text-xs font-black uppercase tracking-[0.2em] text-gray-400">Category</th>
                        <th className="p-6 text-xs font-black uppercase tracking-[0.2em] text-gray-400">Price</th>
                        <th className="p-6 text-xs font-black uppercase tracking-[0.2em] text-gray-400">Stock Status</th>
                        <th className="p-6 text-xs font-black uppercase tracking-[0.2em] text-gray-400">Rating</th>
                        <th className="p-6 text-xs font-black uppercase tracking-[0.2em] text-gray-400 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                          <td className="p-6">
                            <div className="flex items-center space-x-4">
                              <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-2xl p-2 border border-gray-100 dark:border-gray-600 shrink-0">
                                <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                              </div>
                              <div className="min-w-0">
                                <p className="font-black text-gray-800 dark:text-white truncate">{product.name}</p>
                                <p className="text-xs text-gray-400 truncate max-w-[200px]">{product.description}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-6">
                            <span className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20">
                              {product.category}
                            </span>
                          </td>
                          <td className="p-6 font-black text-lg text-primary">${product.price.toFixed(2)}</td>
                          <td className="p-6">
                            <button
                              onClick={() => toggleStock(product.id)}
                              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${product.stockStatus === 'In Stock' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}
                            >
                              {product.stockStatus}
                            </button>
                          </td>
                          <td className="p-6">
                            <div className="flex items-center space-x-1 text-yellow-500 font-black">
                              <Star size={14} fill="currentColor" />
                              <span>{product.rating}</span>
                            </div>
                          </td>
                          <td className="p-6">
                            <div className="flex items-center justify-center space-x-2">
                              <button className="p-3 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all">
                                <Edit2 size={18} />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                              >
                                <Trash2 size={18} />
                              </button>
                              <button className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all">
                                <MoreHorizontal size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {activeTab === 'tickets' && (
            <motion.div
              key="tickets"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-poppins font-black">Support Panel</h3>
                <div className="flex items-center space-x-4">
                  <span className="px-4 py-2 bg-red-500/10 text-red-500 rounded-full text-xs font-black uppercase tracking-widest border border-red-500/20">
                    {tickets.filter(t => t.status === 'Open').length} Active Tickets
                  </span>
                </div>
              </div>

              {tickets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {tickets.map((ticket) => (
                    <GlassCard key={ticket.id} className="p-8 group hover:border-primary/50 transition-all duration-500">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{ticket.id}</p>
                          <h4 className="text-xl font-poppins font-black text-gray-800 dark:text-white">{ticket.subject}</h4>
                        </div>
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${ticket.status === 'Open' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-green-500/10 text-green-500 border border-green-500/20'}`}>
                          {ticket.status}
                        </span>
                      </div>
                      
                      <div className="space-y-4 mb-8">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-400">
                            <Users size={18} />
                          </div>
                          <div>
                            <p className="font-bold text-sm">{ticket.name}</p>
                            <p className="text-xs text-gray-500">{ticket.email}</p>
                          </div>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl italic">
                          "{ticket.message}"
                        </p>
                      </div>

                      <div className="flex gap-4">
                        <button className="btn-primary flex-1 py-3 text-sm font-black flex items-center justify-center space-x-2">
                          <MessageSquare size={16} />
                          <span>Respond</span>
                        </button>
                        <button className="p-3 bg-green-500/10 text-green-500 rounded-xl hover:bg-green-500 hover:text-white transition-all border border-green-500/20">
                          <CheckCircle2 size={20} />
                        </button>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              ) : (
                <GlassCard className="p-20 text-center border-none shadow-2xl">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-8 shadow-xl">
                    <CheckCircle2 size={48} />
                  </div>
                  <h2 className="text-3xl font-poppins font-black mb-4">No Active Tickets</h2>
                  <p className="text-gray-500 max-w-sm mx-auto font-medium">Everything is under control! Your customers are currently happy with the service.</p>
                </GlassCard>
              )}
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-poppins font-black">Manage Orders</h3>
                <div className="flex gap-4">
                  <select className="bg-white dark:bg-gray-900 border-none rounded-xl px-4 py-2 font-bold shadow-xl">
                    <option>All Status</option>
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </div>

              <GlassCard className="overflow-hidden border-none shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800/50">
                        <th className="p-6 text-xs font-black uppercase tracking-[0.2em] text-gray-400">Order ID</th>
                        <th className="p-6 text-xs font-black uppercase tracking-[0.2em] text-gray-400">Customer</th>
                        <th className="p-6 text-xs font-black uppercase tracking-[0.2em] text-gray-400">Items</th>
                        <th className="p-6 text-xs font-black uppercase tracking-[0.2em] text-gray-400">Total</th>
                        <th className="p-6 text-xs font-black uppercase tracking-[0.2em] text-gray-400">Date</th>
                        <th className="p-6 text-xs font-black uppercase tracking-[0.2em] text-gray-400">Status</th>
                        <th className="p-6 text-xs font-black uppercase tracking-[0.2em] text-gray-400 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {MOCK_ADMIN_ORDERS.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                          <td className="p-6 font-black">{order.id}</td>
                          <td className="p-6 font-bold">{order.customer}</td>
                          <td className="p-6 font-medium">{order.items} items</td>
                          <td className="p-6 font-black text-primary">${order.total.toFixed(2)}</td>
                          <td className="p-6 text-gray-500 font-medium">{order.date}</td>
                          <td className="p-6">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                              order.status === 'Processing' ? 'bg-blue-100 text-blue-600' :
                              order.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
                              'bg-red-100 text-red-600'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="p-6">
                            <div className="flex items-center justify-center space-x-2">
                              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                                <Edit2 size={16} />
                              </button>
                              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                                <MoreHorizontal size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {activeTab === 'users' && (
            <motion.div
              key="users"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-poppins font-black">User Management</h3>
              </div>

              <GlassCard className="overflow-hidden border-none shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800/50">
                        <th className="p-6 text-xs font-black uppercase tracking-[0.2em] text-gray-400">User</th>
                        <th className="p-6 text-xs font-black uppercase tracking-[0.2em] text-gray-400">Role</th>
                        <th className="p-6 text-xs font-black uppercase tracking-[0.2em] text-gray-400">Orders</th>
                        <th className="p-6 text-xs font-black uppercase tracking-[0.2em] text-gray-400">Spent</th>
                        <th className="p-6 text-xs font-black uppercase tracking-[0.2em] text-gray-400">Status</th>
                        <th className="p-6 text-xs font-black uppercase tracking-[0.2em] text-gray-400 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {MOCK_ADMIN_USERS.map((u) => (
                        <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                          <td className="p-6">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black uppercase">
                                {u.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-black">{u.name}</p>
                                <p className="text-xs text-gray-400">{u.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-6">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${u.role === 'Admin' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'}`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="p-6 font-bold">{u.orders}</td>
                          <td className="p-6 font-black text-primary">${u.spent.toFixed(2)}</td>
                          <td className="p-6">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${u.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                              {u.status}
                            </span>
                          </td>
                          <td className="p-6">
                            <div className="flex items-center justify-center space-x-2">
                              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                                <AlertCircle size={16} />
                              </button>
                              <button className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {activeTab === 'coupons' && (
            <motion.div
              key="coupons"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-poppins font-black">Coupons & Offers</h3>
                <button className="btn-primary py-3 px-6 flex items-center space-x-2 shadow-xl">
                  <Plus size={20} />
                  <span>Create Coupon</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {MOCK_ADMIN_COUPONS.map((coupon) => (
                  <GlassCard key={coupon.id} className="p-6 border-2 border-dashed border-gray-200 dark:border-gray-800 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${coupon.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {coupon.status}
                      </span>
                    </div>
                    <div className="mb-6">
                      <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">{coupon.type}</p>
                      <h4 className="text-3xl font-poppins font-black text-primary">{coupon.code}</h4>
                    </div>
                    <div className="space-y-3 mb-8">
                      <div className="flex justify-between text-sm font-bold">
                        <span className="text-gray-400">Discount</span>
                        <span className="text-green-500">{coupon.discount} OFF</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold">
                        <span className="text-gray-400">Usage</span>
                        <span>{coupon.usage}</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold">
                        <span className="text-gray-400">Expires</span>
                        <span className="text-red-400">{coupon.expiry}</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="flex-1 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                        Edit
                      </button>
                      <button className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;
