import React, { useState } from "react";
import { supabase } from "../../supabaseClient";

const StepAgreementConfirm = ({ onBack, onFinish, data, user, student, setStudent }) => {
  const [agreed, setAgreed] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  // helper for safe ISO conversion
  const safeIsoOrNull = (d) => {
    if (!d) return null;
    const dt = new Date(d);
    return Number.isNaN(dt.getTime()) ? null : dt.toISOString();
  };

  // same token logic as in StepReviewConfirm
  const getTokensPerPage = (isImage, colorMode) => {
    if (isImage) {
      return colorMode === "Colored" ? 15 : 10;
    } else {
      return colorMode === "Colored" ? 10 : 1;
    }
  };

  const handleSubmitPrint = async () => {
    if (!agreed) return alert("You must agree to continue.");
    if (!user || !student || !data?.file) {
      setError("Missing user, student, or file data.");
      return;
    }

    setProcessing(true);
    setError(null);

    const filename = data.file.name;
    const filePath = `${user.id}/${Date.now()}-${filename}`;

    const copies = parseInt(data.copies || 1, 10);
    const totalPages =
      (data.selectedPages && data.selectedPages.length) ||
      parseInt(data.totalPages || 1, 10);
    const isImagePrint = !!data.isImagePrint;
    const perPage = getTokensPerPage(isImagePrint, data.colorMode || "Black & White");
    const tokensUsed = perPage * copies * totalPages;

    if (Number(student.token_balance) < tokensUsed) {
      setError("Insufficient tokens to proceed.");
      setProcessing(false);
      return;
    }

    try {
      // 1️⃣ Upload file
      const { error: uploadError } = await supabase.storage
        .from("print-files")
        .upload(filePath, data.file, { upsert: true });
      if (uploadError) throw uploadError;

      // 2️⃣ Create signed URL
      const { data: signedData, error: signError } = await supabase.storage
        .from("print-files")
        .createSignedUrl(filePath, 60 * 60);
      if (signError) console.warn("Signed URL error:", signError);

      const fileUrl = signedData?.signedURL || null;

      // 3️⃣ RPC payload (matches StepReviewConfirm)
      const rpcParams = {
        p_student_id: user.id,
        p_file_name: filename,
        p_file_url: fileUrl,
        p_copies: copies,
        p_color_mode: data.colorMode || "Black & White",
        p_paper_size: data.paperSize || null,
        p_page_range:
          data.printRange ||
          (data.selectedPages ? data.selectedPages.join(",") : "All"),
        p_print_date:
          data.printOption === "later" ? safeIsoOrNull(data.printDate) : null,
        p_token_cost: tokensUsed,
      };

      // 4️⃣ Try atomic RPC
      const { error: rpcErr } = await supabase.rpc(
        "deduct_tokens_and_create_request",
        rpcParams
      );

      if (rpcErr) {
        console.warn("RPC failed; falling back:", rpcErr.message || rpcErr);

        // 🔁 Manual fallback
        const { data: freshStudent, error: selErr } = await supabase
          .from("student")
          .select("token_balance")
          .eq("user_id", user.id)
          .maybeSingle();
        if (selErr) throw selErr;

        const balance = Number(freshStudent.token_balance || 0);
        if (balance < tokensUsed) throw new Error("Insufficient tokens.");

        // Insert print_request
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
              remarks: "Submitted via web UI (agreement step)",
            },
          ])
          .select()
          .single();
        if (insertReqErr) throw insertReqErr;

        // Deduct tokens
        const { error: updateErr } = await supabase
          .from("student")
          .update({ token_balance: balance - tokensUsed })
          .eq("user_id", user.id);
        if (updateErr) throw updateErr;

        // Create transaction record
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
      }

      alert("✅ Print request submitted successfully!");
      // Refresh balance
      const { data: refreshedStudent } = await supabase
        .from("student")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      setStudent(refreshedStudent);

      setProcessing(false);
      onFinish();
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to submit print request.");
      setProcessing(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md max-w-5xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
        Printing Agreement & Confirmation
      </h2>

      <div className="max-h-[60vh] overflow-y-auto p-4 bg-gray-50 rounded-lg text-gray-700 space-y-3 text-sm leading-relaxed">
        <h3 className="font-semibold text-lg text-sky-700">
          Computer Laboratories Printing Policies
        </h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Printing available at Knowledge Center (BYOD Lab) and Custodian’s Office (D521).</li>
          <li>Students must bring their own paper for pickup.</li>
          <li>Each student has 500 tokens per semester (non-transferable).</li>
          <li>Rates: B&W 1/page, Color 10/page, B&W image 10/page, Color image 15/page.</li>
          <li>Only academic-related materials may be printed.</li>
          <li>Misuse of tokens or dishonesty leads to revocation and disciplinary action.</li>
          <li>All print requests are logged for transparency and compliance.</li>
        </ul>
        <p className="mt-4 italic text-gray-600">
          By proceeding, you confirm compliance with the Data Privacy Act (RA 10173) and affirm that
          the printed material is academic in nature.
        </p>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <input
          type="checkbox"
          id="agree"
          checked={agreed}
          onChange={() => setAgreed(!agreed)}
          className="w-5 h-5 accent-sky-600"
        />
        <label htmlFor="agree" className="text-gray-700 text-sm">
          I have read and agree to the Computer Laboratories Printing Policies and Terms.
        </label>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
        >
          Back
        </button>

        <button
          onClick={handleSubmitPrint}
          disabled={!agreed || processing}
          className={`px-6 py-2 rounded-lg text-white transition ${
            agreed ? "bg-sky-600 hover:bg-sky-700" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {processing ? "Submitting..." : "Proceed to Print"}
        </button>
      </div>
    </div>
  );
};

export default StepAgreementConfirm;
