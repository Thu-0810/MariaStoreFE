import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/LoginPage/RegisterPage";
import StorePage from "./pages/StorePage/StorePage";
import CommunityPage from "./pages/CommunityPage/CommunityPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  return (
    <div className="app">
      <Routes>
        {/* Dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<HomePage />} />

        {/* MainPage */}
        <Route path="/store" element={<StorePage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* LoginPage */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ProfilePage */}
        <Route path="/my-profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;