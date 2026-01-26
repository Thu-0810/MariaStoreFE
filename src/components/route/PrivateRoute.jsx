
import { Navigate } from "react-router-dom";
import { message } from "antd";

function PrivateRoute({ children, requiredRole, requiredRoles }) {
  const token = localStorage.getItem("accessToken");
  const userRaw = localStorage.getItem("currentUser");
  const user = userRaw ? JSON.parse(userRaw) : null;

  const role = user?.role;

  if (!token) {
    message.warning("Vui lòng đăng nhập trước!");
    return <Navigate to="/login" replace />;
  }

  const allowedRoles = Array.isArray(requiredRoles)
    ? requiredRoles
    : requiredRole
    ? [requiredRole]
    : null;

  if (allowedRoles && (!role || !allowedRoles.includes(role))) {
    message.error("Bạn không có quyền truy cập trang này!");

    if (role === "ADMIN") return <Navigate to="/admin-dashboard" replace />;
    if (role === "SELLER") return <Navigate to="/seller-dashboard" replace />;

    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default PrivateRoute;