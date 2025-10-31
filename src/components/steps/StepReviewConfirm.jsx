import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Load PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const StepReviewConfirm = ({ onBack, data }) => {
  const [tokensUsed, setTokensUsed] = useState(0);
  const totalTokens = 500;

  useEffect(() => {
    if (!data) return;

    const copies = parseInt(data.copies || 1);
    const totalPages = data.selectedPages?.length || parseInt(data.totalPages || 1);
    const isImagePrint = data.isImagePrint === true;

    let tokensPerPage = 0;
    if (data.colorMode === "Black & White") {
      tokensPerPage = isImagePrint ? 10 : 1;
    } else if (data.colorMode === "Colored") {
      tokensPerPage = isImagePrint ? 15 : 10;
    }

    setTokensUsed(tokensPerPage * copies * totalPages);
  }, [data]);

  const remainingTokens = totalTokens - tokensUsed;

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md max-w-5xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
        Review & Confirm
      </h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Left: Summary Info */}
        <div className="space-y-2 text-gray-700">
          <p><strong>File:</strong> {data?.file?.name || "No file selected"}</p>
          <p><strong>Copies:</strong> {data.copies || 1}</p>
          <p><strong>Total Pages:</strong> {data.totalPages || 1}</p>
          <p><strong>Paper Size:</strong> {data.paperSize}</p>
          <p><strong>Color:</strong> {data.colorMode}</p>
          <p><strong>Detected Type:</strong>{" "}
            {data.isImagePrint ? (
              <span className="text-sky-600 font-medium">Image Print</span>
            ) : (
              <span className="text-gray-600">Standard Document</span>
            )}
          </p>
          <p><strong>Print Range:</strong>{" "}
            {data.printRange || "All Pages"}
          </p>
          <p><strong>Print Date:</strong>{" "}
            {data.printOption === "later"
              ? data.printDate || "Not scheduled"
              : "Print Now"}
          </p>

          <hr className="my-4 border-gray-300" />

          <p><strong>Tokens Used:</strong>{" "}
            <span className="text-sky-600 font-semibold">{tokensUsed}</span></p>
          <p><strong>Remaining Tokens:</strong>{" "}
            <span
              className={`font-semibold ${
                remainingTokens < 0 ? "text-red-500" : "text-green-600"
              }`}
            >
              {remainingTokens >= 0 ? remainingTokens : 0}
            </span> / {totalTokens}</p>
        </div>

        {/* Right: PDF or Image Preview */}
        <div className="border rounded-xl bg-gray-50 p-4 h-96 overflow-y-auto">
          {data.previewUrl ? (
            data?.file?.type?.startsWith("image/") ? (
              <div className="flex flex-col items-center space-y-3">
                <img
                  src={data.previewUrl}
                  alt="Preview"
                  className={`w-full h-auto max-h-96 object-contain rounded-lg ${
                    data.colorMode === "Black & White" ? "grayscale" : ""
                  }`}
                />
                <p className="text-sm text-gray-500">
                  Image to be printed ({data.copies || 1} copies)
                </p>
              </div>
            ) : (
              <Document file={data.previewUrl} loading="Loading PDF...">
                {(data.selectedPages?.length
                  ? data.selectedPages
                  : Array.from({ length: data.totalPages || 1 }, (_, i) => i + 1)
                ).map((pageNum) => (
                  <div
                    key={pageNum}
                    className="mb-6 border-b border-gray-300 pb-3 last:border-none"
                  >
                    <p className="text-sm text-gray-500 mb-2">Page {pageNum}</p>
                    <Page
                      pageNumber={pageNum}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      className={`${
                        data.colorMode === "Black & White" ? "grayscale" : ""
                      }`}
                      width={350}
                    />
                  </div>
                ))}
              </Document>
            )
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              No preview available
            </div>
          )}
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
        >
          Back
        </button>
        <button
          className="px-6 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition"
          disabled={remainingTokens < 0}
        >
          Confirm & Submit
        </button>
      </div>
    </div>
  );
};

export default StepReviewConfirm;
