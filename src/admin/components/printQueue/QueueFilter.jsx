import React from "react";

function QueueFilter({ onSearchChange, onFilterChange, onClear }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-md mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Filter & Search
      </h2>
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search Job ID or Student Name"
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="w-full sm:flex-1 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 min-w-[200px]"
        />

        <select
          onChange={(e) => onFilterChange?.("status", e.target.value)}
          className="w-full sm:w-auto min-w-[160px] px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
        >
          <option value="">All Status</option>
          <option value="Printing">Printing</option>
          <option value="Waiting">Waiting</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <select
          onChange={(e) => onFilterChange?.("printer", e.target.value)}
          className="w-full sm:w-auto min-w-[160px] px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
        >
          <option value="">All Printers</option>
          <option value="Open Lab Printer">Open Lab Printer</option>
          <option value="Library Printer">Library Printer</option>
        </select>

        <select
          onChange={(e) => onFilterChange?.("department", e.target.value)}
          className="w-full sm:w-auto min-w-[160px] px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
        >
          <option value="">All Departments</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Engineering">Engineering</option>
        </select>

        <button
          onClick={onClear}
          className="text-sky-600 hover:text-sky-700 text-sm font-medium whitespace-nowrap"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}

export default QueueFilter;
