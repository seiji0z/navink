import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/navink-logo.png";
import { supabase } from "../supabaseClient";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // This effect checks if the user is logged in
  // and handles routing AFTER auth, including Google redirect.
  useEffect(() => {
    
    // This is the core logic function that runs on any auth change
    const handleAuthChange = async (session) => {
      // 1. If no session (user logged out), do nothing.
      if (!session) {
        return; 
      }

      // 2. Get the authenticated user and their UUID
      const user = session.user;
      const userId = user.id; // This is the UUID from auth.users

      // 3. Check if the user is in the Staff table
      // We query by the 'user_id' (UUID) foreign key
      const { data: staffData } = await supabase
        .from('staff')
        .select('access_level') // Just check if a record exists
        .eq('user_id', userId)
        .single();

      if (staffData) {
        // User is Staff! Send to admin dashboard.
        navigate('/admin/home', { replace: true });
        return;
      }

      // 4. If not staff, check if they are an EXISTING Student
      // We also query by the 'user_id' (UUID)
      const { data: studentData } = await supabase
        .from('student')
        .select('user_id') // Just check if a record exists
        .eq('user_id', userId)
        .single();

      if (studentData) {
        // User is an existing Student! Send to student home.
        navigate('/home', { replace: true });
        return;
      }

      // 5. If NOT staff AND NOT existing student, it's a NEW user.
      // We only auto-create profiles for Google sign-ins.
      if (user.app_metadata.provider === "google") {
        
        // Get user's full name and avatar from Google metadata
        const fullName = user.user_metadata?.full_name || user.user_metadata?.name || "New Student";
        const profilePhoto = user.user_metadata?.avatar_url || null;

        // Create a new student profile linked to the auth user's UUID
        const { error: insertError } = await supabase
          .from("student")
          .insert({
            user_id: userId,        // The UUID
            full_name: fullName,
            profile_photo: profilePhoto
            // 'course', 'year_level' will be NULL
            // 'token_balance' will use its DEFAULT (500)
          });

        if (insertError) {
          alert(`Error creating student profile: ${insertError.message}. Please contact an administrator.`);
          await supabase.auth.signOut(); // Log them out
        } else {
          // Successfully created student profile, send to student home
          navigate('/home', { replace: true });
        }
        return;
      }

      // 6. Handle other cases (e.g., email/pass login for an unknown user)
      // This user is authenticated but has no profile in 'staff' or 'student'.
      alert('Login failed. Your account is not registered in the system. Please use Google to sign up or contact an administrator.');
      await supabase.auth.signOut();
      navigate('/login', { replace: true });
    };

    // Check session on initial page load
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleAuthChange(session);
    });

    // Listen for future auth events (login/logout/redirect)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      handleAuthChange(session);
    });

    // Cleanup the listener when the component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]); // Dependency array

  // Handles email/password sign-in
  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        throw error;
      }
      // The useEffect hook will handle the navigation
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handles Google sign-in
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          // Optional: You can request specific scopes if needed
          // scopes: 'email profile',
        }
      });
      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      // Loading state will persist until redirect
      setLoading(true);
    }
  };

  // Admin dashboard navigation 
  const handleLogoClick = () => {
    navigate("/admin/home");
  };

  return (
    <div className="fade-in flex min-h-screen items-center justify-center bg-gradient-to-b from-sky-200 to-rose-100">
      <div className="flex w-full max-w-3xl rounded-2xl bg-white border border-gray-200 shadow-md overflow-hidden">
        {/* Left side - Login form */}
        <div className="flex flex-col w-1/2 px-10 py-12">
          <h2
            className="text-xl font-semibold text-gray-800 mb-1 text-center"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Welcome back!
          </h2>
          <p
            className="text-m text-gray-500 mb-8 text-center"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Log in to your account
          </p>

          <form className="space-y-5" onSubmit={handleEmailSignIn}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-600 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label
                  htmlFor="password"
                  className="block text-sm text-gray-600"
                >
                  Password
                </label>
                <a
                  href="#" // TODO: Implement password reset
                  className="text-xs text-sky-500 hover:underline font-medium"
                >
                  Reset password
                </a>
              </div>
              <input
                type="password"
                id="password"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                value={password}
                onChange={(e) => setPassword(e.targe.value)}
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-sky-700 text-white rounded-full py-2.5 -mb-0.5 font-medium hover:bg-sky-800 transition cursor-pointer disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-3 text-sm text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center border border-gray-300 rounded-full py-2.5 text-sm hover:bg-gray-50 transition cursor-pointer disabled:opacity-50"
            onClick={signInWithGoogle}
            disabled={loading}
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            {loading ? "Redirecting..." : "Continue with Google"}
          </button>
        </div>

        {/* Right side - Logo and name */}
        <div className="hidden md:flex flex-col items-center justify-center w-1/2 bg-gradient-to-b from-sky-50 to-white">
          {/* Make logo navigate to Admin Dashboard */}
          <img
            src={logo}
            alt="Navink Logo"
            className="w-64 mb-3 cursor-pointer transition-transform hover:scale-105"
            onClick={handleLogoClick}
            title="Go to Admin Dashboard"
          />
          <h1
            className="text-5xl font-semibold pb-7 select-none"
            style={{ fontFamily: "Urbanist-Bold, sans-serif" }}
          >
            Nav<span className="text-sky-700">ink</span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Login;