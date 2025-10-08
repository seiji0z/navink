import React, { useState } from "react";

import dashboardIcon from "../assets/icons/dashboard-icon.png";
import savedIcon from "../assets/icons/saved-files-icon.png";
import printIcon from "../assets/icons/print-files-icon.png";
import historyIcon from "../assets/icons/history-icon.png";
import logo from "../assets/images/navink-logo.png";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="fade-in flex min-h-screen items-center justify-center bg-gradient-to-b from-sky-200 to-rose-100">
      <div>
        <div className="flex items-center justify-center h-30">
          <img
            src={logo}
            alt="Logo"
            className={`h-15 w-auto transition-all duration-300 pr-5 ${
              isOpen ? "opacity-100" : "opacity-100 pl-3"
            }`}
          />
          <h1
            className={`font-bold text-base sm:text-lg md:text-2xl lg:text-4xl xl:text-4xl ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
            style={{
              fontFamily: "Urbanist-Bold, sans-serif",
            }}
          >
            Nav<span className="text-sky-700">ink</span>
          </h1>
        </div>
        <aside
          className={`text-white h-screen p-6 flex flex-col transition-all duration-300 ${
            isOpen ? "w-64" : "w-20"
          }`}
          style={{
            backgroundColor: "#1F6D8B",
            borderTopRightRadius: "50px",
            fontFamily: "Poppins-Regular, sans-serif",
          }}
        >
          <button
            className="mb-4 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "<" : ">"}
          </button>

          <nav className="flex-1">
            <ul className="space-y-4">
              <li className="flex items-center hover:text-sky-400 cursor-pointer">
                <img
                  src={dashboardIcon}
                  alt="Dashboard"
                  className="w-6 h-6 mr-2"
                />
                {isOpen ? "Dashboard" : ""}
              </li>
              <li className="flex items-center hover:text-sky-400 cursor-pointer">
                <img
                  src={savedIcon}
                  alt="Saved Files"
                  className="w-6 h-6 mr-2"
                />
                {isOpen ? "Saved Files" : ""}
              </li>
              <li className="flex items-center hover:text-sky-400 cursor-pointer">
                <img
                  src={printIcon}
                  alt="Print Files"
                  className="w-6 h-6 mr-2"
                />
                {isOpen ? "Print Files" : ""}
              </li>
              <li className="flex items-center hover:text-sky-400 cursor-pointer">
                <img src={historyIcon} alt="History" className="w-6 h-6 mr-2" />
                {isOpen ? "History" : ""}
              </li>
            </ul>
          </nav>
        </aside>
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 pr-5 pl-15 grid grid-cols-4 md:grid-cols-4 gap-5">
        {/* Tokens Card */}
        <div className="col-span-1 ">
          <div className="w-90 h-90 rounded-full bg-white flex flex-col justify-center items-center shadow border-7 border-green-500">
            {" "}
            <h3 className="text-2xl font-medium text-gray-500">
              Current Tokens
            </h3>
            <p className="text-8xl font-bold text-green-600 mt-2 pb-5">
              450{" "}
              <span className="text-2xl font-normal text-gray-500">/ 500</span>
            </p>
            <p className="text-1xl text-gray-400 mt-1 justify-center flex flex-col">
              <span className="flex flex-col items-center justify-center">
                Tokens will reset at the start
              </span>
              <span className="flex flex-col items-center justify-center">
                of the next semester.
              </span>
            </p>
          </div>
        </div>

        {/* Current Queues Card */}
        <div className="bg-white rounded-xl p-6 shadow col-span-2">
          <h3
            className="text-xl font-medium text-black-500 mb-4"
            style={{ fontFamily: "Poppins-SemiBold, sans-serif" }}
          >
            Current Queues
          </h3>
          <ul className="space-y-3">
            <li className="flex justify-between items-center p-3 border rounded">
              <span>toPrint.pdf</span>
              <span className="text-green-500 font-semibold">35 Tokens</span>
              <span className="text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                In Progress
              </span>
            </li>
            <li className="flex justify-between items-center p-3 border rounded">
              <span>IT313.pdf</span>
              <span className="text-yellow-500 font-semibold">10 Tokens</span>
              <span className="text-sm px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                Pending
              </span>
            </li>
            <li className="flex justify-between items-center p-3 border rounded">
              <span>CFE101.pdf</span>
              <span className="text-red-500 font-semibold">15 Tokens</span>
              <span className="text-sm px-2 py-1 bg-red-100 text-red-700 rounded-full">
                Declined
              </span>
            </li>
          </ul>
        </div>

        {/* Total Print Requests */}
        <div className="bg-white rounded-xl p-6 shadow">
          <h3
            className="text-2xl font-medium text-gray-500"
            style={{ fontFamily: "Poppins-SemiBold, sans-serif" }}
          >
            Total Print Requests
          </h3>
          <p className="text-4xl font-bold text-yellow-500 mt-2 flex flex-col items-center justify-center">
            17
          </p>
        </div>

        {/* Saved Files */}
        <div className="h-100 bg-white rounded-xl p-6 shadow col-span-2">
          <h3 className="text-sm font-medium text-gray-500 mb-3">
            Saved Files
          </h3>
          <div className="flex space-x-3">
            <div className="text-center">
              <img
                src="/assets/icons/file-icon.png"
                className="w-12 h-12 mx-auto"
              />
              <p className="text-xs mt-1">toPrint.pdf</p>
            </div>
            <div className="text-center">
              <img
                src="/assets/icons/file-icon.png"
                className="w-12 h-12 mx-auto"
              />
              <p className="text-xs mt-1">IT313.pdf</p>
            </div>
            <div className="text-center">
              <img
                src="/assets/icons/file-icon.png"
                className="w-12 h-12 mx-auto"
              />
              <p className="text-xs mt-1">CFE101.pdf</p>
            </div>
          </div>
        </div>

        {/* Print History */}
        <div className="bg-white rounded-xl p-6 shadow col-span-2 ">
          <h3 className="text-sm font-medium text-gray-500 mb-3">
            Print History
          </h3>
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
      </main>
    </div>
  );
}

export default Sidebar;
