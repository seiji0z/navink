import React from "react";

function PrintDetailsSettings() {
  return (
    <div className="bg-sky-50 rounded-2xl p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Print Details
      </h2>

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
              <span className="ms-3 text-sm font-medium text-gray-700">
                Enabled
              </span>
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
  );
}

export default PrintDetailsSettings;