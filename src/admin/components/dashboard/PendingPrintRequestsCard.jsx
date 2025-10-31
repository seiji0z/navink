import React from "react";
import { useNavigate } from "react-router-dom"; 
import logo from "../../../assets/icons/profile-icon.svg";

function PendingPrintRequestsCard() {
  const navigate = useNavigate(); 

  const requests = [
    {
      student: "Gabriel Flores",
      document: "Final_Thesis.pdf",
      submitted: "41 mins ago",
      status: "Pending",
    },
    {
      student: "Clarenz Balagot",
      document: "CHM-Lab-Report.pdf",
      submitted: "3 hours ago",
      status: "Pending",
    },
    {
      student: "Anjelo Esperanzate",
      document: "Essay.docx",
      submitted: "1 day ago",
      status: "Approved",
    },
    {
      student: "Frances Julia",
      document: "TopazForming.pdf",
      submitted: "2 days ago",
      status: "Approved",
    },
    {
      student: "Jan Christian",
      document: "IT313.pdf",
      submitted: "2 days ago",
      status: "Approved",
    },
    {
      student: "Kristelle Tenorio",
      document: "printpls.pdf",
      submitted: "2 days ago",
      status: "Denied",
    },
  ];

  const statusColor = {
    Pending: "bg-yellow-200 text-yellow-800",
    Approved: "bg-green-200 text-green-800",
    Denied: "bg-red-200 text-red-800",
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3
          className="text-lg font-medium text-gray-500"
          style={{ fontFamily: "Poppins-SemiBold, sans-serif" }}
        >
          Pending Print Requests
        </h3>
        <button
          onClick={() => navigate("/admin/requests")}
          className="text-sm text-sky-600 hover:underline"
        >
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-700">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Student</th>
              <th className="text-left py-2">Document</th>
              <th className="text-left py-2">Submitted</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, idx) => (
              <tr key={idx} className="border-b last:border-none">
                <td className="py-3 flex items-center space-x-2">
                  <img src={logo} alt="User" className="w-6 h-6 rounded-full" />
                  <span>{req.student}</span>
                </td>
                <td>{req.document}</td>
                <td>{req.submitted}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[req.status]}`}
                  >
                    {req.status}
                  </span>
                </td>
                <td className="space-x-2">
                  <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs hover:bg-green-200 transition">
                    Approve
                  </button>
                  <button className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-xs hover:bg-red-200 transition">
                    Deny
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PendingPrintRequestsCard;
