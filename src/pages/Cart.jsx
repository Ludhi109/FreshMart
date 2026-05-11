import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ArrowLeft, Ticket } from 'lucide-react';
import { useCart } from '../context/CartContext';
import PageTransition from '../components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const shipping = cartTotal > 500 ? 0 : 50.00;
  const total = cartTotal + shipping;

  return (
    <PageTransition>
      <div className="pt-28 pb-20 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl font-extrabold text-text-main mb-8 flex items-center gap-4">
            <ShoppingCart size={36} className="text-primary" />
            Your Shopping Cart
          </h1>

          {cart.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="bg-white rounded-[2rem] p-4 md:p-6 shadow-sm border border-gray-100 flex items-center gap-4 md:gap-8"
                    >
                      <div className="w-20 h-20 md:w-32 md:h-32 rounded-2xl overflow-hidden bg-gray-50 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <Link to={`/product/${item.id}`} className="text-lg font-bold text-text-main hover:text-primary transition-colors truncate">
                            {item.name}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors shrink-0"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                        <p className="text-sm text-text-muted mb-4">{item.category}</p>

                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-10 text-center font-bold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <div className="text-xl font-extrabold text-primary">₹{(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <Link to="/shop" className="inline-flex items-center gap-2 text-primary font-bold hover:underline py-4">
                  <ArrowLeft size={18} />
                  Continue Shopping
                </Link>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100 sticky top-28">
                  <h3 className="text-2xl font-bold text-text-main mb-8">Order Summary</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-text-muted font-medium">
                      <span>Subtotal</span>
                      <span className="text-text-main">₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-text-muted font-medium">
                      <span>Shipping Fee</span>
                      <span className="text-text-main">{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="pt-4 border-t border-gray-100 flex justify-between">
                      <span className="text-xl font-bold text-text-main">Total Amount</span>
                      <span className="text-2xl font-extrabold text-primary">₹{total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="relative mb-8 group">
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border border-transparent focus:bg-white focus:border-primary/20 focus:outline-none transition-all"
                    />
                    <Ticket className="absolute left-4 top-4 text-text-muted group-focus-within:text-primary" size={24} />
                    <button className="absolute right-2 top-2 bottom-2 px-4 bg-text-main text-white rounded-xl text-sm font-bold hover:bg-primary transition-colors">
                      Apply
                    </button>
                  </div>

                  <Link
                    to="/checkout"
                    className="w-full bg-primary hover:bg-primary-dark text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-primary/30 transition-all active:scale-95"
                  >
                    Proceed to Checkout
                    <ArrowRight size={24} />
                  </Link>

                  <p className="text-center text-[10px] text-text-muted mt-6 font-bold uppercase tracking-widest">
                    Secure checkout powered by Stripe
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[3rem] p-20 text-center shadow-sm border border-gray-100">
              <div className="w-32 h-32 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-8 text-primary">
                <ShoppingCart size={64} />
              </div>
              <h2 className="text-3xl font-extrabold text-text-main mb-4">Your cart is empty!</h2>
              <p className="text-text-muted mb-10 max-w-md mx-auto text-lg leading-relaxed">
                Looks like you haven't added anything to your cart yet. Explore our fresh categories and start shopping!
              </p>
              <Link
                to="/shop"
                className="inline-flex bg-primary hover:bg-primary-dark text-white px-10 py-5 rounded-2xl font-bold transition-all shadow-xl shadow-primary/30 active:scale-95"
              >
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Cart;
