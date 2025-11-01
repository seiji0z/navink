import React from "react";
import avatarPlaceholder from "../../../assets/icons/profile-icon.svg";

function QueueTable({ jobs, onStatusUpdate }) {
  // ✅ Badge color logic
  const getStatusBadge = (status) => {
    switch (status) {
      case "Printing":
        return "bg-sky-100 text-sky-700";
      case "Waiting":
        return "bg-yellow-100 text-yellow-700";
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ✅ Dynamic actions depending on job status
  const renderActions = (job) => {
    switch (job.queue_status) {
      case "Waiting":
        return (
          <>
            <button
              onClick={() => onStatusUpdate(job.queue_id, "Printing")}
              className="bg-green-600 hover:bg-green-700 text-white text-xs font-medium px-4 py-2 rounded-lg transition shadow-sm mr-2"
            >
              Start
            </button>
            <button
              onClick={() => onStatusUpdate(job.queue_id, "Cancelled")}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-medium px-4 py-2 rounded-lg transition shadow-sm"
            >
              Cancel
            </button>
          </>
        );

      case "Printing":
        return (
          <>
            <button
              onClick={() => onStatusUpdate(job.queue_id, "Waiting")}
              className="bg-yellow-600 hover:bg-yellow-700 text-white text-xs font-medium px-4 py-2 rounded-lg transition shadow-sm mr-2"
            >
              Pause
            </button>
            <button
              onClick={() => onStatusUpdate(job.queue_id, "Completed")}
              className="bg-green-600 hover:bg-green-700 text-white text-xs font-medium px-4 py-2 rounded-lg transition shadow-sm mr-2"
            >
              Complete
            </button>
            <button
              onClick={() => onStatusUpdate(job.queue_id, "Cancelled")}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-medium px-4 py-2 rounded-lg transition shadow-sm"
            >
              Cancel
            </button>
          </>
        );

      case "Completed":
        return (
          <span className="text-green-700 font-medium text-xs">
            ✔ Completed
          </span>
        );

      case "Cancelled":
        return (
          <span className="text-red-700 font-medium text-xs">
            ✖ Cancelled
          </span>
        );

      default:
        return <span className="text-gray-400">—</span>;
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Approved Print Jobs
      </h2>

      <div className="flex-1 overflow-x-auto border border-gray-200 rounded-2xl">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50">
            <tr>
              <th className="px-4 py-3">Queue ID</th>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">File Name</th>
              <th className="px-4 py-3">Printer</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Added</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <tr
                  key={job.queue_id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    #{String(job.queue_position).padStart(3, "0")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={avatarPlaceholder}
                        alt={job.student_name || "Student"}
                        className="w-8 h-8 rounded-full object-cover border"
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          {job.student_name || "Unknown"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {job.file_name}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {job.printer_name}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                        job.queue_status
                      )}`}
                    >
                      {job.queue_status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(job.datetime_added).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {renderActions(job)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-400"
                >
                  No approved print jobs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default QueueTable;
