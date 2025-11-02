import React, { useState } from "react";

function GenerateReportCard({ onGenerate }) {
  const [reportType, setReportType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [specificUser, setSpecificUser] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = Array.from({ length: 6 }, (_, i) => 2020 + i);

  function handleGenerate() {
    let dateRange = "";

    if (reportType === "Daily Summary") {
      dateRange = selectedDate;
    } else if (reportType === "Weekly Usage") {
      dateRange = `${months[selectedMonth - 1]} - Week ${selectedWeek}`;
    } else if (reportType === "Monthly Overview") {
      dateRange = months[selectedMonth - 1];
    } else if (reportType === "Semester Report") {
      dateRange = `${startDate} to ${endDate}`;
    }

    onGenerate({ type: reportType, dateRange, specificUser, year: selectedYear });
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Generate New Report</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Report Type */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Report Type</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
          >
            <option value="">Select type</option>
            <option value="Daily Summary">Daily Summary</option>
            <option value="Weekly Usage">Weekly Usage</option>
            <option value="Monthly Overview">Monthly Overview</option>
            <option value="Semester Report">Semester Report</option>
          </select>
        </div>

        {/* Inputs based on type */}
        {reportType === "Daily Summary" && (
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
          </div>
        )}

        {(reportType === "Weekly Usage" || reportType === "Monthly Overview") && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Select Month</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
              >
                <option value="">Select month</option>
                {months.map((m, idx) => (
                  <option key={idx} value={idx + 1}>{m}</option>
                ))}
              </select>
            </div>

            {reportType === "Weekly Usage" && (
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Select Week</label>
                <select
                  value={selectedWeek}
                  onChange={(e) => setSelectedWeek(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                >
                  <option value="">Select week</option>
                  {[1, 2, 3, 4, 5].map((w) => (
                    <option key={w} value={w}>Week {w}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Select Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
              >
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </>
        )}

        {reportType === "Semester Report" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
            </div>
          </>
        )}

        {/* Optional user */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Specific User (Optional)</label>
          <input
            type="text"
            placeholder="Enter ID number"
            value={specificUser}
            onChange={(e) => setSpecificUser(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-3">
        <button
          onClick={handleGenerate}
          className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 text-white font-medium px-6 py-2.5 rounded-lg transition shadow-sm"
        >
          Generate Report
        </button>
      </div>
    </div>
  );
}

export default GenerateReportCard;
