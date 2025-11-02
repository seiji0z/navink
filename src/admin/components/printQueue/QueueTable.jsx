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

  // ✅ Dynamic actions depending on job status (for desktop table)
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

  // ✅ Mobile-optimized actions with flex-1 class
  const renderMobileActions = (job) => {
    switch (job.queue_status) {
      case "Waiting":
        return (
          <>
            <button
              onClick={() => onStatusUpdate(job.queue_id, "Printing")}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs font-medium px-3 py-2 rounded-lg transition shadow-sm"
            >
              Start
            </button>
            <button
              onClick={() => onStatusUpdate(job.queue_id, "Cancelled")}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-medium px-3 py-2 rounded-lg transition shadow-sm"
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
              className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white text-xs font-medium px-3 py-2 rounded-lg transition shadow-sm"
            >
              Pause
            </button>
            <button
              onClick={() => onStatusUpdate(job.queue_id, "Completed")}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs font-medium px-3 py-2 rounded-lg transition shadow-sm"
            >
              Complete
            </button>
            <button
              onClick={() => onStatusUpdate(job.queue_id, "Cancelled")}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-medium px-3 py-2 rounded-lg transition shadow-sm"
            >
              Cancel
            </button>
          </>
        );

      case "Completed":
        return (
          <span className="text-green-700 font-medium text-xs w-full text-center">
            ✔ Completed
          </span>
        );

      case "Cancelled":
        return (
          <span className="text-red-700 font-medium text-xs w-full text-center">
            ✖ Cancelled
          </span>
        );

      default:
        return <span className="text-gray-400">—</span>;
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-white rounded-3xl p-6 shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Approved Print Jobs
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto border border-gray-200 rounded-2xl shadow-sm">
        <table className="min-w-[900px] w-full table-auto text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50">
            <tr>
              <th className="px-4 py-3 whitespace-nowrap">Queue ID</th>
              <th className="px-4 py-3 whitespace-nowrap">Student</th>
              <th className="px-4 py-3 whitespace-nowrap">File Name</th>
              <th className="px-4 py-3 whitespace-nowrap">Printer</th>
              <th className="px-4 py-3 whitespace-nowrap">Status</th>
              <th className="px-4 py-3 whitespace-nowrap">Added</th>
              <th className="px-4 py-3 text-center whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <tr
                  key={job.queue_id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium text-gray-900 max-w-[100px] whitespace-nowrap">
                    <div className="truncate" title={`#${String(job.queue_position).padStart(3, "0")}`}>
                      #{String(job.queue_position).padStart(3, "0")}
                    </div>
                  </td>
                  <td className="px-4 py-3 max-w-[200px]">
                    <div className="flex items-center gap-2">
                      <img
                        src={avatarPlaceholder}
                        alt={job.student_name || "Student"}
                        className="w-8 h-8 rounded-full object-cover border"
                      />
                      <div>
                        <p className="font-medium text-gray-900 truncate max-w-[150px]" title={job.student_name || "Unknown"}>
                          {job.student_name || "Unknown"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700 max-w-[200px]">
                    <div className="truncate" title={job.file_name}>{job.file_name}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-700 max-w-[160px]">
                    <div className="truncate" title={job.printer_name}>{job.printer_name}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap ${getStatusBadge(
                        job.queue_status
                      )}`}
                    >
                      {job.queue_status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap max-w-[160px]">
                    <div className="truncate" title={new Date(job.datetime_added).toLocaleString()}>
                      {new Date(job.datetime_added).toLocaleString()}
                    </div>
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

      {/* Mobile Card List */}
      <div className="md:hidden flex flex-col gap-4">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.queue_id} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm overflow-hidden">
              <div className="flex items-center mb-2">
                <span className="text-sm font-semibold text-gray-900 truncate flex-1 pr-2" title={job.student_name || "Unknown"}>
                  {job.student_name || "Unknown"}
                </span>
                <span className={`ml-2 px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap ${getStatusBadge(job.queue_status)}`}>
                  {job.queue_status}
                </span>
              </div>
              <div className="text-xs text-gray-500 mb-1 truncate" title={`#${String(job.queue_position).padStart(3, "0")}`}>Job #{String(job.queue_position).padStart(3, "0")}</div>
              <div className="flex items-center gap-2 mb-1">
                <img src={avatarPlaceholder} alt={job.student_name || "Student"} className="w-9 h-9 rounded-full object-cover border" />
                <div className="text-sm text-gray-700 truncate max-w-[200px]" title={job.file_name}>{job.file_name}</div>
              </div>
              <div className="text-sm text-gray-700 truncate mb-1" title={job.printer_name}>Printer: {job.printer_name}</div>
              <div className="text-xs text-gray-500 mb-1" title={new Date(job.datetime_added).toLocaleString()}>
                Added: {new Date(job.datetime_added).toLocaleString()}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {renderMobileActions(job)}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-400">No approved print jobs found.</div>
        )}
      </div>
    </div>
  );
}

export default QueueTable;
