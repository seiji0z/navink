import React from "react";
import files from "../../../assets/icons/file-icon.png";

function PendingRequestsCard() {
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
          18
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
