
import React, { useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

// Components & Pages
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import DrListing from "./components/DrListing";
import Equipment from "./components/Equipment";
import PrescriptionUpload from "./components/PrescriptionUpload";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";


import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import FindDoctors from "./pages/FindDoctors";
import NearbyDoctors from "./pages/NearbyDoctors";


// Contexts
import { SearchProvider } from "./pages/SearchContext";
import { ProductViewProvider } from "./context/ProductViewContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

function Home() {
  const prescriptionRef = useRef(null);
  const categoriesRef = useRef(null);
  const medicinesRef = useRef(null);
  const equipmentRef = useRef(null);

  return (
    <SearchProvider>
      <ProductViewProvider>
        <Navbar
          scrollToPrescription={() => prescriptionRef.current?.scrollIntoView({ behavior: "smooth" })}
          scrollToCategories={() => categoriesRef.current?.scrollIntoView({ behavior: "smooth" })}
          scrollToMedicines={() => medicinesRef.current?.scrollIntoView({ behavior: "smooth" })}
          scrollToEquipment={() => equipmentRef.current?.scrollIntoView({ behavior: "smooth" })}
        />

        <Hero />
        <div ref={categoriesRef}><Categories /></div>
        <div ref={medicinesRef}><DrListing /></div>
        <div ref={equipmentRef}><Equipment /></div>
        <div ref={prescriptionRef}><PrescriptionUpload /></div>

        <FindDoctors/>

        <Footer />
        <ChatBot />
      </ProductViewProvider>
    </SearchProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
       <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/find-doctors" element={<FindDoctors />} />
        <Route path="/doctors-nearby" element={<NearbyDoctors />} />
      </Routes>
      </CartProvider>
    </AuthProvider>
  );
}
