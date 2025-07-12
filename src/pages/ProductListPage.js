import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function ProductListPage({ products }) {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [viewMode, setViewMode] = useState("grid");

  
  useEffect(() => {
    setSearchTerm(initialQuery);
  }, [initialQuery]);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleView = () =>
    setViewMode((prev) => (prev === "grid" ? "list" : "grid"));

  return (
    <div className="product-page-container">
      
      {!initialQuery && (
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      )}

      <button onClick={toggleView} className="view-toggle-btn">
        Switch to {viewMode === "grid" ? "List" : "Grid"} View
      </button>

      <div className={`product-display ${viewMode}`}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} view={viewMode} />
        ))}
      </div>
    </div>
  );
}

export default ProductListPage;
