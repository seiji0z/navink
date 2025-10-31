import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { supabase } from "../../supabaseClient";

// Load PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const StepReviewConfirm = ({ onBack, data, user, student: initialStudent, onSuccess }) => {
  const [tokensUsed, setTokensUsed] = useState(0);
  const [student, setStudent] = useState(initialStudent);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  // rates per your policy:
  // - BW document: 1 token/page
  // - Color document: 10 tokens/page
  // - BW image print: 10 tokens/page
  // - Color image print: 15 tokens/page
  const getTokensPerPage = (isImage, colorMode) => {
    if (isImage) {
      return colorMode === "Colored" ? 15 : 10;
    } else {
      return colorMode === "Colored" ? 10 : 1;
    }
  };

  // fetch fresh student data (token_balance) if needed
  useEffect(() => {
    const fetchStudent = async () => {
      if (!user) return;
      try {
        const { data: studRow, error: studErr } = await supabase
          .from("student")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();
        if (studErr) {
          console.warn("Failed to refresh student:", studErr);
        } else {
          setStudent(studRow);
        }
      } catch (e) {
        console.warn(e);
      }
    };
    fetchStudent();
  }, [user]);

  useEffect(() => {
    if (!data) return;

    const copies = parseInt(data.copies || 1, 10);
    const totalPages =
      (data.selectedPages && data.selectedPages.length) || parseInt(data.totalPages || 1, 10);
    const isImagePrint = !!data.isImagePrint;

    const perPage = getTokensPerPage(isImagePrint, data.colorMode || "Black & White");
    setTokensUsed(perPage * copies * totalPages);
  }, [data]);

  const remainingTokens = (student && typeof student.token_balance !== "undefined")
    ? Number(student.token_balance) - tokensUsed
    : null; // null means unknown

  const safeIsoOrNull = (d) => {
    if (!d) return null;
    const dt = new Date(d);
    return Number.isNaN(dt.getTime()) ? null : dt.toISOString();
  };

  const handleConfirm = async () => {
    setError(null);

    if (!user) {
      setError("You must be logged in.");
      return;
    }
    if (!data?.file) {
      setError("Missing file.");
      return;
    }
    if (!student) {
      setError("Student record not found.");
      return;
    }
    if (tokensUsed <= 0) {
      setError("Token calculation failed.");
      return;
    }
    if (Number(student.token_balance) < tokensUsed) {
      setError("Insufficient tokens.");
      return;
    }

    setProcessing(true);

    const filename = data.file.name || `upload-${Date.now()}`;
    const filePath = `${user.id}/${Date.now()}-${filename}`;

    try {
      // 1) Upload file to 'print-files' bucket
      const { error: uploadError } = await supabase.storage
        .from("print-files")
        .upload(filePath, data.file, { upsert: true });

      if (uploadError) throw uploadError;

      // 2) Create signed URL (bucket is private by your config). Expires 1 hour.
      const { data: signedData, error: signError } = await supabase.storage
        .from("print-files")
        .createSignedUrl(filePath, 60 * 60);

      if (signError) {
        // not fatal — fallback to public url if any
        console.warn("createSignedUrl error:", signError);
      }

      const fileUrl = signedData?.signedURL || null;

      // Build RPC params
      const rpcParams = {
        p_student_id: user.id,
        p_file_name: filename,
        p_file_url: fileUrl,
        p_copies: parseInt(data.copies || 1, 10),
        p_color_mode: data.colorMode || "Black & White",
        p_paper_size: data.paperSize || null,
        p_page_range: data.printRange || (data.selectedPages ? data.selectedPages.join(",") : "All"),
        p_print_date: data.printOption === "later" ? safeIsoOrNull(data.printDate) : null,
        p_token_cost: tokensUsed,
      };

      // 3) Try RPC atomic function
      const { data: rpcRes, error: rpcErr } = await supabase.rpc(
        "deduct_tokens_and_create_request",
        rpcParams
      );

      if (rpcErr) {
        // Fallback client-side sequence if RPC not available or failed
        console.warn("RPC failed; falling back to client-side sequence:", rpcErr.message || rpcErr);

        // a) Re-check balance (fresh)
        const { data: freshStudent, error: selErr } = await supabase
          .from("student")
          .select("token_balance")
          .eq("user_id", user.id)
          .maybeSingle();
        if (selErr) throw selErr;
        const balance = Number(freshStudent.token_balance || 0);
        if (balance < tokensUsed) throw new Error("Insufficient tokens.");

        // b) Insert print_request
        const { data: insertedReq, error: insertReqErr } = await supabase
          .from("print_request")
          .insert([
            {
              student_id: user.id,
              file_name: filename,
              paper_size: data.paperSize || null,
              num_pages: data.selectedPages?.length || data.totalPages || 1,
              num_copies: data.copies || 1,
              print_type: data.colorMode === "Colored" ? "Color" : "Grayscale",
              datetime_scheduled: safeIsoOrNull(data.printDate),
              remarks: "Submitted via web UI",
            },
          ])
          .select()
          .single();

        if (insertReqErr) throw insertReqErr;

        // c) Deduct tokens
        const { error: updateErr } = await supabase
          .from("student")
          .update({ token_balance: balance - tokensUsed })
          .eq("user_id", user.id);

        if (updateErr) throw updateErr;

        // d) Create print_transaction record
        const { error: insertTransErr } = await supabase
          .from("print_transaction")
          .insert([
            {
              request_id: insertedReq.request_id,
              tokens_deducted: tokensUsed,
              status: "Pending",
            },
          ]);

        if (insertTransErr) throw insertTransErr;

        // success fallback
        alert("Print request submitted and tokens deducted.");
        // refresh student balance in UI
        const { data: refreshedStudent } = await supabase
          .from("student")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();
        setStudent(refreshedStudent);
        setProcessing(false);
        if (onSuccess) onSuccess();
        return;
      }

      // RPC success
      alert("Print request submitted and tokens deducted (server-side).");
      // refresh student balance in UI
      const { data: refreshedStudent2 } = await supabase
        .from("student")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      setStudent(refreshedStudent2);
      setProcessing(false);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to submit print request.");
      setProcessing(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md max-w-5xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
        Review & Confirm
      </h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Left: Summary Info */}
        <div className="space-y-2 text-gray-700">
          <p><strong>File:</strong> {data?.file?.name || "No file selected"}</p>
          <p><strong>Copies:</strong> {data.copies || 1}</p>
          <p><strong>Total Pages:</strong> {data.totalPages || 1}</p>
          <p><strong>Paper Size:</strong> {data.paperSize}</p>
          <p><strong>Color:</strong> {data.colorMode}</p>
          <p><strong>Detected Type:</strong>{" "}
            {data.isImagePrint ? (
              <span className="text-sky-600 font-medium">Image Print</span>
            ) : (
              <span className="text-gray-600">Standard Document</span>
            )}
          </p>
          <p><strong>Print Range:</strong> {data.printRange || "All Pages"}</p>
          <p><strong>Print Date:</strong>{" "}
            {data.printOption === "later" ? data.printDate || "Not scheduled" : "Print Now"}
          </p>

          <hr className="my-4 border-gray-300" />

          <p><strong>Tokens Used:</strong>{" "}
            <span className="text-sky-600 font-semibold">{tokensUsed}</span></p>

          <p>
            <strong>Your Balance:</strong>{" "}
            <span className="font-semibold">
              {student && typeof student.token_balance !== "undefined"
                ? Number(student.token_balance).toFixed(2)
                : "—"}
            </span>
          </p>

          <p>
            <strong>Remaining After Print:</strong>{" "}
            <span className={`font-semibold ${remainingTokens !== null && remainingTokens < 0 ? "text-red-500" : "text-green-600"}`}>
              {remainingTokens === null ? "—" : (remainingTokens >= 0 ? Number(remainingTokens).toFixed(2) : 0)}
            </span>
          </p>

          {error && <p className="text-red-600">{error}</p>}
        </div>

        {/* Right: PDF or Image Preview */}
        <div className="border rounded-xl bg-gray-50 p-4 h-96 overflow-y-auto">
          {data.previewUrl ? (
            data?.file?.type?.startsWith("image/") ? (
              <div className="flex flex-col items-center space-y-3">
                <img
                  src={data.previewUrl}
                  alt="Preview"
                  className={`w-full h-auto max-h-96 object-contain rounded-lg ${data.colorMode === "Black & White" ? "grayscale" : ""}`}
                />
                <p className="text-sm text-gray-500">
                  Image to be printed ({data.copies || 1} copies)
                </p>
              </div>
            ) : (
              <Document file={data.previewUrl} loading="Loading PDF...">
                {(data.selectedPages?.length ? data.selectedPages : Array.from({ length: data.totalPages || 1 }, (_, i) => i + 1)).map((pageNum) => (
                  <div key={pageNum} className="mb-6 border-b border-gray-300 pb-3 last:border-none">
                    <p className="text-sm text-gray-500 mb-2">Page {pageNum}</p>
                    <Page
                      pageNumber={pageNum}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      className={`${data.colorMode === "Black & White" ? "grayscale" : ""}`}
                      width={350}
                    />
                  </div>
                ))}
              </Document>
            )
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">No preview available</div>
          )}
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-between mt-6">
        <button onClick={onBack} className="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition">Back</button>

        <button
          onClick={handleConfirm}
          className="px-6 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition"
          disabled={processing || (remainingTokens !== null && remainingTokens < 0)}
        >
          {processing ? "Submitting..." : "Confirm & Submit"}
        </button>
      </div>
    </div>
  );
};

export default StepReviewConfirm;
