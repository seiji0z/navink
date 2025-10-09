import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Tokens from "../components/dashboard/Tokens";
import CurrentQueues from "../components/dashboard/CurrentQueues";
import TotalPrintRequests from "../components/dashboard/TotalPrintRequests";
import SavedFiles from "../components/dashboard/SavedFiles";
import PrintHistory from "../components/dashboard/PrintHistory";

function Home() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="fade-in flex min-h-screen bg-sky-100">
      
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col">
        <h2 className="text-xl font-semibold text-navi mb-4">Dashboard</h2>

        {/* Content Grid */}
        <div className="grid grid-cols-4 gap-2 flex-1 overflow-y-auto">
          <Tokens />
          <CurrentQueues />
          <TotalPrintRequests />
          <SavedFiles />
          <PrintHistory />
        </div>
      </main>
    </div>
  );
}

export default Home;