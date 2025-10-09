import React, { useState } from "react";

import dashboardIcon from "../assets/icons/dashboard-icon.png";
import savedIcon from "../assets/icons/saved-files-icon.png";
import printIcon from "../assets/icons/print-files-icon.png";
import historyIcon from "../assets/icons/history-icon.png";
import fileQueueIcon from "../assets/icons/file-queue-icon.png";
import progressIcon from "../assets/icons/in-progress-icon.png";
import pendingIcon from "../assets/icons/pending-icon.png";
import declinedIcon from "../assets/icons/declined-icon.png";
import logo from "../assets/images/navink-logo.png";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="fade-in flex min-h-screen items-center justify-center bg-gradient-to-b from-sky-200 to-rose-100">
      <div>
        <div className="flex items-center justify-center h-[8rem]">
          <img
            src={logo}
            alt="Logo"
            className={`w-[70px] h-auto transition-all duration-300 pr-5 ${
              isOpen ? "opacity-100" : "opacity-100 pl-3"
            }`}
          />
          <h1
            className={`font-bold text-base sm:text-lg md:text-2xl lg:text-4xl xl:text-5xl ${
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
      <main className="flex-1 p-6 pr-5 pl-15 grid grid-cols-4 md:grid-cols-4 gap-2">
        {/* Tokens */}
        <div className="col-span-1">
          <div className="w-[300px] h-[300px] rounded-full bg-white flex flex-col justify-center items-center shadow border-8 border-[#61C580]">
            <h3 className="text-2xl font-medium text-gray-500">
              Current Tokens
            </h3>
            <p className="text-6xl font-bold text-green-600 mt-2 pb-5">
              450{" "}
              <span className="text-2xl font-normal text-gray-500">/ 500</span>
            </p>
            <p className="flex flex-col justify-center text-center text-gray-400 mt-1">
              <span>Tokens will reset at the start</span>
              <span> of the next semester</span>
            </p>
          </div>
        </div>

        {/* Current Queues */}
        <div className="col-span-2 bg-white rounded-3xl p-6 shadow">
          <h3
            className="text-xl font-medium text-black-500 mb-4"
            style={{ fontFamily: "Poppins-SemiBold, sans-serif" }}
          >
            Current Queues
          </h3>
          <ul className="space-y-3">
            <li className="flex items-center justify-between border-2 rounded-xl border-[#1F6D8B] p-2 gap-4 ">
              {/* icon and file info */}
              <div className="flex items-center gap-2">
                <img src={fileQueueIcon} alt="" className="h-10 w-auto p-1" />
                <div className="flex flex-col">
                  <p className="font-medium">toPrint.pdf</p>
                  <div className="text-sm text-gray-500 flex gap-1">
                    <p>A4,</p>
                    <p>5 copies,</p>
                    <p>Black and White</p>
                  </div>
                </div>
              </div>

              {/* tokens and queue number*/}
              <div className="text-green-500 font-semibold">35 Tokens</div>
              <div className="font-normal">1st in line</div>

              {/* status */}
              <div className="flex flex-row text-sm px-2 py-1 bg-[#00BBFF] text-black-700 rounded-lg items-center gap-2 w-[110px]">
                <img src={progressIcon} alt="progress icon" className="h-4" />
                <p>In Progress</p>
              </div>
            </li>
            <li className="flex items-center justify-between border-2 rounded-xl border-[#1F6D8B] p-2 gap-4">
              {/* icon and file info */}
              <div className="flex items-center gap-2">
                <img src={fileQueueIcon} alt="" className="h-10 w-auto p-1" />
                <div className="flex flex-col">
                  <p className="font-medium">toPrint.pdf</p>
                  <div className="text-sm text-gray-500 flex gap-1">
                    <p>A4,</p>
                    <p>5 copies,</p>
                    <p>Black and White</p>
                  </div>
                </div>
              </div>

              {/* tokens and queue number*/}
              <div className="text-green-500 font-semibold">35 Tokens</div>
              <div className="font-normal">2nd in line</div>

              {/* status */}
              <div className="flex flex-row text-sm px-2 py-1 bg-[#FF9D00] text-black-700 rounded-lg items-center justify-center gap-2 w-[110px]">
                <img src={pendingIcon} alt="progress icon" className="h-4" />
                <p>Pending</p>
              </div>
            </li>
            <li className="flex items-center justify-between border-2 rounded-xl border-[#1F6D8B] p-2 gap-4">
              {/* icon and file info */}
              <div className="flex items-center gap-2">
                <img src={fileQueueIcon} alt="" className="h-10 w-auto p-1" />
                <div className="flex flex-col">
                  <p className="font-medium">toPrint.pdf</p>
                  <div className="text-sm text-gray-500 flex gap-1">
                    <p>A4,</p>
                    <p>5 copies,</p>
                    <p>Black and White</p>
                  </div>
                </div>
              </div>

              {/* tokens and queue number*/}
              <div className="text-green-500 font-semibold">35 Tokens</div>
              <div className="font-normal">3rd in line</div>

              {/* status */}
              <div className="flex flex-row text-sm px-2 py-1 bg-[#FF4625] text-black-700 rounded-lg items-center justify-center gap-2 w-[110px]">
                <img src={declinedIcon} alt="progress icon" className="h-4" />
                <p>Declined</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Total Print Requests */}
        <div className="bg-white rounded-3xl p-6 shadow flex flex-col gap-10">
          <h3
            className="text-2xl font-medium text-gray-500"
            style={{ fontFamily: "Poppins-SemiBold, sans-serif" }}
          >
            Total Print Requests
          </h3>
          <p className="text-6xl font-bold text-yellow-500 mt-2 flex flex-col items-center justify-center">
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
