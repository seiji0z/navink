import React, { useState, useEffect } from "react";

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

  useEffect(() => {
    if (data) {
      setTotalPages(data.totalPages || 1);
      setPreviewUrl(data.previewUrl);
    }
  }, [data]);

  const validateRange = (rangeStr) => {
    const ranges = rangeStr.split(",").map((r) => r.trim());
    for (let r of ranges) {
      if (r.includes("-")) {
        const [start, end] = r.split("-").map(Number);
        if (
          isNaN(start) ||
          isNaN(end) ||
          start < 1 ||
          end > totalPages ||
          start > end
        )
          return false;
      } else {
        const page = Number(r);
        if (isNaN(page) || page < 1 || page > totalPages) return false;
      }
    }
    return true;
  };

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
    });
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md max-w-3xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
        Configure Print Settings
      </h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Left Side: Form */}
        <div className="space-y-4">
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

        {/* Right Side: Preview */}
        <div className="border rounded-xl overflow-hidden bg-gray-50">
          {previewUrl ? (
            data?.file?.type?.startsWith("image/") ? (
              <img
                src={previewUrl}
                alt="Preview"
                className={`w-full h-96 object-contain ${
                  colorMode === "Black & White" ? "grayscale" : ""
                }`}
              />
            ) : (
              <iframe
                src={previewUrl}
                title="Document Preview"
                className={`w-full h-96 ${
                  colorMode === "Black & White" ? "filter grayscale" : ""
                }`}
              />
            )
          ) : (
            <div className="h-96 flex items-center justify-center text-gray-400">
              No preview available
            </div>
          )}
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
