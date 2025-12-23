import { Navigate } from "react-router-dom";
import { message } from "antd";

function PrivateRoute({ children, requiredRole }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Nếu chưa đăng nhập → chuyển về trang login
  if (!currentUser) {
    message.warning("Vui lòng đăng nhập trước!");
    return <Navigate to="/login" replace />;
  }

  // Nếu route yêu cầu role cụ thể và không khớp → chặn truy cập
  if (requiredRole && currentUser.role !== requiredRole) {
    message.error("Bạn không có quyền truy cập trang này!");

    if (currentUser.role === "ADMIN") {
      return <Navigate to="/admin-dashboard" replace />;
    } else if (currentUser.role === "SELLER") {
      return <Navigate to="/seller-dashboard" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
}

export default PrivateRoute;