import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import FullPrintingPolicies from "../components/FullPrintingPolicies";

function Policies() {
  const [isOpen, setIsOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="fade-in flex h-screen bg-sky-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isOpen} 
        setIsOpen={setIsOpen}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Mobile Hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-lg"
        aria-label="Open sidebar"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto p-4 sm:p-6 lg:p-8 flex flex-col relative">
        <h2 className="text-2xl sm:text-3xl font-semibold text-navi mb-4 sm:mb-6 truncate">
          Printing Policies & Guidelines
        </h2>

        {/*Policies Section */}
        <div className="flex-1 bg-white rounded-2xl shadow p-4 sm:p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <FullPrintingPolicies />
        </div>
      </main>
    </div>
  );
}

export default Policies;
