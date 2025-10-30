import React, { useState } from "react";
import logo from "../../../assets/images/navink-logo.png"; 

function PrinterManagement() {
  const [isPrinterOpen, setIsPrinterOpen] = useState(true);

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => setIsPrinterOpen(!isPrinterOpen)}
        className="w-full px-6 py-4 bg-white hover:bg-gray-50 flex items-center justify-between text-left transition"
      >
        <h2 className="text-lg font-semibold text-gray-700">
          Printer Management
        </h2>
        <img
          src={logo}
          alt="Toggle"
          className={`w-5 h-5 transition-transform ${
            isPrinterOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isPrinterOpen && (
        <div className="p-6 bg-gray-50">
          <p className="text-sm text-gray-500 italic">
            No printers configured yet.
          </p>
        </div>
      )}
    </div>
  );
}

export default PrinterManagement;