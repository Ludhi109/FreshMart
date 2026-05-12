import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Menu, X, Search, User, MapPin, LogOut, Package, Settings, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useSearch } from '../context/SearchContext';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { cartCount, wishlist } = useCart();
  const { user, logout } = useAuth();
  const { searchQuery, setSearchQuery } = useSearch();
  const location = useLocation();
  const navigate = useNavigate();
  const profileRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (location.pathname !== '/shop') {
      navigate('/shop');
    }
  };

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
    <>
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
                <span className="text-xs font-bold text-text-main leading-tight truncate max-w-[120px]">
                  {user?.location || 'Hyderabad, Jubilee Hills'}
                </span>
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
                value={searchQuery}
                onChange={handleSearchChange}
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
              
              {user ? (
                <div className="relative" ref={profileRef}>
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 bg-gray-100 p-1 pr-3 rounded-full hover:bg-gray-200 transition-all active:scale-95"
                  >
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full shadow-sm" />
                    <span className="text-xs font-bold text-text-main hidden lg:block">{user.name.split(' ')[0]}</span>
                    <ChevronDown size={14} className={`text-text-muted transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden py-2"
                      >
                        <div className="px-4 py-3 border-b border-gray-50 mb-2">
                          <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Signed in as</p>
                          <p className="text-sm font-black text-text-main truncate">{user.email}</p>
                        </div>
                        <Link to="/orders" className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-text-main hover:bg-gray-50 hover:text-primary transition-colors">
                          <Package size={18} /> My Orders
                        </Link>
                        <Link to="/profile" className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-text-main hover:bg-gray-50 hover:text-primary transition-colors">
                          <Settings size={18} /> Settings
                        </Link>
                        <button 
                          onClick={() => { logout(); setIsProfileOpen(false); }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors border-t border-gray-50 mt-2"
                        >
                          <LogOut size={18} /> Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-primary hover:bg-primary-dark text-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
                >
                  <User size={20} />
                </button>
              )}
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
                    value={searchQuery}
                    onChange={handleSearchChange}
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
                
                {user ? (
                  <div className="flex items-center gap-4 mt-4 p-4 bg-white/50 rounded-2xl">
                    <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full shadow-sm" />
                    <div className="flex-1">
                      <p className="text-sm font-black text-text-main">{user.name}</p>
                      <p className="text-xs font-bold text-text-muted">{user.email}</p>
                    </div>
                    <button onClick={logout} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                      <LogOut size={20} />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => { setIsAuthModalOpen(true); setIsMenuOpen(false); }}
                    className="w-full bg-primary text-white py-4 rounded-xl font-black shadow-lg shadow-primary/20 mt-4"
                  >
                    Sign In / Sign Up
                  </button>
                )}

                <div className="flex items-center gap-2 mt-4 text-text-muted text-sm">
                  <MapPin size={16} />
                  <span>Deliver to: {user?.location || 'Hyderabad, India'}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Navbar;
