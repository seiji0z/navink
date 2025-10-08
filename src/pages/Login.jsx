import React from "react";
import logo from "../assets/images/navink-logo.png";

function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-sky-50 to-rose-50">
      <div className="flex w-full max-w-3xl rounded-2xl bg-white shadow-md overflow-hidden">
        <div className="flex flex-col justify-center w-1/2 px-10 py-12">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            Welcome back!
          </h2>
          <p className="text-sm text-gray-500 mb-8">Log in to your account</p>

          <form className="space-y-5">
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
              className="w-full bg-sky-700 text-white rounded-full py-2.5 font-medium hover:bg-sky-800 transition"
            >
              Sign in
            </button>

            <div className="flex items-center my-4">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="px-3 text-sm text-gray-400">OR</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center border border-gray-300 rounded-full py-2.5 text-sm hover:bg-gray-50 transition"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Continue with Google
            </button>
          </form>
        </div>

        <div className="hidden md:flex flex-col items-center justify-center w-1/2 bg-gradient-to-b from-sky-50 to-white">
          <img src={logo} alt="Navink Logo" className="w-64 mb-2" />
          <h1 className="text-5xl font-semibold">
            Nav<span className="text-sky-700">ink</span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Login;
