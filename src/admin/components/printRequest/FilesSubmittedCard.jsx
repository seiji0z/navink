import React from 'react';
import fileIcon from '../../../assets/icons/file-queue-icon.png';

function FilesSubmittedCard({ files }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-5">
      <h3 className="font-semibold text-gray-700 mb-3">Files Submitted</h3>
      {files.map((file, index) => (
        <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-lg p-3 border mb-2">
          <div className="flex items-center gap-3 min-w-0">
            <img src={fileIcon} alt="PDF" className="w-10 h-10 rounded" />
            <div className="min-w-0">
              <p className="font-medium text-gray-900 truncate max-w-[240px] sm:max-w-[360px]" title={file.name}>{file.name}</p>
              <p className="text-xs text-gray-500">{file.size}</p>
            </div>
          </div>
          <button 
            onClick={() => file.onDownload?.()} 
            className="mt-2 sm:mt-0 self-start sm:self-auto text-sky-600 hover:text-sky-800 transition whitespace-nowrap"
          >
            Download
          </button>
        </div>
      ))}
    </div>
  );
}

export default FilesSubmittedCard;