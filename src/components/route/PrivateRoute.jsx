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
    // Admin vào dashboard thì được phép, nhưng user vào admin thì không
    return currentUser.role === "ADMIN" ? (
      <Navigate to="/admin-dashboard" replace />
    ) : (
      <Navigate to="/dashboard" replace />
    );
  }

  return children;
}

export default PrivateRoute;