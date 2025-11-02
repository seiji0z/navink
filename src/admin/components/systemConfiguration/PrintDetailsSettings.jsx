import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";

function PrintDetailsSettings({ staffId }) {
  const [settings, setSettings] = useState({
    paper_size: "A4",
    copies: 1,
    duplex: true,
    color_mode: "grayscale",
  });
  const [originalSettings, setOriginalSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch settings on load
  useEffect(() => {
    const fetchSettings = async () => {
      const { data, error } = await supabase
        .from("settings")
        .select("setting_key, setting_value")
        .in("setting_key", [
          "default_paper_size",
          "default_copies",
          "default_duplex",
          "default_color_mode",
        ]);

      if (error) {
        console.error("Error fetching settings:", error);
      } else if (data && data.length > 0) {
        const newSettings = { ...settings };
        data.forEach(({ setting_key, setting_value }) => {
          switch (setting_key) {
            case "default_paper_size":
              newSettings.paper_size = setting_value;
              break;
            case "default_copies":
              newSettings.copies = parseInt(setting_value);
              break;
            case "default_duplex":
              newSettings.duplex = setting_value === "true";
              break;
            case "default_color_mode":
              newSettings.color_mode = setting_value;
              break;
            default:
              break;
          }
        });
        setSettings(newSettings);
        setOriginalSettings(newSettings); // store original values for comparison
      }
      setLoading(false);
    };
    fetchSettings();
  }, []);

  // Handle input change
  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  // Save changes to Supabase and log updates
  const handleSave = async () => {
    if (!staffId) {
      alert("Only authorized staff can update settings.");
      return;
    }

    setSaving(true);
    try {
      const updates = [
        { key: "default_paper_size", value: settings.paper_size },
        { key: "default_copies", value: settings.copies.toString() },
        { key: "default_duplex", value: settings.duplex.toString() },
        { key: "default_color_mode", value: settings.color_mode },
      ];

      for (const setting of updates) {
        const oldValue =
          originalSettings[
            setting.key.replace("default_", "")
          ]?.toString() || "";

        // Only log if changed
        if (oldValue !== setting.value) {
          await supabase
            .from("settings")
            .upsert({
              setting_key: setting.key,
              setting_value: setting.value,
              updated_by: staffId,
              datetime_updated: new Date(),
            })
            .eq("setting_key", setting.key);

          await supabase.from("audit_log").insert({
            staff_id: staffId,
            action: "Update Setting",
            entity: "settings",
            details: {
              setting_key: setting.key,
              old_value: oldValue,
              new_value: setting.value,
            },
          });
        }
      }

      alert("Settings updated successfully.");
      setOriginalSettings(settings);
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading print settings...</p>;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Print Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Paper Size */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Default Paper Size
          </label>
          <select
            value={settings.paper_size}
            onChange={(e) => handleChange("paper_size", e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
          >
            <option>A4</option>
            <option>Letter</option>
            <option>Legal</option>
          </select>
        </div>

        {/* Copies */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Default Copies
          </label>
          <input
            type="number"
            min={1}
            value={settings.copies}
            onChange={(e) => handleChange("copies", e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
        </div>

        {/* Duplex */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Default Duplex Printing
          </label>
          <div className="flex items-center">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.duplex}
                onChange={(e) => handleChange("duplex", e.target.checked)}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-sky-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-sky-600 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              <span className="ms-3 text-sm font-medium text-gray-700">
                {settings.duplex ? "Enabled" : "Disabled"}
              </span>
            </label>
          </div>
        </div>

        {/* Color Mode */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Default Color Mode
          </label>
          <div className="flex items-center gap-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="colorMode"
                value="grayscale"
                checked={settings.color_mode === "grayscale"}
                onChange={(e) => handleChange("color_mode", e.target.value)}
                className="w-4 h-4 text-sky-600 focus:ring-sky-500"
              />
              <span className="ml-2 text-sm text-gray-700">Black & White</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="colorMode"
                value="color"
                checked={settings.color_mode === "color"}
                onChange={(e) => handleChange("color_mode", e.target.value)}
                className="w-4 h-4 text-sky-600 focus:ring-sky-500"
              />
              <span className="ml-2 text-sm text-gray-700">Color</span>
            </label>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
        <button
          className="w-full sm:w-auto px-5 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          onClick={() => window.location.reload()}
        >
          Cancel
        </button>
        <button
          disabled={saving}
          onClick={handleSave}
          className="w-full sm:w-auto px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-sm font-medium transition shadow-sm disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Defaults"}
        </button>
      </div>
    </div>
  );
}

export default PrintDetailsSettings;
