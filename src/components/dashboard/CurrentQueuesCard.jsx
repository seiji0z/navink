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

        // 1️⃣ Get current logged-in user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError || !user) throw userError || new Error("No user logged in");

        // 2️⃣ Get the student record tied to this user
        const { data: student, error: studentError } = await supabase
          .from("student")
          .select("user_id")
          .eq("user_id", user.id)
          .single();
        if (studentError) throw studentError;

        const studentId = student.user_id;

        // 3️⃣ Fetch the queues + join print_request data
        const { data: queueData, error: queueError } = await supabase
          .from("print_queue")
          .select(`
            queue_id,
            queue_status,
            queue_position,
            priority,
            datetime_added,
            print_request:request_id (
              request_id,
              file_name,
              paper_size,
              num_pages,
              num_copies,
              print_type,
              datetime_requested,
              student_id
            )
          `)
          .order("datetime_added", { ascending: false });

        if (queueError) throw queueError;

        // 4️⃣ Filter only the current student's queues
        const studentQueues = queueData
          ?.filter((q) => q.print_request?.student_id === studentId)
          ?.map((q) => ({
            id: q.queue_id,
            name: q.print_request?.file_name || "Untitled File",
            details: `${q.print_request?.paper_size || "A4"}, ${
              q.print_request?.num_copies || 1
            } copy${q.print_request?.num_copies > 1 ? "ies" : ""}, ${
              q.print_request?.print_type || "Grayscale"
            }`,
            pages: q.print_request?.num_pages || "-",
            tokens: 35, // placeholder until token logic is linked
            position: q.queue_position
              ? `${q.queue_position}${getOrdinalSuffix(q.queue_position)} in line`
              : "-",
            status: q.queue_status,
            date: new Date(q.print_request?.datetime_requested).toLocaleString(),
          }));

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
      <div className="col-span-2 bg-white rounded-3xl p-6 shadow h-full flex justify-center items-center">
        <p className="text-gray-500">Loading queues...</p>
      </div>
    );
  }

  return (
    <div className="col-span-2 bg-white rounded-3xl p-6 shadow h-full flex flex-col">
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
            })
          )}
        </ul>
      </div>
    </div>
  );
}

export default CurrentQueues;
