import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Plus, Minus, Truck, Clock, ShieldCheck, ArrowLeft } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import PageTransition from '../components/PageTransition';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const product = useMemo(() => products.find((p) => p.id === parseInt(id)), [id]);
  const isWishlisted = wishlist.some((item) => item.id === product?.id);
  const relatedProducts = useMemo(() => 
    products.filter((p) => p.category === product?.category && p.id !== product?.id).slice(0, 4),
    [product]
  );

  if (!product) return (
    <div className="pt-28 pb-20 text-center">
      <h2 className="text-2xl font-bold">Product not found</h2>
      <Link to="/shop" className="text-primary hover:underline">Back to Shop</Link>
    </div>
  );

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <PageTransition>
      <div className="pt-28 pb-20 min-h-screen bg-white">
        <div className="container mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <Link to="/shop" className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8 font-bold text-sm">
            <ArrowLeft size={18} />
            Back to Shop
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square rounded-[3rem] overflow-hidden bg-gray-50 group"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = `https://placehold.co/600x600/22c55e/ffffff?text=${encodeURIComponent(product.name)}`;
                }}
              />
              {product.discount && (
                <div className="absolute top-8 left-8 bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-xl">
                  {product.discount}
                </div>
              )}
              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-8 right-8 w-14 h-14 rounded-full glass-dark flex items-center justify-center transition-all duration-300 shadow-xl ${
                  isWishlisted ? 'text-red-500' : 'text-text-main hover:text-red-500'
                }`}
              >
                <Heart size={28} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </motion.div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="text-sm font-bold text-primary uppercase tracking-widest mb-2">{product.category}</div>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-text-main mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 text-amber-400 bg-amber-50 px-3 py-1 rounded-full">
                  <Star size={18} fill="currentColor" />
                  <span className="font-bold text-sm">{product.rating}</span>
                </div>
                <span className="text-text-muted font-bold text-sm">({product.reviews} Customer Reviews)</span>
              </div>

              <div className="flex items-end gap-3 mb-8">
                <span className="text-4xl font-black text-text-main">₹{product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-text-muted line-through font-bold">₹{product.originalPrice}</span>
                )}
              </div>

              <p className="text-text-muted text-lg leading-relaxed mb-10">
                {product.description}
              </p>

              {/* Quantity & Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <div className="flex items-center bg-gray-50 border border-gray-100 rounded-2xl p-1 shrink-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-xl transition-all"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-xl transition-all"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-primary/20 transition-all active:scale-95"
                >
                  <ShoppingCart size={24} />
                  Add to Cart
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-10 border-t border-gray-100">
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                    <Truck size={20} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                    <Clock size={20} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider">30 Mins Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center">
                    <ShieldCheck size={20} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider">Quality Assured</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-20">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-bold text-text-main">Related Products</h2>
                <Link to="/shop" className="text-primary font-bold hover:underline">View All</Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default ProductDetails;
