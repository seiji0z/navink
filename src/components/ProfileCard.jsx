import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function ProfileCard() {
  const [user, setUser] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [yearLevel, setYearLevel] = useState("");
  const [course, setCourse] = useState("");
  const [saving, setSaving] = useState(false);
  const [courseOptions, setCourseOptions] = useState([]);

  // Fetch user + student data
  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);

        // Get authenticated user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError || !user) throw userError || new Error("No user found");
        setUser(user);

        // Fetch student record
        const { data: student, error: studentError } = await supabase
          .from("student")
          .select("full_name, course, year_level, profile_photo")
          .eq("user_id", user.id)
          .single();
        if (studentError) throw studentError;

        setStudentData(student);
        setCourse(student.course || "");
        setYearLevel(student.year_level || "");
      } catch (err) {
        console.error("Error loading profile:", err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
    fetchCourseOptions();
  }, []);

  // Dynamically fetch enum values from Supabase
  async function fetchCourseOptions() {
    try {
      const { data, error } = await supabase.rpc("get_enum_values", {
        enum_name: "course_type",
      });
      if (error) throw error;
      setCourseOptions(data || []);
    } catch (err) {
      console.error("Error fetching course options:", err.message);
      setCourseOptions([
        "BSIT",
        "BSCS",
        "BSIS",
        "BSCE",
        "BSEMC",
      ]);
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("student")
        .update({ course, year_level: yearLevel })
        .eq("user_id", user.id);
      if (error) throw error;
      setStudentData({ ...studentData, course, year_level: yearLevel });
      setEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading)
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 text-center text-gray-500">
        Loading profile...
      </div>
    );

  return (
    <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* HEADER */}
      <div className="bg-sky-50 px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <img
            src={
              studentData?.profile_photo ||
              "https://via.placeholder.com/150?text=Profile"
            }
            alt={studentData?.full_name || "User"}
            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
          />
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">
              {studentData?.full_name || "Unnamed Student"}
            </h3>
            <p className="text-sm text-gray-600">{user?.email}</p>
            <p className="text-sm text-gray-500 mt-1">
              {studentData?.course || "No course"} •{" "}
              {studentData?.year_level
                ? `Year ${studentData.year_level}`
                : "No year level"}
            </p>
          </div>
        </div>

        <button
          onClick={() => setEditing(!editing)}
          className="hidden md:flex items-center gap-2 px-4 py-2 bg-navi text-white rounded-lg hover:bg-sky-700"
        >
          {editing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {/* BODY */}
      <div className="p-8">
        <h4 className="text-lg font-semibold mb-4">Account</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Course */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Course</p>
            {editing ? (
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-sky-300"
              >
                <option value="" hidden disabled>
                  Select Course
                </option>
                {courseOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            ) : (
              <p className="font-medium text-gray-800">
                {studentData?.course || "—"}
              </p>
            )}
          </div>

          {/* Year Level */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Year Level</p>
            {editing ? (
              <input
                type="number"
                value={yearLevel}
                min="1"
                max="5"
                onChange={(e) => setYearLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
            ) : (
              <p className="font-medium text-gray-800">
                {studentData?.year_level || "—"}
              </p>
            )}
          </div>
        </div>

        {/* Save Button */}
        {editing && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
