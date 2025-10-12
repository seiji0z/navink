import React from "react";

function FullPrintingPolicies() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow text-gray-800 space-y-6">
      <h1 className="text-2xl font-bold text-[#1F6D8B]">
        Computer Laboratories Printing Policies 
      </h1>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[#1F6D8B]">
          1. General Guidelines
        </h2>
        <p>
          Printing services are available in the <b>Knowledge Center (BYOD) Laboratory </b> 
          and the <b>Custodian’s Office (D521)</b> for <b>academic purposes only</b>.
        </p>
        <p>
          The printing process is now managed through the <b>Online Print Management System</b>, 
          where students can submit, track, and confirm their print jobs. Paper for printing must be 
          provided by the student upon pickup.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-[#1F6D8B]">
          2. Fair Use Policy and Token Quotas
        </h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Each student is allocated <b>500 tokens per semester</b>.</li>
          <li>Tokens are <b>non-transferable</b> and <b>reset each semester</b>.</li>
          <li>Unused tokens do not carry over to the next term.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-[#1F6D8B]">
          3. Print Values
        </h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <b>PRINTING COSTS:</b>
            <ul className="list-[circle] list-inside ml-6 mt-1 space-y-1">
              <li>Black and white, any size: 1 token per page</li>
              <li>Color, any size: 10 tokens per page</li>
              <li>Black and white (image print): 10 tokens per page</li>
              <li>Color, any size (image print): 15 tokens per page</li>
            </ul>
          </li>
        </ul>
        <p className="text-sm text-gray-600 italic">
          *Image prints are defined as pages where 60% or more of the layout is occupied by an image or images.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-[#1F6D8B]">
          4. Monitoring and Token Management
        </h2>
        <p>
          Print quotas and usage are automatically tracked within the system. Each print request 
          deducts the corresponding number of tokens once it has been approved by the custodian or administrator.
          Token balances and print histories are visible in the student dashboard.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-[#1F6D8B]">
          5. Printing Process
        </h2>
        <ul className="list-decimal list-inside space-y-1 ml-3">
          <li>User uploads the file to be printed.</li>
          <li>User selects paper size, printer, and color options.</li>
          <li>User schedules a print time within the available slots (or choose to print immediately).</li>
          <li>User confirms the print job summary and submits for approval.</li>
          <li>Administrator reviews and approves/declines the print job.</li>
          <li>Approved jobs are printed by the custodian or intern.</li>
          <li>Interns or custodians mark the job as <b>Ready for Pickup</b> once complete.</li>
          <li>User receives a notification to collect the print job and bring replacement paper.</li>
          <li>User confirms pickup upon receipt of the printed material.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-[#1F6D8B]">
          6. Guidelines and Honor Code
        </h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Only <b>school-related print jobs</b> will be approved.</li>
          <li>DIY basis is still observed; students manage their own file submissions digitally.</li>
          <li>
            <b>Dishonesty</b> (e.g., tampering with file content or resubmitting duplicate jobs) will result in 
            the <b>revocation of print tokens</b> and possible disciplinary action.
          </li>
          <li>Students are reminded to <b>bring their own paper</b> when picking up their print jobs.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-[#1F6D8B]">
          7. System Features and Compliance
        </h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Secure login using school email or Google account integration.</li>
          <li>Real-time tracking of print status and queue updates.</li>
          <li>Token balance and history displayed on the user dashboard.</li>
          <li>Automated notifications for approvals, completions, and issues.</li>
          <li>System complies with the <b>Data Privacy Act (RA 10173)</b>.</li>
        </ul>
      </section>

      <p className="text-gray-600 text-sm italic">
        These policies ensure fair, transparent, and efficient use of university printing resources while 
        maintaining academic integrity and operational accountability.
      </p>
    </div>
  );
}

export default FullPrintingPolicies;
