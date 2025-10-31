import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

function PrintHistory() {
  const [printHistory, setPrintHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const statusColors = {
    Pending: "text-yellow-600",
    Approved: "text-sky-600",
    Printed: "text-blue-600",
    Collected: "text-green-600",
    Cancelled: "text-red-600",
    Complete: "text-green-600",
  };

  useEffect(() => {
    const fetchPrintHistory = async () => {
      try {
        setLoading(true);

        // ✅ Get the current logged-in user (via Supabase Auth)
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
        if (!user) return;

        // ✅ Query print requests + transactions for this student
        const { data, error } = await supabase
          .from("print_request")
          .select(`
            request_id,
            file_name,
            num_pages,
            student_id,
            print_transaction (
              tokens_deducted,
              status
            )
          `)
          .eq("student_id", user.id)
          .order("datetime_requested", { ascending: false });

        if (error) throw error;

        // ✅ Flatten the structure for easy rendering
        const formatted = data.map((item) => ({
          id: item.request_id,
          name: item.file_name,
          status: item.print_transaction?.[0]?.status || "Pending",
          pages: item.num_pages,
          tokens: item.print_transaction?.[0]?.tokens_deducted || 0,
        }));

        setPrintHistory(formatted);
      } catch (err) {
        console.error("Error fetching print history:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrintHistory();
  }, []);

  return (
    <div className="bg-white rounded-xl p-6 shadow col-span-2 h-full flex flex-col">
      {/* Header section */}
      <div className="flex justify-between items-start mb-6 shrink-0">
        <h3
          className="text-xl font-medium text-gray-500"
          style={{ fontFamily: "Poppins-SemiBold, sans-serif" }}
        >
          Print History
        </h3>

        {/* Total Print Requests Summary */}
        <div className="text-right pt-1">
          <p className="text-4xl font-bold text-yellow-500 leading-tight">
            {loading ? "…" : printHistory.length}
          </p>
          <p className="text-sm text-gray-400 -mt-1">
            total prints accomplished
          </p>
        </div>
      </div>

      {/* Scrollable table */}
      <div className="overflow-y-auto max-h-60 flex-1">
        {loading ? (
          <p className="text-gray-400 text-center">Loading print history...</p>
        ) : printHistory.length === 0 ? (
          <p className="text-gray-400 text-center">No print history found.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 bg-white">
              <tr className="text-gray-500 border-b">
                <th className="pb-2">File ID</th>
                <th className="pb-2">File Name</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">No. of Pages</th>
                <th className="pb-2">Token</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {printHistory.map((file) => (
                <tr key={file.id} className="border-t">
                  <td>{file.id}</td>
                  <td>{file.name}</td>
                  <td className={statusColors[file.status] || "text-gray-500"}>
                    {file.status}
                  </td>
                  <td>{file.pages}</td>
                  <td>{file.tokens}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default PrintHistory;
