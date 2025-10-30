import React from "react";
import logo from "../../../assets/images/navink-logo.png";
import { useNavigate } from "react-router-dom";

function PrintQueueCard() {
  const navigate = useNavigate(); 
  const queue = [
    {
      jobId: "#001",
      document: "Final_Thesis.pdf",
      status: "Printing",
      printer: "Printer A",
    },
    {
      jobId: "#002",
      document: "Essay.docx",
      status: "Queued",
      printer: "Printer B",
    },
    {
      jobId: "#003",
      document: "LabReport.pdf",
      status: "Completed",
      printer: "Printer A",
    },
  ];

  const statusColor = {
    Printing: "text-sky-600",
    Queued: "text-yellow-600",
    Completed: "text-green-600",
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3
          className="text-lg font-medium text-gray-500"
          style={{ fontFamily: "Poppins-SemiBold, sans-serif" }}
        >
          Print Queue
        </h3>
        <button
          onClick={() => navigate("/admin/queue")}
          className="text-sm text-sky-600 hover:underline"
        >
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-700">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Job ID</th>
              <th className="text-left py-2">Document</th>
              <th className="text-left py-2">Printer</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {queue.map((job, idx) => (
              <tr key={idx} className="border-b last:border-none">
                <td className="py-3">{job.jobId}</td>
                <td>{job.document}</td>
                <td>{job.printer}</td>
                <td className={statusColor[job.status]}>{job.status}</td>
                <td>
                  <button className="px-3 py-1 bg-sky-100 text-sky-700 rounded-lg text-xs hover:bg-sky-200 transition">
                    View Details
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

export default PrintQueueCard;
