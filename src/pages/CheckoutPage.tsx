import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { GlassCard } from '../components/GlassCard';
import { MapPin, CreditCard, ShoppingBag, Truck, ChevronRight, ArrowLeft, ShieldCheck, Mail, Phone, User, Clock, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CheckoutPage: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: user?.address || '',
    city: 'Local City',
    zip: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const totalAmount = (totalPrice * 1.05).toFixed(2);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      const orderId = 'HB-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      clearCart();
      navigate('/order-confirmation', { state: { orderId, total: totalAmount } });
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <GlassCard className="p-16 max-w-2xl mx-auto">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-400">
            <ShoppingBag size={48} />
          </div>
          <h2 className="text-3xl font-poppins font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-10 text-lg">You need to add some fresh groceries to your cart before checking out.</p>
          <Link to="/products" className="btn-primary inline-flex items-center space-x-2 px-10 py-4 text-lg">
            <span>Start Shopping</span>
            <ChevronRight size={20} />
          </Link>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-poppins font-bold flex items-center space-x-4">
            <CheckCircle2 className="text-primary" size={40} />
            <span>Checkout</span>
          </h1>
          <div className="hidden md:flex items-center space-x-4 text-sm font-bold uppercase tracking-widest">
            <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-primary bg-primary text-white' : 'border-gray-200'}`}>1</div>
              <span>Shipping</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-200" />
            <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-primary bg-primary text-white' : 'border-gray-200'}`}>2</div>
              <span>Payment</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-200" />
            <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 3 ? 'border-primary bg-primary text-white' : 'border-gray-200'}`}>3</div>
              <span>Review</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Form Area */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-8"
                  >
                    <GlassCard className="p-8 shadow-2xl">
                      <h2 className="text-2xl font-bold font-poppins mb-8 flex items-center space-x-3">
                        <Truck className="text-primary" size={28} />
                        <span>Shipping Details</span>
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 flex items-center">
                            <User size={14} className="mr-2" /> Full Name
                          </label>
                          <input
                            type="text"
                            required
                            className="input-field"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 flex items-center">
                            <Mail size={14} className="mr-2" /> Email
                          </label>
                          <input
                            type="email"
                            required
                            className="input-field"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 flex items-center">
                            <Phone size={14} className="mr-2" /> Phone Number
                          </label>
                          <input
                            type="tel"
                            required
                            className="input-field"
                            placeholder="+1 (234) 567-890"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 flex items-center">
                            <MapPin size={14} className="mr-2" /> Zip Code
                          </label>
                          <input
                            type="text"
                            required
                            className="input-field"
                            placeholder="12345"
                            value={formData.zip}
                            onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                          />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 flex items-center">
                            <MapPin size={14} className="mr-2" /> Delivery Address
                          </label>
                          <textarea
                            required
                            rows={3}
                            className="input-field py-4"
                            placeholder="House No, Street Name, Area"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          />
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-8"
                  >
                    <GlassCard className="p-8 shadow-2xl">
                      <h2 className="text-2xl font-bold font-poppins mb-8 flex items-center space-x-3">
                        <CreditCard className="text-primary" size={28} />
                        <span>Payment Method</span>
                      </h2>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-4">
                          <button type="button" className="flex items-center justify-between p-4 bg-primary/10 border-2 border-primary rounded-2xl">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                                <CreditCard className="text-primary" />
                              </div>
                              <div className="text-left">
                                <p className="font-bold">Credit / Debit Card</p>
                                <p className="text-xs text-gray-500">Pay securely with your card</p>
                              </div>
                            </div>
                            <div className="w-6 h-6 rounded-full border-4 border-primary bg-white" />
                          </button>
                          <button type="button" className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent rounded-2xl hover:border-gray-200 dark:hover:border-gray-700 transition-all">
                            <div className="flex items-center space-x-4 opacity-50">
                              <div className="w-12 h-12 bg-white dark:bg-gray-700 rounded-xl flex items-center justify-center">
                                <span className="font-bold text-lg">C</span>
                              </div>
                              <div className="text-left">
                                <p className="font-bold">Cash on Delivery</p>
                                <p className="text-xs text-gray-500">Pay when you receive items</p>
                              </div>
                            </div>
                            <div className="w-6 h-6 rounded-full border-2 border-gray-300" />
                          </button>
                        </div>

                        <div className="pt-6 border-t border-gray-100 dark:border-gray-800 space-y-6">
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Cardholder Name</label>
                            <input
                              type="text"
                              required
                              className="input-field"
                              placeholder="JOHN DOE"
                              value={formData.cardName}
                              onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Card Number</label>
                            <div className="relative">
                              <input
                                type="text"
                                required
                                className="input-field pl-14"
                                placeholder="0000 0000 0000 0000"
                                value={formData.cardNumber}
                                onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                              />
                              <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Expiry Date</label>
                              <input
                                type="text"
                                required
                                className="input-field"
                                placeholder="MM/YY"
                                value={formData.expiry}
                                onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">CVV</label>
                              <input
                                type="text"
                                required
                                className="input-field"
                                placeholder="123"
                                value={formData.cvv}
                                onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-8"
                  >
                    <GlassCard className="p-8 shadow-2xl">
                      <h2 className="text-2xl font-bold font-poppins mb-8 flex items-center space-x-3">
                        <ShoppingBag className="text-primary" size={28} />
                        <span>Order Review</span>
                      </h2>
                      <div className="space-y-6">
                        <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10">
                          <h3 className="font-bold mb-4 flex items-center">
                            <MapPin size={16} className="mr-2 text-primary" />
                            Shipping to:
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 font-medium">{formData.name}</p>
                          <p className="text-gray-500 text-sm mt-1">{formData.address}, {formData.city} - {formData.zip}</p>
                          <p className="text-gray-500 text-sm mt-1">{formData.phone}</p>
                          <button onClick={() => setStep(1)} className="text-primary text-xs font-bold mt-4 hover:underline">Change Address</button>
                        </div>
                        
                        <div className="p-6 bg-accent/5 rounded-3xl border border-accent/10">
                          <h3 className="font-bold mb-4 flex items-center">
                            <CreditCard size={16} className="mr-2 text-accent" />
                            Payment Method:
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 font-medium">Card ending in {formData.cardNumber.slice(-4)}</p>
                          <button onClick={() => setStep(2)} className="text-primary text-xs font-bold mt-4 hover:underline">Change Payment</button>
                        </div>

                        <div className="space-y-4 pt-6">
                          <h3 className="font-bold flex items-center">
                            <Clock size={16} className="mr-2 text-yellow-500" />
                            Delivery Schedule:
                          </h3>
                          <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800">
                            <Zap className="text-yellow-500 mr-4" size={24} />
                            <div>
                              <p className="font-bold">Standard Delivery (30-60 mins)</p>
                              <p className="text-xs text-gray-500">Earliest delivery today</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mt-12 bg-white/50 dark:bg-black/50 p-6 rounded-3xl backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg">
                <button
                  type="button"
                  onClick={() => step > 1 ? setStep(step - 1) : navigate('/cart')}
                  className="flex items-center space-x-2 text-gray-500 font-bold hover:text-primary transition-colors px-6 py-4"
                >
                  <ArrowLeft size={20} />
                  <span>{step > 1 ? 'Back' : 'Return to Cart'}</span>
                </button>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full sm:w-auto px-12 py-5 text-xl font-bold flex items-center justify-center space-x-3 group"
                >
                  <span>{loading ? 'Processing...' : (step < 3 ? 'Continue' : 'Place Order')}</span>
                  {!loading && <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <aside className="space-y-8">
            <GlassCard className="p-8 sticky top-32">
              <h3 className="text-2xl font-bold font-poppins mb-8">Summary</h3>
              <div className="space-y-4 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
                    <div className="w-12 h-12 bg-white rounded-lg p-1 shrink-0 border border-gray-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="font-bold text-sm truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-sm text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-gray-800">
                <div className="flex justify-between text-gray-500 text-sm font-medium">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm font-medium">
                  <span>Delivery Fee</span>
                  <span className="text-primary font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm font-medium">
                  <span>Estimated Tax</span>
                  <span>${(totalPrice * 0.05).toFixed(2)}</span>
                </div>
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-end">
                  <span className="text-lg font-bold">Total</span>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Inclusive of all taxes</p>
                    <p className="text-3xl font-bold text-primary font-poppins">${totalAmount}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-accent/5 rounded-2xl border border-accent/10 flex items-center space-x-3">
                <ShieldCheck className="text-accent" size={20} />
                <p className="text-xs text-gray-500 leading-tight">Your data is protected with 256-bit SSL encryption. 100% secure checkout.</p>
              </div>
            </GlassCard>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
