import Splash from "./components/Splash";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Home from "./pages/Home";
import HistoryPage from "./pages/History";
import SmoothFollower from "./components/SmoothFollower";
import PrintFiles from "./pages/PrintFiles";
import Policies from "./pages/Policies";
import Profile from "./pages/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// Admin pages
import AdminHome from "./admin/pages/AdminHome";
import PrintRequest from "./admin/pages/PrintRequest";
import ReviewPrint from "./admin/pages/ReviewPrint";
import Queue from "./admin/pages/Queue";
import Usage from "./admin/pages/Usage";
import Config from "./admin/pages/Configuration";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) return <Splash />;

  return (
    <BrowserRouter>
      <SmoothFollower />
      <Routes>
        {/* ---------------- STUDENT SIDE ---------------- */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/print-files" element={<PrintFiles />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/profile" element={<Profile />} />

        {/* ---------------- ADMIN SIDE ---------------- */}
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/requests" element={<PrintRequest />} />
        <Route path="/print-request/:id" element={<ReviewPrint />} />
        <Route path="/admin/queue" element={<Queue />} />
        <Route path="/admin/usage" element={<Usage />} />
        <Route path="/admin/config" element={<Config />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;