import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { supabase } from "../../supabaseClient"; // ✅ adjust path if needed

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
  const [tokenCost, setTokenCost] = useState(0);

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

  /* =========================================================
     🧮 Token Cost Calculation (matches StepReviewConfirm)
  ========================================================= */
  const calculateTokens = () => {
    if (!selectedPages.length || !copies) return 0;

    const totalPagesSelected = selectedPages.length;
    const isImagePrint = data?.isImagePrint || false; // if flagged
    let tokensPerPage = 0;

    if (isImagePrint) {
      tokensPerPage = colorMode === "Colored" ? 15 : 10;
    } else {
      tokensPerPage = colorMode === "Colored" ? 10 : 1;
    }

    return tokensPerPage * totalPagesSelected * copies;
  };

  useEffect(() => {
    setTokenCost(calculateTokens());
  }, [copies, colorMode, paperSize, selectedPages]);

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
      tokenCost,
    });
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-2xl shadow-md max-w-4xl mx-auto space-y-6">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 border-b pb-2">
        Configure Print Settings
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Settings Form */}
        <div className="space-y-4">
          {/* Copies */}
          <div>
            <label className="block font-medium text-gray-700">Copies:</label>
            <input
              type="number"
              min="1"
              value={copies}
              onChange={(e) => setCopies(parseInt(e.target.value) || 1)}
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

          {/* Color Mode */}
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

          {/* Token Cost */}
          <div className="pt-2 border-t mt-4">
            <label className="block font-medium text-gray-700">
              Estimated Token Cost:
            </label>
            <div className="mt-1 text-lg font-semibold text-sky-700">
              {tokenCost ? `${tokenCost} tokens` : "—"}
            </div>
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
                      className={`${colorMode === "Black & White" ? "grayscale" : ""}`}
                      width={320}
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

      <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
        <button
          onClick={onBack}
          className="w-full sm:w-auto px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="w-full sm:w-auto px-6 py-2 rounded-lg bg-[#1F6D8B] hover:bg-sky-600 text-white transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepConfigurePrint;
