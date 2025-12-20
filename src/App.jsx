import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/UserPage/HomePage/HomePage";
import LoginPage from "./pages/UserPage/LoginPage/LoginPage";
import RegisterPage from "./pages/UserPage/LoginPage/RegisterPage";
import StorePage from "./pages/UserPage/StorePage/StorePage";
import CommunityPage from "./pages/UserPage/CommunityPage/CommunityPage";
import ContactPage from "./pages/UserPage/ContactPage/ContactPage";
import ProfilePage from "./pages/UserPage/ProfilePage/ProfilePage";
import OrderPage from "./pages/UserPage/OrderPage/OrderPage";
import DetailPage from "./pages/UserPage/DetailPage/DetailPage";
import DeatailCommunityPage from "./pages/UserPage/CommunityPage/DetailCommunityPage";
import AdminHomePage from "./pages/AdminPage/AdminHomePage";
import PrivateRoute from "./components/route/PrivateRoute";
import AdminProductPage from "./pages/AdminPage/AdminProductPage";
import AdminCustomerPage from "./pages/AdminPage/AdminCustomerPage";

function App() {
  return (
    <div className="app">
      <Routes>
        {/* User */}
        {/* Dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<HomePage />} />

        {/* MainPage */}
        <Route path="/order" element={<OrderPage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* LoginPage */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ProfilePage */}
        <Route path="/my-profile" element={<ProfilePage />} />

        {/* DetailPage */}
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/detail-community" element={<DeatailCommunityPage />} />

        {/* Admin */}
        {/* Dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute requiredRole="ADMIN">
              <AdminHomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-product"
          element={
            <PrivateRoute requiredRole="ADMIN">
              <AdminProductPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-customer"
          element={
            <PrivateRoute requiredRole="ADMIN">
              <AdminCustomerPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;