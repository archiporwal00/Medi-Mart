
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CartDrawer from "./CartDrawer";
import AuthModal from "./Auth";
import "./Navbar.css";

export default function Navbar({ scrollToPrescription }) {
  const { cartCount = 0 } = useContext(CartContext) || {};
  const { user, logout } = useAuth();

  const [showCart, setShowCart] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("Get My Location");

  const navigate = useNavigate();

  const runSearch = () => {
    if (!search.trim()) return;
    navigate(`/products?q=${encodeURIComponent(search.trim())}`);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") runSearch();
  };

  const getUserLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation(`📍 ${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
      },
      (err) => alert("Failed to get location")
    );
  };

  // Auto close AuthModal if user logs in
  useEffect(() => {
    if (user) setShowAuth(false);
  }, [user]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <h1 className="logo" onClick={() => navigate("/")}>MediMart 💊</h1>
        </div>

        <div className="navbar-center">
          <input
            type="text"
            className="search-input"
            placeholder="Search medicines, devices…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={onKeyPress}
          />
          <button className="nav-btn" onClick={runSearch}>🔍</button>
          <button className="nav-btn" onClick={scrollToPrescription}>📤 Upload Rx</button>
          <button className="nav-btn" onClick={getUserLocation}>{location}</button>
        </div>

        <div className="navbar-right">
          <button className="nav-btn" onClick={() => setShowCart(true)}>
            🛒 Cart ({cartCount})
          </button>

          {user ? (
  <>
    <span className="nav-btn">👋 Welcome, {user.email.split("@")[0]}</span>
    <button className="nav-btn" onClick={logout}>Logout</button>
  </>
) : (
  <button className="nav-btn" onClick={() => setShowAuth(true)}>Login / Signup</button>
)}

        </div>
      </nav>

      <CartDrawer isOpen={showCart} onClose={() => setShowCart(false)} />
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
}
