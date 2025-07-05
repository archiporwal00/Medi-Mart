import React from "react";
import "./Hero.css";
import banner from "../assets/hero-banner.png";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-wrapper">
        <img src={banner} alt="MediMart Welcome Banner" className="hero-banner" />
      </div>
    </section>
  );
}
