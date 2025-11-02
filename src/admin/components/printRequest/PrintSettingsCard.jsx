import React from 'react';

function PrintSettingsCard({ settings }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-5">
      <h3 className="font-semibold text-gray-700 mb-3">Print Settings Overview</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Quantity</p>
          <p className="font-medium">{settings.copies} Copies</p>
        </div>
        <div>
          <p className="text-gray-500">Paper Size</p>
          <p className="font-medium">{settings.paperSize}</p>
        </div>
        <div>
          <p className="text-gray-500">Color Mode</p>
          <p className="font-medium">{settings.colorMode}</p>
        </div>
        <div>
          <p className="text-gray-500">Sided</p>
          <p className="font-medium">{settings.sided}</p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <p className="font-semibold text-gray-700">Total Token Cost</p>
        <p className="text-lg font-bold text-sky-600">{settings.tokenCost} Tokens</p>
      </div>
    </div>
  );
}

export default PrintSettingsCard;