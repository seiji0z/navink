import React from "react";
import user from "../../../assets/icons/user-icon.png";

function TotalUsersCard() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow flex justify-between items-center w-full">
      {/* Left Side */}
      <div>
        <h3
          className="text-sm font-medium text-gray-500 mb-2"
          style={{ fontFamily: "Poppins-SemiBold, sans-serif" }}
        >
          Total Users
        </h3>
        <p
          className="text-5xl font-bold text-sky-700"
          style={{ fontFamily: "Urbanist-Bold, sans-serif" }}
        >
          329
        </p>
        <p className="text-xs text-gray-400 mt-1">37 new users this month</p>
      </div>

      {/* Right Icon */}
      <div className="bg-sky-100 p-3 rounded-full flex items-center justify-center">
        <img src={user} alt="user" className="w-8 h-8 object-contain" />
      </div>
    </div>
  );
}

export default TotalUsersCard;
