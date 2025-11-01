import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import PrintDetailsSettings from "../components/systemConfiguration/PrintDetailsSettings";
import PrinterManagement from "../components/systemConfiguration/PrinterManagement";
import AuditLog from "../components/systemConfiguration/AuditLog";

function Configuration() {
  const [isOpen, setIsOpen] = useState(true);

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
      <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <main className="flex-1 p-8 flex flex-col">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          System Configuration
        </h1>

        {/* White Card */}
        <div className="bg-white rounded-3xl p-6 shadow-md flex-1 overflow-y-auto flex flex-col">
          {/* Print Details Component */}
          <div className="mb-6">
            <PrintDetailsSettings />
          </div>

          {/* Printer Management Component */}
          <div className="mb-6">
            <PrinterManagement />
          </div>

          {/* Audit Log Component */}
          <div>
            <AuditLog auditLogs={auditLogs} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Configuration;