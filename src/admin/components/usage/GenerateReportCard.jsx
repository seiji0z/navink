import React from 'react';

function GenerateReportCard({ onGenerate }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Generate New Report</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Report Type */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Report Type</label>
          <select className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300">
            <option>Select type</option>
            <option>Daily Summary</option>
            <option>Weekly Usage</option>
            <option>Monthly Overview</option>
            <option>Semester Report</option>
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Start Date</label>
          <input
            type="text"
            placeholder="dd/mm/yyyy"
            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">End Date</label>
          <input
            type="text"
            placeholder="dd/mm/yyyy"
            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
        </div>

        {/* Specific User */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Specific User (Optional)</label>
          <input
            type="text"
            placeholder="Enter ID number"
            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-ouffsky-300"
          />
        </div>
      </div>

      {/* Generate Button */}
      <div className="flex justify-end">
        <button
          onClick={onGenerate}
          className="bg-sky-600 hover:bg-sky-700 text-white font-medium px-6 py-2.5 rounded-lg transition shadow-sm"
        >
          Generate Report
        </button>
      </div>
    </div>
  );
}

export default GenerateReportCard;
