
import React, { useState, useEffect } from "react";


const categories = [
  "Gynecologist",
  "Dermatologist",
  "Cardiologist",
  "Pediatrician",
  "ENT Specialist",
  "Dentist",
];

const fakeDoctors = [
  {
    id: 1,
    name: "Dr. Asha Singh",
    category: "Gynecologist",
    distance: "2.1 km",
    phone: "9876543210",
    address: "123 City Hospital Rd",
    available: true,
  },
  {
    id: 2,
    name: "Dr. Ravi Verma",
    category: "Dermatologist",
    distance: "3.8 km",
    phone: "9123456780",
    address: "SkinCare Clinic, Main Market",
    available: false,
  },
  
];

export default function NearbyDoctors() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        () => setError("Location access denied."),
        { timeout: 10000 }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  const filteredDoctors = fakeDoctors.filter(
    (doc) => doc.category === selectedCategory
  );

  return (
    <div className="nearby-doctors">
      <h2>Find Nearby Doctors</h2>

      <div className="category-buttons">
        {categories.map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {!location && error && <p className="error">{error}</p>}

      {selectedCategory && (
        <div className="doctor-list">
          <h3>{selectedCategory} near you:</h3>
          {filteredDoctors.length === 0 ? (
            <p>No doctors found in this category.</p>
          ) : (
            filteredDoctors.map((doc) => (
              <div key={doc.id} className="doctor-card">
                <h4>{doc.name}</h4>
                <p><strong>Distance:</strong> {doc.distance}</p>
                <p><strong>Phone:</strong> {doc.phone}</p>
                <p><strong>Address:</strong> {doc.address}</p>
                <p className={doc.available ? "available" : "unavailable"}>
                  {doc.available ? "🟢 Available" : "🔴 Unavailable"}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
