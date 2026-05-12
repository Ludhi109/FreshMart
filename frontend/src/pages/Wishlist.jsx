import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import PageTransition from '../components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';

const Wishlist = () => {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  return (
    <PageTransition>
      <div className="pt-28 pb-20 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl font-extrabold text-text-main mb-8 flex items-center gap-4">
            <Heart size={36} className="text-red-500 fill-red-500" />
            My Wishlist
          </h1>

          {wishlist.length > 0 ? (
            <div className="grid gap-6">
              <AnimatePresence mode='popLayout'>
                {wishlist.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-[2rem] p-4 md:p-6 shadow-sm border border-gray-100 flex items-center gap-4 md:gap-8 group"
                  >
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden bg-gray-50 shrink-0 flex items-center justify-center p-2">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                        onError={(e) => {
                          e.target.src = `https://placehold.co/600x600/22c55e/ffffff?text=${encodeURIComponent(item.name)}`;
                        }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <Link to={`/product/${item.id}`} className="text-lg md:text-xl font-bold text-text-main hover:text-primary transition-colors truncate">
                          {item.name}
                        </Link>
                        <button
                          onClick={() => toggleWishlist(item)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors shrink-0"
                          title="Remove from wishlist"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                      <p className="text-xs md:text-sm font-bold text-primary uppercase tracking-wider mb-4">{item.category}</p>

                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="text-2xl font-black text-text-main">₹{item.price}</div>
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95"
                        >
                          <ShoppingCart size={18} />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <div className="mt-8">
                <Link to="/shop" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
                  <ArrowLeft size={18} />
                  Continue Shopping
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[3rem] p-20 text-center shadow-sm border border-gray-100">
              <div className="w-32 h-32 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8 text-red-500">
                <Heart size={64} />
              </div>
              <h2 className="text-3xl font-extrabold text-text-main mb-4">Your wishlist is empty!</h2>
              <p className="text-text-muted mb-10 max-w-md mx-auto text-lg leading-relaxed">
                Save items you like to your wishlist so you can find them easily later.
              </p>
              <Link
                to="/shop"
                className="inline-flex bg-primary hover:bg-primary-dark text-white px-10 py-5 rounded-2xl font-bold transition-all shadow-xl shadow-primary/30 active:scale-95"
              >
                Explore Products
              </Link>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Wishlist;
