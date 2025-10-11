import React from "react";

export default function FeedbackCard({ feedback, setFeedback }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-800">Feedback</h3>
      <p className="text-sm text-gray-600 mt-2">Your feedback helps us improve the design and functionality of our interface. Please share your experience.</p>

      <textarea
        placeholder="We’d love to hear your thoughts!"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        className="w-full h-36 resize-none border border-gray-300 rounded-lg p-3 mt-4 focus:outline-none focus:ring-2 focus:ring-sky-300"
      />

      <button className="mt-4 w-full px-5 py-2 bg-navi text-white rounded-lg hover:bg-sky-700">Submit</button>

      <div className="mt-6">
        <h4 className="text-sm text-gray-500">Recent activity</h4>
        <ul className="mt-3 space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-sky-300">●</span>
            <div>
              <div className="font-medium">Printed: Project Proposal</div>
              <div className="text-xs text-gray-500">2 days ago</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-300">●</span>
            <div>
              <div className="font-medium">Saved: UX Mockups</div>
              <div className="text-xs text-gray-500">5 days ago</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
