import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import PrintDetailsSettings from "../components/systemConfiguration/PrintDetailsSettings";
import PrinterManagement from "../components/systemConfiguration/PrinterManagement";
import AuditLog from "../components/systemConfiguration/AuditLog";

function Configuration() {
  const [isOpen, setIsOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const auditLogs = [
    {
      timestamp: "2025-10-07 14:33:15",
      admin: "admin@navink.com",
      setting: "Color Cost Rate",
      oldValue: "3",
      newValue: "5",
    },
    {
      timestamp: "2025-10-06 09:15:00",
      admin: "admin@navink.com",
      setting: "Printer Status: HP LaserJet",
      oldValue: "Active",
      newValue: "Inactive",
    },
  ];

  return (
    <div className="fade-in flex h-screen bg-sky-100 overflow-hidden">
      {/* Hamburger for mobile */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-white rounded-full shadow-lg px-4 py-2 flex items-center text-xl font-bold"
        onClick={() => setMobileOpen(true)}
        aria-label="Open sidebar"
      >
        ☰
      </button>
      <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content */}
      <main className="flex-1 p-8 flex flex-col overflow-y-auto">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          System Configuration
        </h1>

        {/* Print Details Component */}
        <div className="mb-6">
          <PrintDetailsSettings />
        </div>

        {/* Printer Management Component */}
        <div className="mb-6">
          <PrinterManagement />
        </div>

        {/* Audit Log Component */}
        <AuditLog auditLogs={auditLogs} />
      </main>
    </div>
  );
}

export default Configuration;