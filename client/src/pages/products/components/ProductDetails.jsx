import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ShoppingCart, ShieldCheck, Truck, RotateCcw, Check } from "lucide-react";
import { useCart } from "../../../context/CartContext";
import products from "../../../utils/dataProducts";


const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    // Find product by ID
    const foundProduct = products.find((p) => p.id.toString() === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedColor(foundProduct.colors[0]);
      setSelectedSize(foundProduct.sizes[0]);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 animate-pulse">Loading product...</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      ...product,
      selectedColor,
      selectedSize,
      quantity: 1,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-32">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors mb-8 font-medium"
      >
        <ChevronLeft size={20} />
        Back to shop
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        
        {/* Left: Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col">
          <div className="mb-6">
            <span className="text-indigo-600 font-bold text-sm uppercase tracking-widest bg-indigo-50 px-4 py-1.5 rounded-full">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 leading-tight">
              {product.name}
            </h1>
            <p className="text-2xl font-black text-indigo-600 mt-4">
              {new Intl.NumberFormat("en-BD", { style: "currency", currency: "BDT", minimumFractionDigits: 0 }).format(product.price)}
            </p>
          </div>

          <div className="space-y-8">
            <p className="text-gray-500 leading-relaxed text-lg">
              {product.description || product.shortDescription}
            </p>

            {/* Color Selector */}
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-3">
                Select Color: <span className="text-gray-900">{selectedColor}</span>
              </h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 p-1 transition-all ${
                      selectedColor === color ? "border-indigo-600 scale-110" : "border-transparent"
                    }`}
                  >
                    <div 
                      className="w-full h-full rounded-full border border-black/10" 
                      style={{ backgroundColor: color.toLowerCase() }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-3">
                Select Size
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-2xl font-bold border-2 transition-all ${
                      selectedSize === size 
                      ? "border-indigo-600 bg-indigo-50 text-indigo-600" 
                      : "border-gray-100 text-gray-500 hover:border-indigo-200"
                    }`}
                  >
                    {size.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="pt-4">
              <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`w-full h-16 rounded-[1.5rem] font-black text-lg flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl ${
                  isAdded 
                  ? "bg-green-500 text-white shadow-green-100" 
                  : "bg-gray-900 text-white hover:bg-indigo-600 shadow-indigo-100"
                }`}
              >
                {isAdded ? (
                  <><Check size={24} /> Added to Cart</>
                ) : (
                  <><ShoppingCart size={22} strokeWidth={2.5} /> Add to Cart</>
                )}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100">
              <div className="flex flex-col items-center text-center gap-2">
                <Truck size={20} className="text-indigo-500" />
                <span className="text-[10px] font-bold text-gray-400 uppercase">Fast Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <ShieldCheck size={20} className="text-indigo-500" />
                <span className="text-[10px] font-bold text-gray-400 uppercase">Secure Pay</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RotateCcw size={20} className="text-indigo-500" />
                <span className="text-[10px] font-bold text-gray-400 uppercase">Easy Return</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;