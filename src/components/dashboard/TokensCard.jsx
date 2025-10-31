import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient"; // adjust the import path to your setup

function Tokens() {
  const [tokens, setTokens] = useState(null);
  const [maxTokens] = useState(500); // you can later fetch this from settings if needed
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokenBalance = async () => {
      try {
        // 1️⃣ Get the currently logged-in user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) throw userError || new Error("No user logged in");

        // 2️⃣ Fetch the student's token balance
        const { data, error } = await supabase
          .from("student")
          .select("token_balance")
          .eq("user_id", user.id)
          .single();

        if (error) throw error;

        setTokens(data?.token_balance ?? 0);
      } catch (err) {
        console.error("Error fetching tokens:", err.message);
        setTokens(0);
      } finally {
        setLoading(false);
      }
    };

    fetchTokenBalance();
  }, []);

  if (loading) {
    return (
      <div className="col-span-1 flex justify-center items-center">
        <p className="text-gray-500">Loading token balance...</p>
      </div>
    );
  }

  return (
    <div className="col-span-1 flex justify-center items-center">
      <div className="w-[300px] h-[300px] rounded-full bg-white flex flex-col justify-center items-center shadow border-8 border-[#61C580]">
        <h3 className="text-2xl font-medium text-gray-500">Available Tokens</h3>
        <p className="text-6xl font-bold text-green-600 mt-2 pb-5">
          {tokens} <span className="text-2xl font-normal text-gray-500">/ {maxTokens}</span>
        </p>
        <p className="text-center text-gray-400 mt-1">
          Tokens will reset at the start <br /> of the next semester
        </p>
      </div>
    </div>
  );
}

export default Tokens;
