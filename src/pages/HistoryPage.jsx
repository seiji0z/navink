import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import searchIcon from "../assets/icons/search-icon.png";
import calendarIcon from "../assets/icons/calendar-icon.png";
import pendingIcon from "../assets/icons/pending-icon.png";
import completeIcon from "../assets/icons/complete-icon.png";

function HistoryPage() {
  const [isOpen, setIsOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const files = [
    {
      date: "January 12, 2025, 9:35 AM",
      id: "PSLU-0001",
      name: "toPrint.pdf",
      status: "Pending",
      pages: 5,
      token: 30,
    },
    {
      date: "January 12, 2025, 10:41 AM",
      id: "PSLU-0002",
      name: "Final-Thesis-Paper.pdf",
      status: "Complete",
      pages: 354,
      token: 50,
    },
    {
      date: "January 17, 2025, 1:13 PM",
      id: "PSLU-0014",
      name: "SoftEng_Act1.docx",
      status: "Complete",
      pages: 2,
      token: 10,
    },
  ];

  const filteredFiles = files.filter(
    (file) =>
      (file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === "All" || file.status === filterStatus)
  );

  return (
    <div className="fade-in flex min-h-screen bg-sky-100">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <main className="flex-1 p-8 flex flex-col">
        <h2 className="text-xl font-semibold text-gray-500">History</h2>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Start exploring
        </h1>

        <div className="bg-white rounded-3xl p-6 shadow-md flex-1">
          {/* Search and Filter Section */}
          <div className="flex flex-wrap items-center justify-between mb-4 gap-3">
            <div className="flex items-center w-full sm:w-auto gap-2">
              {/* Search Bar */}
              <div className="flex items-stretch w-[400px] rounded-full border overflow-hidden">
                <input
                  type="text"
                  placeholder="Search by File Name or File ID"
                  className="flex-1 px-4 py-2 text-gray-700 focus:outline-none"
                />
                <button className="bg-[#1F6D8B] hover:bg-sky-600 flex items-center justify-center px-4">
                  <img src={searchIcon} alt="Search" className="w-4 h-4" />
                </button>
              </div>

              {/* Calendar Button */}
              <button className="border rounded-full p-3 text-gray-500 hover:bg-gray-100 flex items-center justify-center">
                <img src={calendarIcon} alt="Calendar" className="w-4 h-4" />
              </button>
            </div>

            {/* Filter Dropdown */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
            >
              <option value="All">Filter by Status</option>
              <option value="Pending">Pending</option>
              <option value="Complete">Complete</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="pb-3">Submitted Date</th>
                  <th className="pb-3">File ID</th>
                  <th className="pb-3">File Name</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">No. of Pages</th>
                  <th className="pb-3">Token</th>
                </tr>
              </thead>
              <tbody>
                {filteredFiles.map((file, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-2">{file.date}</td>
                    <td className="py-2">{file.id}</td>
                    <td className="py-2">{file.name}</td>
                    <td className="py-2">
                      {file.status === "Pending" ? (
                        <span className="inline-flex items-center bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-1 rounded-lg">
                          <img
                            src={pendingIcon}
                            alt="Pending"
                            className="w-3 h-3 mr-1"
                          />
                          Pending
                        </span>
                      ) : (
                        <span className="inline-flex items-center bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-lg">
                          <img
                            src={completeIcon}
                            alt="Complete"
                            className="w-3 h-3 mr-1"
                          />
                          Complete
                        </span>
                      )}
                    </td>
                    <td className="py-2">{file.pages}</td>
                    <td className="py-2">{file.token}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="text-sm text-gray-500 mt-4 flex justify-between">
            <span>
              Showing {filteredFiles.length} of {files.length} records
            </span>
            <div className="flex items-center gap-2">
              <button className="border rounded-md px-2 py-1 text-gray-500 hover:bg-gray-100 text-xs">
                1
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HistoryPage;
