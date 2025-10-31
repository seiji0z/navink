import React, { useState, useEffect } from "react"; 
import Sidebar from "../components/Sidebar";
import ProfileCard from "../components/ProfileCard";
import FeedbackCard from "../components/FeedbackCard";
import { supabase } from "../supabaseClient"; 

export default function Profile() {
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [user, setUser] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Add useEffect to fetch all profile data
  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        // Get user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError || !user) throw userError || new Error("No user found");
        setUser(user);

        // Get student data
        const { data: student, error: studentError } = await supabase
          .from("student")
          .select("full_name, course, year_level, profile_photo")
          .eq("user_id", user.id)
          .single();
        if (studentError) throw studentError;
        setStudentData(student);

      } catch (err) {
        console.error("Error loading profile:", err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  // Helper to get just the first name
  const getFirstName = (fullName) => {
    if (!fullName) return "there"; 
    return fullName.split(" ")[0]; 
  };

  return (
    <div className="fade-in flex min-h-screen bg-sky-50">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-semibold text-navi">Profile</h2>
              <h1 className="text-3xl font-extrabold text-gray-800">
                {loading
                  ? "Loading..."
                  : `Looking good, ${getFirstName(studentData?.full_name)}!`}
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Pass data and setters down as props */}
            <ProfileCard
              user={user}
              initialStudentData={studentData}
              setParentStudentData={setStudentData}
              isParentLoading={loading}
              password={password}
              setPassword={setPassword}
            />
            <FeedbackCard feedback={feedback} setFeedback={setFeedback} />
          </div>
        </div>
      </main>
    </div>
  );
}