import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import ActionsCard from "../components/printRequest/ActionsCard";
import StudentInfoCard from "../components/printRequest/StudentInfoCard";
import PrintSettingsCard from "../components/printRequest/PrintSettingsCard";
import FilesSubmittedCard from "../components/printRequest/FilesSubmittedCard";
import DocumentPreviewCard from "../components/printRequest/DocumentPreviewCard";
import logo from "../../assets/images/navink-logo.png";

function PrintRequest() {
  const location = useLocation();
  const navigate = useNavigate();
  const request = location.state;

  if (!request) {
    return <div>Request not found.</div>;
  }

  const handleBack = () => navigate(-1);

  // Example print settings for demonstration
  const printSettings = {
    copies: 2,
    paperSize: "A4",
    colorMode: "Color",
    sided: "Double-sided",
    tokenCost: 30
  };

  // Example files for demonstration
  const files = [
    {
      name: request.document,
      size: "2.5 MB",
      onDownload: () => console.log("Downloading file...")
    }
  ];

  const handleApprove = () => {
    console.log("Approving request...");
    // Add approve logic here
  };

  const handleDecline = () => {
    console.log("Declining request...");
    // Add decline logic here
  };

  return (
    <div className="fade-in flex min-h-screen bg-sky-100">
      <AdminSidebar isOpen={true} setIsOpen={() => {}} />

      {/* Center Container */}
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl shadow-md p-6 max-w-5xl w-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h1 className="text-2xl font-bold text-gray-800">Review Print Request</h1>
            <button
              onClick={handleBack}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              <img src={logo} alt="Close" className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <ActionsCard onApprove={handleApprove} onDecline={handleDecline} />
              <StudentInfoCard 
                studentName={request.studentName} 
                studentId={request.studentId} 
              />
              <PrintSettingsCard settings={printSettings} />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <FilesSubmittedCard files={files} />
              <DocumentPreviewCard previewUrl={null} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PrintRequest;