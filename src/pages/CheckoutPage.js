import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import useRazorpay from "react-razorpay";
import "./CheckoutPage.css";

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useContext(CartContext);
  const Razorpay = useRazorpay();
  const nav = useNavigate();

  const [form, setForm] = useState({ name: "", address: "", phone: "" });
  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const pay = async () => {
    if (!cartItems.length) return alert("Cart is empty!");

    
    const res = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ total: cartTotal }),
    }).then((r) => r.json());

    const rzp = new Razorpay({
      key: res.key,
      amount: res.amount,
      currency: "INR",
      order_id: res.id,
      name: "MediMart",
      description: "Medicine Purchase",
      prefill: { name: form.name, contact: form.phone },
      handler: async (response) => {
        // ② verify payment
        const verify = await fetch("/api/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        }).then((r) => r.json());

        if (verify.success) {
          clearCart();
          alert("✅ Order placed! Thank you.");
          nav("/"); 
        } else {
          alert("Payment failed");
        }
      },
    });

    rzp.open();
  };

  return (
    <div className="checkout-wrapper">
      <h2>Checkout</h2>

      <section className="address">
        <h3>Delivery Details</h3>
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />
      </section>

      <section className="summary">
        <h3>Order Summary</h3>
        {cartItems.map((item) => (
          <p key={item.id}>
            {item.name} × {item.quantity || 1} – ₹
            {(item.price || 0) * (item.quantity || 1)}
          </p>
        ))}
        <h4>Total: ₹{cartTotal}</h4>
      </section>

      <button
        className="pay-btn"
        disabled={!form.name || !form.address || !form.phone}
        onClick={pay}
      >
        Pay ₹{cartTotal} with Razorpay →
      </button>
    </div>
  );
}
