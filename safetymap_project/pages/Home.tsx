import React from "react";
import HeroSection from "../components/home/HeroSection";
import CitySearch from "../components/home/CitySearch";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CitySearch />
    </div>
  );
}
