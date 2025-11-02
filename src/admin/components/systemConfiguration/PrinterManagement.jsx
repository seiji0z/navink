import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import logo from "../../../assets/icons/toggle-icon.svg";

function PrinterManagement() {
  const [isPrinterOpen, setIsPrinterOpen] = useState(false);
  const [printers, setPrinters] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch printers
  useEffect(() => {
    const fetchPrinters = async () => {
      const { data, error } = await supabase
        .from("printer")
        .select("printer_id, printer_name, location, status, ink_level, last_updated")
        .order("printer_id", { ascending: true });
      if (error) console.error(error);
      else setPrinters(data || []);
      setLoading(false);
    };
    fetchPrinters();
  }, []);

  // Update printer status
  const toggleStatus = async (printer) => {
    const newStatus = printer.status === "Online" ? "Offline" : "Online";
    const { error } = await supabase
      .from("printer")
      .update({ status: newStatus, last_updated: new Date().toISOString() })
      .eq("printer_id", printer.printer_id);
    if (error) {
      console.error(error);
      alert("Failed to update printer status.");
    } else {
      setPrinters((prev) =>
        prev.map((p) =>
          p.printer_id === printer.printer_id ? { ...p, status: newStatus } : p
        )
      );
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-md">
      <button
        onClick={() => setIsPrinterOpen(!isPrinterOpen)}
        className="w-full px-6 py-4 bg-white hover:bg-gray-50 flex items-center justify-between text-left transition"
      >
        <h2 className="text-lg font-semibold text-gray-700">
          Printer Management
        </h2>
        <img
          src={logo}
          alt="Toggle"
          className={`w-5 h-5 transition-transform ${isPrinterOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isPrinterOpen && (
        <div className="p-6 bg-gray-50">
          {loading ? (
            <p className="text-sm text-gray-500 italic">Loading printers...</p>
          ) : printers.length === 0 ? (
            <p className="text-sm text-gray-500 italic">No printers configured yet.</p>
          ) : (
            <div className="grid gap-4">
              {printers.map((printer) => (
                <div
                  key={printer.printer_id}
                  className="p-4 bg-white rounded-lg border border-gray-200 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {printer.printer_name}
                    </h3>
                    <p className="text-sm text-gray-600">{printer.location}</p>
                    <p className="text-xs text-gray-400">
                      Ink: {printer.ink_level}% • Last updated:{" "}
                      {new Date(printer.last_updated).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleStatus(printer)}
                    className={`px-3 py-1 text-sm font-medium rounded-lg transition ${
                      printer.status === "Online"
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-red-100 text-red-700 hover:bg-red-200"
                    }`}
                  >
                    {printer.status}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PrinterManagement;
