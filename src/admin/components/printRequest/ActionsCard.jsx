import React from 'react';
import approveIcon from '../../../assets/icons/approve-icon.svg';
import declineIcon from '../../../assets/icons/decline-icon.svg';

function ActionsCard({ onApprove, onDecline, remarks, setRemarks, disabled }) {
  return (
  <div className="bg-gray-50 rounded-2xl p-5">
      <h3 className="font-semibold text-gray-700 mb-3">Actions</h3>
      <p className="text-xs text-gray-500 mb-4">
        <span className="font-medium">Admin Notes / Reason for Decline</span> (optional)
      </p>
      <textarea
        placeholder="Add notes here..."
        className="w-full p-3 border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-sky-300 disabled:bg-gray-100"
        rows={3}
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
        disabled={disabled}
      />
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <button 
          onClick={onApprove}
          className="w-full sm:flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50"
          disabled={disabled}
        >
          <img src={approveIcon} alt="Approve" className="w-5 h-5" /> Approve Request
        </button>
        <button 
          onClick={onDecline}
          className="w-full sm:flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50"
          disabled={disabled}
        >
          <img src={declineIcon} alt="Decline" className="w-5 h-5" /> Decline Request
        </button>
      </div>
    </div>
  );
}

export default ActionsCard;