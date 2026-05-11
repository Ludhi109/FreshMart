import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Play, Truck, Clock, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold mb-6">
              <Truck size={18} />
              Free Delivery on orders above ₹500
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-text-main leading-tight mb-6">
              Fresh Groceries <br />
              <span className="text-primary italic">Delivered Fast</span>
            </h1>
            
            <p className="text-lg text-text-muted mb-8 max-w-lg leading-relaxed">
              Experience the joy of fresh produce, organic snacks, and daily essentials delivered to your doorstep in as little as 30 minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                to="/shop"
                className="px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-primary/30 transition-all duration-300 hover:-translate-y-1"
              >
                Shop Now
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 bg-white hover:bg-gray-50 text-text-main border border-gray-200 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-300"
              >
                <Play size={20} fill="currentColor" />
                How it works
              </Link>
            </div>

            {/* Delivery Highlights */}
            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col gap-2">
                <div className="w-12 h-12 bg-white shadow-md rounded-xl flex items-center justify-center text-primary">
                  <Truck size={24} />
                </div>
                <span className="text-xs font-bold text-text-main">Fast Delivery</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-12 h-12 bg-white shadow-md rounded-xl flex items-center justify-center text-primary">
                  <Clock size={24} />
                </div>
                <span className="text-xs font-bold text-text-main">24/7 Support</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-12 h-12 bg-white shadow-md rounded-xl flex items-center justify-center text-primary">
                  <ShieldCheck size={24} />
                </div>
                <span className="text-xs font-bold text-text-main">Secure Payment</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800"
                alt="Fresh Groceries"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Info Cards */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 z-20 glass p-4 rounded-2xl shadow-xl flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">5★</div>
              <div>
                <p className="text-xs font-bold">Fresh Quality</p>
                <p className="text-[10px] text-text-muted">100% Organic Guaranteed</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -right-6 z-20 glass p-4 rounded-2xl shadow-xl flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                <Truck size={20} />
              </div>
              <div>
                <p className="text-xs font-bold">Fast Arrival</p>
                <p className="text-[10px] text-text-muted">Hyderabad: 30 Mins</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
