import React from "react";

function PrintHistory() {
  const printHistory = [
    {
      id: "PSU-0001",
      name: "toPrint.pdf",
      status: "Pending",
      pages: 5,
      tokens: 30,
    },
    {
      id: "PSU-0002",
      name: "Final-Thesis-Paper.pdf",
      status: "Complete",
      pages: 354,
      tokens: 50,
    },
    {
      id: "PSU-0003",
      name: "SoftEng_Activities.pdf",
      status: "Complete",
      pages: 2,
      tokens: 10,
    },
    {
      id: "PSU-0003",
      name: "SoftEng_Activities.pdf",
      status: "Complete",
      pages: 2,
      tokens: 10,
    },
    {
      id: "PSU-0003",
      name: "SoftEng_Activities.pdf",
      status: "Complete",
      pages: 2,
      tokens: 10,
    },
    {
      id: "PSU-0003",
      name: "SoftEng_Activities.pdf",
      status: "Complete",
      pages: 2,
      tokens: 10,
    },
    {
      id: "PSU-0003",
      name: "SoftEng_Activities.pdf",
      status: "Complete",
      pages: 2,
      tokens: 10,
    },
    {
      id: "PSU-0003",
      name: "SoftEng_Activities.pdf",
      status: "Complete",
      pages: 2,
      tokens: 10,
    },
    {
      id: "PSU-0003",
      name: "SoftEng_Activities.pdf",
      status: "Complete",
      pages: 2,
      tokens: 10,
    },
    {
      id: "PSU-0003",
      name: "SoftEng_Activities.pdf",
      status: "Complete",
      pages: 2,
      tokens: 10,
    },
    {
      id: "PSU-0003",
      name: "SoftEng_Activities.pdf",
      status: "Complete",
      pages: 2,
      tokens: 10,
    },
    {
      id: "PSU-0003",
      name: "SoftEng_Activities.pdf",
      status: "Complete",
      pages: 2,
      tokens: 10,
    },
    {
      id: "PSU-0003",
      name: "SoftEng_Activities.pdf",
      status: "Complete",
      pages: 2,
      tokens: 10,
    },
  ];

  const statusColors = {
    Pending: "text-yellow-600",
    Complete: "text-green-600",
    Declined: "text-red-600",
    "In Progress": "text-sky-600",
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow col-span-2 h-full flex flex-col">
      {/* Header section */}
      <div className="flex justify-between items-start mb-6 shrink-0">
        <h3
          className="text-xl font-medium text-gray-500"
          style={{ fontFamily: "Poppins-SemiBold, sans-serif" }}
        >
          Print History
        </h3>

        {/* Total Print Requests Summary */}
        <div className="text-right pt-1">
          <p className="text-4xl font-bold text-yellow-500 leading-tight">
            {printHistory.length}
          </p>
          <p className="text-sm text-gray-400 -mt-1">
            total prints accomplished
          </p>
        </div>
      </div>

      {/* Scrollable table */}
      <div className="overflow-y-auto max-h-60 flex-1">
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 bg-white">
            <tr className="text-gray-500 border-b">
              <th className="pb-2">File ID</th>
              <th className="pb-2">File Name</th>
              <th className="pb-2">Status</th>
              <th className="pb-2">No. of Pages</th>
              <th className="pb-2">Token</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {printHistory.map((file) => (
              <tr key={file.id} className="border-t">
                <td>{file.id}</td>
                <td>{file.name}</td>
                <td className={statusColors[file.status]}>{file.status}</td>
                <td>{file.pages}</td>
                <td>{file.tokens}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PrintHistory;
