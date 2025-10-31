import React, { useState } from "react";

/**
 * Lightweight PDF page-count extractor:
 * - Reads the PDF bytes and searches for page tokens such as "/Type /Page".
 * - If available, it also looks for "/Count <num>" objects and returns the largest found.
 *
 * Note: This is a heuristic — it works for most PDFs encountered in practice,
 * and is purposely small/lightweight to avoid pulling in pdf.js.
 */
async function countPdfPagesByScanning(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const text = new TextDecoder("latin1").decode(arrayBuffer);

    // 1) Search for explicit "/Count <n>" occurrences and keep the largest value
    //    Many PDFs have a /Count in a Pages object which can be precise.
    const countMatches = [...text.matchAll(/\/Count\s+(\d+)/g)].map(m => parseInt(m[1], 10));
    const largestCount = countMatches.length ? Math.max(...countMatches) : 0;

    // 2) Count occurrences of "/Type /Page" as a fallback heuristic
    const pageTokenMatches = [...text.matchAll(/\/Type\s*\/Page\b/g)].length;

    // Choose best available: prefer largest /Count if it looks reasonable, else page token count
    if (largestCount && largestCount > 0) return largestCount;
    if (pageTokenMatches && pageTokenMatches > 0) return pageTokenMatches;

    // 3) As a last fallback, try to find "/Page" token occurrences (less strict)
    const loosePageMatches = [...text.matchAll(/\/Page\b/g)].length;
    if (loosePageMatches && loosePageMatches > 0) return loosePageMatches;

    return 1;
  } catch (err) {
    console.warn("PDF page count extraction failed:", err);
    return 1;
  }
}

const StepUploadPreview = ({ onNext }) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [classification, setClassification] = useState(null);
  const [isImagePrint, setIsImagePrint] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const handleFileChange = async (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    const url = URL.createObjectURL(selected);
    setPreviewUrl(url);

    const isImageFile = selected.type.startsWith("image/");
    let classificationResult = "Standard Printing (Text/Document)";
    let isImagePrintDetected = false;
    let pageCount = 1;

    if (isImageFile) {
      // images treated as single-page prints
      classificationResult = "Image Printing";
      isImagePrintDetected = true;
      pageCount = 1;
    } else if (selected.type === "application/pdf") {
      // attempt to extract actual page count from the PDF bytes (heuristic)
      pageCount = await countPdfPagesByScanning(selected);
      classificationResult = "PDF Document";
    } else {
      // other mime types fallback
      pageCount = selected?.pageCount || 1;
    }

    setClassification(classificationResult);
    setIsImagePrint(isImagePrintDetected);
    setTotalPages(pageCount);
  };

  const handleUpload = () => {
    if (!file) return alert("Please select a file first!");
    setLoading(true);

    // Simulate upload latency / processing
    setTimeout(() => {
      setLoading(false);

      // Pass the important fields forward
      onNext({
        file,
        classification,
        isImagePrint,
        totalPages,
        previewUrl,
      });
    }, 700);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-8">
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl z-20">
          <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-sky-600 font-medium">Processing file...</p>
        </div>
      )}

      <h2 className="text-2xl font-semibold text-sky-700 mb-6">Upload and Preview File</h2>

      <div className="flex flex-col items-center border-2 border-dashed border-sky-300 rounded-xl p-6 hover:bg-sky-50 transition">
        <input id="fileUpload" type="file" accept="application/pdf,image/*" onChange={handleFileChange} className="hidden" />
        <label htmlFor="fileUpload" className="cursor-pointer bg-[#1F6D8B] hover:bg-sky-600 text-white px-5 py-2 rounded-md transition">
          Choose File
        </label>

        {file ? (
          <>
            <p className="mt-3 text-gray-700">
              Selected: <span className="font-semibold">{file.name}</span>
            </p>
            {classification && (
              <p className="mt-1 text-sm font-medium text-sky-600">Detected as: {classification}</p>
            )}
            <p className="mt-1 text-sm text-gray-600">Total pages: {totalPages}</p>
          </>
        ) : (
          <p className="mt-3 text-gray-500 text-sm">No file chosen yet</p>
        )}
      </div>

      {previewUrl && (
        <div className="mt-6 border rounded-lg overflow-hidden">
          {file.type.startsWith("image/") ? (
            <img src={previewUrl} alt="preview" className="w-full max-h-80 object-contain" />
          ) : (
            <iframe src={previewUrl} title="File Preview" className="w-full h-80" />
          )}
        </div>
      )}

      <div className="flex justify-end space-x-3 mt-8">
        <button onClick={handleUpload} disabled={!file || loading} className={`px-6 py-2 rounded-lg font-medium transition ${file && !loading ? "bg-sky-500 text-white hover:bg-sky-600" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}>
          Upload & Continue
        </button>
      </div>
    </div>
  );
};

export default StepUploadPreview;
