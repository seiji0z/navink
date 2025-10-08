import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SmoothFollower from "./components/SmoothFollower";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <SmoothFollower />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
