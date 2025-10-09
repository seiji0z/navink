import React from "react";

function PrintHistory() {
  return (
    <div className="bg-white rounded-xl p-6 shadow col-span-2">
      <h3 className="text-sm font-medium text-gray-500 mb-3">Print History</h3>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-gray-500">
            <th className="pb-2">File ID</th>
            <th className="pb-2">File Name</th>
            <th className="pb-2">Status</th>
            <th className="pb-2">No. of Pages</th>
            <th className="pb-2">Token</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          <tr className="border-t">
            <td>PSU-0001</td>
            <td>toPrint.pdf</td>
            <td className="text-yellow-600">Pending</td>
            <td>5</td>
            <td>30</td>
          </tr>
          <tr className="border-t">
            <td>PSU-0002</td>
            <td>Final-Thesis-Paper.pdf</td>
            <td className="text-green-600">Complete</td>
            <td>354</td>
            <td>50</td>
          </tr>
          <tr className="border-t">
            <td>PSU-0003</td>
            <td>SoftEng_Activities</td>
            <td className="text-green-600">Complete</td>
            <td>2</td>
            <td>10</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PrintHistory;