import React from 'react';
import { offers } from '../data/products';
import PageTransition from '../components/PageTransition';
import { Zap, Ticket, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Offers = () => {
  return (
    <PageTransition>
      <div className="pt-28 pb-20 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-text-main mb-4">Exclusive Offers</h1>
            <p className="text-text-muted text-lg">Save big with our latest deals and festival discounts.</p>
          </div>

          <div className="grid gap-12">
            {offers.map((offer, idx) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative rounded-[3rem] overflow-hidden bg-gradient-to-r ${offer.color} p-8 lg:p-16 text-white flex flex-col lg:flex-row items-center gap-12`}
              >
                <div className="flex-1 text-center lg:text-left z-10">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold mb-6">
                    <Zap size={18} fill="currentColor" />
                    Special Promotion
                  </div>
                  <h2 className="text-4xl lg:text-6xl font-black mb-4 leading-tight">{offer.title}</h2>
                  <p className="text-xl text-white/90 mb-10 font-medium">{offer.subtitle}</p>
                  
                  <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                    <div className="flex items-center gap-3 bg-black/20 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10">
                      <Ticket className="text-amber-300" size={24} />
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">Promo Code</p>
                        <p className="text-xl font-mono font-black text-white">{offer.code}</p>
                      </div>
                    </div>
                    <button className="bg-white text-text-main hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold transition-all shadow-xl active:scale-95 flex items-center gap-2">
                      Shop Now
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>

                <div className="w-full lg:w-1/3 aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 rotate-3">
                  <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
                </div>
                
                {/* Bg decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
              </motion.div>
            ))}
          </div>

          {/* Limited Time Deals */}
          <div className="mt-24">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 bg-red-100 text-red-500 rounded-2xl flex items-center justify-center">
                <Clock size={28} />
              </div>
              <h2 className="text-3xl font-extrabold text-text-main">Limited Time Deals</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm group hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <span className="bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full">FLASH DEAL</span>
                    <span className="text-text-muted text-xs font-bold">Ends in 02:45:10</span>
                  </div>
                  <h3 className="text-xl font-bold text-text-main mb-2">Weekend Breakfast Special</h3>
                  <p className="text-text-muted text-sm mb-6">Get 20% cashback on all bakery and dairy products this weekend.</p>
                  <button className="w-full py-4 rounded-2xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Offers;
