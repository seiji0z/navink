import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Tokens from "../components/dashboard/TokensCard";
import CurrentQueues from "../components/dashboard/CurrentQueuesCard";
import Notifications from "../components/dashboard/NotificationsCard";
import PrintHistory from "../components/dashboard/PrintHistoryCard";
import PoliciesCard from "../components/dashboard/PoliciesCard";
import PrintButton from "../components/dashboard/PrintButton";

function Home() {
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
        <h2 className="text-2xl font-semibold text-navi mb-4">Dashboard</h2>

        <PrintButton /> 

        {/* Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 flex-1 pt-4 sm:pt-6">
          <Tokens />
          <CurrentQueues />
          <Notifications />
          <PoliciesCard />
          <PrintHistory />
        </div>
      </main>
    </div>
  );
}

export default Home;