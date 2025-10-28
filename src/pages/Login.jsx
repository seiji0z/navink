import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/navink-logo.png";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/home");
  };

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

          <form className="space-y-5" onSubmit={handleSubmit}>
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
              />
            </div>

            <button
              type="submit"
              className="w-full bg-sky-700 text-white rounded-full py-2.5 -mb-0.5 font-medium hover:bg-sky-800 transition cursor-pointer"
            >
              Sign in
            </button>
          </form>

          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-3 text-sm text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center border border-gray-300 rounded-full py-2.5 text-sm hover:bg-gray-50 transition cursor-pointer"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
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
