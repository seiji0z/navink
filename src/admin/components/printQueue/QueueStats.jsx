import React from "react";

function QueueStats({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm min-h-32 flex flex-col justify-center"
        >
          <p className={`text-5xl font-bold ${stat.color}`}>{stat.value}</p>
          <p className="text-sm text-gray-500 mt-2">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

export default QueueStats;
