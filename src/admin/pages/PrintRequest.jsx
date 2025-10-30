import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import PendingRequestsTable from "../components/printRequest/PendingRequestsTable";

function Request() {
  const [isOpen, setIsOpen] = useState(true);

  const initialRequests = [
    {
      id: 1,
      studentName: "Gabriel Flores",
      studentId: "220057@slu.edu.ph",
      document: "Final_Thesis.pdf",
      submitted: "41 mins ago",
      status: "Pending",
    },
    {
      id: 2,
      studentName: "Gabriel Flores",
      studentId: "220057@slu.edu.ph",
      document: "Final_Thesis.pdf",
      submitted: "41 mins ago",
      status: "Pending",
    },
    {
      id: 3,
      studentName: "Gabriel Flores",
      studentId: "220057@slu.edu.ph",
      document: "Final_Thesis.pdf",
      submitted: "41 mins ago",
      status: "Pending",
    },
    {
      id: 4,
      studentName: "Gabriel Flores",
      studentId: "220057@slu.edu.ph",
      document: "Final_Thesis.pdf",
      submitted: "41 mins ago",
      status: "Pending",
    },
  ];

  const [requests, setRequests] = useState(initialRequests);

  const handleApprove = (req) => {
    setRequests((prev) => prev.map((r) => (r.id === req.id ? { ...r, status: "Approved" } : r)));
    // TODO: call API to approve request
  };

  const handleDecline = (req) => {
    setRequests((prev) => prev.map((r) => (r.id === req.id ? { ...r, status: "Declined" } : r)));
    // TODO: call API to decline request
  };

  return (
    <div className="fade-in flex min-h-screen bg-sky-100">
      {/* Sidebar */}
      <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <main className="flex-1 p-8 flex flex-col">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Manage Print Request</h1>

        <PendingRequestsTable requests={requests} onApprove={handleApprove} onDecline={handleDecline} />
      </main>
    </div>
  );
}

export default Request;