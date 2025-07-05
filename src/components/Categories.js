import React from "react";
import "./Categories.css";

const categoryData = [
  { name: "Pain Relief", icon: "💊" },
  { name: "Skin Care", icon: "🧴" },
  { name: "Diabetes", icon: "🩸" },
  { name: "Immunity", icon: "🛡️" },
  { name: "Baby Care", icon: "🍼" },
  { name: "Heart Health", icon: "❤️" },
];

export default function Categories() {
  return (
    <section className="categories">
      <h2 className="categories-title">Shop by Category</h2>
      <div className="category-grid">
        {categoryData.map((cat, index) => (
          <div key={index} className="category-card">
            <div className="category-icon">{cat.icon}</div>
            <div className="category-name">{cat.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
