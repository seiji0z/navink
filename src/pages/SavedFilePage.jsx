import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import savedFileBlueIcon from "../assets/icons/saved-files-blue-icon.png";

function SavedFilePage() {
  const [isOpen, setIsOpen] = useState(true);

  const recentFiles = [
    { name: "toPrint.pdf" },
    { name: "IT313.pdf" },
    { name: "CFE101.pdf" },
  ];

  const lastWeekFiles = [{ name: "pitch.pptx" }, { name: "report.docx" }];

  return (
    <div className="fade-in flex min-h-screen bg-sky-100">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col">
        <h2 className="text-xl font-semibold text-navi mb-4">Saved Files</h2>

        <div className="bg-white rounded-3xl p-6 shadow-md flex-1">
          {/* Section Title */}
          <h3 className="text-sm font-medium text-gray-500 mb-3">
            Recent Files
          </h3>

          {/* Recent Files */}
          <div className="flex flex-wrap gap-8">
            {recentFiles.map((file, index) => (
              <div key={index} className="text-center">
                <div className="inline-block rounded-2xl p-1 transition-transform transform hover:scale-105 hover:bg-sky-50 cursor-pointer">
                  <img
                    src={savedFileBlueIcon}
                    alt="File icon"
                    className="w-[98px] h-[98px] mx-auto drop-shadow-sm transition-transform duration-200"
                  />
                </div>
                <p className="text-xs mt-1 font-medium text-gray-700">
                  {file.name}
                </p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-4"></div>

          {/* Last Week Section */}
          <h3 className="text-sm font-medium text-gray-500 mb-3">Last Week</h3>
          <div className="flex flex-wrap gap-8">
            {lastWeekFiles.map((file, index) => (
              <div key={index} className="text-center">
                <div className="inline-block rounded-2xl p-1 transition-transform transform hover:scale-105 hover:bg-sky-50 cursor-pointer">
                  <img
                    src={savedFileBlueIcon}
                    alt="File icon"
                    className="w-[98px] h-[98px] mx-auto drop-shadow-sm transition-transform duration-200"
                  />
                </div>
                <p className="text-xs mt-1 font-medium text-gray-700">
                  {file.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default SavedFilePage;
