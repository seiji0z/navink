import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import logo from "../../../assets/icons/profile-icon.svg";

function PendingPrintRequestsCard() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const statusColor = {
    Pending: "bg-yellow-200 text-yellow-800",
    Approved: "bg-green-200 text-green-800",
    Declined: "bg-red-200 text-red-800",
  };

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    setLoading(true);

    // ✅ Updated join + correct column names
    const { data, error } = await supabase
      .from("print_transaction")
      .select(`
        transaction_id,
        status,
        datetime_approved,
        tokens_deducted,
        request:print_request (
          request_id,
          file_name,
          num_pages,
          num_copies,
          paper_size,
          print_type,
          datetime_requested,
          student:student_id (
            user_id,
            full_name,
            email,
            course,
            year_level
          )
        )
      `)
      .eq("status", "Pending")
      .order("datetime_requested", { referencedTable: "print_request", ascending: false })
      .limit(5);

    if (error) {
      console.error("❌ Error fetching pending requests:", error);
      setRequests([]);
    } else {
      const formatted = data.map((item) => ({
        transactionId: item.transaction_id,
        requestId: item.request?.request_id,
        student: item.request?.student?.full_name || "Unknown Student",
        document: item.request?.file_name || "Unknown File",
        submitted: timeAgo(item.request?.datetime_requested),
        status: item.status,
      }));
      setRequests(formatted);
    }

    setLoading(false);
  };

  const handleStatusUpdate = async (transactionId, newStatus, requestId) => {
    // 1️⃣ Update transaction status
    const { error: txError } = await supabase
      .from("print_transaction")
      .update({
        status: newStatus,
        datetime_approved: new Date().toISOString(),
      })
      .eq("transaction_id", transactionId);

    if (txError) {
      console.error("❌ Error updating transaction:", txError);
      alert("Failed to update request status.");
      return;
    }

    // 2️⃣ If Approved, add to queue
    if (newStatus === "Approved") {
      try {
        const { data: maxData, error: maxError } = await supabase
          .from("print_queue")
          .select("queue_position")
          .order("queue_position", { ascending: false })
          .limit(1)
          .single();

        if (maxError && maxError.code !== "PGRST116") throw maxError;

        const nextPosition = maxData?.queue_position ? maxData.queue_position + 1 : 1;

        const { error: queueError } = await supabase.from("print_queue").insert([
          {
            request_id: requestId,
            queue_position: nextPosition,
            priority: "Normal",
            queue_status: "Waiting",
            datetime_added: new Date().toISOString(),
          },
        ]);

        if (queueError) throw queueError;

        console.log(`✅ Added request ${requestId} to print queue.`);
      } catch (err) {
        console.error("❌ Error adding to print queue:", err);
      }
    }

    // 3️⃣ Remove from UI
    setRequests((prev) =>
      prev.filter((req) => req.transactionId !== transactionId)
    );
  };

  const timeAgo = (timestamp) => {
    if (!timestamp) return "N/A";
    const diffMs = Date.now() - new Date(timestamp);
    const mins = Math.floor(diffMs / 60000);
    if (mins < 60) return `${mins} mins ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3
          className="text-lg font-medium text-gray-500"
          style={{ fontFamily: "Poppins-SemiBold, sans-serif" }}
        >
          Pending Print Requests
        </h3>
        <button
          onClick={() => navigate("/admin/requests")}
          className="text-sm text-sky-600 hover:underline"
        >
          View All
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center">Loading requests...</p>
      ) : requests.length === 0 ? (
        <p className="text-gray-500 text-center">No pending print requests.</p>
      ) : (
        <>
          {/* 📱 Mobile view */}
          <div className="md:hidden space-y-3">
            {requests.slice(0, 3).map((req, idx) => (
              <div key={idx} className="rounded-xl border border-gray-200 p-4">
                <div className="flex items-start">
                  <img src={logo} alt="User" className="w-9 h-9 rounded-full mr-3" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-gray-900">{req.student}</p>
                      <span
                        className={`ml-2 px-2.5 py-1 rounded-full text-[11px] font-medium ${statusColor[req.status]}`}
                      >
                        {req.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-700">{req.document}</p>
                    <div className="mt-3 flex justify-between text-xs text-gray-500">
                      <span>{req.submitted}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleStatusUpdate(req.transactionId, "Approved", req.requestId)
                          }
                          className="px-2.5 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleStatusUpdate(req.transactionId, "Declined", req.requestId)
                          }
                          className="px-2.5 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                        >
                          Deny
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 💻 Desktop view */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-[720px] w-full text-sm text-gray-700">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase">Student</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase">Document</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase">Submitted</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.slice(0, 3).map((req, idx) => (
                  <tr key={idx} className="border-b last:border-none">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <img src={logo} alt="User" className="w-8 h-8 rounded-full" />
                        <div className="truncate max-w-[180px]">{req.student}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4 truncate max-w-[220px]">{req.document}</td>
                    <td className="px-4 py-4 text-gray-500">{req.submitted}</td>
                    <td className="px-4 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[req.status]}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleStatusUpdate(req.transactionId, "Approved", req.requestId)
                          }
                          className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs hover:bg-green-200"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleStatusUpdate(req.transactionId, "Declined", req.requestId)
                          }
                          className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-xs hover:bg-red-200"
                        >
                          Deny
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default PendingPrintRequestsCard;
