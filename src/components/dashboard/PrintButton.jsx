import React from "react";
import { useNavigate } from "react-router-dom";
import printIcon from "../../assets/icons/print-files-icon-rev.png";

function PrintButton() {
  const navigate = useNavigate();

  const handlePrint = () => {
    navigate("/print-files"); 
  };

  return (
    <button
      onClick={handlePrint}
      className="fixed top-6 right-6 bg-white shadow-lg rounded-full p-4 hover:bg-sky-50 transition-all border border-gray-200"
      title="Print Files"
    >
      <img
        src={printIcon}
        alt="Print"
        className="w-6 h-6"
      />
    </button>
  );
}

export default PrintButton;
