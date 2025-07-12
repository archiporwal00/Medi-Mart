import React, { createContext, useContext, useState } from "react";

const ProductViewContext = createContext();
export const useProductView = () => useContext(ProductViewContext);

export function ProductViewProvider({ children }) {
  const [view, setView] = useState("grid"); // "grid" or "list"
  return (
    <ProductViewContext.Provider value={{ view, setView }}>
      {children}
    </ProductViewContext.Provider>
  );
}
