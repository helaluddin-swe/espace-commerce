import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { categoryData } from "../../../utils/categoryData";
import { LayoutGrid } from "lucide-react";

const Category = () => {
  const [categories, setCategories] = useState([]);
  
  // React Router hooks
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Get current active category from URL (?category=slug)
  const selectedCategory = searchParams.get("category") || "all";

  const handleChange = (slug) => {
    if (slug === "all") {
      // Remove the category param from URL
      searchParams.delete("category");
    } else {
      // Set the category param
      searchParams.set("category", slug);
    }
    // Update the URL
    setSearchParams(searchParams);
  };

  useEffect(() => {
    // Setting data from your local utility file
    setCategories(categoryData);
  }, []);

  return (
    <div className="flex items-center gap-3 overflow-x-auto py-4 no-scrollbar scroll-smooth">
      
      {/* "All" Category Option */}
      <button
        onClick={() => handleChange("all")}
        className={`shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-semibold transition-all duration-300 shadow-sm ${
          selectedCategory === "all"
            ? "bg-indigo-600 border-indigo-600 text-white shadow-indigo-200"
            : "bg-white border-gray-200 text-gray-600 hover:border-indigo-400 hover:text-indigo-600"
        }`}
      >
        <LayoutGrid size={18} />
        All Products
      </button>

      {/* Dynamic Categories from Utils */}
      {categories.map((category) => {
        const isActive = selectedCategory === category.slug;
        const Icon = category.icon;

        return (
          <button
            key={category.slug}
            onClick={() => handleChange(category.slug)}
            className={`shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-semibold transition-all duration-300 shadow-sm ${
              isActive
                ? "bg-indigo-600 border-indigo-600 text-white shadow-indigo-200"
                : "bg-white border-gray-200 text-gray-600 hover:border-indigo-400 hover:text-indigo-600"
            }`}
          >
            {Icon && (
              <Icon 
                size={18} 
                className={isActive ? "text-white" : "text-indigo-500"} 
              />
            )}
            {category.name}
          </button>
        );
      })}
    </div>
  );
};

export default Category;