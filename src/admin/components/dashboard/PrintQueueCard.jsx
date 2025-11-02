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

  // 🔹 Fetch print queue via SQL function (get_approved_queue)
  const fetchQueue = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc("get_approved_queue");
      if (error) throw error;

      // ✅ Use actual DB values (no forced updates)
      const formatted = data.map((item, index) => ({
        id: item.queue_id,
        jobId: `#${String(item.queue_position || index + 1).padStart(3, "0")}`,
        document: item.file_name || "Unnamed File",
        printer: item.printer_name || "Unknown Printer",
        status: item.queue_status || "Waiting",
      }));

      setQueue(formatted);
    } catch (err) {
      console.error("Error fetching print queue:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Real-time subscription for queue updates
  useEffect(() => {
    fetchQueue();

    const channel = supabase
      .channel("realtime-print-queue")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "print_queue" },
        () => fetchQueue()
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
        <Link
          to="/admin/queue"
          className="text-sm text-sky-600 hover:underline"
        >
          View All
        </Link>
      </div>

      {/* Mobile list (no horizontal scrolling) */}
      {loading ? (
        <p className="md:hidden text-gray-500 text-center">Loading print queue...</p>
      ) : queue.length === 0 ? (
        <p className="md:hidden text-gray-500 text-center">No approved print jobs in queue.</p>
      ) : (
        <div className="md:hidden space-y-3">
          {queue.slice(0, 3).map((job) => (
            <div key={job.id} className="rounded-xl border border-gray-200 p-4">
              <div className="flex items-start justify-between">
                <div className="text-sm font-semibold text-gray-900 mr-3 whitespace-nowrap">{job.jobId}</div>
                <span className={`ml-2 px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap ${statusColor[job.status] || "text-gray-600"}`}>
                  {job.status}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-800 truncate">{job.document}</div>
              <div className="mt-1 text-xs text-gray-600 truncate">{job.printer}</div>
              <div className="mt-3 flex justify-end">
                <button className="px-3 py-1 bg-sky-100 text-sky-700 rounded-md text-xs hover:bg-sky-200 transition whitespace-nowrap">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Desktop/tablet table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-[720px] w-full text-sm text-gray-700 table-auto">
          <thead>
            <tr className="border-b">
              <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wide">Job ID</th>
              <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wide">Document</th>
              <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wide">Printer</th>
              <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wide">Status</th>
              <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">Loading print queue...</td>
              </tr>
            ) : queue.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">No approved print jobs in queue.</td>
              </tr>
            ) : (
              queue.slice(0, 3).map((job) => (
                <tr key={job.id} className="border-b last:border-none">
                  <td className="px-4 py-4 align-middle whitespace-nowrap">{job.jobId}</td>
                  <td className="px-4 py-4 align-middle max-w-[260px]"><div className="truncate text-sm">{job.document}</div></td>
                  <td className="px-4 py-4 align-middle max-w-[180px]"><div className="truncate text-sm">{job.printer}</div></td>
                  <td className={`px-4 py-4 align-middle whitespace-nowrap ${statusColor[job.status] || "text-gray-600"}`}>{job.status}</td>
                  <td className="px-4 py-4 align-middle">
                    <button className="px-3 py-1 bg-sky-100 text-sky-700 rounded-lg text-xs hover:bg-sky-200 transition whitespace-nowrap">View Details</button>
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
