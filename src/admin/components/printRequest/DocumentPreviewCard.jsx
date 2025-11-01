import React from 'react';

function DocumentPreviewCard({ previewUrl }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-5">
      <h3 className="font-semibold text-gray-700 mb-3">Document Preview</h3>
      <div className="aspect-[8.5/11] bg-white rounded-lg border overflow-hidden">
        {previewUrl ? (
          <iframe
            src={previewUrl}
            title="Document Preview"
            className="w-full h-full"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            Preview not available
          </div>
        )}
      </div>
    </div>
  );
}

export default DocumentPreviewCard;