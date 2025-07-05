
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => setCartItems((prev) => [...prev, item]);

  const removeFromCart = (id) =>
    setCartItems((prev) => prev.filter((itm) => itm.id !== id));

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.length;
  const cartTotal = cartItems.reduce(
    (sum, itm) => sum + Number(itm.price.replace(/[^0-9]/g, "")),
    0
  );

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, cartCount, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};
