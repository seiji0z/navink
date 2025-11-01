import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

import { supabase } from "../supabaseClient";
import searchIcon from "../assets/icons/search-icon.png";
import calendarIcon from "../assets/icons/calendar-icon.png";
import pendingIcon from "../assets/icons/pending-icon.png";
import completeIcon from "../assets/icons/complete-icon.png";
import errorIcon from "../assets/icons/declined-icon.png"; 

function HistoryPage() {
  const [isOpen, setIsOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🧾 Fetch print history for the logged-in student
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // 1️⃣ Get the current authenticated user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError) throw userError;
        if (!user) {
          setFiles([]);
          setLoading(false);
          return;
        }

        // 2️⃣ Fetch print transactions joined with their print request details
        const { data, error } = await supabase
          .from("print_transaction")
          .select(
            `
            transaction_id,
            status,
            tokens_deducted,
            datetime_approved,
            print_request (
              file_name,
              num_pages,
              num_copies,
              paper_size,
              datetime_requested,
              student_id
            )
          `
          )
          .order("datetime_approved", { ascending: false });

        if (error) throw error;

        // 3️⃣ Filter for the logged-in student's records only
        const studentHistory = data
          .filter((item) => item.print_request?.student_id === user.id)
          .map((item, index) => ({
            id: item.transaction_id || `TRX-${index + 1}`,
            name: item.print_request?.file_name || "Untitled",
            date: new Date(
              item.print_request?.datetime_requested
            ).toLocaleString(),
            status: // Simplified logic:
              item.status === "Collected" || item.status === "Printed"
                ? "Complete"
                : item.status === "Approved" || item.status === "Pending"
                ? "Pending"
                : item.status, // Pass "Declined", "Cancelled" as-is
            pages: item.print_request?.num_pages || 0,
            token: item.tokens_deducted || 0,
          }));

        setFiles(studentHistory);
      } catch (err) {
        console.error("Error fetching print history:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // 🔍 Filtering logic
  const filteredFiles = files.filter(
    (file) =>
      (file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === "All" || file.status === filterStatus)
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-sky-100">
        <p className="text-gray-500 text-lg">Loading print history...</p>
      </div>
    );
  }

  // Helper to render status badges
  const renderStatusBadge = (status) => {
    if (status === "Pending") {
      return (
        <span className="inline-flex items-center bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-1 rounded-lg">
          <img src={pendingIcon} alt="Pending" className="w-3 h-3 mr-1" />
          Pending
        </span>
      );
    }
    if (status === "Complete") {
      return (
        <span className="inline-flex items-center bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-lg">
          <img src={completeIcon} alt="Complete" className="w-3 h-3 mr-1" />
          Complete
        </span>
      );
    }
    // Handle other statuses like Declined or Cancelled
    return (
      <span className="inline-flex items-center bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-lg">
        <img src={errorIcon} alt="Failed" className="w-3 h-3 mr-1" />
        {status} {/* This will show "Declined" or "Cancelled" */}
      </span>
    );
  };

  return (
    <div className="fade-in flex min-h-screen bg-sky-100">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col relative">
        <h2 className="text-2xl font-semibold text-navi mb-4">History</h2>

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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="bg-[#1F6D8B] hover:bg-sky-600 flex items-center justify-center px-4">
                  <img src={searchIcon} alt="Search" className="w-4 h-4" />
                </button>
              </div>

              {/* Calendar Button (optional future feature) */}
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
              <option value="Declined">Declined</option>
              <option value="Cancelled">Cancelled</option>
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
                {filteredFiles.length > 0 ? (
                  filteredFiles.map((file, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-2">{file.date}</td>
                      <td className="py-2">{file.id}</td>
                      <td className="py-2">{file.name}</td>
                      <td className="py-2">
                        {renderStatusBadge(file.status)}
                      </td>
                      <td className="py-2">{file.pages}</td>
                      <td className="py-2">{file.token}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-4 text-gray-400 italic"
                    >
                      No print records found.
                    </td>
                  </tr>
                )}
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