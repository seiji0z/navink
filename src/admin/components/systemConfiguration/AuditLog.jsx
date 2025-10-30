import React from "react";

function AuditLog({ auditLogs }) {
  return (
    <div className="flex-1 flex flex-col">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Audit Log for Settings Changes
      </h2>

      {/* Filter */}
      <div className="mb-4 flex gap-3 items-center">
        <span className="text-sm font-medium text-gray-600">
          Filter by Admin
        </span>
        <input
          type="text"
          placeholder="dd/mm/yyyy"
          className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 w-40"
        />
      </div>

      {/* Table */}
      <div className="flex-1 overflow-x-auto border border-gray-200 rounded-2xl">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50">
            <tr>
              <th className="px-4 py-3">Timestamp</th>
              <th className="px-4 py-3">Administrator</th>
              <th className="px-4 py-3">Setting Changed</th>
              <th className="px-4 py-3">Old Value</th>
              <th className="px-4 py-3">New Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {auditLogs.map((log, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 text-gray-900">{log.timestamp}</td>
                <td className="px-4 py-3 text-gray-700">{log.admin}</td>
                <td className="px-4 py-3 text-gray-700">{log.setting}</td>
                <td className="px-4 py-3 text-gray-600">{log.oldValue}</td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {log.newValue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <span>Showing 1-2 of 10 entries</span>
        <div className="flex gap-1">
          <button className="w-8 h-8 border rounded-md text-xs text-gray-600 hover:bg-gray-100 flex items-center justify-center">
            1
          </button>
          <button className="w-8 h-8 border rounded-md text-xs text-gray-400 bg-gray-100">
            2
          </button>
          <button className="w-8 h-8 border rounded-md text-xs text-gray-400 bg-gray-100">
            3
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuditLog;