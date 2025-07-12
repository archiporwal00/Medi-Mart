
import React, { useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer"; 
import { Outlet } from "react-router-dom";

export default function Layout() {
  const prescriptionRef = useRef(null);

  const scrollToPrescription = () => {
    if (prescriptionRef.current) {
      prescriptionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar scrollToPrescription={scrollToPrescription} />
      <main>
        <Outlet context={{ prescriptionRef }} />
      </main>
      <Footer />
    </>
  );
}
