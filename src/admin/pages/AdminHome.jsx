import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import TotalUsersCard from "../components/dashboard/TotalUsersCard";
import PendingRequestsCard from "../components/dashboard/PendingRequestsCard";
import ActivePrintersCard from "../components/dashboard/ActivePrintersCard";
import PendingPrintRequestsCard from "../components/dashboard/PendingPrintRequestsCard";
import PrintQueueCard from "../components/dashboard/PrintQueueCard";

function AdminHome() {
  const [isOpen, setIsOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="fade-in flex h-screen bg-sky-100 overflow-hidden">
      {/* Mobile hamburger button (phones only) */}
      <button
        aria-label="Open sidebar"
        className="md:hidden fixed top-4 left-4 z-50 bg-white/90 text-sky-600 rounded-md p-2 shadow-md"
        onClick={() => setMobileOpen(true)}
      >
        {/* Placeholder hamburger icon (replace with asset later) */}
        <span className="text-xl">☰</span>
      </button>

      {/* Sidebar (desktop and mobile overlay handled inside AdminSidebar) */}
      <AdminSidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content */}
      <main className="flex-1 p-8 flex flex-col relative overflow-y-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h2
            className="text-2xl font-semibold text-gray-700"
            style={{ fontFamily: "Urbanist-Bold, sans-serif" }}
          >
            Welcome!
          </h2>
          <h1
            className="text-3xl font-bold text-sky-600"
            style={{ fontFamily: "Urbanist-Bold, sans-serif" }}
          >
            Tim Berners–Lee
          </h1>
        </div>

        {/* Top Row – Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <TotalUsersCard />
          <PendingRequestsCard />
          <ActivePrintersCard />
        </div>

        {/* Bottom Row – Requests and Queue */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 items-stretch">
          <PendingPrintRequestsCard />
          <PrintQueueCard />
        </div>
      </main>
    </div>
  );
}

export default AdminHome;