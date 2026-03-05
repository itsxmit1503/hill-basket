import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { Mail, MessageSquare, Phone, MapPin, Search, ChevronDown, ChevronUp, Send, CheckCircle2, LifeBuoy, Zap, ShieldCheck, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HelpCenterPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    const tickets = JSON.parse(localStorage.getItem('support_tickets') || '[]');
    tickets.push({
      id: 'TKT-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      ...formData,
      status: 'Open',
      date: new Date().toISOString()
    });
    localStorage.setItem('support_tickets', JSON.stringify(tickets));
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const faqs = [
    { q: "What is your delivery radius?", a: "We currently deliver within a 10-15 km radius from our central local hub to ensure the maximum freshness of your groceries." },
    { q: "How long does delivery take?", a: "Most orders are delivered within 30-60 minutes, depending on your distance from the hub and current order volume." },
    { q: "Can I schedule a delivery?", a: "Yes! During checkout, you can choose to have your order delivered immediately or schedule it for a later time today or tomorrow." },
    { q: "What if I'm not happy with my product?", a: "We have a 100% satisfaction guarantee. If any item is not fresh or damaged, please contact us immediately for a full refund or replacement." }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-20 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 border border-primary/20">
          <LifeBuoy size={16} />
          <span className="text-sm font-semibold uppercase tracking-wider">How can we help?</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-poppins font-black leading-tight mb-8">
          Help <span className="text-primary">Center</span>
        </h1>
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={24} />
          </div>
          <input
            type="text"
            placeholder="Search for articles, guides, and FAQs..."
            className="w-full bg-white dark:bg-gray-800 border-none rounded-[32px] py-6 px-16 text-xl shadow-2xl focus:ring-4 focus:ring-primary/20 transition-all font-medium"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <GlassCard className="p-10 border-none bg-primary text-white overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
            <h3 className="text-3xl font-poppins font-black mb-8 relative z-10">Contact Us</h3>
            <div className="space-y-8 relative z-10">
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shrink-0 shadow-lg backdrop-blur-md border border-white/20">
                  <Phone size={28} />
                </div>
                <div>
                  <p className="font-bold text-lg mb-1">Phone Support</p>
                  <p className="text-white/70 font-medium">+1 (234) 567-890</p>
                  <p className="text-xs text-white/50 uppercase tracking-widest mt-2 font-black">24/7 Available</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shrink-0 shadow-lg backdrop-blur-md border border-white/20">
                  <Mail size={28} />
                </div>
                <div>
                  <p className="font-bold text-lg mb-1">Email Us</p>
                  <p className="text-white/70 font-medium">support@hillbasket.com</p>
                  <p className="text-xs text-white/50 uppercase tracking-widest mt-2 font-black">Avg Response: 2h</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shrink-0 shadow-lg backdrop-blur-md border border-white/20">
                  <MapPin size={28} />
                </div>
                <div>
                  <p className="font-bold text-lg mb-1">Our Location</p>
                  <p className="text-white/70 font-medium">123 Market St, Local City</p>
                  <p className="text-xs text-white/50 uppercase tracking-widest mt-2 font-black">Main Local Hub</p>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-8 space-y-4 bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-800">
            <div className="flex items-center space-x-3 text-sm text-gray-500 font-bold uppercase tracking-widest mb-2">
              <ShieldCheck className="text-primary" size={16} />
              <span>Trust & Safety</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              Your security is our priority. All payments are encrypted, and we follow strict health protocols for every delivery.
            </p>
          </GlassCard>
        </div>

        {/* Support Form */}
        <div className="lg:col-span-2">
          <GlassCard className="p-12 shadow-2xl relative overflow-hidden">
            <AnimatePresence mode="wait">
              {formSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center h-[500px] text-center"
                >
                  <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-8 shadow-xl shadow-primary/10">
                    <CheckCircle2 size={56} />
                  </div>
                  <h2 className="text-4xl font-poppins font-black mb-4">Message Sent!</h2>
                  <p className="text-gray-500 text-lg max-w-sm font-medium">
                    We've received your request and our team will get back to you shortly.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-10"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <h2 className="text-4xl font-poppins font-black flex items-center space-x-4">
                      <MessageSquare className="text-primary" size={36} />
                      <span>Send a Message</span>
                    </h2>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Expected Reply: Within 24 hours</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Your Name</label>
                        <input
                          type="text"
                          required
                          className="input-field py-4 font-bold text-lg"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                        <input
                          type="email"
                          required
                          className="input-field py-4 font-bold text-lg"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Subject</label>
                      <input
                        type="text"
                        required
                        className="input-field py-4 font-bold text-lg"
                        placeholder="How can we help?"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Message</label>
                      <textarea
                        required
                        rows={6}
                        className="input-field py-4 font-bold text-lg"
                        placeholder="Write your message here..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full py-6 text-xl font-black shadow-2xl shadow-primary/20 flex items-center justify-center space-x-3 group">
                      <span>Send Message</span>
                      <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        </div>
      </div>

      {/* FAQ Preview */}
      <section className="mt-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl font-poppins font-black mb-6">Frequently <br /><span className="text-primary">Asked Questions</span></h2>
            <p className="text-xl text-gray-500 font-medium">Quick answers to the most common questions about our service and products.</p>
          </div>
          <button className="btn-primary py-4 px-10 text-lg font-bold">Browse All FAQs</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq, idx) => (
            <GlassCard key={idx} className="p-8 hover:border-primary/30 transition-all duration-300 group">
              <h4 className="text-2xl font-poppins font-black mb-4 group-hover:text-primary transition-colors flex items-start">
                <span className="text-primary mr-4 opacity-30 text-4xl leading-none">?</span>
                {faq.q}
              </h4>
              <p className="text-gray-500 text-lg leading-relaxed font-medium pl-10">
                {faq.a}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HelpCenterPage;
