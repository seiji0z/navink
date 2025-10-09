import React from "react";

function SavedFiles() {
  return (
    <div className="h-100 bg-white rounded-xl p-6 shadow col-span-2">
      <h3 className="text-sm font-medium text-gray-500 mb-3">Saved Files</h3>
      <div className="flex space-x-3">
        <div className="text-center">
          <img src="/assets/icons/file-icon.png" className="w-12 h-12 mx-auto" />
          <p className="text-xs mt-1">toPrint.pdf</p>
        </div>
        <div className="text-center">
          <img src="/assets/icons/file-icon.png" className="w-12 h-12 mx-auto" />
          <p className="text-xs mt-1">IT313.pdf</p>
        </div>
        <div className="text-center">
          <img src="/assets/icons/file-icon.png" className="w-12 h-12 mx-auto" />
          <p className="text-xs mt-1">CFE101.pdf</p>
        </div>
      </div>
    </div>
  );
}

export default SavedFiles;