import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import AdminSidebar from "../components/AdminSidebar";
import QueueFilter from "../components/printQueue/QueueFilter";
import QueueStats from "../components/printQueue/QueueStats";
import QueueTable from "../components/printQueue/QueueTable";

function Queue() {
  const [isOpen, setIsOpen] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [stats, setStats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    printer: "",
    department: "",
  });

  useEffect(() => {
    fetchQueueData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filters, jobs]);

  // ✅ Fetch approved queue data
  const fetchQueueData = async () => {
    const { data, error } = await supabase.rpc("get_approved_queue");

    if (error) {
      console.error("Error fetching approved queue:", error);
      return;
    }

    setJobs(data || []);
    computeStats(data || []);
  };

  // ✅ Compute statistics
  const computeStats = (data) => {
    const counts = {
      Waiting: 0,
      Printing: 0,
      Completed: 0,
      Cancelled: 0,
    };

    data.forEach((row) => {
      if (counts[row.queue_status] !== undefined) counts[row.queue_status]++;
    });

    setStats([
      { label: "Waiting", value: counts.Waiting, color: "text-yellow-600" },
      { label: "Printing", value: counts.Printing, color: "text-sky-600" },
      { label: "Completed", value: counts.Completed, color: "text-green-600" },
      { label: "Cancelled", value: counts.Cancelled, color: "text-red-600" },
    ]);
  };

  // ✅ Apply filters and search
  const applyFilters = () => {
    let filtered = [...jobs];

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.student_name?.toLowerCase().includes(lower) ||
          job.queue_id?.toString().toLowerCase().includes(lower)
      );
    }

    if (filters.status)
      filtered = filtered.filter((job) => job.queue_status === filters.status);
    if (filters.printer)
      filtered = filtered.filter((job) => job.printer_name === filters.printer);
    if (filters.department)
      filtered = filtered.filter((job) => job.department === filters.department);

    setFilteredJobs(filtered);
  };

  // ✅ Update queue status (uses SQL function)
  const handleStatusUpdate = async (queueId, newStatus) => {
    let confirmMsg = "";

    switch (newStatus) {
      case "Waiting":
        confirmMsg = "Pause this print job (return to waiting)?";
        break;
      case "Printing":
        confirmMsg = "Start this print job?";
        break;
      case "Cancelled":
        confirmMsg = "Cancel this print job?";
        break;
      case "Completed":
        confirmMsg = "Mark this print job as completed?";
        break;
      default:
        confirmMsg = `Change status to "${newStatus}"?`;
    }

    if (!window.confirm(confirmMsg)) return;

    // ✅ Call SQL function instead of direct update
    const { error } = await supabase.rpc("update_queue_status", {
      p_queue_id: queueId,
      p_new_status: newStatus,
    });

    if (error) {
      console.error("Error updating status:", error);
      alert("Failed to update job status.");
      return;
    }

    // 🔁 Refresh data after update
    fetchQueueData();
  };

  // ✅ Handlers for filters
  const handleSearchChange = (term) => setSearchTerm(term);
  const handleFilterChange = (type, value) =>
    setFilters((prev) => ({ ...prev, [type]: value }));
  const handleClearFilters = () => {
    setSearchTerm("");
    setFilters({ status: "", printer: "", department: "" });
  };

  return (
    <div className="fade-in flex h-screen bg-sky-100 overflow-hidden">
      <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="flex-1 p-8 flex flex-col">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Print Queue Control
        </h1>

        <div className="bg-white rounded-3xl p-6 shadow-md flex-1 overflow-y-auto flex flex-col pb-4">
          <QueueFilter
            onSearchChange={handleSearchChange}
            onFilterChange={handleFilterChange}
            onClear={handleClearFilters}
          />

          <QueueStats stats={stats} />

          {/* ✅ Table with actions */}
          <QueueTable jobs={filteredJobs} onStatusUpdate={handleStatusUpdate} />
        </div>
      </main>
    </div>
  );
}

export default Queue;
