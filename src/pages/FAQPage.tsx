import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { ChevronDown, ChevronUp, Search, MessageSquare, HelpCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      category: "Delivery",
      questions: [
        { q: "What is your delivery radius?", a: "We currently deliver within a 10-15 km radius from our central local hub to ensure the maximum freshness of your groceries." },
        { q: "How long does delivery take?", a: "Most orders are delivered within 30-60 minutes, depending on your distance from the hub and current order volume." },
        { q: "Is there a minimum order amount?", a: "The minimum order amount for delivery is $15. Orders above $50 qualify for free delivery." }
      ]
    },
    {
      category: "Orders & Payments",
      questions: [
        { q: "How can I track my order?", a: "Once your order is confirmed, you can track its real-time status from your Account dashboard under 'Order History'." },
        { q: "What payment methods do you accept?", a: "We accept all major credit and debit cards, as well as digital wallets. Cash on delivery is available for selected areas." },
        { q: "Can I cancel my order?", a: "Orders can be cancelled within 5 minutes of placement. After that, our team starts packing your fresh items." }
      ]
    },
    {
      category: "Quality & Returns",
      questions: [
        { q: "How do you ensure product freshness?", a: "We source directly from local farms daily. Our quality control team inspects every item before it's packed for delivery." },
        { q: "What is your return policy?", a: "If you're not satisfied with the quality of any item, we offer a 100% money-back guarantee or immediate replacement." }
      ]
    }
  ];

  const allQuestions = faqs.flatMap(f => f.questions);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-20 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-poppins font-black leading-tight mb-8">
          Frequently Asked <span className="text-primary">Questions</span>
        </h1>
        <p className="text-xl text-gray-500 font-medium mb-10">
          Find quick answers to common questions about Hill Basket's services, delivery, and quality standards.
        </p>
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
          <input
            type="text"
            placeholder="Search for answers..."
            className="w-full bg-white dark:bg-gray-800 border-none rounded-[32px] py-6 px-16 text-xl shadow-2xl focus:ring-4 focus:ring-primary/20 transition-all font-medium"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        {faqs.map((category, catIdx) => (
          <div key={catIdx} className="space-y-6">
            <h2 className="text-2xl font-poppins font-black text-primary uppercase tracking-widest flex items-center">
              <div className="w-8 h-1 bg-primary mr-4 rounded-full" />
              {category.category}
            </h2>
            <div className="space-y-4">
              {category.questions.map((faq, idx) => {
                const globalIdx = faqs.slice(0, catIdx).reduce((acc, c) => acc + c.questions.length, 0) + idx;
                const isOpen = openIdx === globalIdx;
                
                return (
                  <GlassCard key={idx} className={`overflow-hidden transition-all duration-300 ${isOpen ? 'border-primary/50 ring-4 ring-primary/5' : ''}`}>
                    <button
                      onClick={() => setOpenIdx(isOpen ? null : globalIdx)}
                      className="w-full p-6 text-left flex justify-between items-center group"
                    >
                      <span className={`text-xl font-bold font-poppins transition-colors ${isOpen ? 'text-primary' : 'group-hover:text-primary'}`}>
                        {faq.q}
                      </span>
                      <div className={`p-2 rounded-xl transition-all ${isOpen ? 'bg-primary text-white rotate-180' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                        <ChevronDown size={20} />
                      </div>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-6 pb-6"
                        >
                          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 text-lg text-gray-500 font-medium leading-relaxed">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <section className="mt-32">
        <GlassCard className="p-12 md:p-20 text-center bg-primary text-white border-none overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full bg-white/5 pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-white/20 rounded-[32px] flex items-center justify-center mx-auto mb-8 backdrop-blur-md border border-white/20">
              <HelpCircle size={40} />
            </div>
            <h2 className="text-4xl md:text-5xl font-poppins font-black mb-6">Still have questions?</h2>
            <p className="text-xl opacity-90 mb-10 font-medium">
              Our support team is always here to help you. Reach out to us anytime!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/help" className="bg-white text-primary px-10 py-5 rounded-2xl text-xl font-black hover:bg-opacity-90 transition-all shadow-2xl flex items-center justify-center space-x-3 group">
                <span>Contact Support</span>
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="bg-primary-dark/50 backdrop-blur-md border border-white/20 px-10 py-5 rounded-2xl text-xl font-black hover:bg-white/10 transition-all flex items-center justify-center">
                <MessageSquare size={24} className="mr-3" />
                <span>Live Chat</span>
              </button>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
};

export default FAQPage;
