import React from "react";
import printer from "../../../assets/icons/printer-icon.png";

function ActivePrintersCard() {
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
          4<span className="text-gray-400 text-3xl"> / 5</span>
        </p>
        <p className="text-xs text-gray-400 mt-1">80% Online</p>
      </div>

      {/* Right Icon */}
      <div className="bg-green-100 p-3 rounded-full flex items-center justify-center">
        <img src={printer} alt="printer" className="w-8 h-8 object-contain" />
      </div>
    </div>
  );
}

export default ActivePrintersCard;
