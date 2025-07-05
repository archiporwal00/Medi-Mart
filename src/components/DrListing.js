import React, { useContext } from "react";
import "./DrListing.css";
import { CartContext } from "../context/CartContext";

import med1 from "../assets/med-1.jpeg";
import med2 from "../assets/med-2.jpg";
import med3 from "../assets/med-3.webp";
import med4 from "../assets/med4.webp";
import med5 from "../assets/med5.webp";
import med6 from "../assets/med6.jpg";


const medicines = [
  { id: 1, name: "Paracetamol 500 mg", price: "₹30",  image: med1 },
  { id: 2, name: "Dolo 650",           price: "₹45",  image: med2 },
  { id: 3, name: "Asthalin Inhaler",   price: "₹120", image: med3 },
  { id: 4, name: "Cetirizine 10 mg",   price: "₹18",  image: med4 },
  { id: 5, name: "ORS Sachet",         price: "₹15",  image: med5 },
  { id: 6, name: "Vitamin‑C Tablets",  price: "₹110", image: med6 },
];



export default function DrListing() {
    const { addToCart } = useContext(CartContext);
  return (
    <section className="dr-listing">
      <h2 className="dr-title">Popular&nbsp;Medicines</h2>

      <div className="dr-grid">
        {medicines.map((med) => (
          <div key={med.id} className="dr-card">
            <img src={med.image} alt={med.name} className="dr-image" />

            <h3 className="dr-name">{med.name}</h3>
            <p className="dr-price">{med.price}</p>

            <button className="dr-btn" onClick={() => addToCart(med)}>
  Add to Cart
</button>
          </div>
        ))}
      </div>
    </section>
  );
}