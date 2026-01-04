import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline } from "@mui/material";

// Import your pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import MeetHome from "./pages/MeetHome";    // <-- NEW IMPORT
import DevStudio from "./pages/DevStudio";  // <-- NEW IMPORT

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          {/* Default Redirect to Login */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Feature Routes */}
          <Route path="/home" element={<LandingPage />} />
          <Route path="/meet" element={<MeetHome />} />        {/* <-- NEW ROUTE */}
          <Route path="/devstudio" element={<DevStudio />} />  {/* <-- NEW ROUTE */}
          
          {/* Placeholder for others */}
          <Route path="/contests" element={<h1 style={{color:"white", padding:"2rem"}}>Contests Coming Soon</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;