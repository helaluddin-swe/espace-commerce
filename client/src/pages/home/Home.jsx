import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

// Data & Assets
import products from "../../utils/dataProducts";
import FeatureImg from "../../images/ecommerce.png";
import Category from "../products/components/Category";
import ProductCard from "../products/components/ProductCard";

// Components


function HomePage() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchParams] = useSearchParams();
  
  // Get category from URL query string (e.g., /?category=electronics)
  const selectedCategory = searchParams.get('category');

  useEffect(() => {
    const filterData = () => {
      // If no category is selected or it's "all", show everything
      if (!selectedCategory || selectedCategory === "all") {
        setFilteredProducts(products);
      } else {
        // Filter products based on the slug in the URL
        const filtered = products.filter(
          (product) => product.category.toLowerCase() === selectedCategory.toLowerCase()
        );
        setFilteredProducts(filtered);
      }
    };
    filterData();
  }, [selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 mt-16 md:mt-20">
      
      {/* Hero Section */}
      <div className="mb-10 relative w-full h-64 md:h-96 rounded-3xl overflow-hidden shadow-2xl">
        <img 
          src={FeatureImg} 
          alt="Feature branding" 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
        />
        {/* Changed to bg-gradient-to-r for standard Tailwind support */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent flex items-center px-8 md:px-16">
          <h1 className="text-white text-4xl md:text-6xl font-black max-w-md leading-tight">
            Upgrade Your <span className="text-indigo-400">Lifestyle.</span>
          </h1>
        </div>
      </div>

      {/* Category Filter Section */}
      <div className="mb-10">
        <div className="flex flex-col gap-1 mb-4">
          <h2 className="text-2xl font-black text-gray-900">Explore Collections</h2>
          <div className="w-12 h-1 bg-indigo-600 rounded-full"></div>
        </div>
        {/* Ensure Category component uses useSearchParams to set the URL */}
        <Category />
      </div>

      {/* Product Grid Header */}
      <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 capitalize">
            {selectedCategory && selectedCategory !== "all" 
              ? selectedCategory 
              : "All Collection"}
          </h2>
          <p className="text-gray-400 text-sm font-medium mt-1">
            Handpicked premium products for you
          </p>
        </div>
        <p className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm border border-indigo-100">
          {filteredProducts.length} items
        </p>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
          <div className="max-w-xs mx-auto">
            {/* Added a bit of flair to the "Not Found" state */}
            <div className="text-indigo-200 mb-4 flex justify-center">
               <svg size={48} fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-16 h-16">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
               </svg>
            </div>
            <p className="text-gray-500 font-bold text-lg">No products found</p>
            <p className="text-gray-400 text-sm mt-2">
              We couldn't find any items in the "{selectedCategory}" category.
            </p>
            <button 
              onClick={() => window.history.pushState({}, '', '/')}
              className="mt-6 text-indigo-600 font-bold text-sm hover:underline"
            >
              Clear filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;