import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ProfileCard from "../components/ProfileCard";
import FeedbackCard from "../components/FeedbackCard";

export default function Profile() {
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");

  return (
    <div className="fade-in flex min-h-screen bg-sky-50">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-semibold text-navi">Profile</h2>
              <h1 className="text-3xl font-extrabold text-gray-800">Looking good, Gabriel!</h1>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <ProfileCard password={password} setPassword={setPassword} />
            <FeedbackCard feedback={feedback} setFeedback={setFeedback} />
          </div>
        </div>
      </main>
    </div>
  );
}
