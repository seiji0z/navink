import React, { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import PendingRequestsTable from "../components/printRequest/PendingRequestsTable";
import { supabase } from "../../supabaseClient"; 

function Request() {
  const [isOpen, setIsOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [requests, setRequests] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from Supabase when component mounts
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError(null);

    const { data, error } = await supabase
  .from("print_transaction")
  .select(`
    transaction_id,
    request_id,
    status,
    tokens_deducted,
    print_request:print_request!print_transaction_request_id_fkey (
      request_id,
      file_name,
      datetime_requested,
      paper_size,
      num_pages,
      num_copies,
      print_type,
      student (
        user_id,
        full_name,
        profile_photo,
        email
      )
    )
  `)
  .eq("status", "Pending")
  .order("datetime_requested", { foreignTable: "print_request", ascending: true });


      if (error) {
        console.error("Error fetching requests:", error);
        setError(error.message);
      } else if (data) {
        // Format the data to match the structure your table component expects
          const formattedRequests = data.map((transaction) => ({
          id: transaction.print_request.request_id,
          transaction_id: transaction.transaction_id, 
          status: transaction.status,
          tokens_deducted: transaction.tokens_deducted, 

          // Student info
          studentName: transaction.print_request.student.full_name,
          studentId: transaction.print_request.student.user_id,
          studentEmail: transaction.print_request.student.email,
          profilePhoto: transaction.print_request.student.profile_photo,
            
          // Document/Request info
          document: transaction.print_request.file_name,
          submitted: new Date(
            transaction.print_request.datetime_requested
          ).toLocaleString(),
            // Pass all other request data in case 'View Details' needs it
            ...transaction.print_request,
          }));
        setRequests(formattedRequests);
      }
      setLoading(false);
    };

    fetchRequests();
  }, []); // <-- Empty dependency array means this runs once on mount

  // --- Your existing handler functions ---
  // These will still work for updating local state.
  // The API calls can be added here when you're ready.
  const handleApprove = (req) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === req.id ? { ...r, status: "Approved" } : r))
    );
    // TODO: call API to approve request
    // e.g., supabase.from('print_transaction').update({ status: 'Approved', ... }).eq('request_id', req.id)
  };

  const handleDecline = (req) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === req.id ? { ...r, status: "Declined" } : r))
    );
    // TODO: call API to decline request
    // e.g., supabase.from('print_transaction').update({ status: 'Declined' }).eq('request_id', req.id)
  };

  // --- Helper to render content based on loading/error state ---
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Loading requests...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-500">Error fetching data: {error}</p>
        </div>
      );
    }
    
    if (requests.length === 0) {
      return (
         <div className="bg-white rounded-3xl p-6 shadow-md flex-1 overflow-hidden flex flex-col items-center justify-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Pending Print Requests
            </h2>
            <p className="text-gray-500">No pending requests found.</p>
         </div>
      )
    }

    return (
      <PendingRequestsTable
        requests={requests}
        onApprove={handleApprove}
        onDecline={handleDecline}
      />
    );
  };

  return (
    <div className="fade-in flex h-screen bg-sky-100 overflow-hidden">
      <AdminSidebar 
        isOpen={isOpen} 
        setIsOpen={setIsOpen}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Mobile Hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <main className="flex-1 h-screen overflow-y-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 truncate">
          Manage Print Request
        </h1>

        {/* Render content based on state */}
        {renderContent()}
      </main>
    </div>
  );
}

export default Request;