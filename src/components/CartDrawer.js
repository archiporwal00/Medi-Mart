import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./CartDrawer.css";

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, removeFromCart, cartTotal } = useContext(CartContext);
  const navigate = useNavigate();

  /* go to /checkout */
  const handleCheckout = () => {
    onClose();              
    navigate("/checkout");  
  };

  return (
    <div className={`drawer ${isOpen ? "open" : ""}`}>
      
      <div className="drawer-header">
        <h3>My Cart ({cartItems.length})</h3>
        <button onClick={onClose}>✕</button>
      </div>

      
      <div className="drawer-body">
        {cartItems.length === 0 && <p>Your cart is empty.</p>}

        {cartItems.map((itm) => (
          <div key={itm.id} className="drawer-item">
            <img src={itm.image} alt={itm.name} />
            <div className="item-info">
              <span>{itm.name}</span>
              <small>
                ₹{itm.price} × {itm.quantity || 1}
              </small>
            </div>
            <button onClick={() => removeFromCart(itm.id)}>🗑️</button>
          </div>
        ))}
      </div>

      {/* ========= FOOTER ========= */}
      <div className="drawer-footer">
        <p>Total: ₹{cartTotal}</p>
        <button
          className="checkout-btn"
          disabled={!cartItems.length}
          onClick={handleCheckout}
        >
          Checkout →
        </button>
      </div>
    </div>
  );
}
