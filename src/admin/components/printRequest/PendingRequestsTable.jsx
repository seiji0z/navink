import React from 'react';
import { useNavigate } from 'react-router-dom';
import avatarPlaceholder from '../../../assets/icons/profile-icon.svg';

function PendingRequestsTable({ requests, onApprove = () => {}, onDecline = () => {} }) {
  const navigate = useNavigate();

  const handleViewDetails = (req) => {
    navigate(`/print-request/${req.id}`, { state: req });
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md flex-1 overflow-hidden flex flex-col">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Pending Print Requests
      </h2>

      {/* Mobile list (no horizontal scrolling) */}
      <div className="md:hidden space-y-4 overflow-y-auto">
        {requests.map((req) => (
          <div key={req.id} className="rounded-xl border border-gray-200 p-4">
            <div className="flex items-start mb-3">
              <img
                src={req.profilePhoto || avatarPlaceholder}
                alt={req.studentName}
                className="w-12 h-12 rounded-full object-cover border border-gray-200 mr-3"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 truncate">{req.studentName}</p>
                    <p className="text-xs text-gray-500 truncate">{req.studentEmail}</p>
                  </div>
                  <span className="ml-2 px-2.5 py-1 rounded-full text-[11px] font-medium bg-yellow-100 text-yellow-800 whitespace-nowrap">
                    {req.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-1 text-sm mb-3">
              <p className="text-gray-700 truncate"><span className="font-medium">Document:</span> {req.document}</p>
              <p className="text-gray-500 text-xs">{req.submitted}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onApprove(req)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs font-medium px-3 py-2 rounded-lg transition"
              >
                Approve
              </button>
              <button
                onClick={() => onDecline(req)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-medium px-3 py-2 rounded-lg transition"
              >
                Decline
              </button>
              <button
                onClick={() => handleViewDetails(req)}
                className="w-full bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium px-3 py-2 rounded-lg transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop/tablet table */}
      <div className="hidden md:block overflow-x-auto flex-1">
        <table className="min-w-[800px] w-full text-sm text-left border-collapse">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="pb-3 px-2 font-medium">Student</th>
              <th className="pb-3 px-2 font-medium">Document</th>
              <th className="pb-3 px-2 font-medium">Submitted</th>
              <th className="pb-3 px-2 font-medium">Status</th>
              <th className="pb-3 px-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} className="border-b hover:bg-gray-50 transition">
                {/* Student */}
                <td className="py-4 px-2">
                  <div className="flex items-center space-x-3">
                    <img
                      src={req.profilePhoto || avatarPlaceholder}
                      alt={req.studentName}
                      className="w-10 h-10 rounded-full object-cover border border-gray-200"
                    />
                    <div className="min-w-0"> 
                      <p className="font-medium text-gray-900 truncate">{req.studentName}</p>
                      <p className="text-xs text-gray-500 truncate max-w-[150px]">
                        {req.studentEmail}
                      </p>
                    </div>
                  </div>
                </td>
                {/* Document */}
                <td className="py-4 px-2 text-gray-900 max-w-[200px]"><div className="truncate">{req.document}</div></td>
                {/* Submitted */}
                <td className="py-4 px-2 text-gray-500 whitespace-nowrap">{req.submitted}</td>
                {/* Status */}
                <td className="py-4 px-2">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 whitespace-nowrap">
                    {req.status}
                  </span>
                </td>
                {/* Actions */}
                <td className="py-4 px-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onApprove(req)}
                      className="bg-green-600 hover:bg-green-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition shadow-sm whitespace-nowrap"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => onDecline(req)}
                      className="bg-red-600 hover:bg-red-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition shadow-sm whitespace-nowrap"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => handleViewDetails(req)}
                      className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition shadow-sm whitespace-nowrap"
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
    </div>
  );
}

export default PendingRequestsTable;