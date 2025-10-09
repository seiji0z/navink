import React from "react";

function TotalPrintRequests() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow flex flex-col gap-10">
      <h3
        className="text-2xl font-medium text-gray-500"
        style={{ fontFamily: "Poppins-SemiBold, sans-serif" }}
      >
        Total Print Requests
      </h3>
      <p className="text-8xl font-bold text-yellow-500 mt-12 flex flex-col items-center justify-center">
        17
      </p>
      <p className="text-xl font-bold text-gray-400 -mt-5 flex flex-col items-center justify-center">
        total prints accomplished
      </p>
    </div>
  );
}

export default TotalPrintRequests;