import React from 'react';
import Hero from '../components/Hero';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import PageTransition from '../components/PageTransition';
import { categories, products } from '../data/products';
import { ArrowRight, Zap, ShoppingBag, Star, Users, Flame, Trophy, Sparkles, CalendarCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const trendingProducts = products.filter(p => p.isTrending).slice(0, 4);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const freshArrivals = products.filter(p => p.isFreshArrival).slice(0, 4);
  const dailyEssentials = products.filter(p => p.isDailyEssential).slice(0, 4);
  
  const featuredCategories = categories;

  const SectionHeader = ({ title, subtitle, icon: Icon, link }) => (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
      <div>
        <div className="flex items-center gap-2 text-primary font-bold mb-3">
          <Icon size={20} className="text-amber-500" />
          <span className="uppercase tracking-widest text-xs">{subtitle}</span>
        </div>
        <h2 className="text-4xl font-extrabold text-text-main">{title}</h2>
      </div>
      <Link to={link} className="group flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all duration-300">
        View All <ArrowRight size={20} />
      </Link>
    </div>
  );

  return (
    <PageTransition>
      <Hero />

      {/* Featured Categories - Horizontal Scroll on Mobile */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader 
            title="Shop by Category" 
            subtitle="Explore Everything" 
            icon={ShoppingBag} 
            link="/categories" 
          />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 lg:gap-6">
            {featuredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Daily Essentials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader 
            title="Daily Essentials" 
            subtitle="Never Run Out" 
            icon={CalendarCheck} 
            link="/shop?filter=essentials" 
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {dailyEssentials.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader 
            title="Best Sellers" 
            subtitle="Most Loved" 
            icon={Trophy} 
            link="/shop?filter=bestsellers" 
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="py-10">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[3rem] overflow-hidden bg-primary p-12 lg:p-20 text-white"
          >
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 z-0">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800"
                alt="Bg"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold mb-6">
                <Zap size={18} fill="currentColor" />
                Limited Time Offer
              </div>
              <h2 className="text-5xl lg:text-7xl font-extrabold mb-6 leading-tight">
                Get <span className="text-amber-300">₹200 OFF</span> on Your First Order!
              </h2>
              <p className="text-xl text-white/90 mb-10 leading-relaxed">
                Experience the fastest grocery delivery in Hyderabad. Use our launch coupon for a special discount.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/shop"
                  className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-xl"
                >
                  Shop Now
                </Link>
                <div className="flex items-center gap-3 bg-primary-dark/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10">
                  <span className="text-sm font-bold">Code:</span>
                  <span className="text-lg font-mono font-black tracking-widest text-amber-300">FRESH200</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fresh Arrivals */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader 
            title="Fresh Arrivals" 
            subtitle="Straight from Farm" 
            icon={Sparkles} 
            link="/shop?filter=fresh" 
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {freshArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader 
            title="Trending Now" 
            subtitle="Popular Choice" 
            icon={Flame} 
            link="/shop?filter=trending" 
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold text-text-main mb-6">Why FreshMart?</h2>
            <p className="text-text-muted text-lg">Bringing the store to your door in minutes.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShoppingBag, title: 'Fresh Quality', desc: 'Handpicked fresh items every morning.' },
              { icon: Zap, title: '10 Mins Delivery', desc: 'Hyper-local delivery within minutes.' },
              { icon: Star, title: 'Best Prices', desc: 'Cheaper than your local supermarket.' },
              { icon: Users, title: 'Secure Payment', desc: 'UPI, Cards, and COD available.' },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="p-8 bg-gray-50 rounded-3xl text-center flex flex-col items-center group transition-all duration-300 border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-xl"
              >
                <div className="w-16 h-16 bg-white shadow-md rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <feature.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-text-main mb-3">{feature.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home;
