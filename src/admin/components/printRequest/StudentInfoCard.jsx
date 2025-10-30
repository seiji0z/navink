import React from 'react';

function StudentInfoCard({ studentName, studentId }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-5">
      <h3 className="font-semibold text-gray-700 mb-3">Student Information</h3>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Student Name</p>
          <p className="font-medium text-gray-900">{studentName}</p>
        </div>
        <div>
          <p className="text-gray-500">Student ID</p>
          <p className="font-medium text-gray-900">{studentId.split("@")[0]}</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-500">Email</p>
          <p className="font-medium text-gray-900 break-all">{studentId}</p>
        </div>
      </div>
    </div>
  );
}

export default StudentInfoCard;