import React from "react";
import { useNavigate } from "react-router-dom";

function PoliciesCard() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md col-span-1 lg:col-span-2">
      <h3 className="text-xl font-medium text-gray-500 mb-4"
      style={{ fontFamily: "Poppins-SemiBold, sans-serif" }}
      >
        Printing Policies & Guidelines
      </h3>

      <div className="space-y-2 text-sm text-gray-700">
        <p>
          Printing services are available in the <b>Knowledge Center (BYOD) Lab </b> 
          and the <b>Custodian’s Office (D521)</b> for <b>academic use only</b>.
        </p>

        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>
            Each student receives <b>500 tokens per semester</b> — non-transferable and non-carryover.
          </li>
          <li>
            <b>Printing costs:</b>
            <ul className="list-[circle] list-inside ml-5 mt-1 space-y-1 text-gray-600">
              <li>Black and white, any size: 1 token per page</li>
              <li>Color, any size: 10 tokens per page</li>
              <li>Black and white (image print): 10 tokens per page</li>
              <li>Color, any size (image print): 15 tokens per page</li>
            </ul>
          </li>
          <li>Only <b>school-related print jobs</b> will be accepted.</li>
        </ul>

        <p className="text-gray-600">
          Ensure that all submitted files are <b>appropriate and academic</b> in nature. Failure to comply may result in the <b>revocation of print tokens.</b>
        </p>
      </div>

      <div className="mt-4">
        <button
          onClick={() => navigate("/policies")}
          className="px-4 py-2 bg-[#1F6D8B] text-white rounded-lg text-sm hover:bg-[#18586d] transition"
        >
          View Full Policies
        </button>
      </div>
    </div>
  );
}

export default PoliciesCard;
