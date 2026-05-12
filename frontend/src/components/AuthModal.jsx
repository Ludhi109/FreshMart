import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { login, signup } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      login({ name: formData.email.split('@')[0], email: formData.email });
    } else {
      signup({ name: formData.name, email: formData.email });
    }
    onClose();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Content */}
            <div className="p-8 sm:p-10">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-black text-text-main">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="mt-2 text-sm text-text-muted font-medium">
                  {isLogin 
                    ? 'Sign in to continue your grocery shopping' 
                    : 'Join FreshMart for the best deals and fastest delivery'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-2xl border-2 border-gray-100 py-3 pl-12 pr-4 text-sm font-semibold transition-all focus:border-primary focus:outline-none"
                    />
                  </div>
                )}
                
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-2xl border-2 border-gray-100 py-3 pl-12 pr-4 text-sm font-semibold transition-all focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full rounded-2xl border-2 border-gray-100 py-3 pl-12 pr-4 text-sm font-semibold transition-all focus:border-primary focus:outline-none"
                  />
                </div>

                {isLogin && (
                  <div className="text-right">
                    <button type="button" className="text-xs font-bold text-primary hover:underline">
                      Forgot Password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-black text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark active:scale-95"
                >
                  {isLogin ? 'Sign In' : 'Sign Up'}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
              </form>

              <div className="my-8 flex items-center gap-4 text-text-muted">
                <div className="h-px flex-grow bg-gray-100" />
                <span className="text-xs font-bold uppercase tracking-widest">Or continue with</span>
                <div className="h-px flex-grow bg-gray-100" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 rounded-2xl border-2 border-gray-100 py-3 transition-colors hover:bg-gray-50">
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                  <span className="text-sm font-bold text-text-main">Google</span>
                </button>
                <button className="flex items-center justify-center gap-2 rounded-2xl border-2 border-gray-100 py-3 transition-colors hover:bg-gray-50">
                  <User size={20} className="text-text-main" />
                  <span className="text-sm font-bold text-text-main">Github</span>
                </button>
              </div>

              <p className="mt-8 text-center text-sm font-semibold text-text-muted">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary hover:underline"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
