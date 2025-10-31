import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Load worker for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const StepConfigurePrint = ({ onNext, onBack, data }) => {
  const [copies, setCopies] = useState(1);
  const [paperSize, setPaperSize] = useState("Short 8.5 x 11");
  const [colorMode, setColorMode] = useState("Black & White");
  const [printRangeOption, setPrintRangeOption] = useState("All Pages");
  const [customRange, setCustomRange] = useState("");
  const [printOption, setPrintOption] = useState("now");
  const [printDate, setPrintDate] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [rangeError, setRangeError] = useState("");
  const [selectedPages, setSelectedPages] = useState([]);

  useEffect(() => {
    if (data) {
      setTotalPages(data.totalPages || 1);
      setPreviewUrl(data.previewUrl);
      if (data.totalPages) {
        setSelectedPages(Array.from({ length: data.totalPages }, (_, i) => i + 1));
      }
    }
  }, [data]);

  // Parse and validate custom page ranges
  const parseRange = (rangeStr) => {
    const pages = new Set();
    const parts = rangeStr.split(",").map((r) => r.trim());
    for (let r of parts) {
      if (r.includes("-")) {
        const [start, end] = r.split("-").map(Number);
        for (let i = start; i <= end; i++) pages.add(i);
      } else {
        const page = Number(r);
        if (!isNaN(page)) pages.add(page);
      }
    }
    return [...pages].sort((a, b) => a - b);
  };

  const validateRange = (rangeStr) => {
    const pages = parseRange(rangeStr);
    if (!pages.length) return false;
    return pages.every((p) => p >= 1 && p <= totalPages);
  };

  useEffect(() => {
    if (printRangeOption === "Select Pages" && customRange) {
      if (validateRange(customRange)) {
        setRangeError("");
        setSelectedPages(parseRange(customRange));
      } else {
        setRangeError(`Invalid range. Must be within 1–${totalPages}.`);
      }
    } else if (printRangeOption === "All Pages") {
      setSelectedPages(Array.from({ length: totalPages }, (_, i) => i + 1));
      setRangeError("");
    }
  }, [customRange, printRangeOption, totalPages]);

  const handleNext = () => {
    if (printRangeOption === "Select Pages" && !validateRange(customRange)) {
      setRangeError(`Invalid range. Must be within 1–${totalPages}.`);
      return;
    }

    onNext({
      ...data,
      copies,
      paperSize,
      colorMode,
      printRange:
        printRangeOption === "All Pages"
          ? `All Pages (${totalPages} pages)`
          : customRange,
      printOption,
      printDate,
      selectedPages,
    });
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md max-w-4xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
        Configure Print Settings
      </h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Left: Settings Form */}
        <div className="space-y-4">
          {/* Copies */}
          <div>
            <label className="block font-medium text-gray-700">Copies:</label>
            <input
              type="number"
              min="1"
              value={copies}
              onChange={(e) => setCopies(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg"
            />
          </div>

          {/* Paper Size */}
          <div>
            <label className="block font-medium text-gray-700">Paper Size:</label>
            <select
              value={paperSize}
              onChange={(e) => setPaperSize(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg"
            >
              <option>Short 8.5 x 11</option>
              <option>Long 8.5 x 13</option>
              <option>A4</option>
            </select>
          </div>

          {/* Color */}
          <div>
            <label className="block font-medium text-gray-700">Color:</label>
            <select
              value={colorMode}
              onChange={(e) => setColorMode(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg"
            >
              <option>Black & White</option>
              <option>Colored</option>
            </select>
          </div>

          {/* Page Range */}
          <div>
            <label className="block font-medium text-gray-700">
              Print Range: (Total {totalPages})
            </label>
            <div className="flex items-center space-x-4 mt-1">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  checked={printRangeOption === "All Pages"}
                  onChange={() => {
                    setPrintRangeOption("All Pages");
                    setRangeError("");
                  }}
                />
                <span>All Pages</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  checked={printRangeOption === "Select Pages"}
                  onChange={() => setPrintRangeOption("Select Pages")}
                />
                <span>Select Pages</span>
              </label>
            </div>

            {printRangeOption === "Select Pages" && (
              <>
                <input
                  type="text"
                  placeholder="e.g. 1-3, 5, 7"
                  value={customRange}
                  onChange={(e) => setCustomRange(e.target.value)}
                  className="w-full mt-3 p-2 border rounded-lg"
                />
                {rangeError && (
                  <p className="text-red-500 text-sm mt-1">{rangeError}</p>
                )}
              </>
            )}
          </div>

          {/* Print Date */}
          <div>
            <label className="block font-medium text-gray-700">Print Date:</label>
            <div className="flex items-center space-x-4 mt-1">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="now"
                  checked={printOption === "now"}
                  onChange={() => setPrintOption("now")}
                />
                <span>Print Now</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="later"
                  checked={printOption === "later"}
                  onChange={() => setPrintOption("later")}
                />
                <span>Print Later</span>
              </label>
            </div>
            {printOption === "later" && (
              <input
                type="date"
                value={printDate}
                onChange={(e) => setPrintDate(e.target.value)}
                className="w-full mt-3 p-2 border rounded-lg"
              />
            )}
          </div>
        </div>

        {/* Right: PDF Preview */}
        <div>
          <div className="border rounded-xl bg-gray-50 p-4 h-96 overflow-y-auto">
            {previewUrl ? (
              <Document file={previewUrl} loading="Loading PDF...">
                {selectedPages.map((pageNum) => (
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
                        colorMode === "Black & White" ? "grayscale" : ""
                      }`}
                      width={350}
                    />
                  </div>
                ))}
              </Document>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                No preview available
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 rounded-lg bg-[#1F6D8B] hover:bg-sky-600 text-white transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepConfigurePrint;
