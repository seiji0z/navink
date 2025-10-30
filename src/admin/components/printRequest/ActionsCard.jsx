import React from 'react';
import logo from '../../../assets/images/navink-logo.png';

function ActionsCard({ onApprove, onDecline }) {
  return (
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
        <button 
          onClick={onApprove}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <img src={logo} alt="Approve" className="w-5 h-5" /> Approve Request
        </button>
        <button 
          onClick={onDecline}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <img src={logo} alt="Decline" className="w-5 h-5" /> Decline Request
        </button>
      </div>
    </div>
  );
}

export default ActionsCard;