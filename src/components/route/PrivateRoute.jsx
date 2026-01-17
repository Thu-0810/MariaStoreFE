import { Navigate } from "react-router-dom";
import { message } from "antd";

function PrivateRoute({ children, requiredRole }) {
  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const role = user?.role;

  if (!token) {
    message.warning("Vui lòng đăng nhập trước!");
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    message.error("Bạn không có quyền truy cập trang này!");

    if (role === "ADMIN") return <Navigate to="/admin-dashboard" replace />;
    if (role === "SELLER") return <Navigate to="/seller-dashboard" replace />;

    return <Navigate to="/dashboard" replace />;
  }

  return children;
}


export default PrivateRoute;