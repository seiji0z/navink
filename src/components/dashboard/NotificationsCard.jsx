import React from "react";

function Notifications() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow flex flex-col gap-4">
      <h3
        className="text-xl font-medium text-gray-500"
        style={{ fontFamily: "Poppins-SemiBold, sans-serif" }}
      >
        Notifications
      </h3>

      <div className="flex flex-col gap-4 text-gray-700">
        <div className="border rounded-xl p-4 bg-gray-50 shadow-sm">
          <p className="text-sm">
            <span className="text-navi"><b>toPrint.pdf</b></span> is now <span className="text-green-600">ready for pick up</span> at the{" "}
            <b>BYOD Lab</b>. Please bring replacement papers.
          </p>
        </div>

        <div className="border rounded-xl p-4 bg-gray-50 shadow-sm">
          <p className="text-sm">
            <span className="text-navi"><b>research.pdf</b></span> is <span className="text-yellow-600">queued for printing</span>. You will be notified once it's ready.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
