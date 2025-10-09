import React from "react";
import fileQueueIcon from "../../assets/icons/file-queue-icon.png";
import progressIcon from "../../assets/icons/in-progress-icon.png";
import pendingIcon from "../../assets/icons/pending-icon.png";
import declinedIcon from "../../assets/icons/declined-icon.png";

function CurrentQueues() {
  return (
    <div className="col-span-2 bg-white rounded-3xl p-6 shadow">
      <h3
        className="text-xl font-medium text-black-500 mb-4"
        style={{ fontFamily: "Poppins-SemiBold, sans-serif" }}
      >
        Current Queues
      </h3>

      <ul className="space-y-3">
        {/* In Progress */}
        <li className="flex items-center justify-between border-2 rounded-xl border-[#1F6D8B] p-2 gap-4">
          <div className="flex items-center gap-2">
            <img src={fileQueueIcon} alt="" className="h-10 w-auto p-1" />
            <div>
              <p className="font-medium">toPrint.pdf</p>
              <div className="text-sm text-gray-500 flex gap-1">
                <p>A4,</p>
                <p>5 copies,</p>
                <p>Black and White</p>
              </div>
            </div>
          </div>

          <div className="text-green-500 font-semibold">35 Tokens</div>
          <div className="font-normal">1st in line</div>

          <div className="flex text-sm px-2 py-1 bg-[#00BBFF] text-black rounded-lg items-center gap-2 w-[110px]">
            <img src={progressIcon} alt="progress icon" className="h-4" />
            <p>In Progress</p>
          </div>
        </li>

        {/* Pending */}
        <li className="flex items-center justify-between border-2 rounded-xl border-[#1F6D8B] p-2 gap-4">
          <div className="flex items-center gap-2">
            <img src={fileQueueIcon} alt="" className="h-10 w-auto p-1" />
            <div>
              <p className="font-medium">toPrint.pdf</p>
              <div className="text-sm text-gray-500 flex gap-1">
                <p>A4,</p>
                <p>5 copies,</p>
                <p>Black and White</p>
              </div>
            </div>
          </div>

          <div className="text-green-500 font-semibold">35 Tokens</div>
          <div className="font-normal">2nd in line</div>

          <div className="flex text-sm px-2 py-1 bg-[#FF9D00] text-black rounded-lg items-center justify-center gap-2 w-[110px]">
            <img src={pendingIcon} alt="pending icon" className="h-4" />
            <p>Pending</p>
          </div>
        </li>

        {/* Declined */}
        <li className="flex items-center justify-between border-2 rounded-xl border-[#1F6D8B] p-2 gap-4">
          <div className="flex items-center gap-2">
            <img src={fileQueueIcon} alt="" className="h-10 w-auto p-1" />
            <div>
              <p className="font-medium">toPrint.pdf</p>
              <div className="text-sm text-gray-500 flex gap-1">
                <p>A4,</p>
                <p>5 copies,</p>
                <p>Black and White</p>
              </div>
            </div>
          </div>

          <div className="text-green-500 font-semibold">35 Tokens</div>
          <div className="font-normal">3rd in line</div>

          <div className="flex text-sm px-2 py-1 bg-[#FF4625] text-black rounded-lg items-center justify-center gap-2 w-[110px]">
            <img src={declinedIcon} alt="declined icon" className="h-4" />
            <p>Declined</p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default CurrentQueues;