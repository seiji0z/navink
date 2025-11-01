import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import user from "../../../assets/icons/user-icon.png";

function TotalUsersCard() {
  const [studentCount, setStudentCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentCount = async () => {
      try {
        const { count, error } = await supabase
          .from("student")
          .select("*", { count: "exact", head: true });

        if (error) throw error;
        setStudentCount(count || 0);
      } catch (err) {
        console.error("Error fetching student count:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentCount();
  }, []);

  return (
    <div className="bg-white rounded-2xl p-6 shadow flex justify-between items-center w-full">
      {/* Left Side */}
      <div>
        <h3
          className="text-sm font-medium text-gray-500 mb-2"
          style={{ fontFamily: "Poppins-SemiBold, sans-serif" }}
        >
          Total Students
        </h3>

        <p
          className="text-5xl font-bold text-sky-700"
          style={{ fontFamily: "Urbanist-Bold, sans-serif" }}
        >
          {loading ? "..." : studentCount}
        </p>

        <p className="text-xs text-gray-400 mt-1">
          {loading ? "Fetching data..." : "All registered student accounts"}
        </p>
      </div>

      {/* Right Icon */}
      <div className="bg-sky-100 p-3 rounded-full flex items-center justify-center">
        <img src={user} alt="user" className="w-8 h-8 object-contain" />
      </div>
    </div>
  );
}

export default TotalUsersCard;
