import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import "./CheckoutPage.css";
import Confetti from "react-confetti";

export default function CheckoutPage() {
  const { cartItems } = useContext(CartContext);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const loadRazorpay = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => alert("Razorpay SDK failed to load.");
    script.onload = () => {
      const options = {
        key: "rzp_test_6rI46ULTCCLXhy",
        amount: total * 100,
        currency: "INR",
        name: "MediMart",
        description: "Medicine Purchase",
        handler: function (response) {
          console.log("Payment successful:", response.razorpay_payment_id);
          setPaymentSuccess(true);
          setShowConfetti(true);
        },
        prefill: {
          name: "Archi Porwal",
          email: "porwalarchi1406@gmail.com",
          contact: "9999999999",
        },
        theme: {
          color: "#4F86C6",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    };
    document.body.appendChild(script);
  };

  
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  return (
    <div className="checkout-container">
      <h2>Complete Your Purchase</h2>

      <div className="cart-summary">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>
                  {item.name} - ₹{item.price}
                </li>
              ))}
            </ul>
            <h3>Total: ₹{total}</h3>
            <button className="pay-now-btn" onClick={loadRazorpay}>
              Pay Now 💳
            </button>
          </>
        )}
      </div>

      {paymentSuccess && (
        <div className="success-message">
          ✅ Payment Successful! Thank you for your order.
        </div>
      )}

      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
    </div>
  );
}
