
import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { useProductView } from "../context/ProductViewContext";
import { CartContext } from "../context/CartContext";

import med1 from "../assets/med-1.jpeg";
import med2 from "../assets/med-2.jpg";
import med3 from "../assets/med-3.webp";
import med4 from "../assets/med4.webp";
import med5 from "../assets/med5.webp";
import med6 from "../assets/med6.jpg";

const allMedicines = [
  { id: 1, name: "Paracetamol 500 mg", price: 30, image: med1 },
  { id: 2, name: "Dolo 650", price: 45, image: med2 },
  { id: 3, name: "Asthalin Inhaler", price: 120, image: med3 },
  { id: 4, name: "Cetirizine 10 mg", price: 18, image: med4 },
  { id: 5, name: "ORS Sachet", price: 15, image: med5 },
  { id: 6, name: "Vitamin‑C Tablets", price: 110, image: med6 },
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
  const query = useQuery();
  const { view, setView } = useProductView();
  const { addToCart } = useContext(CartContext);
  const searchTerm = query.get("q")?.toLowerCase() || "";

  const results = allMedicines.filter((med) =>
    med.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="search-results">
      <h2>Search Results for "{searchTerm}"</h2>

      <div className="view-toggle">
        <button
          onClick={() => setView("grid")}
          className={view === "grid" ? "active" : ""}
        >
          🔲 Grid
        </button>
        <button
          onClick={() => setView("list")}
          className={view === "list" ? "active" : ""}
        >
          📋 List
        </button>
      </div>

      <div className={`product-list ${view}`}>
        {results.length === 0 ? (
          <p>No results found.</p>
        ) : (
          results.map((med) => (
            <div className="product-card" key={med.id}>
              <img src={med.image} alt={med.name} />
              <h3>{med.name}</h3>
              <p>₹{med.price}</p>
              <button onClick={() => addToCart(med)}>Add to Cart</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
