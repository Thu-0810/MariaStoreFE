import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/LoginPage/RegisterPage";
import StorePage from "./pages/StorePage/StorePage";
import CommunityPage from "./pages/CommunityPage/CommunityPage";
import ContactPage from "./pages/ContactPage/ContactPage";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/store" element={<StorePage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;