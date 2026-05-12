import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import PageTransition from '../components/PageTransition';
import { products, categories } from '../data/products';
import { Filter, Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useSearch } from '../context/SearchContext';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category') || 'all';
  const { searchQuery, setSearchQuery } = useSearch();
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = categoryFilter === 'all' || p.category.toLowerCase() === categoryFilter.toLowerCase();
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // Default to featured
    });
  }, [categoryFilter, searchQuery, sortBy]);

  const handleCategoryChange = (cat) => {
    setSearchParams({ category: cat });
  };

  return (
    <PageTransition>
      <div className="pt-28 pb-20 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-extrabold text-text-main mb-4">Our Shop</h1>
            <p className="text-text-muted">Discover fresh groceries and daily essentials at the best prices.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 shrink-0">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-28">
                <div className="flex items-center gap-2 font-bold text-text-main mb-6">
                  <Filter size={20} className="text-primary" />
                  Filters
                </div>

                <div className="mb-8">
                  <h4 className="text-sm font-bold text-text-main mb-4 uppercase tracking-wider">Categories</h4>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleCategoryChange('all')}
                      className={`text-left px-4 py-2 rounded-xl text-sm transition-all ${
                        categoryFilter === 'all' ? 'bg-primary text-white font-bold' : 'text-text-muted hover:bg-gray-50'
                      }`}
                    >
                      All Categories
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryChange(cat.name.toLowerCase())}
                        className={`text-left px-4 py-2 rounded-xl text-sm transition-all ${
                          categoryFilter === cat.name.toLowerCase() ? 'bg-primary text-white font-bold' : 'text-text-muted hover:bg-gray-50'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-text-main mb-4 uppercase tracking-wider">Sort By</h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>
            </aside>

            {/* Product Grid */}
            <main className="flex-1">
              {/* Search Bar Mobile/Tablet */}
              <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
                <div className="relative flex-1 group w-full">
                  <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl shadow-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <Search className="absolute left-4 top-4 text-text-muted group-focus-within:text-primary" size={24} />
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-text-muted whitespace-nowrap bg-white px-4 py-4 rounded-2xl border border-gray-100 shadow-sm">
                  Showing <span className="text-primary">{filteredProducts.length}</span> Products
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-[3rem] p-20 text-center shadow-sm border border-gray-100">
                  <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-text-muted">
                    <Search size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-text-main mb-2">No Products Found</h3>
                  <p className="text-text-muted mb-8">Try adjusting your filters or search terms to find what you're looking for.</p>
                  <button
                    onClick={() => { setSearchQuery(''); handleCategoryChange('all'); }}
                    className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Shop;
