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
