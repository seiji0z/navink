import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import GenerateReportCard from "../components/usage/GenerateReportCard";
import GeneratedReportsTable from "../components/usage/GeneratedReportsTable";

function Usage() {
  const [isOpen, setIsOpen] = useState(true);

  // Mock data for generated reports
  const reports = [
    {
      name: "Weekly Report - Week 40",
      type: "Weekly Usage",
      dateRange: "2025-10-01 to 2025-10-07",
      generatedBy: "Admin User",
    },
    {
      name: "Daily Summary - Oct 6",
      type: "Daily Summary",
      dateRange: "2025-10-06",
      generatedBy: "System (Auto)",
    },
    {
      name: "First Semester 2025",
      type: "Semester Overview",
      dateRange: "2025-01-05 to 2025-05-30",
      generatedBy: "Admin User",
    },
  ];

  return (
    <div className="fade-in flex h-screen bg-sky-100 overflow-hidden">
      <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <main className="flex-1 p-8 flex flex-col">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Usage & Activity</h1>

        {/* White Card */}
        <div className="bg-white rounded-3xl p-6 shadow-md flex-1 overflow-hidden flex flex-col space-y-8">
          <GenerateReportCard onGenerate={() => {}} />
          <GeneratedReportsTable reports={reports} />
        </div>
      </main>
    </div>
  );
}

export default Usage;