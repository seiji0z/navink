import React, { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import PendingRequestsTable from "../components/printRequest/PendingRequestsTable";
import { supabase } from "../../../supabaseClient"; // <-- IMPORT SUPABASE

// Helper function to format time
const formatTimeAgo = (timestamp) => {
  const now = new Date();
  const past = new Date(timestamp);
  const seconds = Math.floor((now - past) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
};

function Request() {
  const [isOpen, setIsOpen] = useState(true);
  const [requests, setRequests] = useState([]); // <-- MODIFIED: Start with empty array
  const [loading, setLoading] = useState(true); // <-- MODIFIED: Add loading state
  const [error, setError] = useState(null); // <-- MODIFIED: Add error state

  // <-- MODIFIED: Fetch data on component mount -->
  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    setLoading(true);
    const { data, error } = await supabase
      .from("print_request")
      .select(
        `
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
          profile_photo
        ),
        print_transaction!inner (
          transaction_id,
          status,
          tokens_deducted
        )
      `
      )
      .eq("print_transaction.status", "Pending") // Only fetch pending requests
      .order("datetime_requested", { ascending: false });

    if (error) {
      console.error("Error fetching requests:", error);
      setError(error.message);
    } else {
      // Format data for both list and detail page
      const formattedRequests = data.map((req) => ({
        id: req.request_id,
        studentName: req.student.full_name,
        studentId: req.student.user_id, // This is the UUID
        profilePhoto: req.student.profile_photo,
        document: req.file_name,
        submitted: formatTimeAgo(req.datetime_requested), // Format time
        status: req.print_transaction[0].status,
        // Extra data to pass to Detail View
        paper_size: req.paper_size,
        num_pages: req.num_pages,
        num_copies: req.num_copies,
        print_type: req.print_type,
        tokens_deducted: req.print_transaction[0].tokens_deducted,
        transaction_id: req.print_transaction[0].transaction_id,
      }));
      setRequests(formattedRequests);
    }
    setLoading(false);
  }

  // <-- MODIFIED: Add Supabase logic for quick approve -->
  const handleApprove = async (req) => {
    if (!window.confirm("Are you sure you want to approve this request?")) return;

    const { error } = await supabase
      .from("print_transaction")
      .update({
        status: "Approved",
        datetime_approved: new Date().toISOString(),
      })
      .eq("transaction_id", req.transaction_id);

    if (error) {
      alert("Error approving request: " + error.message);
    } else {
      // Remove approved request from the list
      setRequests((prev) => prev.filter((r) => r.id !== req.id));
    }
  };

  // <-- MODIFIED: Add Supabase logic for quick decline -->
  const handleDecline = async (req) => {
    const reason = window.prompt(
      "Please provide a reason for declining this request:"
    );
    if (!reason) {
      alert("A reason is required to decline a request.");
      return;
    }

    // 1. Update transaction
    const { error: transactionError } = await supabase
      .from("print_transaction")
      .update({ status: "Declined" })
      .eq("transaction_id", req.transaction_id);

    // 2. Update remarks
    const { error: requestError } = await supabase
      .from("print_request")
      .update({ remarks: reason })
      .eq("request_id", req.id);

    if (transactionError || requestError) {
      alert("Error declining request.");
    } else {
      // Remove declined request from the list
      setRequests((prev) => prev.filter((r) => r.id !== req.id));
    }
  };

  return (
    <div className="fade-in flex min-h-screen bg-sky-100">
      {/* Sidebar */}
      <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <main className="flex-1 p-8 flex flex-col">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Manage Print Request
        </h1>

        {/* <-- MODIFIED: Pass loading/error states and real data --> */}
        {loading && (
          <div className="text-center p-8">Loading requests...</div>
        )}
        {error && (
          <div className="text-center p-8 text-red-500">Error: {error}</div>
        )}
        {!loading && !error && (
          <PendingRequestsTable
            requests={requests}
            onApprove={handleApprove}
            onDecline={handleDecline}
          />
        )}
      </main>
    </div>
  );
}

export default Request;