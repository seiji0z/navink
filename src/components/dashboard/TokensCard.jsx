import React from "react";

function Tokens() {
  return (
    <div className="col-span-1 flex justify-center items-center">
      <div className="w-[300px] h-[300px] rounded-full bg-white flex flex-col justify-center items-center shadow border-8 border-[#61C580]">
        <h3 className="text-2xl font-medium text-gray-500">Current Tokens</h3>
        <p className="text-6xl font-bold text-green-600 mt-2 pb-5">
          450 <span className="text-2xl font-normal text-gray-500">/ 500</span>
        </p>
        <p className="text-center text-gray-400 mt-1">
          Tokens will reset at the start <br /> of the next semester
        </p>
      </div>
    </div>
  );
}

export default Tokens;