import React from "react";
import avatarPlaceholder from "../../../assets/icons/profile-icon.svg";

function QueueTable({ jobs }) {
  
  const getStatusBadge = (status) => {
    switch (status) {
      case "Printing":
        return "bg-blue-100 text-blue-700";
      case "Paused":
        return "bg-yellow-100 text-yellow-700";
      case "Pending":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex flex-col">
      {/* Table Title */}
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Print Jobs</h2>

      {/* Table */}
      <div className="flex-1 overflow-x-auto border border-gray-200 rounded-2xl">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50">
            <tr>
              <th className="px-4 py-3">Job ID</th>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">File Name</th>
              <th className="px-4 py-3">Printer</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Token</th>
              <th className="px-4 py-3">Submitted</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {jobs.map((job, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 font-medium text-gray-900">{job.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={avatarPlaceholder}
                      alt={job.student}
                      className="w-8 h-8 rounded-full object-cover border"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{job.student}</p>
                      <p className="text-xs text-gray-500">{job.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-700">{job.file}</td>
                <td className="px-4 py-3 text-gray-700">{job.printer}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                      job.status
                    )}`}
                  >
                    {job.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700">{job.tokens} Tokens</td>
                <td className="px-4 py-3 text-gray-500">{job.submitted}</td>
                <td className="px-4 py-3 text-center">
                  {job.action === "pause" && (
                    <button className="bg-yellow-600 hover:bg-yellow-700 text-white text-xs font-medium px-4 py-2 rounded-lg transition shadow-sm">
                      Pause
                    </button>
                  )}
                  {job.action === "resume" && (
                    <button className="bg-green-600 hover:bg-green-700 text-white text-xs font-medium px-4 py-2 rounded-lg transition shadow-sm">
                      Resume
                    </button>
                  )}
                  {job.action === "none" && (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default QueueTable;