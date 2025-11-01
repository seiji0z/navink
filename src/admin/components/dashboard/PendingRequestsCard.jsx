import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient"; // ✅ adjust path if needed
import files from "../../../assets/icons/file-icon.png";

function PendingRequestsCard() {
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    fetchPendingCount();

    // ✅ Optional: real-time updates if you want live changes
    const channel = supabase
      .channel("pending-requests-listener")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "print_transaction" },
        (payload) => {
          fetchPendingCount();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchPendingCount = async () => {
    const { count, error } = await supabase
      .from("print_transaction")
      .select("*", { count: "exact", head: true })
      .eq("status", "Pending");

    if (error) {
      console.error("Error fetching pending count:", error.message);
    } else {
      setPendingCount(count || 0);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow flex justify-between items-center w-full">
      {/* Left Side */}
      <div>
        <h3
          className="text-sm font-medium text-gray-500 mb-2"
          style={{ fontFamily: "Poppins-SemiBold, sans-serif" }}
        >
          Pending Requests
        </h3>
        <p
          className="text-5xl font-bold text-yellow-500"
          style={{ fontFamily: "Urbanist-Bold, sans-serif" }}
        >
          {pendingCount}
        </p>
        <p className="text-xs text-gray-400 mt-1">Requests to be reviewed</p>
      </div>

      {/* Right icon */}
      <div className="bg-yellow-100 p-3 rounded-full flex items-center justify-center">
        <img src={files} alt="files" className="w-8 h-8 object-contain" />
      </div>
    </div>
  );
}

export default PendingRequestsCard;
