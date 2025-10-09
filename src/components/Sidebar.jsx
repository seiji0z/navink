import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import dashboardIcon from "../assets/icons/dashboard-icon.png";
import savedIcon from "../assets/icons/saved-files-icon.png";
import printIcon from "../assets/icons/print-files-icon.png";
import historyIcon from "../assets/icons/history-icon.png";
import logo from "../assets/images/navink-logo.png";
import profilePic from "../assets/images/gab.png";

function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    // localStorage.removeItem("token");
    // sessionStorage.clear();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className={`relative text-white h-screen p-6 flex flex-col justify-between transition-all duration-300 bg-navi ${
        isOpen ? "w-64" : "w-20"
      }`}
      style={{
        borderTopRightRadius: "50px",
        borderBottomRightRadius: "50px",
        fontFamily: "Poppins-Regular, sans-serif",
      }}
    >
      {/* Top Section */}
      <div>
        <div className="flex items-center mb-8">
          <img
            src={logo}
            alt="Logo"
            className={`w-[50px] h-auto transition-all duration-300 ${
              isOpen ? "mr-3" : "mx-auto"
            }`}
          />
          <h1
            className={`font-bold text-2xl transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
            style={{ fontFamily: "Urbanist-Bold, sans-serif" }}
          >
            Nav<span className="text-sky-300">ink</span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-4">
            {/* Dashboard */}
            <li
              onClick={() => navigate("/home")}
              className={`flex items-center cursor-pointer transition-colors ${
                isActive("/home")
                  ? "text-white font-bold"
                  : "hover:text-sky-300"
              }`}
            >
              <img src={dashboardIcon} alt="Dashboard" className="w-6 h-6 mr-2" />
              {isOpen && "Dashboard"}
            </li>

            {/* Saved Files */}
            <li
              onClick={() => navigate("/saved-files")}
              className={`flex items-center cursor-pointer transition-colors ${
                isActive("/saved-files")
                  ? "text-white font-bold"
                  : "hover:text-sky-300"
              }`}
            >
              <img src={savedIcon} alt="Saved Files" className="w-6 h-6 mr-2" />
              {isOpen && "Saved Files"}
            </li>

            {/* Print Files */}
            <li
              onClick={() => navigate("/print-files")}
              className={`flex items-center cursor-pointer transition-colors ${
                isActive("/print-files")
                  ? "text-white font-bold"
                  : "hover:text-sky-300"
              }`}
            >
              <img src={printIcon} alt="Print Files" className="w-6 h-6 mr-2" />
              {isOpen && "Print Files"}
            </li>

            {/* History */}
            <li
              onClick={() => navigate("/history")}
              className={`flex items-center cursor-pointer transition-colors ${
                isActive("/history")
                  ? "text-white font-bold"
                  : "hover:text-sky-300"
              }`}
            >
              <img src={historyIcon} alt="History" className="w-6 h-6 mr-2" />
              {isOpen && "History"}
            </li>
          </ul>
        </nav>
      </div>

      {/* Profile Section */}
      <div className="relative mt-auto">
        <div
          className={`flex items-center cursor-pointer p-2 rounded-xl hover:bg-sky-200/20 transition-all duration-300 ${
            isOpen ? "justify-start" : "justify-center"
          }`}
          onClick={() => setShowProfileMenu(!showProfileMenu)}
        >
          <div className="flex-shrink-0 w-10 h-10">
            <img
              src={profilePic}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
            />
          </div>
          {isOpen && (
            <div className="ml-3 overflow-hidden">
              <p className="font-semibold text-white leading-tight">
                Gabriel Flores
              </p>
              <p className="text-xs text-gray-300 leading-tight">
                2240853@slu.edu.ph
              </p>
            </div>
          )}
        </div>

        {showProfileMenu && (
          <div
            className={`absolute ${
              isOpen ? "left-0 bottom-16 w-full" : "left-16 bottom-2 w-48"
            } bg-white text-gray-700 rounded-xl shadow-lg transition-all`}
          >
            <ul className="py-2">
              <li className="px-4 py-2 hover:bg-sky-100 cursor-pointer">
                View Profile
              </li>
              <li
                className="px-4 py-2 hover:bg-sky-100 cursor-pointer"
                onClick={handleLogout}
              >
                Log Out
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-1/2 right-[-12px] transform -translate-y-1/2 bg-white text-[#1F6D8B] rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-sky-100"
      >
        {isOpen ? "<" : ">"}
      </button>
    </aside>
  );
}

export default Sidebar;
