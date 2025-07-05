import React, { useState, useContext } from "react";
import "./PopularMedicines.css";
import { CartContext } from "../context/CartContext";

const medicines = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    price: 45,
    image: "/images/paracetamol.jpg",
  },
  {
    id: 2,
    name: "Azithromycin 250mg",
    price: 78,
    image: "/images/azithromycin.jpg",
  },
  {
    id: 3,
    name: "Vitamin C Chewables",
    price: 60,
    image: "/images/vitamin-c.jpg",
  },
  {
    id: 4,
    name: "Dolo 650",
    price: 52,
    image: "/images/dolo.jpg",
  },
  {
    id: 5,
    name: "Cough Syrup 100ml",
    price: 65,
    image: "/images/cough.jpg",
  },
  {
    id: 6,
    name: "Pain Relief Balm",
    price: 38,
    image: "/images/balm.jpg",
  },
];

function PopularMedicines() {
  const { addToCart } = useContext(CartContext);
  const [quantities, setQuantities] = useState({});

  const handleIncrease = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const handleDecrease = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
  };

  const handleAddToCart = (medicine) => {
    const quantity = quantities[medicine.id] || 1;
    addToCart({ ...medicine, quantity });
    alert(`${medicine.name} (${quantity}) added to cart ✅`);
  };

  return (
    <div className="popular-container">
      <h2>Popular Medicines</h2>
      <div className="medicine-grid">
        {medicines.map((medicine) => (
          <div className="medicine-card" key={medicine.id}>
            <img src={medicine.image} alt={medicine.name} />
            <h3>{medicine.name}</h3>
            <p>₹{medicine.price}</p>

            <div className="quantity-controls">
              <button onClick={() => handleDecrease(medicine.id)}>➖</button>
              <span>{quantities[medicine.id] || 1}</span>
              <button onClick={() => handleIncrease(medicine.id)}>➕</button>
            </div>

            <button
              className="add-btn"
              onClick={() => handleAddToCart(medicine)}
            >
              Add to Cart 🛒
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularMedicines;
