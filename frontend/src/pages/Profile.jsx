import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  MapPin, 
  Package, 
  Heart, 
  Settings, 
  LogOut, 
  Camera, 
  ChevronRight,
  Shield,
  Bell,
  CreditCard
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, logout } = useAuth();
  const { orders, wishlist } = useCart();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');

  if (!user) {
    return (
      <PageTransition>
        <div className="pt-32 pb-20 min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
          <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
            <User size={48} />
          </div>
          <h2 className="text-3xl font-extrabold text-text-main mb-4">Please Sign In</h2>
          <p className="text-text-muted mb-8 max-w-md">
            You need to be logged in to view your profile and manage your account settings.
          </p>
          <button 
            onClick={() => navigate('/')} 
            className="bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-primary/20 transition-all active:scale-95"
          >
            Go to Homepage
          </button>
        </div>
      </PageTransition>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'personal', name: 'Personal Info', icon: User },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'payment', name: 'Payments', icon: CreditCard },
  ];

  return (
    <PageTransition>
      <div className="pt-28 pb-20 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              {/* Profile Card */}
              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-primary/10 to-primary/5" />
                
                <div className="relative mt-4 mb-6 inline-block">
                  <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-50">
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  </div>
                  <button className="absolute bottom-1 right-1 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center border-4 border-white shadow-lg hover:scale-110 transition-all">
                    <Camera size={18} />
                  </button>
                </div>

                <h2 className="text-2xl font-black text-text-main mb-1">{user.name}</h2>
                <p className="text-text-muted font-semibold text-sm mb-6">{user.email}</p>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-50">
                  <Link to="/orders" className="p-4 bg-gray-50 rounded-2xl hover:bg-primary/5 transition-colors group">
                    <p className="text-2xl font-black text-text-main group-hover:text-primary transition-colors">{orders.length}</p>
                    <p className="text-[10px] font-black text-text-muted uppercase tracking-wider">Orders</p>
                  </Link>
                  <Link to="/wishlist" className="p-4 bg-gray-50 rounded-2xl hover:bg-red-50 transition-colors group">
                    <p className="text-2xl font-black text-text-main group-hover:text-red-500 transition-colors">{wishlist.length}</p>
                    <p className="text-[10px] font-black text-text-muted uppercase tracking-wider">Wishlist</p>
                  </Link>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="bg-white rounded-[2.5rem] p-4 shadow-sm border border-gray-100 overflow-hidden">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all mb-1 ${
                      activeTab === tab.id 
                        ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                        : 'text-text-main hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon size={20} />
                    {tab.name}
                    <ChevronRight size={18} className={`ml-auto transition-transform ${activeTab === tab.id ? 'rotate-90' : ''}`} />
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-all mt-4 border-t border-gray-50"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-gray-100 h-full">
                {activeTab === 'personal' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h3 className="text-3xl font-black text-text-main mb-8">Personal Information</h3>
                    
                    <div className="space-y-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-xs font-black text-text-muted uppercase tracking-widest ml-1">Full Name</label>
                          <div className="relative">
                            <input 
                              type="text" 
                              defaultValue={user.name}
                              className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border border-transparent focus:bg-white focus:border-primary/20 focus:outline-none font-bold transition-all"
                            />
                            <User className="absolute left-4 top-4 text-text-muted" size={20} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black text-text-muted uppercase tracking-widest ml-1">Email Address</label>
                          <div className="relative">
                            <input 
                              type="email" 
                              defaultValue={user.email}
                              disabled
                              className="w-full pl-12 pr-4 py-4 bg-gray-100 rounded-2xl border border-transparent text-text-muted font-bold cursor-not-allowed"
                            />
                            <Mail className="absolute left-4 top-4 text-text-muted" size={20} />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-text-muted uppercase tracking-widest ml-1">Delivery Address</label>
                        <div className="relative">
                          <textarea 
                            rows="3"
                            defaultValue={user.location}
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border border-transparent focus:bg-white focus:border-primary/20 focus:outline-none font-bold transition-all resize-none"
                          />
                          <MapPin className="absolute left-4 top-4 text-text-muted" size={20} />
                        </div>
                      </div>

                      <div className="flex justify-end pt-4">
                        <button 
                          onClick={() => toast.success('Profile updated successfully!')}
                          className="bg-text-main hover:bg-black text-white px-10 py-4 rounded-2xl font-bold shadow-xl transition-all active:scale-95"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>

                    <div className="mt-16 pt-10 border-t border-gray-100">
                      <h4 className="text-xl font-bold text-text-main mb-6 flex items-center gap-3">
                        <Package size={24} className="text-primary" />
                        Recent Activity
                      </h4>
                      <div className="space-y-4">
                        {orders.slice(0, 2).map(order => (
                          <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-primary/10 transition-all cursor-pointer">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                <Package size={20} className="text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-text-main">Order #{order.id}</p>
                                <p className="text-xs text-text-muted font-medium">{new Date(order.date).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <span className="text-sm font-black text-primary">₹{order.total.toFixed(2)}</span>
                          </div>
                        ))}
                        {orders.length === 0 && (
                          <p className="text-sm text-text-muted font-medium italic">No recent orders found.</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab !== 'personal' && (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                    <Settings size={64} className="text-gray-300 mb-6 animate-spin-slow" />
                    <h3 className="text-2xl font-bold text-text-main mb-2">Coming Soon</h3>
                    <p className="text-text-muted max-w-xs mx-auto">
                      We're working hard to bring you these settings. Stay tuned!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Profile;
