import React from "react";

function QueueFilter() {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Filter & Search
      </h2>
      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Job ID or Student Name"
          className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 flex-1 min-w-[200px]"
        />
        <select className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 min-w-[160px]">
          <option>All Status</option>
          <option>Printing</option>
          <option>Paused</option>
          <option>Pending</option>
        </select>
        <select className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 min-w-[160px]">
          <option>All Printers</option>
          <option>Open Lab Printer</option>
          <option>Library Printer</option>
        </select>
        <select className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 min-w-[160px]">
          <option>All Departments</option>
          <option>Computer Science</option>
          <option>Engineering</option>
        </select>
        <button className="text-sky-600 hover:text-sky-700 text-sm font-medium whitespace-nowrap">
          Clear Filters
        </button>
      </div>
    </div>
  );
}

export default QueueFilter;