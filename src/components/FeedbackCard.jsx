import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient"; 

// THIS WHOLE COMPONENT NEEDS CLARIFICATION

// Accept the 'user' prop from Profile.js
export default function FeedbackCard({ feedback, setFeedback, user }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loadingActivity, setLoadingActivity] = useState(true);

  // Fetch recent activity on component mount
  useEffect(() => {
    async function fetchRecentActivity() {
      if (!user) return; // Wait for the user prop

      try {
        setLoadingActivity(true);
        setErrorMessage("");

        // We need to join print_transaction with print_request
        // to get the student_id and file_name.
        const { data, error } = await supabase
          .from("print_transaction")
          .select(
            `
            transaction_id,
            datetime_collected,
            status,
            print_request (
              file_name,
              student_id
            )
          `
          )
          .eq("print_request.student_id", user.id) // Filter by user
          .in("status", ["Collected", "Printed"]) // Show completed items
          .order("datetime_collected", { ascending: false, nullsFirst: true })
          .limit(3);

        if (error) throw error;

        // Filter out any potential nulls from the join
        const validData = data.filter(tx => tx.print_request);
        setRecentTransactions(validData);

      } catch (err) {
        console.error("Error fetching recent activity:", err.message);
        setErrorMessage("Could not load recent activity.");
      } finally {
        setLoadingActivity(false);
      }
    }

    fetchRecentActivity();
  }, [user]); // Re-run if user prop changes

  // Handle the form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    if (rating === 0 && !feedback) {
      setErrorMessage("Please provide a rating or a comment.");
      setIsSubmitting(false);
      return;
    }

    // Find the most recent transaction to attach feedback to
    if (recentTransactions.length === 0) {
      setErrorMessage("No recent transactions found to leave feedback on.");
      setIsSubmitting(false);
      return;
    }
    
    // Get the ID of the most recent transaction
    const mostRecentTransactionId = recentTransactions[0].transaction_id;

    try {
      const { error } = await supabase.from("feedback").insert({
        transaction_id: mostRecentTransactionId,
        rating: rating === 0 ? null : rating, // Use null if rating is 0
        comment: feedback || null, // Use null if feedback is empty
      });

      if (error) throw error;

      setSuccessMessage("Thank you for your feedback!");
      setFeedback("");
      setRating(0);
    } catch (err) {
      console.error("Error submitting feedback:", err.message);
      setErrorMessage("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to format date
  const timeAgo = (date) => {
    if (!date) return "Just now";
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
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


  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-800">Feedback</h3>
      <p className="text-sm text-gray-600 mt-2">
        Share your experience with your recent print transaction.
      </p>

      {/* Add 5-Star Rating Input */}
      <div className="flex justify-center gap-1 mt-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`cursor-pointer text-3xl ${
              (hoverRating || rating) >= star
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
          >
            ★
          </span>
        ))}
      </div>

      <textarea
        placeholder="We’d love to hear your thoughts!"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        className="w-full h-36 resize-none border border-gray-300 rounded-lg p-3 mt-4 focus:outline-none focus:ring-2 focus:ring-sky-300"
      />

      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="mt-4 w-full px-5 py-2 bg-navi text-white rounded-lg hover:bg-sky-700 disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit Feedback"}
      </button>

      {errorMessage && (
        <p className="text-sm text-red-600 mt-2 text-center">{errorMessage}</p>
      )}
      {successMessage && (
        <p className="text-sm text-green-600 mt-2 text-center">{successMessage}</p>
      )}

      {/* Dynamic Recent Activity Section */}
      <div className="mt-6">
        <h4 className="text-sm text-gray-500">Recent activity</h4>
        {loadingActivity ? (
          <p className="text-sm text-gray-500 mt-3">Loading activity...</p>
        ) : recentTransactions.length > 0 ? (
          <ul className="mt-3 space-y-2 text-sm text-gray-700">
            {recentTransactions.map((tx) => (
              <li key={tx.transaction_id} className="flex items-start gap-3">
                <span className={`mt-1.5 text-sky-300`}>●</span>
                <div>
                  <div className="font-medium">
                    {tx.status}: {tx.print_request.file_name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {timeAgo(tx.datetime_collected)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 mt-3">No recent print activity found.</p>
        )}
      </div>
    </div>
  );
}
