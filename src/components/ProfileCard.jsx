import React from "react";
import profilePic from "../assets/images/gab.png";

export default function ProfileCard({ password, setPassword }) {
  return (
    <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-sky-50 px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={profilePic}
              alt="Gabriel"
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
            />
            <button className="absolute bottom-0 right-0 bg-navi text-white w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-md hover:brightness-95">
              ✎
            </button>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-800">Gabriel Flores</h3>
            <p className="text-sm text-gray-600">2240853@slu.edu.ph</p>
            <p className="text-sm text-gray-500 mt-2">BSIT • Third Year</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button className="px-4 py-2 bg-navi text-white rounded-lg hover:bg-sky-700 whitespace-nowrap">Edit Profile</button>
        </div>
      </div>

      <div className="p-8">
        <h4 className="text-lg font-semibold mb-3">Account</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <p className="text-sm text-gray-500">Student ID</p>
            <p className="font-medium text-gray-800">2240853</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <p className="text-sm text-gray-500">Course</p>
            <p className="font-medium text-gray-800">Bachelor of Science in Information Technology</p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-6">
          <label className="text-sm text-gray-600">Change password</label>
          <div className="flex items-center gap-3 mt-3">
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
            <button className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200">Show</button>
            <button className="px-4 py-2 bg-navi text-white rounded-lg hover:bg-sky-700">Update</button>
          </div>
        </div>
      </div>
    </div>
  );
}
