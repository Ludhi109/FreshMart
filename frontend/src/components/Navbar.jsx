import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, Menu, X, Search, User, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount, wishlist } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/categories' },
    { name: 'Offers', path: '/offers' },
    { name: 'My Orders', path: '/orders' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-dark py-2 shadow-md' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo & Location */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform duration-300">
              <ShoppingCart size={24} fill="currentColor" />
            </div>
            <span className="text-2xl font-bold text-text-main tracking-tight hidden sm:block">
              Fresh<span className="text-primary">Mart</span>
            </span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-2 border-l border-gray-200 pl-6 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gray-100 text-primary rounded-full flex items-center justify-center">
              <MapPin size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-primary leading-none">Deliver to</span>
              <span className="text-xs font-bold text-text-main leading-tight truncate max-w-[120px]">Hyderabad, Jubilee Hills</span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-semibold transition-colors duration-200 hover:text-primary ${
                location.pathname === link.path ? 'text-primary' : 'text-text-main'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Search & Actions */}
        <div className="hidden md:flex items-center gap-6">
          <div className="relative group">
            <input
              type="text"
              placeholder="Search groceries..."
              className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-48 lg:w-64 transition-all duration-300 focus:w-80"
            />
            <Search className="absolute left-3 top-2.5 text-text-muted group-focus-within:text-primary" size={18} />
          </div>

          <div className="flex items-center gap-4">
            <Link to="/wishlist" className="relative group">
              <Heart size={24} className="text-text-main group-hover:text-red-500 transition-colors" />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative group">
              <ShoppingCart size={24} className="text-text-main group-hover:text-primary transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/login" className="bg-primary hover:bg-primary-dark text-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110">
              <User size={20} />
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-4">
          <Link to="/cart" className="relative">
            <ShoppingCart size={24} className="text-text-main" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-text-main hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-dark overflow-hidden border-t border-gray-100"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              <div className="relative mb-2">
                <input
                  type="text"
                  placeholder="Search groceries..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <Search className="absolute left-3 top-3.5 text-text-muted" size={20} />
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-lg font-semibold py-2 border-b border-gray-50 flex items-center justify-between ${
                    location.pathname === link.path ? 'text-primary' : 'text-text-main'
                  }`}
                >
                  {link.name}
                  <span className="w-2 h-2 rounded-full bg-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100"></span>
                </Link>
              ))}
              <div className="flex items-center gap-2 mt-4 text-text-muted text-sm">
                <MapPin size={16} />
                <span>Deliver to: Hyderabad, India</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
