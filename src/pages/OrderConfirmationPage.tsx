import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { GlassCard } from '../components/GlassCard';
import { CheckCircle2, ShoppingBag, Truck, Calendar, MapPin, Mail, ChevronRight, Share2, Printer, Download, Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const OrderConfirmationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state as { orderId: string, total: string } | null;

  useEffect(() => {
    if (!orderData) {
      navigate('/');
    }
  }, [orderData, navigate]);

  if (!orderData) return null;

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <GlassCard className="p-12 text-center shadow-2xl bg-white/70 dark:bg-black/70 backdrop-blur-3xl border-white/40 dark:border-white/20 relative overflow-hidden">
          {/* Animated Background Confetti Mockup */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <motion.div
              animate={{
                y: [0, 1000],
                opacity: [1, 0],
                rotate: [0, 360]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute top-[-50px] left-[10%] w-4 h-4 bg-primary rounded-full opacity-30"
            />
            <motion.div
              animate={{
                y: [0, 1000],
                opacity: [1, 0],
                rotate: [0, 360]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
              className="absolute top-[-50px] left-[30%] w-6 h-6 bg-accent rounded-lg opacity-30"
            />
            <motion.div
              animate={{
                y: [0, 1000],
                opacity: [1, 0],
                rotate: [0, 360]
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
              className="absolute top-[-50px] left-[50%] w-4 h-4 bg-yellow-400 rounded-full opacity-30"
            />
            <motion.div
              animate={{
                y: [0, 1000],
                opacity: [1, 0],
                rotate: [0, 360]
              }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "linear", delay: 1.5 }}
              className="absolute top-[-50px] left-[70%] w-5 h-5 bg-primary-dark rounded-full opacity-30"
            />
            <motion.div
              animate={{
                y: [0, 1000],
                opacity: [1, 0],
                rotate: [0, 360]
              }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "linear", delay: 2 }}
              className="absolute top-[-50px] left-[90%] w-4 h-4 bg-accent-dark rounded-lg opacity-30"
            />
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
              className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center text-primary mx-auto mb-10 border-4 border-primary/10 shadow-xl"
            >
              <CheckCircle2 size={72} strokeWidth={2.5} />
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-poppins font-black text-gray-800 dark:text-white mb-4 leading-tight">
              Order Confirmed!
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-lg mx-auto font-medium">
              Thank you for choosing Hill Basket. Your fresh groceries are being packed and will arrive shortly!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="p-8 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-gray-100 dark:border-gray-800 text-left hover:border-primary/30 transition-all duration-300">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Order Details</p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">Order Number</span>
                    <span className="font-black text-lg text-primary">{orderData.orderId}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">Total Paid</span>
                    <span className="font-black text-lg text-primary">${orderData.total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">Order Status</span>
                    <span className="px-4 py-1.5 bg-yellow-500/10 text-yellow-500 rounded-full text-xs font-black uppercase tracking-widest">Processing</span>
                  </div>
                </div>
              </div>
              
              <div className="p-8 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-gray-100 dark:border-gray-800 text-left hover:border-accent/30 transition-all duration-300">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Delivery Info</p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                      <Truck size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-sm">Estimated Delivery</p>
                      <p className="text-xs text-gray-500">Today, 30-45 minutes</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-sm">Track Order</p>
                      <p className="text-xs text-gray-500">Real-time tracking enabled</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/products" className="btn-primary py-5 px-12 text-xl font-bold flex items-center justify-center space-x-3 group w-full sm:w-auto shadow-2xl shadow-primary/30">
                <span>Continue Shopping</span>
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center justify-center group shadow-lg w-full sm:w-auto">
                <Share2 size={24} className="group-hover:text-primary transition-colors" />
                <span className="ml-3 font-bold text-lg">Share</span>
              </button>
            </div>
            
            <div className="mt-12 flex flex-wrap justify-center gap-6 opacity-60">
              <button className="flex items-center space-x-2 text-sm font-bold hover:text-primary transition-colors">
                <Printer size={16} />
                <span>Print Invoice</span>
              </button>
              <button className="flex items-center space-x-2 text-sm font-bold hover:text-primary transition-colors">
                <Download size={16} />
                <span>Download PDF</span>
              </button>
              <button className="flex items-center space-x-2 text-sm font-bold hover:text-primary transition-colors">
                <Mail size={16} />
                <span>Email Receipt</span>
              </button>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default OrderConfirmationPage;
