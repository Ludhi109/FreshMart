import React from 'react';
import CategoryCard from '../components/CategoryCard';
import PageTransition from '../components/PageTransition';
import { categories } from '../data/products';

const Categories = () => {
  const [requested, setRequested] = React.useState(false);

  const handleRequest = () => {
    setRequested(true);
    setTimeout(() => setRequested(false), 3000);
  };

  return (
    <PageTransition>
      <div className="pt-28 pb-20 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-text-main mb-4">Shop by Category</h1>
            <p className="text-text-muted text-lg">Browse our wide selection of categories to find exactly what you need for your kitchen and home.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-20 bg-primary rounded-[3rem] p-12 text-center text-white overflow-hidden relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
            
            <h2 className="text-3xl font-bold mb-6 relative z-10">Don't see what you're looking for?</h2>
            <p className="text-white/80 mb-8 max-w-lg mx-auto relative z-10">We are constantly adding new categories and products to our catalog. Request a product and we'll try to stock it!</p>
            <button 
              onClick={handleRequest}
              className={`bg-white text-primary px-10 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all shadow-xl relative z-10 ${requested ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={requested}
            >
              {requested ? 'Request Sent! ✅' : 'Request a Category'}
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Categories;
