import React from "react";

function AuditLog({ auditLogs }) {
  return (
    <div className="flex flex-col flex-1 bg-white rounded-3xl p-6 shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Audit Log for Settings Changes
      </h2>

      {/* Filter */}
      <div className="mb-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <span className="text-sm font-medium text-gray-600">
          Filter by Admin
        </span>
        <input
          type="text"
          placeholder="dd/mm/yyyy"
          className="w-full sm:w-40 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto border border-gray-200 rounded-2xl shadow-sm">
        <table className="min-w-[720px] w-full table-auto text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50">
            <tr>
              <th className="px-4 py-3 whitespace-nowrap">Timestamp</th>
              <th className="px-4 py-3 whitespace-nowrap">Administrator</th>
              <th className="px-4 py-3 whitespace-nowrap">Setting Changed</th>
              <th className="px-4 py-3 whitespace-nowrap">Old Value</th>
              <th className="px-4 py-3 whitespace-nowrap">New Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {auditLogs.map((log, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 text-gray-900 whitespace-nowrap max-w-[160px]">
                  <div className="truncate" title={log.timestamp}>{log.timestamp}</div>
                </td>
                <td className="px-4 py-3 text-gray-700 max-w-[180px]">
                  <div className="truncate" title={log.admin}>{log.admin}</div>
                </td>
                <td className="px-4 py-3 text-gray-700 max-w-[200px]">
                  <div className="truncate" title={log.setting}>{log.setting}</div>
                </td>
                <td className="px-4 py-3 text-gray-600 max-w-[120px]">
                  <div className="truncate" title={log.oldValue}>{log.oldValue}</div>
                </td>
                <td className="px-4 py-3 font-medium text-gray-900 max-w-[120px]">
                  <div className="truncate" title={log.newValue}>{log.newValue}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List */}
      <div className="md:hidden flex flex-col gap-4">
        {auditLogs.map((log, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm overflow-hidden">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1 pr-2">
                <p className="text-sm font-semibold text-gray-900 truncate" title={log.setting}>
                  {log.setting}
                </p>
                <p className="text-xs text-gray-500 mt-1 truncate" title={log.admin}>{log.admin}</p>
              </div>
            </div>
            <div className="text-xs text-gray-500 mb-2 truncate" title={log.timestamp}>
              {log.timestamp}
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-600 font-medium">Old:</span>
                <p className="text-gray-700 truncate" title={log.oldValue}>{log.oldValue}</p>
              </div>
              <div>
                <span className="text-gray-600 font-medium">New:</span>
                <p className="text-gray-900 font-semibold truncate" title={log.newValue}>{log.newValue}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-500">
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