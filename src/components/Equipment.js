
import React, { useContext } from "react";
import "./Equipment.css";
import { CartContext } from "../context/CartContext";

import eq1 from "../assets/equi1.jpg";
import eq2 from "../assets/equi2.webp";
import eq3 from "../assets/equi3.webp";
import eq4 from "../assets/equi4.webp";
import eq5 from "../assets/equi5.webp";
import eq6 from "../assets/equi6.webp";

const tools = [
  { id: 1, name: "Digital Thermometer", price: 180, image: eq1 },
  { id: 2, name: "Pulse Oximeter", price: 799, image: eq2 },
  { id: 3, name: "BP Monitor", price: 1299, image: eq3 },
  { id: 4, name: "Glucometer Kit", price: 1049, image: eq4 },
  { id: 5, name: "Steam Vaporizer", price: 299, image: eq5 },
  { id: 6, name: "Hot Water Bag", price: 120, image: eq6 },
];

export default function Equipment() {
  const { addToCart, removeFromCart, getQuantity } = useContext(CartContext);

  return (
    <section className="equipment">
      <h2 className="eq-title">Medical Equipment</h2>

      <div className="eq-grid">
        {tools.map((tool) => {
          const quantity = getQuantity(tool.id);
          return (
            <div key={tool.id} className="eq-card">
              <img src={tool.image} alt={tool.name} className="eq-image" />

              <h3 className="eq-name">{tool.name}</h3>
              <p className="eq-price">₹{tool.price}</p>

              {quantity === 0 ? (
                <button onClick={() => addToCart(tool)}>Add to Cart</button>
              ) : (
                <div className="qty-controls">
                  <button onClick={() => removeFromCart(tool.id)}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => addToCart(tool)}>+</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
