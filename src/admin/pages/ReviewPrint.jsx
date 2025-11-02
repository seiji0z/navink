import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import ActionsCard from "../components/printRequest/ActionsCard";
import StudentInfoCard from "../components/printRequest/StudentInfoCard";
import PrintSettingsCard from "../components/printRequest/PrintSettingsCard";
import FilesSubmittedCard from "../components/printRequest/FilesSubmittedCard";
import DocumentPreviewCard from "../components/printRequest/DocumentPreviewCard"; 
import { supabase } from "../../supabaseClient"; 

// Add this helper function at the top of PrintRequest.js
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  if (!bytes) return 'N/A';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function PrintRequest() {
  const location = useLocation();
  const navigate = useNavigate();
  const request = location.state;

  // --- New State ---
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [adminUser, setAdminUser] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileInfo, setFileInfo] = useState({
    name: request?.document,
    size: "Loading...", 
  });

 // --- Get Admin User & File Preview URL ---
  useEffect(() => {
    const fetchAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setAdminUser(user);
    };

    const fetchFileData = async () => {
      // We need BOTH the studentId and the document name
      if (request?.studentId && request?.document) {
        
        const folderPath = request.studentId; // Folder is the student's ID
        const fileName = request.document;   // File is the document name
        const fullPath = `${folderPath}/${fileName}`; // This is the correct full path

        console.log("📁 Student Folder:", folderPath);
        console.log("📄 File Name:", fileName);
        console.log("🛠 Full Path:", fullPath);

        // --- Fix for File Metadata (Size) ---
        const { data: listData, error: listError } = await supabase.storage
          .from("print-files")
          .list(folderPath, { // List files *inside* the student's folder
            search: fileName,    // Search *for* that specific file
            limit: 1,
          });

        if (listError || !listData || listData.length === 0) {
          console.error("Error listing file:", listError ? listError.message : "File not found in list");
          setFileInfo((prev) => ({ ...prev, size: "N/A" }));
        } else {
          // File found, get its size
          const sizeInBytes = listData[0].metadata.size;
          setFileInfo((prev) => ({ ...prev, size: formatBytes(sizeInBytes) }));
        }

        // --- Fix for File Preview URL ---
        const { data: urlData, error: urlError } = await supabase.storage
          .from("print-files")
          .createSignedUrl(fullPath, 3600); // Use the correct fullPath

        if (urlError) {
          console.error("Error creating signed URL:", urlError);
        } else {
          setPreviewUrl(urlData.signedUrl);
        }
      } else {
         console.warn("Missing studentId or document in request state.");
         setFileInfo((prev) => ({ ...prev, size: "N/A" }));
      }
    };

    fetchAdmin();
    fetchFileData();
  }, [request]); // Keep dependency array

  if (!request) {
    return <div>Request not found. Go back and try again.</div>;
  }

  const handleBack = () => navigate(-1);

  // --- Replace hard-coded data with real request data ---
  const printSettings = {
    copies: request.num_copies,
    paperSize: request.paper_size,
    colorMode: request.print_type,
    sided: "N/A", 
    tokenCost: request.tokens_deducted,
  };
  
  // --- Download Logic ---
  const handleDownload = async () => {
    setLoading(true);
    setError(null);

    const filePath = `${request.studentId}/${request.document}`;
    console.log("📄 Attempting to sign for download:", filePath);

    const { data, error } = await supabase.storage
      .from("print-files")
      .createSignedUrl(filePath, 60, {
        download: true,
      });

    if (error || !data?.signedUrl) {
      alert("Failed to create signed URL: " + (error?.message || "Unknown error"));
      setLoading(false);
      return;
    }

    window.location.assign(data.signedUrl);

    setTimeout(() => setLoading(false), 1000);
  };

  // Create the files array for the child component
  const files = [
    {
      name: request.document,
      size: fileInfo.size,
      onDownload: handleDownload, // Attach our new handler
    },
  ];

  // --- Approve Logic ---
  const handleApprove = async () => {
    if (!adminUser) {
      alert("Error: Admin user not found. Please refresh.");
      return;
    }
    if (!confirm("Are you sure you want to approve this request?")) return;

    setLoading(true);
    setError(null);

    // Call the database function
    const { error } = await supabase.rpc('approve_print_request', {
      p_request_id: request.id,
      p_transaction_id: request.transaction_id,
      p_admin_id: adminUser.id
    });

    if (error) {
      setError(error.message);
      alert("Failed to approve: " + error.message);
    } else {
      alert("Request approved successfully!");
      navigate(-1);
    }
    setLoading(false);
  };

  // --- Decline Logic ---
  const handleDecline = async () => {
    if (!adminUser) {
      alert("Error: Admin user not found. Please refresh.");
      return;
    }
    if (remarks.trim() === "") {
        if (!confirm("Are you sure you want to decline without providing a reason?")) return;
    } else {
        if (!confirm("Are you sure you want to decline this request?")) return;
    }

    setLoading(true);
    setError(null);

    // Update the transaction to "Declined"
    const { error: transactionError } = await supabase
      .from("print_transaction")
      .update({
        status: "Declined",
        issued_by: adminUser.id,
      })
      .eq("transaction_id", request.transaction_id);

    if (transactionError) {
      setError(transactionError.message);
      alert("Failed to decline: " + transactionError.message);
      setLoading(false);
      return;
    }

    // Add remarks to the original print_request
    if (remarks.trim() !== "") {
      await supabase
        .from("print_request")
        .update({ remarks: remarks })
        .eq("request_id", request.id);
    }

    alert("Request declined.");
    navigate(-1); // Go back
    setLoading(false);
  };

  return (
    <div className="fade-in flex h-screen overflow-hidden bg-sky-100">
      <AdminSidebar isOpen={true} setIsOpen={() => {}} />

      <main className="flex-1 p-8 overflow-hidden">
        <div className="bg-white rounded-3xl shadow-md p-6 w-full h-full overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h1 className="text-2xl font-bold text-gray-800">Review Print Request</h1>
            <button
              onClick={handleBack}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-medium px-4 py-2 rounded-lg transition shadow-sm"
            >
              Back
            </button>
          </div>

          {/* Error Message */}
          {error && (
             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
             </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <ActionsCard
                onApprove={handleApprove}
                onDecline={handleDecline}
                remarks={remarks}
                setRemarks={setRemarks}
                disabled={loading} // Pass loading state
              />
              <StudentInfoCard
                studentName={request.studentName}
                studentId={request.studentId}
                studentEmail={request.studentEmail} // Pass email
              />
              <PrintSettingsCard settings={printSettings} />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <FilesSubmittedCard files={files} />
              <DocumentPreviewCard previewUrl={previewUrl} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PrintRequest;