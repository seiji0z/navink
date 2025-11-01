import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Load PDF.js worker from the unpkg CDN
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function DocumentPreviewCard({ previewUrl }) {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  // This function creates an array of page numbers, e.g., [1, 2, 3]
  const pageNumbers = Array.from(new Array(numPages), (el, index) => index + 1);

  return (
    <div className="bg-gray-50 rounded-2xl p-5">
      <h3 className="font-semibold text-gray-700 mb-3">Document Preview</h3>
      
      {/* Set a fixed height and overflow-y-auto.
        This matches the aspect ratio but also allows scrolling for multi-page docs.
      */}
      <div className="aspect-[17/11] bg-white rounded-lg border overflow-y-auto">
        {previewUrl ? (
          <Document
            file={previewUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            // Display a loading message
            loading={
              <div className="flex items-center justify-center h-full text-gray-500">
                Loading preview...
              </div>
            }
            // Display an error message
            error={
              <div className="flex items-center justify-center h-full text-red-500">
                Failed to load document.
              </div>
            }
          >
            {/* Map over all pages and render them in a scrolling list */}
            {pageNumbers.map((pageNumber) => (
              <div
                key={`page_${pageNumber}`}
                className="flex flex-col items-center py-4 border-b last:border-b-0"
              >
                <Page
                  pageNumber={pageNumber}
                  renderTextLayer={false}      // Admin doesn't need to select text
                  renderAnnotationLayer={false} // Admin doesn't need annotations
                  width={400} // A good width for a preview panel
                />
                <p className="text-sm text-gray-500 mt-2">
                  Page {pageNumber} of {numPages}
                </p>
              </div>
            ))}
          </Document>
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