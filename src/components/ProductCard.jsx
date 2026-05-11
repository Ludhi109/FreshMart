import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const navigate = useNavigate();
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden bg-gray-50/50 group flex items-center justify-center p-4">
        <Link to={`/product/${product.id}`} className="block w-full h-full relative z-0">
          <motion.img
            src={product.image}
            alt={product.name}
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            className="w-full h-full object-contain relative z-0"
            onError={(e) => {
              e.target.src = `https://placehold.co/600x600/22c55e/ffffff?text=${encodeURIComponent(product.name)}`;
            }}
          />
        </Link>
        
        {product.discount && (
          <div className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-xl uppercase tracking-tighter z-10">
            {product.discount}
          </div>
        )}

        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-4 right-4 w-10 h-10 rounded-xl glass-dark flex items-center justify-center transition-all duration-300 z-10 ${
            isWishlisted ? 'text-red-500 scale-110 shadow-lg' : 'text-text-main hover:text-red-500 hover:bg-white'
          }`}
        >
          <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        <div className="absolute bottom-4 left-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-2xl flex items-center justify-center gap-2 text-sm font-black shadow-2xl shadow-primary/40 transform active:scale-95 transition-all"
          >
            <Plus size={20} strokeWidth={3} />
            Add to Cart
          </button>
        </div>
        
        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Info Section */}
      <div className="p-4">
        <div className="text-[10px] uppercase tracking-wider text-text-muted font-bold mb-1">
          {product.category}
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-text-main font-bold text-sm mb-1 line-clamp-2 hover:text-primary transition-colors h-10">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                className={i < Math.floor(product.rating) ? '' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-[10px] text-text-muted font-bold">({product.reviews})</span>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xl font-black text-text-main">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-text-muted line-through font-bold">₹{product.originalPrice}</span>
              )}
            </div>
            
            <div className="flex items-center gap-1 bg-green-50 text-primary text-[10px] font-black px-2 py-1 rounded-md">
              <Plus size={12} strokeWidth={3} />
              <span>ADD</span>
            </div>
          </div>

          <button
            onClick={() => {
              addToCart(product);
              navigate('/checkout');
            }}
            className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <ShoppingCart size={16} strokeWidth={3} />
            Order Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
