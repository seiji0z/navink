import React from 'react';
import fileIcon from '../../../assets/icons/file-queue-icon.png';

function FilesSubmittedCard({ files }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-5">
      <h3 className="font-semibold text-gray-700 mb-3">Files Submitted</h3>
      {files.map((file, index) => (
        <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3 border mb-2">
          <div className="flex items-center gap-3">
            <img src={fileIcon} alt="PDF" className="w-10 h-10 rounded" />
            <div>
              <p className="font-medium text-gray-900">{file.name}</p>
              <p className="text-xs text-gray-500">{file.size}</p>
            </div>
          </div>
          <button 
            onClick={() => file.onDownload?.()} 
            className="text-sky-600 hover:text-sky-800 transition"
          >
            Download
          </button>
        </div>
      ))}
    </div>
  );
}

export default FilesSubmittedCard;