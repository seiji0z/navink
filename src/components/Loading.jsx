import React, { useState } from "react";
import Loading from "../components/Loading";

function StepUploadPreview({ onNext }) {
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    setLoading(true);
    // simulate upload delay
    setTimeout(() => {
      setLoading(false);
      onNext(); // go to next step after loading
    }, 2000);
  };

  if (loading) return <Loading message="Uploading file..." />;

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Upload and Preview File</h2>
      <input type="file" className="mb-3" />
      <button
        onClick={handleUpload}
        className="bg-sky-500 text-white px-4 py-2 rounded-md"
      >
        Upload
      </button>
    </div>
  );
}

export default StepUploadPreview;
