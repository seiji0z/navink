import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import avatarPlaceholder from "../../assets/images/navink-logo.png";

function Queue() {
  const [isOpen, setIsOpen] = useState(true);

  // Mock data
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

  const getStatusBadge = (status) => {
    switch (status) {
      case "Printing":
        return "bg-blue-100 text-blue-700";
      case "Paused":
        return "bg-yellow-100 text-yellow-700";
      case "Pending":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="fade-in flex min-h-screen bg-sky-100">
      <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <main className="flex-1 p-8 flex flex-col">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Print Queue Control</h1>

        {/* White Card */}
        <div className="bg-white rounded-3xl p-6 shadow-md flex-1 overflow-hidden flex flex-col">
          {/* Filter & Search Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Filter & Search</h2>
            <div className="flex flex-wrap gap-3 items-center">
              <input
                type="text"
                placeholder="Job ID or Student Name"
                className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 flex-1 min-w-[200px]"
              />
              <select className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 min-w-[160px]">
                <option>All Status</option>
                <option>Printing</option>
                <option>Paused</option>
                <option>Pending</option>
              </select>
              <select className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 min-w-[160px]">
                <option>All Printers</option>
                <option>Open Lab Printer</option>
                <option>Library Printer</option>
              </select>
              <select className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 min-w-[160px]">
                <option>All Departments</option>
                <option>Computer Science</option>
                <option>Engineering</option>
              </select>
              <button className="text-sky-600 hover:text-sky-700 text-sm font-medium whitespace-nowrap">
                Clear Filters
              </button>
            </div>
          </div>

          {/* Stats Cards - BIGGER */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm min-h-32 flex flex-col justify-center"
              >
                <p className={`text-5xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-sm text-gray-500 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Table Section */}
          <div className="flex-1 flex flex-col">
            {/* Table Title */}
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Print Jobs</h2>

            {/* Table */}
            <div className="flex-1 overflow-x-auto border border-gray-200 rounded-2xl">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                  <tr>
                    <th className="px-4 py-3">Job ID</th>
                    <th className="px-4 py-3">Student</th>
                    <th className="px-4 py-3">File Name</th>
                    <th className="px-4 py-3">Printer</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Token</th>
                    <th className="px-4 py-3">Submitted</th>
                    <th className="px-4 py-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {jobs.map((job, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 font-medium text-gray-900">{job.id}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={avatarPlaceholder}
                            alt={job.student}
                            className="w-8 h-8 rounded-full object-cover border"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{job.student}</p>
                            <p className="text-xs text-gray-500">{job.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{job.file}</td>
                      <td className="px-4 py-3 text-gray-700">{job.printer}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                            job.status
                          )}`}
                        >
                          {job.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{job.tokens} Tokens</td>
                      <td className="px-4 py-3 text-gray-500">{job.submitted}</td>
                      <td className="px-4 py-3 text-center">
                        {job.action === "pause" && (
                          <button className="bg-yellow-600 hover:bg-yellow-700 text-white text-xs font-medium px-4 py-2 rounded-lg transition shadow-sm">
                            Pause
                          </button>
                        )}
                        {job.action === "resume" && (
                          <button className="bg-green-600 hover:bg-green-700 text-white text-xs font-medium px-4 py-2 rounded-lg transition shadow-sm">
                            Resume
                          </button>
                        )}
                        {job.action === "none" && <span className="text-gray-400">—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Queue;