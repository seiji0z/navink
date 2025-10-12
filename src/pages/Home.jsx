import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Tokens from "../components/dashboard/Tokens";
import CurrentQueues from "../components/dashboard/CurrentQueues";
import Notifications from "../components/dashboard/Notifications";
import PrintHistory from "../components/dashboard/PrintHistory";
import PoliciesCard from "../components/dashboard/PoliciesCard";
import PrintButton from "../components/dashboard/PrintButton";

function Home() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="fade-in flex min-h-screen bg-sky-100">
      
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col relative">
        <h2 className="text-xl font-semibold text-navi mb-4">Dashboard</h2>

        <PrintButton /> 

        {/* Content Grid */}
        <div className="grid grid-cols-4 gap-2 flex-1 overflow-y-auto pt-8">
          <Tokens />
          <CurrentQueues />
          <Notifications />
          <PoliciesCard />
          <PrintHistory />
        </div>
      </main>
    </div>
  );
}

export default Home;