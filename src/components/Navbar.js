import React, { useState, useContext } from "react";
import "./Navbar.css";
import { CartContext } from "../context/CartContext";
import CartDrawer from "./CartDrawer";
import AuthModal from "./Auth";

export default function Navbar({ scrollToPrescription }) {
  const { cartCount } = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [location, setLocation] = useState("Get My Location");

  const getUserLocation = async () => {
    if (!navigator.geolocation) return setLocation("Not supported");

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude, longitude } = coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const city =
            data.address.city || data.address.town || data.address.village || "Your Area";
          setLocation(city);
        } catch {
          setLocation("Unknown");
        }
      },
      () => setLocation("Permission denied")
    );
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <h1 className="logo">MediMart 💊</h1>
        </div>

        <div className="navbar-center">
          <input
            type="text"
            className="search-input"
            placeholder="Search medicines, devices..."
          />
        </div>

        <div className="navbar-right">
          <button className="nav-btn" onClick={scrollToPrescription}>
            📄 Upload Prescription
          </button>

          <button className="nav-btn" onClick={getUserLocation}>
            📍 {location}
          </button>

          <button className="nav-btn" onClick={() => setShowAuth(true)}>
            Login
          </button>

          <button className="nav-btn" onClick={() => setShowCart(true)}>
            🛒 Cart <span className="cart-count">({cartCount})</span>
          </button>
        </div>
      </nav>

      <CartDrawer isOpen={showCart} onClose={() => setShowCart(false)} />
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
}
