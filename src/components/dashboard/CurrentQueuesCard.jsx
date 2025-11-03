import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import fileQueueIcon from "../../assets/icons/file-queue-icon.png";
import progressIcon from "../../assets/icons/in-progress-icon.png";
import pendingIcon from "../../assets/icons/pending-icon.png";
import declinedIcon from "../../assets/icons/declined-icon.png";

function CurrentQueues() {
  const [queues, setQueues] = useState([]);
  const [loading, setLoading] = useState(true);

  const statusStyles = {
    Printing: { bg: "#00BBFF", icon: progressIcon },
    Waiting: { bg: "#FF9D00", icon: pendingIcon },
    Pending: { bg: "#FF9D00", icon: pendingIcon },
    Completed: { bg: "#61C580", icon: progressIcon },
    Cancelled: { bg: "#FF4625", icon: declinedIcon },
  };

  useEffect(() => {
    const fetchQueues = async () => {
      try {
        setLoading(true);

        // Get current logged-in user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError || !user) throw userError || new Error("No user logged in");

        // Fetch requests that are in the queue, along with their
        // queue status AND transaction details (for the token cost)
        const { data: requestData, error: requestError } = await supabase
          .from("print_request")
          .select(`
            request_id,
            file_name,
            paper_size,
            num_pages,
            num_copies,
            print_type,
            datetime_requested,
            student_id,
            print_queue!inner (  
              queue_id,
              queue_status,
              queue_position,
              datetime_added
            ),
            print_transaction!inner ( 
              transaction_id,
              tokens_deducted
            )
          `)
          .eq("student_id", user.id) // Filter by user ID at the DB
          .order("datetime_requested", { ascending: false });

        if (requestError) throw requestError;

        // Map the data (no JS filtering needed)
        const studentQueues = requestData?.map((req) => {
          // !inner ensures we have these.
          // We take [0] in case the DB relationship is one-to-many.
          const queue = Array.isArray(req.print_queue) ? req.print_queue[0] : req.print_queue;
          const transaction = Array.isArray(req.print_transaction) ? req.print_transaction[0] : req.print_transaction;

          // If data is somehow incomplete, skip it
          if (!queue || !transaction) return null;

          return {
            id: queue.queue_id,
            name: req.file_name || "Untitled File",
            details: `${req.paper_size || "A4"}, ${
              req.num_copies || 1
            } copy${req.num_copies > 1 ? "ies" : ""}, ${
              req.print_type || "Grayscale"
            }`,
            pages: req.num_pages || "-",
            
            // Get tokens from the transaction
            tokens: transaction.tokens_deducted || 0, 
            
            position: queue.queue_position
              ? `${queue.queue_position}${getOrdinalSuffix(queue.queue_position)} in line`
              : "-",
            status: queue.queue_status,
            date: new Date(req.datetime_requested).toLocaleString(),
          };
        })
        .filter(Boolean); // Clean up any nulls, just in case

        setQueues(studentQueues);
      } catch (err) {
        console.error("Error fetching queue data:", err.message);
        setQueues([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQueues();
  }, []);

  const getOrdinalSuffix = (n) => {
    const s = ["th", "st", "nd", "rd"],
      v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  };

  if (loading) {
    return (
      <div className="col-span-1 lg:col-span-2 bg-white rounded-3xl p-6 shadow-md h-full flex justify-center items-center">
        <p className="text-gray-500">Loading queues...</p>
      </div>
    );
  }

  return (
    <div className="col-span-1 lg:col-span-2 bg-white rounded-3xl p-6 shadow-md h-full flex flex-col">
      <h3
        className="text-xl font-medium text-gray-500 mb-4 shrink-0"
        style={{ fontFamily: "Poppins-SemiBold, sans-serif" }}
      >
        Current Queues
      </h3>

      <div className="max-h-60 overflow-y-auto flex-1">
        <ul className="space-y-3">
          {queues.length === 0 ? (
            <p className="text-gray-400 text-sm text-center italic py-4">
              No current print queues.
            </p>
          ) : (
            queues.map((queue) => {
              const style = statusStyles[queue.status] || statusStyles.Pending;
              return (
                <li
                  key={queue.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-2 rounded-xl border-[#1F6D8B] p-3 gap-3"
                >
                  <div className="flex items-start gap-2 min-w-0">
                    <img src={fileQueueIcon} alt="" className="h-10 w-10 p-1 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium truncate" title={queue.name}>{queue.name}</p>
                      <p className="text-sm text-gray-500 truncate" title={queue.details}>{queue.details}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3">
                    <div className="text-green-600 font-semibold whitespace-nowrap">
                      {queue.tokens} Tokens
                    </div>
                    <div className="text-gray-700 whitespace-nowrap">{queue.position}</div>
                    <div
                      className="flex text-sm px-2 py-1 text-black rounded-lg items-center justify-center gap-2 w-[120px]"
                      style={{ backgroundColor: style.bg }}
                    >
                      <img
                        src={style.icon}
                        alt={`${queue.status} icon`}
                        className="h-4"
                      />
                      <p className="truncate">{queue.status}</p>
                    </div>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}

export default CurrentQueues;
