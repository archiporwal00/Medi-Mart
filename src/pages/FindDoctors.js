
import React, { useState } from "react";
import "./FindDoctors.css"; 

const categories = [
  "General Physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatrician",
  "Cardiologist",
  "Dentist",
];

export default function FindDoctors() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    // Location + API fetching will be added later
  };

  return (
    <div className="find-doctors-page">
      <h2>Find Nearby Doctors</h2>

      <div className="category-list">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div className="results-section">
          <h3>Nearby {selectedCategory}s</h3>
          <p>(Location access & data fetching coming next)</p>
        </div>
      )}
    </div>
  );
}
