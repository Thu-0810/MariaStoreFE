import { Navigate } from "react-router-dom";
import { message } from "antd";

function PrivateRoute({ children, requiredRole }) {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

  if (!token) {
    setTimeout(() => {
      message.warning("Vui lòng đăng nhập trước!");
    }, 0);

    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    setTimeout(() => {
      message.error("Bạn không có quyền truy cập trang này!");
    }, 0);

    if (role === "ADMIN") {
      return <Navigate to="/admin-dashboard" replace />;
    } else if (role === "SELLER") {
      return <Navigate to="/seller-dashboard" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
}

export default PrivateRoute;