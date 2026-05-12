import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist } = useCart();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 pt-32">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-6"
        >
          <Heart size={48} />
        </motion.div>
        <h1 className="text-3xl font-black text-text-main mb-2">Your Wishlist is Empty</h1>
        <p className="text-text-muted font-semibold mb-8 text-center max-w-md">
          Save items that you like in your wishlist. Review them anytime and easily move them to the cart.
        </p>
        <Link
          to="/shop"
          className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 shadow-xl shadow-primary/30 transition-all active:scale-95"
        >
          Browse Products
          <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-text-main mb-3">
              My <span className="text-primary">Wishlist</span>
            </h1>
            <p className="text-text-muted font-bold text-lg">
              You have {wishlist.length} items saved for later.
            </p>
          </div>
          <Link
            to="/shop"
            className="flex items-center gap-2 text-primary font-black hover:gap-3 transition-all"
          >
            Continue Shopping
            <ArrowRight size={20} />
          </Link>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Wishlist;
