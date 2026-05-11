import React from 'react';
import { useCart } from '../context/CartContext';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';
import { Package, Calendar, MapPin, CreditCard, ChevronRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyOrders = () => {
  const { orders } = useCart();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <PageTransition>
      <div className="pt-28 pb-20 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div>
              <h1 className="text-4xl font-extrabold text-text-main mb-2">My Orders</h1>
              <p className="text-text-muted">Track and manage your grocery orders</p>
            </div>
            <Link to="/shop" className="bg-white border border-gray-200 text-text-main hover:bg-gray-50 px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 shadow-sm">
              <ShoppingBag size={20} />
              Continue Shopping
            </Link>
          </div>

          {orders.length === 0 ? (
            <div className="bg-white rounded-[2.5rem] p-12 text-center shadow-sm border border-gray-100">
              <div className="w-24 h-24 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package size={48} />
              </div>
              <h2 className="text-2xl font-bold text-text-main mb-4">No orders yet</h2>
              <p className="text-text-muted mb-8 max-w-md mx-auto">
                Looks like you haven't placed any orders yet. Start shopping and get fresh groceries delivered to your home!
              </p>
              <Link to="/shop" className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-primary/20 inline-block">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="p-6 md:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                          <Package size={24} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-text-muted uppercase tracking-wider">Order ID</p>
                          <p className="text-lg font-bold text-text-main">#{order.id}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 md:gap-8">
                        <div className="flex items-center gap-2">
                          <Calendar className="text-text-muted" size={18} />
                          <div>
                            <p className="text-[10px] font-bold text-text-muted uppercase">Date</p>
                            <p className="text-sm font-bold text-text-main">{formatDate(order.date)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="text-text-muted" size={18} />
                          <div>
                            <p className="text-[10px] font-bold text-text-muted uppercase">Payment</p>
                            <p className="text-sm font-bold text-text-main">{order.paymentMethod}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-text-muted uppercase text-right">Status</p>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100">
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-50 pt-8 flex flex-col md:flex-row gap-8">
                      <div className="flex-1">
                        <p className="text-sm font-bold text-text-main mb-4">Items Summary</p>
                        <div className="flex -space-x-4 overflow-hidden mb-4">
                          {order.items.slice(0, 5).map((item, i) => (
                            <img 
                              key={i} 
                              src={item.image} 
                              alt={item.name}
                              className="inline-block h-12 w-12 rounded-xl ring-4 ring-white object-cover"
                            />
                          ))}
                          {order.items.length > 5 && (
                            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gray-100 ring-4 ring-white text-xs font-bold text-text-muted">
                              +{order.items.length - 5}
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-text-muted">
                          {order.items.map(item => item.name).join(', ').substring(0, 60)}...
                        </p>
                      </div>

                      <div className="md:w-64 space-y-4">
                        <div className="flex items-start gap-2">
                          <MapPin className="text-text-muted mt-1 shrink-0" size={16} />
                          <p className="text-sm text-text-muted leading-tight">{order.address}</p>
                        </div>
                        <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                          <span className="text-lg font-bold text-text-main">Total Amount</span>
                          <span className="text-2xl font-extrabold text-primary">₹{order.total.toFixed(2)}</span>
                        </div>
                        <button className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors group">
                          Order Details
                          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default MyOrders;
