import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import PageTransition from '../components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, CreditCard, MapPin, Truck, ShieldCheck, ArrowRight, ShoppingBag, Smartphone, Zap, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { cart, cartTotal, clearCart, addOrder } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);
  const [loading, setLoading] = useState(false);

  const shipping = cartTotal > 500 ? 0 : 50.00;
  const total = cartTotal + shipping;
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [onlineMethod, setOnlineMethod] = useState('card'); // card, phonepe
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [upiId, setUpiId] = useState('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState('none'); // none, connecting, processing, verifying, complete

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setLoading(true);

    if (paymentMethod === 'online') {
      // Basic validation for online payment
      if (onlineMethod === 'card' && (!cardData.number || !cardData.cvv)) {
        alert('Please fill in card details');
        setLoading(false);
        return;
      }
      if (onlineMethod === 'phonepe' && !upiId) {
        alert('Please enter your PhonePe UPI ID');
        setLoading(false);
        return;
      }

      setPaymentProcessing(true);
      setPaymentStep('connecting');
      
      // Step 1: Connecting to Gateway
      setTimeout(() => {
        setPaymentStep('processing');
        
        // Step 2: Processing Payment
        setTimeout(() => {
          setPaymentStep('verifying');
          
          // Step 3: Verifying with Bank/Gateway
          setTimeout(() => {
            setPaymentStep('complete');
            setTimeout(() => {
              setPaymentProcessing(false);
              setLoading(false);
              setIsOrdered(true);
              addOrder({
                items: [...cart],
                total: cartTotal + (cartTotal > 500 ? 0 : 50.00),
                paymentMethod: onlineMethod === 'card' ? 'Credit Card' : 'PhonePe',
                address: '123 Fresh St, Jubilee Hills, Hyderabad' // Simplified for demo
              });
              clearCart();
            }, 1000);
          }, 2500);
        }, 2000);
      }, 1500);
    } else {
      // Simulate Cash on Delivery API call
      setTimeout(() => {
        setLoading(false);
        setIsOrdered(true);
        addOrder({
          items: [...cart],
          total: cartTotal + (cartTotal > 500 ? 0 : 50.00),
          paymentMethod: 'Cash on Delivery',
          address: '123 Fresh St, Jubilee Hills, Hyderabad'
        });
        clearCart();
      }, 2000);
    }
  };

  if (isOrdered) {
    return (
      <PageTransition>
        <div className="pt-28 pb-20 min-h-screen bg-white flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-24 h-24 bg-green-100 text-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-100"
            >
              <CheckCircle2 size={64} />
            </motion.div>
            <h1 className="text-4xl font-extrabold text-text-main mb-4">Order Placed Successfully!</h1>
            <p className="text-lg text-text-muted mb-10 max-w-lg mx-auto leading-relaxed">
              Thank you for shopping with FreshMart. Your groceries are being picked and will arrive at your doorstep within 30 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop" className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-primary/20">
                Continue Shopping
              </Link>
              <button className="bg-white border border-gray-200 text-text-main hover:bg-gray-50 px-8 py-4 rounded-2xl font-bold transition-all">
                Track Order
              </button>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  const getPaymentStatusText = () => {
    switch(paymentStep) {
      case 'connecting': return onlineMethod === 'card' ? 'Connecting to Secure Card Vault...' : 'Connecting to UPI Gateway...';
      case 'processing': return onlineMethod === 'card' ? 'Authorizing Transaction...' : 'Verifying UPI Handle...';
      case 'verifying': return onlineMethod === 'card' ? 'Waiting for 3D Secure Verification...' : 'Awaiting confirmation on your PhonePe app...';
      case 'complete': return 'Payment Successful!';
      default: return 'Processing...';
    }
  };

  return (
    <PageTransition>
      <div className="pt-28 pb-20 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl font-extrabold text-text-main mb-12">Checkout</h1>

          <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-3 gap-12">
            {/* Delivery Details */}
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                    <MapPin size={28} />
                  </div>
                  <h2 className="text-2xl font-bold text-text-main">Delivery Address</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-main">First Name</label>
                    <input required type="text" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 outline-none" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-main">Last Name</label>
                    <input required type="text" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Doe" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-text-main">Street Address</label>
                    <input required type="text" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 outline-none" placeholder="123 Fresh St, Jubilee Hills" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-main">City</label>
                    <input required type="text" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Hyderabad" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-main">Phone Number</label>
                    <input required type="tel" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 outline-none" placeholder="+91 98765 43210" />
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                    <CreditCard size={28} />
                  </div>
                  <h2 className="text-2xl font-bold text-text-main">Payment Method</h2>
                </div>

                  <div className="flex flex-col gap-4">
                    <label className={`relative p-6 border-2 rounded-2xl cursor-pointer flex items-center gap-4 transition-all ${paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200'}`}>
                      <input 
                        type="radio" 
                        name="payment" 
                        value="cod"
                        checked={paymentMethod === 'cod'} 
                        onChange={() => setPaymentMethod('cod')}
                        className="text-primary focus:ring-primary w-5 h-5" 
                      />
                      <div>
                        <p className="font-bold text-text-main">Cash on Delivery</p>
                        <p className="text-xs text-text-muted">Pay when your order arrives</p>
                      </div>
                    </label>

                    <div className={`relative border-2 rounded-2xl overflow-hidden transition-all ${paymentMethod === 'online' ? 'border-primary bg-primary/5' : 'border-gray-100'}`}>
                      <label className={`p-6 cursor-pointer flex items-center gap-4 ${paymentMethod === 'online' ? '' : 'hover:bg-gray-50'}`}>
                        <input 
                          type="radio" 
                          name="payment" 
                          value="online"
                          checked={paymentMethod === 'online'} 
                          onChange={() => setPaymentMethod('online')}
                          className="text-primary focus:ring-primary w-5 h-5" 
                        />
                        <div>
                          <p className="font-bold text-text-main">Online Payment</p>
                          <p className="text-xs text-text-muted">Pay securely via Cards/UPI</p>
                        </div>
                      </label>

                      <AnimatePresence>
                        {paymentMethod === 'online' && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-6 pb-6 pt-2 border-t border-primary/10"
                          >
                            <div className="flex gap-3 mb-6">
                              <button 
                                type="button"
                                onClick={() => setOnlineMethod('card')}
                                className={`flex-1 p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${onlineMethod === 'card' ? 'border-primary bg-white shadow-md' : 'border-gray-100 bg-gray-50 text-text-muted'}`}
                              >
                                <CreditCard size={20} />
                                <span className="text-xs font-bold">Credit/Debit Card</span>
                              </button>
                              <button 
                                type="button"
                                onClick={() => setOnlineMethod('phonepe')}
                                className={`flex-1 p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${onlineMethod === 'phonepe' ? 'border-primary bg-white shadow-md' : 'border-gray-100 bg-gray-50 text-text-muted'}`}
                              >
                                <Smartphone size={20} />
                                <span className="text-xs font-bold">PhonePe / UPI</span>
                              </button>
                            </div>

                            {onlineMethod === 'card' ? (
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Card Number</label>
                                  <div className="relative">
                                    <input 
                                      type="text" 
                                      placeholder="xxxx xxxx xxxx xxxx" 
                                      className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl outline-none focus:border-primary text-sm font-mono"
                                      value={cardData.number}
                                      onChange={(e) => setCardData({...cardData, number: e.target.value})}
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                                      <div className="w-8 h-5 bg-gray-200 rounded" />
                                      <div className="w-8 h-5 bg-gray-200 rounded" />
                                    </div>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Expiry Date</label>
                                    <input 
                                      type="text" 
                                      placeholder="MM / YY" 
                                      className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl outline-none focus:border-primary text-sm font-mono"
                                      value={cardData.expiry}
                                      onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted">CVV</label>
                                    <input 
                                      type="password" 
                                      placeholder="***" 
                                      className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl outline-none focus:border-primary text-sm font-mono"
                                      value={cardData.cvv}
                                      onChange={(e) => setCardData({...cardData, cvv: e.target.value})}
                                    />
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted">UPI ID</label>
                                  <div className="relative">
                                    <input 
                                      type="text" 
                                      placeholder="yourname@ybl" 
                                      className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl outline-none focus:border-primary text-sm"
                                      value={upiId}
                                      onChange={(e) => setUpiId(e.target.value)}
                                    />
                                    <Zap size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-primary" />
                                  </div>
                                  <p className="text-[10px] text-text-muted flex items-center gap-1">
                                    <ShieldCheck size={12} />
                                    We will send a payment request to this UPI ID
                                  </p>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
              </section>
            </div>

            {/* Order Summary Checkout */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100 sticky top-28">
                <h3 className="text-2xl font-bold text-text-main mb-8 flex items-center gap-2">
                  <ShoppingBag size={24} />
                  Order Summary
                </h3>
                
                <div className="max-h-60 overflow-y-auto mb-8 space-y-4 pr-2 custom-scrollbar">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <img src={item.image} className="w-16 h-16 rounded-xl object-cover" />
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-text-main line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-text-muted">{item.quantity} x ₹{item.price}</p>
                      </div>
                      <span className="text-sm font-bold text-text-main">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 mb-10 pt-6 border-t border-gray-100">
                  <div className="flex justify-between text-text-muted font-medium">
                    <span>Subtotal</span>
                    <span className="text-text-main">₹{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-text-muted font-medium">
                    <span>Shipping</span>
                    <span className="text-text-main">{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex justify-between">
                    <span className="text-xl font-bold text-text-main">Total</span>
                    <span className="text-2xl font-extrabold text-primary">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || cart.length === 0}
                  className={`w-full bg-primary hover:bg-primary-dark text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-primary/30 transition-all active:scale-95 ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      Place Order
                      <ArrowRight size={24} />
                    </>
                  )}
                </button>

                <div className="mt-8 flex items-center justify-center gap-4 text-text-muted">
                  <ShieldCheck size={20} />
                  <span className="text-xs font-bold uppercase tracking-widest">Guaranteed Safe Checkout</span>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Payment Simulation Overlay */}
        <AnimatePresence>
          {paymentProcessing && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-[2.5rem] p-10 max-w-md w-full text-center shadow-2xl relative overflow-hidden"
              >
                {paymentStep === 'complete' && (
                  <motion.div 
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    className="absolute inset-0 bg-green-500 flex flex-col items-center justify-center text-white z-10"
                  >
                    <CheckCircle2 size={64} className="mb-4" />
                    <h2 className="text-3xl font-bold">Payment Success!</h2>
                  </motion.div>
                )}

                <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute inset-0 border-2 border-primary/20 border-t-primary rounded-3xl"
                  />
                  {onlineMethod === 'card' ? (
                    <CreditCard className="text-primary" size={40} />
                  ) : (
                    <Smartphone className="text-primary" size={40} />
                  )}
                </div>
                <h2 className="text-2xl font-extrabold text-text-main mb-2">
                  {onlineMethod === 'card' ? 'Secure Card Payment' : 'PhonePe UPI Payment'}
                </h2>
                <div className="flex items-center justify-center gap-2 text-primary font-bold mb-6">
                  <Lock size={16} />
                  <p className="text-sm tracking-wide uppercase">{getPaymentStatusText()}</p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span className={paymentStep !== 'connecting' ? 'text-green-500 flex items-center gap-1' : 'text-text-muted'}>
                      {paymentStep !== 'connecting' && <CheckCircle2 size={14} />}
                      Gateway Connection
                    </span>
                    <span className={paymentStep === 'processing' || paymentStep === 'verifying' || paymentStep === 'complete' ? 'text-green-500 flex items-center gap-1' : 'text-text-muted'}>
                      {(paymentStep === 'verifying' || paymentStep === 'complete') && <CheckCircle2 size={14} />}
                      Processing
                    </span>
                    <span className={paymentStep === 'complete' ? 'text-green-500 flex items-center gap-1' : 'text-text-muted'}>
                      {paymentStep === 'complete' && <CheckCircle2 size={14} />}
                      Verification
                    </span>
                  </div>

                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={{ 
                        width: paymentStep === 'connecting' ? '33%' : 
                               paymentStep === 'processing' ? '66%' : 
                               paymentStep === 'verifying' ? '90%' : '100%' 
                      }}
                      transition={{ duration: 1 }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>

                <p className="text-xs text-text-muted mt-8 leading-relaxed">
                  Please do not refresh the page or click back. We are connecting to the secure payment gateway to complete your transaction of <span className="font-bold text-text-main">₹{total.toFixed(2)}</span>.
                </p>

                <div className="mt-8 flex items-center justify-center gap-2 text-primary font-bold">
                  <ShieldCheck size={20} />
                  <span className="text-xs">Secure 256-bit SSL Encryption</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default Checkout;
