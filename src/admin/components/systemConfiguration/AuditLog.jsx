import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";

function AuditLog() {
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuditLogs = async () => {
      const { data, error } = await supabase
        .from("audit_log")
        .select(`
          audit_id,
          action,
          entity,
          details,
          datetime_created,
          staff:staff_id (
            full_name,
            email
          )
        `)
        .order("datetime_created", { ascending: false });

      if (error) {
        console.error("Error fetching audit logs:", error);
      } else {
        setAuditLogs(data);
      }

      setLoading(false);
    };

    fetchAuditLogs();
  }, []);

  if (loading) return <p>Loading audit logs...</p>;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Audit Log for Settings Changes
      </h2>

      <div className="overflow-x-auto border border-gray-200 rounded-2xl">
        <table className="min-w-full table-auto text-sm">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50">
            <tr>
              <th className="px-4 py-3">Date/Time</th>
              <th className="px-4 py-3">Staff</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Setting</th>
              <th className="px-4 py-3">Old Value</th>
              <th className="px-4 py-3">New Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {auditLogs.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-3 text-center text-gray-500">
                  No audit logs found.
                </td>
              </tr>
            ) : (
              auditLogs.map((log) => {
                let details = log.details;
                if (typeof details === "string") {
                  try {
                    details = JSON.parse(details);
                  } catch {
                    details = {};
                  }
                }

                return (
                  <tr key={log.audit_id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-700">
                      {new Date(log.datetime_created).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      {log.staff?.full_name || "Unknown Staff"}
                      <div className="text-xs text-gray-500">
                        {log.staff?.email}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{log.action}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {details.setting_key || "-"}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {details.old_value ?? "-"}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {details.new_value ?? "-"}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AuditLog;
