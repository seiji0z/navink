import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/navink-logo.png";
import { supabase } from "../supabaseClient";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // This effect checks if the user is already logged in
  // and navigates them to the home page.
  // It also handles the redirect back from Google.
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        navigate("/home");
      }
    };
    
    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate("/home");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

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
                  href="#" 
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
                onChange={(e) => setPassword(e.target.value)}
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
