import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import FullPrintingPolicies from "../components/FullPrintingPolicies";

function Policies() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="fade-in flex min-h-screen bg-sky-100">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col relative">
        <h2 className="text-2xl font-semibold text-navi mb-4">
          Printing Policies & Guidelines
        </h2>

        {/*Policies Section */}
        <div className="flex-1 bg-white rounded-2xl shadow p-6 overflow-y-auto max-h-[90vh] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <FullPrintingPolicies />
        </div>
      </main>
    </div>
  );
}

export default Policies;
