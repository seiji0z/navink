import React from "react";
import fileQueueIcon from "../../assets/icons/file-queue-icon.png";
import progressIcon from "../../assets/icons/in-progress-icon.png";
import pendingIcon from "../../assets/icons/pending-icon.png";
import declinedIcon from "../../assets/icons/declined-icon.png";

function CurrentQueues() {
  const queues = [
    {
      id: "PSLU-0001",
      name: "research.pdf",
      details: "A4, 2 copies, Black and White",
      tokens: 35,
      position: "1st in line",
      status: "In Progress",
      date: "October 12, 2025, 10:35 AM",
    },
    {
      id: "PSLU-0002",
      name: "toPrint.pdf",
      details: "A4, 5 copies, Black and White",
      tokens: 35,
      position: "2nd in line",
      status: "Pending",
      date: "October 12, 2025, 10:37 AM",
    },
    {
      id: "PSLU-0003",
      name: "PEER_EVALLLL.pdf",
      details: "A4, 1 copy, Black and White",
      tokens: 35,
      position: "3rd in line",
      status: "Declined",
      date: "October 12, 2025, 10:40 AM",
    },
    {
      id: "PSLU-0003",
      name: "PEER_EVALLLL.pdf",
      details: "A4, 1 copy, Black and White",
      tokens: 35,
      position: "3rd in line",
      status: "Declined",
      date: "October 12, 2025, 10:40 AM",
    },
    {
      id: "PSLU-0003",
      name: "PEER_EVALLLL.pdf",
      details: "A4, 1 copy, Black and White",
      tokens: 35,
      position: "3rd in line",
      status: "Declined",
      date: "October 12, 2025, 10:40 AM",
    },
    {
      id: "PSLU-0003",
      name: "PEER_EVALLLL.pdf",
      details: "A4, 1 copy, Black and White",
      tokens: 35,
      position: "3rd in line",
      status: "Declined",
      date: "October 12, 2025, 10:40 AM",
    },
  ];

  const statusStyles = {
    "In Progress": {
      bg: "#00BBFF",
      icon: progressIcon,
    },
    Pending: {
      bg: "#FF9D00",
      icon: pendingIcon,
    },
    Declined: {
      bg: "#FF4625",
      icon: declinedIcon,
    },
  };

  return (
    <div className="col-span-2 bg-white rounded-3xl p-6 shadow h-full flex flex-col">
      <h3
        className="text-xl font-medium text-gray-500 mb-4 shrink-0"
        style={{ fontFamily: "Poppins-SemiBold, sans-serif" }}
      >
        Current Queues
      </h3>

      {/* Scrollable area */}
      <div className="max-h-60 overflow-y-auto flex-1">
        <ul className="space-y-3">
          {queues.map((queue) => {
            const style = statusStyles[queue.status];
            return (
              <li
                key={queue.id}
                className="flex items-center justify-between border-2 rounded-xl border-[#1F6D8B] p-2 gap-4"
              >
                <div className="flex items-center gap-2">
                  <img src={fileQueueIcon} alt="" className="h-10 w-auto p-1" />
                  <div>
                    <p className="font-medium">{queue.name}</p>
                    <p className="text-sm text-gray-500">{queue.details}</p>
                  </div>
                </div>

                <div className="text-green-500 font-semibold">
                  {queue.tokens} Tokens
                </div>
                <div className="font-normal">{queue.position}</div>

                <div
                  className="flex text-sm px-2 py-1 text-black rounded-lg items-center justify-center gap-2 w-[110px]"
                  style={{ backgroundColor: style.bg }}
                >
                  <img
                    src={style.icon}
                    alt={`${queue.status} icon`}
                    className="h-4"
                  />
                  <p>{queue.status}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default CurrentQueues;
