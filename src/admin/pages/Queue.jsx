import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import QueueFilter from "../components/printQueue/QueueFilter";
import QueueStats from "../components/printQueue/QueueStats";
import QueueTable from "../components/printQueue/QueueTable";

function Queue() {
  const [isOpen, setIsOpen] = useState(true);

  const stats = [
    { label: "The Total Print Request in Queue", value: 24, color: "text-sky-600" },
    { label: "Printing Now", value: 3, color: "text-blue-600" },
    { label: "Printing Paused", value: 2, color: "text-yellow-600" },
    { label: "Pending Approvals", value: 7, color: "text-purple-600" },
  ];

  const jobs = [
    {
      id: "#PI-2025-001",
      student: "Gabriel Flores",
      email: "2240853@slu.edu.ph",
      file: "Lec_Assignment.pdf",
      printer: "Open Lab Printer",
      status: "Printing",
      tokens: 15,
      submitted: "2 mins ago",
      action: "pause",
    },
    {
      id: "#PI-2025-001",
      student: "Gabriel Flores",
      email: "2240853@slu.edu.ph",
      file: "Lec_Assignment.pdf",
      printer: "Open Lab Printer",
      status: "Paused",
      tokens: 15,
      submitted: "2 mins ago",
      action: "resume",
    },
    {
      id: "#PI-2025-001",
      student: "Gabriel Flores",
      email: "2240853@slu.edu.ph",
      file: "Lec_Assignment.pdf",
      printer: "Open Lab Printer",
      status: "Pending",
      tokens: 15,
      submitted: "2 mins ago",
      action: "none",
    },
  ];

  return (
    <div className="fade-in flex h-screen bg-sky-100 overflow-hidden">
      <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <main className="flex-1 p-8 flex flex-col">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Print Queue Control</h1>

        {/* White Card */}
        <div className="bg-white rounded-3xl p-6 shadow-md flex-1 overflow-y-auto flex flex-col pb-4">
          
          {/* Filter & Search Component */}
          <QueueFilter />

          {/* Stats Cards Component */}
          <QueueStats stats={stats} />

          {/* Table Section Component */}
          <QueueTable jobs={jobs} />

        </div>
      </main>
    </div>
  );
}

export default Queue;