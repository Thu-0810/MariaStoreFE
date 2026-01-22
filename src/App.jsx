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
import AdminOrderPage from "./pages/AdminPage/AdminOrderPage";
import AdminPostPage from "./pages/AdminPage/AdminPostPage";
import SellerHomePage from "./pages/SellerPage/SellerHomePage";
import SellerProductPage from "./pages/SellerPage/SellerProductPage";
import SellerOrderPage from "./pages/SellerPage/SellerOrderPage";
import SellerPostPage from "./pages/SellerPage/SellerPostPage";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Cart/Checkout";
import Payment from "./pages/Cart/Payment";
import QRPayment from "./pages/Cart/QRPayment";
import PaymentSuccess from "./pages/Cart/PaymentSuccess";
import ProfileRequestsPage from "./pages/UserPage/ProfilePage/ProfileRequestsPage";
import ProfileOrdersPage from "./pages/UserPage/ProfilePage/ProfileOrdersPage";
import ProfileFavoritesPage from "./pages/UserPage/ProfilePage/ProfileFavoritesPage";
import ProfilePostsPage from "./pages/UserPage/ProfilePage/ProfilePostsPage";

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
        <Route path="/my-profile" element={<ProfilePage />}>
          <Route index element={<Navigate to="requests" replace />} />
          <Route path="requests" element={<ProfileRequestsPage />} />
          <Route path="orders" element={<ProfileOrdersPage />} />
          <Route path="favorites" element={<ProfileFavoritesPage />} />
          <Route path="posts" element={<ProfilePostsPage />} />
        </Route>
        {/* DetailPage */}
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route
          path="/detail-community/:id"
          element={<DeatailCommunityPage />}
        />

        {/* Cart */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment/qr" element={<QRPayment />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />

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
        <Route
          path="/admin-order"
          element={
            <PrivateRoute requiredRole="ADMIN">
              <AdminOrderPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-post"
          element={
            <PrivateRoute requiredRole="ADMIN">
              <AdminPostPage />
            </PrivateRoute>
          }
        />

        {/* Seller */}
        {/* Dashboard */}
        <Route
          path="/seller-dashboard"
          element={
            <PrivateRoute requiredRole="SELLER">
              <SellerHomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/seller-product"
          element={
            <PrivateRoute requiredRole="SELLER">
              <SellerProductPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/seller-order"
          element={
            <PrivateRoute requiredRole="SELLER">
              <SellerOrderPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/seller-post"
          element={
            <PrivateRoute requiredRole="SELLER">
              <SellerPostPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;