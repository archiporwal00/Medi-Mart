
import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

export default function Auth({ isOpen, onClose }) {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const { login } = useAuth(); 

  if (!isOpen) return null;

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let userCred;
      if (isSignup) {
        userCred = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        alert(`Welcome, ${formData.name}!`);
        login(userCred.user); 
      } else {
        userCred = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        alert(`Logged in as ${userCred.user.email}`);
        login(userCred.user);
      }

      onClose(); 
    } catch (err) {
      console.error("Auth error:", err.code, err.message);
      setError(err.message);
    }
  };

  return (
    <div className="auth-backdrop">
      <div className="auth-box">
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>

        {error && <p className="auth-error">{error}</p>}

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

        <button className="auth-close" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
}
