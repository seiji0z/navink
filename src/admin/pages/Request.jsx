import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import avatarPlaceholder from "../../assets/images/navink-logo.png";

function Request() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const requests = [
    {
      id: 1,
      studentName: "Gabriel Flores",
      studentId: "220057@slu.edu.ph",
      document: "Final_Thesis.pdf",
      submitted: "41 mins ago",
      status: "Pending",
    },
    {
      id: 2,
      studentName: "Gabriel Flores",
      studentId: "220057@slu.edu.ph",
      document: "Final_Thesis.pdf",
      submitted: "41 mins ago",
      status: "Pending",
    },
    {
      id: 3,
      studentName: "Gabriel Flores",
      studentId: "220057@slu.edu.ph",
      document: "Final_Thesis.pdf",
      submitted: "41 mins ago",
      status: "Pending",
    },
    {
      id: 4,
      studentName: "Gabriel Flores",
      studentId: "220057@slu.edu.ph",
      document: "Final_Thesis.pdf",
      submitted: "41 mins ago",
      status: "Pending",
    },
  ];

  const handleViewDetails = (req) => {
    navigate(`/print-request/${req.id}`, { state: req });
  };

  return (
    <div className="fade-in flex min-h-screen bg-sky-100">
      {/* Sidebar */}
      <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <main className="flex-1 p-8 flex flex-col">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Manage Print Request
        </h1>

        {/* White Card */}
        <div className="bg-white rounded-3xl p-6 shadow-md flex-1 overflow-hidden flex flex-col">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Pending Print Requests
          </h2>

          {/* Table */}
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="pb-3 font-medium w-1/5">Student</th>
                  <th className="pb-3 font-medium w-1/5">Document</th>
                  <th className="pb-3 font-medium w-1/5">Submitted</th>
                  <th className="pb-3 font-medium w-1/5">Status</th>
                  <th className="pb-3 font-medium w-1/5">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr
                    key={req.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    {/* Student */}
                    <td className="py-4 w-1/5">
                      <div className="flex items-center space-x-3">
                        <img
                          src={avatarPlaceholder}
                          alt={req.studentName}
                          className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        />
                        <div>
                          <p className="font-medium text-gray-900">
                            {req.studentName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {req.studentId}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Document */}
                    <td className="py-4 w-1/5 text-gray-700 font-medium">
                      {req.document}
                    </td>

                    {/* Submitted */}
                    <td className="py-4 w-1/5 text-gray-600">
                      {req.submitted}
                    </td>

                    {/* Status */}
                    <td className="py-4 w-1/5">
                      <span className="inline-flex items-center bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                        {req.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 w-1/5 pr-4">
                      <div className="flex justify-end gap-2">
                        <button className="bg-green-600 hover:bg-green-700 text-white text-xs font-medium px-4 py-2 rounded-lg transition shadow-sm">
                          Approve
                        </button>
                        <button className="bg-red-600 hover:bg-red-700 text-white text-xs font-medium px-4 py-2 rounded-lg transition shadow-sm">
                          Decline
                        </button>
                        <button
                          onClick={() => handleViewDetails(req)}
                          className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium px-4 py-2 rounded-lg transition shadow-sm"
                        >
                          View Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
            <span>Showing {requests.length} pending request(s)</span>
            <div className="flex items-center gap-1">
              <button className="border rounded-md px-3 py-1.5 text-gray-600 hover:bg-gray-100 text-xs transition">
                1
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Request;