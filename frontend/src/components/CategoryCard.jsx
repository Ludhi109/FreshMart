import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CategoryCard = ({ category }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative group rounded-3xl overflow-hidden aspect-square shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        onError={(e) => {
          e.target.src = `https://placehold.co/600x600/22c55e/ffffff?text=${encodeURIComponent(category.name)}`;
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-4 lg:p-6">
        <h3 className="text-white text-base lg:text-lg font-bold leading-tight mb-1">{category.name}</h3>
        <p className="text-white/70 text-[10px] lg:text-xs font-medium mb-3">{category.count} Items</p>
        
        <Link
          to={`/shop?category=${category.name.toLowerCase()}`}
          className="flex items-center gap-2 text-primary font-bold text-[10px] lg:text-xs group/btn"
        >
          Shop Now
          <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
