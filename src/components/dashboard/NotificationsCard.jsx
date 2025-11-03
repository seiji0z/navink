import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const statusStyles = {
    Approved: {
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
    },
    Printed: {
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
    },
    Collected: {
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
    },
    Pending: {
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
    },
    Cancelled: {
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
    },
    Declined: {
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
    },
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError) throw userError;

        if (!user) {
          setNotifications([]);
          setLoading(false);
          return;
        }

        // Fetch joined print transactions with requests
        const { data, error } = await supabase
          .from("print_transaction")
          .select(
            `
            transaction_id,
            status,
            datetime_approved,
            datetime_printed,
            datetime_collected,
            print_request!request_id (
              file_name,
              datetime_requested,
              printer_id,
              student_id
            )
          `
          )
          .order("datetime_approved", { ascending: false });

        if (error) throw error;

        // Filter transactions belonging to current student
        const studentNotifs = data.filter(
          (t) => t.print_request?.student_id === user.id
        );

        // Map into simplified notification objects
        const formatted = studentNotifs.map((t) => ({
          id: t.transaction_id,
          file_name: t.print_request?.file_name || "Unknown File",
          status: t.status,
          created_at:
            t.datetime_collected ||
            t.datetime_printed ||
            t.datetime_approved ||
            t.print_request?.datetime_requested,
        }));

        setNotifications(formatted);
      } catch (err) {
        console.error("Error fetching notifications:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-6 shadow-md flex flex-col items-center justify-center h-60">
        <p className="text-gray-500 text-sm italic">Loading notifications...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md flex flex-col gap-4">
      <h3
        className="text-xl font-medium text-gray-600"
        style={{ fontFamily: "Poppins-SemiBold, sans-serif" }}
      >
        Notifications
      </h3>

      <ul className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-2">
        {notifications.length > 0 ? (
          notifications.map((notif) => {
            const style = statusStyles[notif.status] || statusStyles.Pending;
            const message =
              notif.status === "Approved"
                ? "Your print request has been approved."
                : notif.status === "Printed"
                ? "Your document has been printed."
                : notif.status === "Collected"
                ? "You have collected your printed document."
                : notif.status === "Cancelled"
                ? "Your print request was cancelled."
                : notif.status === "Declined"
                ? "Your print request was declined."
                : "Your print request is pending approval.";

            return (
              <li
                key={notif.id}
                className={`border rounded-xl p-4 shadow-sm flex flex-col gap-1 ${style.bg} ${style.border}`}
              >
                <p className="text-sm leading-snug">
                  <span className="text-navi font-semibold">
                    {notif.file_name}
                  </span>{" "}
                  <span className={style.color}>{message}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(notif.created_at).toLocaleString()}
                </p>
              </li>
            );
          })
        ) : (
          <div className="text-gray-400 text-sm text-center italic py-4">
            No notifications yet.
          </div>
        )}
      </ul>
    </div>
  );
}

export default Notifications;