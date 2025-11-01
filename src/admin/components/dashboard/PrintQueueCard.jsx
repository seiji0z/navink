import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../../supabaseClient";

function PrintQueueCard() {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);

  const statusColor = {
    Printing: "text-sky-600",
    Waiting: "text-yellow-600",
    Completed: "text-green-600",
    Cancelled: "text-red-600",
  };

  const fetchQueue = async () => {
    setLoading(true);
    try {
      // ✅ Fetch queue with related data, only for APPROVED transactions
      const { data, error } = await supabase
        .from("print_queue")
        .select(
          `
          queue_id,
          queue_position,
          priority,
          queue_status,
          datetime_added,
          request:print_request(
            file_name,
            printer:printer_id(printer_name),
            transaction:print_transaction(status)
          )
        `
        )
        .order("datetime_added", { ascending: true });

      if (error) throw error;

      // ✅ Filter only those with APPROVED transactions
      const approvedOnly = data.filter(
        (item) => item.request?.transaction?.[0]?.status === "Approved"
      );

      // ✅ Renumber dynamically (no need to depend on queue_position in DB)
      const formatted = approvedOnly.map((item, index) => ({
        id: item.queue_id,
        jobId: `#${String(index + 1).padStart(3, "0")}`,
        document: item.request?.file_name || "Unnamed File",
        printer: item.request?.printer?.printer_name || "Unknown Printer",
        status: item.queue_status,
      }));

      setQueue(formatted);
    } catch (err) {
      console.error("Error fetching print queue:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();

    // ✅ Real-time updates for the queue
    const channel = supabase
      .channel("realtime-print-queue")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "print_queue" },
        (payload) => {
          console.log("🔄 Queue updated:", payload);
          fetchQueue();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="bg-white rounded-2xl p-6 shadow w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3
          className="text-lg font-medium text-gray-500"
          style={{ fontFamily: "Poppins-SemiBold, sans-serif" }}
        >
          Print Queue
        </h3>
        <Link to="/admin/queue" className="text-sm text-sky-600 hover:underline">
          View All
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-700">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Job ID</th>
              <th className="text-left py-2">Document</th>
              <th className="text-left py-2">Printer</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  Loading print queue...
                </td>
              </tr>
            ) : queue.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No approved print jobs in queue.
                </td>
              </tr>
            ) : (
              queue.slice(0, 3).map((job) => (
                <tr key={job.id} className="border-b last:border-none">
                  <td className="py-3">{job.jobId}</td>
                  <td>{job.document}</td>
                  <td>{job.printer}</td>
                  <td className={statusColor[job.status] || "text-gray-600"}>
                    {job.status}
                  </td>
                  <td>
                    <button className="px-3 py-1 bg-sky-100 text-sky-700 rounded-lg text-xs hover:bg-sky-200 transition">
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PrintQueueCard;
