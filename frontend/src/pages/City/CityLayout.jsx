import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";

export default function CityLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Main content grows to fill available space */}
      <main className="flex-grow max-w-screen-xl mx-auto px-4 py-8 w-full">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}
