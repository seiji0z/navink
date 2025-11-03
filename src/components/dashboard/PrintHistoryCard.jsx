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
    <div className="bg-white rounded-3xl p-6 shadow-md col-span-1 lg:col-span-2 h-full flex flex-col">
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

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto flex-1">
        {loading ? (
          <p className="text-gray-400 text-center">Loading print history...</p>
        ) : printHistory.length === 0 ? (
          <p className="text-gray-400 text-sm text-center italic py-4">No print history found.</p>
        ) : (
          <table className="min-w-[720px] w-full text-left text-sm">
            <thead className="sticky top-0 bg-white">
              <tr className="text-gray-500 border-b">
                <th className="pb-2 pr-2">File ID</th>
                <th className="pb-2 pr-2">File Name</th>
                <th className="pb-2 pr-2">Status</th>
                <th className="pb-2 pr-2">No. of Pages</th>
                <th className="pb-2 pr-2">Token</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {printHistory.map((file) => (
                <tr key={file.id} className="border-t hover:bg-gray-50">
                  <td className="py-2 pr-2 whitespace-nowrap">{file.id}</td>
                  <td className="py-2 pr-2 max-w-[240px]"><div className="truncate" title={file.name}>{file.name}</div></td>
                  <td className={`py-2 pr-2 ${statusColors[file.status] || "text-gray-500"}`}>
                    {file.status}
                  </td>
                  <td className="py-2 pr-2">{file.pages}</td>
                  <td className="py-2 pr-2">{file.tokens}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Mobile list */}
      <div className="md:hidden flex-1 overflow-y-auto flex flex-col gap-3">
        {loading ? (
          <p className="text-gray-400 text-center">Loading print history...</p>
        ) : printHistory.length === 0 ? (
          <p className="text-gray-400 text-sm text-center italic py-4">No print history found.</p>
        ) : (
          printHistory.map((file) => (
            <div key={file.id} className="border rounded-xl p-4 bg-white">
              <div className="flex items-start justify-between gap-3 mb-1">
                <div className="min-w-0">
                  <p className="font-medium truncate" title={file.name}>{file.name}</p>
                  <p className="text-xs text-gray-500">ID: {file.id}</p>
                </div>
                <span className={`text-xs font-semibold ${statusColors[file.status] || "text-gray-500"}`}>
                  {file.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-700">
                <span>Pages: {file.pages}</span>
                <span>Tokens: {file.tokens}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PrintHistory;
