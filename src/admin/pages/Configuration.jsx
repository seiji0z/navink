import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import logo from "../../assets/images/navink-logo.png";

function Configuration() {
  const [isOpen, setIsOpen] = useState(true);
  const [isPrinterOpen, setIsPrinterOpen] = useState(true);

  // Mock audit log
  const auditLogs = [
    {
      timestamp: "2025-10-07 14:33:15",
      admin: "admin@navink.com",
      setting: "Color Cost Rate",
      oldValue: "3",
      newValue: "5",
    },
    {
      timestamp: "2025-10-06 09:15:00",
      admin: "admin@navink.com",
      setting: "Printer Status: HP LaserJet",
      oldValue: "Active",
      newValue: "Inactive",
    },
  ];

  return (
    <div className="fade-in flex min-h-screen bg-sky-100">
      <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <main className="flex-1 p-8 flex flex-col">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">System Configuration</h1>

        {/* White Card */}
        <div className="bg-white rounded-3xl p-6 shadow-md flex-1 overflow-hidden flex flex-col space-y-6">
          {/* Print Details */}
          <div className="bg-sky-50 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Print Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Paper Size */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Default Paper Size
                </label>
                <select className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300">
                  <option>A4</option>
                  <option>Letter</option>
                  <option>Legal</option>
                </select>
              </div>

              {/* Default Copies */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Default Copies
                </label>
                <input
                  type="number"
                  defaultValue={1}
                  min={1}
                  className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                />
              </div>

              {/* Duplex Printing */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Default Duplex Printing
                </label>
                <div className="flex items-center">
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
                    <span className="ms-3 text-sm font-medium text-gray-700">Enabled</span>
                  </label>
                </div>
              </div>

              {/* Color Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Default Color Mode
                </label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="colorMode"
                      value="grayscale"
                      defaultChecked
                      className="w-4 h-4 text-sky-600 focus:ring-sky-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Black & White</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="colorMode"
                      value="color"
                      className="w-4 h-4 text-sky-600 focus:ring-sky-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Color</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button className="px-5 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                Cancel
              </button>
              <button className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-sm font-medium transition shadow-sm">
                Save Defaults
              </button>
            </div>
          </div>

          {/* Printer Management */}
          <div className="border border-gray-200 rounded-2xl overflow-hidden">
            <button
              onClick={() => setIsPrinterOpen(!isPrinterOpen)}
              className="w-full px-6 py-4 bg-white hover:bg-gray-50 flex items-center justify-between text-left transition"
            >
              <h2 className="text-lg font-semibold text-gray-700">Printer Management</h2>
              <img
                src={logo}
                alt="Toggle"
                className={`w-5 h-5 transition-transform ${isPrinterOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isPrinterOpen && (
              <div className="p-6 bg-gray-50">
                <p className="text-sm text-gray-500 italic">No printers configured yet.</p>
              </div>
            )}
          </div>

          {/* Audit Log */}
          <div className="flex-1 flex flex-col">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Audit Log for Settings Changes
            </h2>

            {/* Filter */}
            <div className="mb-4 flex gap-3 items-center">
              <span className="text-sm font-medium text-gray-600">Filter by Admin</span>
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
                      <td className="px-4 py-3 font-medium text-gray-900">{log.newValue}</td>
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
        </div>
      </main>
    </div>
  );
}

export default Configuration;