import React, { useState } from "react";

const StepUploadPreview = ({ onNext }) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [classification, setClassification] = useState(null);
  const [isImagePrint, setIsImagePrint] = useState(false); // ✅ added this

  // Detect whether an image covers ≥60% of the area (rough estimation)
  const analyzeImageContent = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        const imageData = ctx.getImageData(0, 0, img.width, img.height).data;
        let coloredPixels = 0;
        const totalPixels = img.width * img.height;

        // Count pixels that are not near-white
        for (let i = 0; i < imageData.length; i += 4) {
          const [r, g, b] = [imageData[i], imageData[i + 1], imageData[i + 2]];
          const brightness = (r + g + b) / 3;
          if (brightness < 240) coloredPixels++; // not pure white
        }

        const coverage = (coloredPixels / totalPixels) * 100;
        resolve(coverage >= 60); // true if ≥60% image area
      };
    });
  };

  const handleFileChange = async (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));

    const isImageFile = selected.type.startsWith("image/");
    let classificationResult = "Standard Printing (Text/Document)";
    let isImagePrintDetected = false;

    if (isImageFile) {
      const imageHasHighCoverage = await analyzeImageContent(selected);
      if (imageHasHighCoverage) {
        classificationResult = "Image Printing (≥60% image content)";
        isImagePrintDetected = true;
      } else {
        classificationResult = "Standard Image (Text + Image <60%)";
      }
    }

    setClassification(classificationResult);
    setIsImagePrint(isImagePrintDetected); // ✅ properly sets flag
  };

  const handleUpload = () => {
    if (!file) return alert("Please select a file first!");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      // ✅ Pass all important data to next step
      if (onNext && typeof onNext === "function") {
        onNext({ file, classification, isImagePrint });
      } else {
        console.warn("⚠️ onNext is not defined or not a function");
      }
    }, 2000);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-8">
      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl z-20">
          <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-sky-600 font-medium">Uploading your file...</p>
        </div>
      )}

      <h2 className="text-2xl font-semibold text-sky-700 mb-6">
        Upload and Preview File
      </h2>

      {/* Upload box */}
      <div className="flex flex-col items-center border-2 border-dashed border-sky-300 rounded-xl p-6 hover:bg-sky-50 transition">
        <input
          id="fileUpload"
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
        <label
          htmlFor="fileUpload"
          className="cursor-pointer bg-[#1F6D8B] hover:bg-sky-600 text-white px-5 py-2 rounded-md transition"
        >
          Choose File
        </label>

        {file ? (
          <>
            <p className="mt-3 text-gray-700">
              Selected: <span className="font-semibold">{file.name}</span>
            </p>
            {classification && (
              <p
                className={`mt-1 text-sm font-medium ${
                  classification.includes("Image")
                    ? "text-sky-600"
                    : "text-gray-600"
                }`}
              >
                Detected as: {classification}
              </p>
            )}
          </>
        ) : (
          <p className="mt-3 text-gray-500 text-sm">No file chosen yet</p>
        )}
      </div>

      {/* File preview */}
      {previewUrl && (
        <div className="mt-6 border rounded-lg overflow-hidden">
          <iframe
            src={previewUrl}
            title="File Preview"
            className="w-full h-80"
          ></iframe>
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-end space-x-3 mt-8">
        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className={`px-6 py-2 rounded-lg font-medium transition ${
            file && !loading
              ? "bg-sky-500 text-white hover:bg-sky-600"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          Upload & Continue
        </button>
      </div>
    </div>
  );
};

export default StepUploadPreview;
