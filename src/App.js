import React, { useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import DrListing from "./components/DrListing";
import Equipment from "./components/Equipment";
import PrescriptionUpload from "./components/PrescriptionUpload";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import CheckoutPage from "./pages/CheckoutPage";   


function Home() {
  const prescriptionRef = useRef(null);

  return (
    <>
      <Navbar
        scrollToPrescription={() =>
          prescriptionRef.current?.scrollIntoView({ behavior: "smooth" })
        }
      />

      <Hero />
      <Categories />
      <DrListing />
      <Equipment />

      <div ref={prescriptionRef}>
        <PrescriptionUpload />
      </div>

      <Footer />
      <ChatBot />
    </>
  );
}


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </BrowserRouter>
  );
}
