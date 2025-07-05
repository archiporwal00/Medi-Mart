import React, { useState } from "react";
import "./Auth.css";

export default function Auth({ isOpen, onClose }) {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`You ${isSignup ? "signed up" : "logged in"} as ${formData.email}`);
  };

  return (
    <div className="auth-backdrop">
      <div className="auth-box">
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">
            {isSignup ? "Create Account" : "Login"}
          </button>
        </form>

        <p onClick={() => setIsSignup(!isSignup)} className="auth-toggle">
          {isSignup ? "Already have an account? Login" : "New user? Sign up"}
        </p>

        <button className="auth-close" onClick={onClose}>✕</button>
      </div>
    </div>
  );
}
