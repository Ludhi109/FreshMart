import React from 'react';
import PageTransition from '../components/PageTransition';
import { ShoppingBag, Truck, Heart, Users, Star, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <PageTransition>
      <div className="pt-28 pb-20 min-h-screen">
        {/* Story Section */}
        <section className="container mx-auto px-4 md:px-6 mb-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 text-primary font-bold mb-4">
                <div className="w-8 h-[2px] bg-primary"></div>
                Our Journey
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-text-main mb-8 leading-tight">
                Bringing the Farm to Your <span className="text-primary italic">Kitchen</span>
              </h1>
              <p className="text-lg text-text-muted leading-relaxed mb-6">
                FreshMart started with a simple idea: everyone deserves access to fresh, high-quality groceries without the hassle of traditional shopping. Founded in 2024, we've grown from a small local delivery service to Hyderabad's most trusted grocery platform.
              </p>
              <p className="text-lg text-text-muted leading-relaxed mb-10">
                Our mission is to support local farmers and producers while providing our customers with a seamless, fast, and delightful shopping experience. We believe that good food is the foundation of a happy life.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-4xl font-black text-primary mb-1">50K+</h3>
                  <p className="text-sm font-bold text-text-main uppercase tracking-widest">Happy Customers</p>
                </div>
                <div>
                  <h3 className="text-4xl font-black text-primary mb-1">200+</h3>
                  <p className="text-sm font-bold text-text-main uppercase tracking-widest">Local Farmers</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800"
                  alt="Our Story"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 glass p-8 rounded-[2rem] shadow-xl z-20 hidden md:block max-w-xs">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
                    <Award size={24} />
                  </div>
                  <h4 className="font-bold text-text-main">Best Startup 2025</h4>
                </div>
                <p className="text-sm text-text-muted leading-relaxed">Recognized for our innovative supply chain and commitment to local agriculture.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-gray-50 py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-4xl font-extrabold text-text-main mb-6">Our Core Values</h2>
              <p className="text-text-muted text-lg">These principles guide everything we do at FreshMart.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Heart, title: 'Customer First', desc: 'Your satisfaction is our top priority. We listen, adapt, and serve with heart.' },
                { icon: ShoppingBag, title: 'Quality Always', desc: 'If we wouldn’t serve it to our families, we won’t serve it to yours. Guaranteed fresh.' },
                { icon: Truck, title: 'Speed & Ease', desc: 'Technology that makes shopping effortless and delivery that respects your time.' },
              ].map((value, idx) => (
                <div key={idx} className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8">
                    <value.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-text-main mb-4">{value.title}</h3>
                  <p className="text-text-muted leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="container mx-auto px-4 md:px-6 py-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold text-text-main mb-6">Meet the Visionaries</h2>
            <p className="text-text-muted text-lg">The dedicated team working behind the scenes to bring you the best experience.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center group">
                <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-6 shadow-md grayscale group-hover:grayscale-0 transition-all duration-500">
                  <img
                    src={`https://i.pravatar.cc/400?img=${i + 10}`}
                    alt="Team Member"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                </div>
                <h4 className="text-xl font-bold text-text-main">Alex Johnson</h4>
                <p className="text-primary font-bold text-sm">CEO & Founder</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default About;
