import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import logo from "../../assets/images/navink-logo.png";

function PrintRequest() {
  const location = useLocation();
  const navigate = useNavigate();
  const request = location.state;

  if (!request) {
    return <div>Request not found.</div>;
  }

  const handleBack = () => navigate(-1);

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
              {/* Actions */}
              <div className="bg-gray-50 rounded-2xl p-5">
                <h3 className="font-semibold text-gray-700 mb-3">Actions</h3>
                <p className="text-xs text-gray-500 mb-4">
                  <span className="font-medium">Admin Notes / Reason for Decline</span> (optional)
                </p>
                <textarea
                  placeholder="Add notes here..."
                  className="w-full p-3 border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-sky-300"
                  rows={3}
                />
                <div className="flex gap-3 mt-4">
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition">
                    <img src={logo} alt="Approve" className="w-5 h-5" /> Approve Request
                  </button>
                  <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition">
                    <img src={logo} alt="Decline" className="w-5 h-5" /> Decline Request
                  </button>
                </div>
              </div>

              {/* Student Info */}
              <div className="bg-gray-50 rounded-2xl p-5">
                <h3 className="font-semibold text-gray-700 mb-3">Student Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Student Name</p>
                    <p className="font-medium text-gray-900">{request.studentName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Student ID</p>
                    <p className="font-medium text-gray-900">{request.studentId.split("@")[0]}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500">Email</p>
                    <p className="font-medium text-gray-900 break-all">{request.studentId}</p>
                  </div>
                </div>
              </div>

              {/* Print Settings */}
              <div className="bg-gray-50 rounded-2xl p-5">
                <h3 className="font-semibold text-gray-700 mb-3">Print Settings Overview</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><p className="text-gray-500">Quantity</p><p className="font-medium">2 Copies</p></div>
                  <div><p className="text-gray-500">Paper Size</p><p className="font-medium">A4</p></div>
                  <div><p className="text-gray-500">Color Mode</p><p className="font-medium">Color</p></div>
                  <div><p className="text-gray-500">Sided</p><p className="font-medium">Double-sided</p></div>
                </div>
                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                  <p className="font-semibold text-gray-700">Total Token Cost</p>
                  <p className="text-lg font-bold text-sky-600">30 Tokens</p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-5">
                <h3 className="font-semibold text-gray-700 mb-3">Files Submitted</h3>
                <div className="flex items-center justify-between bg-white rounded-lg p-3 border">
                  <div className="flex items-center gap-3">
                    <img src={logo} alt="PDF" className="w-10 h-10 rounded" />
                    <div>
                      <p className="font-medium text-gray-800">Final_Thesis.pdf</p>
                      <p className="text-xs text-gray-500">2.4 MB • 354 pages</p>
                    </div>
                  </div>
                  <button className="text-sky-600 hover:text-sky-700 flex items-center gap-1 text-sm font-medium">
                    <img src={logo} alt="Download" className="w-4 h-4" /> Download
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5 h-96">
                <h3 className="font-semibold text-gray-700 mb-3 text-center">Document Preview</h3>
                <div className="bg-white border-2 border-dashed rounded-xl h-full flex items-center justify-center text-gray-400">
                  <p className="text-sm">PDF Preview Not Available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PrintRequest;