import Splash from "./components/Splash";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SavedFilePage from "./pages/SavedFilePage";
import HistoryPage from "./pages/HistoryPage";
import SmoothFollower from "./components/SmoothFollower";
import PrintFiles from "./pages/PrintFiles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

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
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/saved-files" element={<SavedFilePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/print-files" element={<PrintFiles />} /> {}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
