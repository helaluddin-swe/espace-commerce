import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // 1. Load from LocalStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('shopping-cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        setCartItems(Array.isArray(parsed) ? parsed : []);
      } catch (e) {
        console.error("Failed to load local cart:", e);
        setCartItems([]);
      }
    }
    setIsInitialized(true);
  }, []);

  // 2. Save to LocalStorage whenever cartItems change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('shopping-cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isInitialized]);

  // 3. Derived State (Count and Total)
  const { cartCount, total } = useMemo(() => {
    return cartItems.reduce(
      (acc, item) => {
        const qty = Number(item.quantity) || 0;
        const price = Number(item.price) || 0;
        acc.cartCount += qty;
        acc.total += qty * price;
        return acc;
      },
      { cartCount: 0, total: 0 }
    );
  }, [cartItems]);

  // 4. Actions
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.id === product.id &&
          item.selectedColor === product.selectedColor &&
          item.selectedSize === product.selectedSize
      );

      if (existingIndex > -1) {
        const updatedCart = [...prev];
        updatedCart[existingIndex].quantity += product.quantity;
        return updatedCart;
      }
      return [...prev, product];
    });
  };

  const updateQuantity = (id, color, size, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.selectedColor === color && item.selectedSize === size
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeFromCart = (id, color, size) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(item.id === id && item.selectedColor === color && item.selectedSize === size)
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    cartCount,
    total,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};