import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import printer from "../../../assets/icons/printer-icon.png";

// Initialize Supabase client (adjust with your environment variables)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function ActivePrintersCard() {
  const [activeCount, setActiveCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const fetchPrinterData = async () => {
      const { data, error } = await supabase.from("printer").select("status");

      if (error) {
        console.error("Error fetching printers:", error);
        return;
      }

      const total = data.length;
      const active = data.filter((p) => p.status === "Online").length;
      const percent = total > 0 ? Math.round((active / total) * 100) : 0;

      setActiveCount(active);
      setTotalCount(total);
      setPercentage(percent);
    };

    // Initial fetch
    fetchPrinterData();

    // Real-time updates using Supabase Realtime
    const subscription = supabase
      .channel("printer-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "printer" },
        () => fetchPrinterData()
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <div className="bg-white rounded-2xl p-6 shadow flex justify-between items-center w-full">
      {/* Left Side */}
      <div>
        <h3
          className="text-sm font-medium text-gray-500 mb-2"
          style={{ fontFamily: "Poppins-SemiBold, sans-serif" }}
        >
          Active Printers
        </h3>
        <p
          className="text-5xl font-bold text-green-500"
          style={{ fontFamily: "Urbanist-Bold, sans-serif" }}
        >
          {activeCount}
          <span className="text-gray-400 text-3xl"> / {totalCount}</span>
        </p>
        <p className="text-xs text-gray-400 mt-1">{percentage}% Online</p>
      </div>

      {/* Right Icon */}
      <div className="bg-green-100 p-3 rounded-full flex items-center justify-center">
        <img src={printer} alt="printer" className="w-8 h-8 object-contain" />
      </div>
    </div>
  );
}

export default ActivePrintersCard;
