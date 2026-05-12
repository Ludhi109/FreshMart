import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ fullPage = false }) => {
  return (
    <div className={`${fullPage ? 'fixed inset-0 z-[100] bg-white flex' : 'w-full h-64 flex'} items-center justify-center`}>
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-gray-100 border-t-primary rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-8 h-8 bg-primary/20 rounded-full blur-sm" />
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
