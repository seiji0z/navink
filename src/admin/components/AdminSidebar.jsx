import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/images/navink-logo.png";
import dashboard from "../../assets/icons/dashboard-icon.png";
import requests from "../../assets/icons/saved-files-icon.png";
import queue from "../../assets/icons/print-files-icon.png";
import usage from "../../assets/icons/usage-icon.png";
import config from "../../assets/icons/config-icon.png";
import { supabase } from "../../supabaseClient";

function AdminSidebar({ isOpen, setIsOpen, mobileOpen, setMobileOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchStaffProfile = async (user) => {
      if (!user) {
        setUserName("");
        setUserEmail("");
        return;
      }

      setUserEmail(user.email);
      
      // Query the 'staff' table using the user's ID
      const { data: staffData, error } = await supabase
        .from("staff")
        .select("full_name") 
        .eq("user_id", user.id) 
        .single(); 

      if (error) {
        console.error("Error fetching staff profile:", error.message);
      }

      if (staffData) {
        setUserName(staffData.full_name); 
      } else {
        setUserName("Administrator"); 
      }
    };

    //  Get user on initial load
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      await fetchStaffProfile(session?.user);
    };

    getInitialSession();

    // Listen for auth changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        fetchStaffProfile(session?.user);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []); 
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      localStorage.clear();
      sessionStorage.clear();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error signing out:", error.message);
      alert("Error logging out. Please try again.");
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Desktop / large screens sidebar */}
      <div className="hidden md:flex">
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
              <div className={`transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}>
                <h1
                  className="font-bold text-2xl leading-tight"
                  style={{ fontFamily: "Urbanist-Bold, sans-serif" }}
                >
                  Nav<span className="text-sky-300">ink</span>
                </h1>
                {isOpen && (
                  <p className="text-xs font-medium mt-1 text-yellow-400">
                    Administrator
                  </p>
                )}
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1">
              <ul className="space-y-4">
                {/* Dashboard */}
                <li
                  onClick={() => navigate("/admin/home")}
                  className={`flex items-center cursor-pointer transition-colors ${
                    isActive("/admin/home")
                      ? "text-white font-bold"
                      : "hover:text-sky-300"
                  }`}
                >
                  <img src={dashboard} alt="Dashboard" className="w-6 h-6 mr-2" />
                  {isOpen && "Dashboard"}
                </li>

                {/* Print Requests */}
                <li
                  onClick={() => navigate("/admin/requests")}
                  className={`flex items-center cursor-pointer transition-colors ${
                    isActive("/admin/requests")
                      ? "text-white font-bold"
                      : "hover:text-sky-300"
                  }`}
                >
                  <img src={requests} alt="Print Requests" className="w-6 h-6 mr-2" />
                  {isOpen && "Print Requests"}
                </li>

                {/* Print Queue */}
                <li
                  onClick={() => navigate("/admin/queue")}
                  className={`flex items-center cursor-pointer transition-colors ${
                    isActive("/admin/queue")
                      ? "text-white font-bold"
                      : "hover:text-sky-300"
                  }`}
                >
                  <img src={queue} alt="Print Queue" className="w-6 h-6 mr-2" />
                  {isOpen && "Print Queue"}
                </li>

                {/* Usage & Activity */}
                <li
                  onClick={() => navigate("/admin/usage")}
                  className={`flex items-center cursor-pointer transition-colors ${
                    isActive("/admin/usage")
                      ? "text-white font-bold"
                      : "hover:text-sky-300"
                  }`}
                >
                  <img src={usage} alt="Usage" className="w-6 h-6 mr-2" />
                  {isOpen && "Usage & Activity"}
                </li>

                {/* System Configuration */}
                <li
                  onClick={() => navigate("/admin/config")}
                  className={`flex items-center cursor-pointer transition-colors ${
                    isActive("/admin/config")
                      ? "text-white font-bold"
                      : "hover:text-sky-300"
                  }`}
                >
                  <img src={config} alt="System Config" className="w-6 h-6 mr-2" />
                  {isOpen && "System Configuration"}
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
                  src={logo} // You might want to change this to a dynamic profile photo later
                  alt="Admin Profile"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
              </div>
              {isOpen && (
                <div className="ml-3 overflow-hidden">
                  <p className="font-semibold text-white leading-tight">
                    {userName || "Loading..."}
                  </p>
                  <p className="text-xs text-gray-300 leading-tight truncate max-w-[150px]">
                    {userEmail || ""}
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
                  <li
                    className="px-4 py-2 hover:bg-sky-100 cursor-pointer"
                    onClick={() => {
                      navigate("/admin/profile");
                      setShowProfileMenu(false);
                    }}
                  >
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
      </div>

      {/* Mobile overlay sidebar (phones) */}
  <div className={`fixed inset-0 z-50 md:hidden flex items-stretch ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!mobileOpen}>
        {/* Backdrop (fades in/out) */}
        <div
          className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Sliding panel (translates in/out) */}
        <aside
          className={`relative text-white h-screen p-6 flex flex-col justify-between transition-transform duration-300 bg-navi w-64 transform ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{
            borderTopRightRadius: "50px",
            borderBottomRightRadius: "50px",
            fontFamily: "Poppins-Regular, sans-serif",
          }}
        >
            <div>
              <div className="flex items-center mb-8">
                <img src={logo} alt="Logo" className="w-[50px] h-auto mr-3" />
                <div>
                  <h1 className="font-bold text-2xl leading-tight" style={{ fontFamily: "Urbanist-Bold, sans-serif" }}>
                    Nav<span className="text-sky-300">ink</span>
                  </h1>
                  <p className="text-xs font-medium mt-1 text-yellow-400">Administrator</p>
                </div>

                {/* Close button (mobile) */}
                <button
                  className="ml-auto bg-white text-[#1F6D8B] rounded-full w-8 h-8 flex items-center justify-center shadow-md"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close sidebar"
                >
                  ✕
                </button>
              </div>

              <nav className="flex-1">
                <ul className="space-y-4">
                  <li
                    onClick={() => {
                      navigate("/admin/home");
                      setMobileOpen(false);
                    }}
                    className={`flex items-center cursor-pointer transition-colors ${
                      isActive("/admin/home") ? "text-white font-bold" : "hover:text-sky-300"
                    }`}
                  >
                    <img src={dashboard} alt="Dashboard" className="w-6 h-6 mr-2" />
                    Dashboard
                  </li>

                  <li
                    onClick={() => {
                      navigate("/admin/requests");
                      setMobileOpen(false);
                    }}
                    className={`flex items-center cursor-pointer transition-colors ${
                      isActive("/admin/requests") ? "text-white font-bold" : "hover:text-sky-300"
                    }`}
                  >
                    <img src={requests} alt="Print Requests" className="w-6 h-6 mr-2" />
                    Print Requests
                  </li>

                  <li
                    onClick={() => {
                      navigate("/admin/queue");
                      setMobileOpen(false);
                    }}
                    className={`flex items-center cursor-pointer transition-colors ${
                      isActive("/admin/queue") ? "text-white font-bold" : "hover:text-sky-300"
                    }`}
                  >
                    <img src={queue} alt="Print Queue" className="w-6 h-6 mr-2" />
                    Print Queue
                  </li>

                  <li
                    onClick={() => {
                      navigate("/admin/usage");
                      setMobileOpen(false);
                    }}
                    className={`flex items-center cursor-pointer transition-colors ${
                      isActive("/admin/usage") ? "text-white font-bold" : "hover:text-sky-300"
                    }`}
                  >
                    <img src={usage} alt="Usage" className="w-6 h-6 mr-2" />
                    Usage & Activity
                  </li>

                  <li
                    onClick={() => {
                      navigate("/admin/config");
                      setMobileOpen(false);
                    }}
                    className={`flex items-center cursor-pointer transition-colors ${
                      isActive("/admin/config") ? "text-white font-bold" : "hover:text-sky-300"
                    }`}
                  >
                    <img src={config} alt="System Config" className="w-6 h-6 mr-2" />
                    System Configuration
                  </li>
                </ul>
              </nav>
            </div>

            <div className="mt-auto">
              <div className="flex items-center p-2 rounded-xl hover:bg-sky-200/20 transition-all duration-300 justify-start" onClick={() => setShowProfileMenu(!showProfileMenu)}>
                <div className="flex-shrink-0 w-10 h-10">
                  <img src={logo} alt="Admin Profile" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                </div>
                <div className="ml-3 overflow-hidden">
                  <p className="font-semibold text-white leading-tight">{userName || "Loading..."}</p>
                  <p className="text-xs text-gray-300 leading-tight truncate max-w-[150px]">{userEmail || ""}</p>
                </div>
              </div>

              {showProfileMenu && (
                <div className={`absolute left-0 bottom-16 w-full bg-white text-gray-700 rounded-xl shadow-lg transition-all`}>
                  <ul className="py-2">
                    <li
                      className="px-4 py-2 hover:bg-sky-100 cursor-pointer"
                      onClick={() => {
                        navigate("/admin/profile");
                        setMobileOpen(false);
                        setShowProfileMenu(false);
                      }}
                    >
                      View Profile
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-sky-100 cursor-pointer"
                      onClick={() => {
                        handleLogout();
                        setMobileOpen(false);
                      }}
                    >
                      Log Out
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
    </>
  );
}

export default AdminSidebar;