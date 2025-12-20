import { NavLink } from "react-router-dom";

function Navigation() {
  const linkBase = "px-4 border-l border-[#d1d1d1] font-medium";
  const active = "text-[#133e87]";
  const inactive = "text-[#7a7a7a] hover:text-[#133e87]";
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Kiểm tra role người dùng
  const role = currentUser?.role || "GUEST";

  return (
    <nav className="bg-white border-t border-[#d1d1d1]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center py-3">
          {role === "ADMIN" ? (
            <>
              <NavLink
                to="/admin-dashboard"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? active : inactive}`
                }>
                Trang Chủ
              </NavLink>

              <NavLink
                to="/admin-product"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? active : inactive}`
                }>
                Quản Lý Sản Phẩm
              </NavLink>

              <NavLink
                to="/admin-customer"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? active : inactive}`
                }>
                Quản Lý Khách Hàng
              </NavLink>

              <NavLink
                to="/admin-orders"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? active : inactive}`
                }>
                Quản Lý Đơn Hàng
              </NavLink>

              <NavLink
                to="/admin-posts"
                className={({ isActive }) =>
                  `${linkBase} border-r ${isActive ? active : inactive}`
                }>
                Quản Lý Bài Viết
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? active : inactive}`
                }>
                Trang Chủ
              </NavLink>

              <NavLink
                to="/order"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? active : inactive}`
                }>
                Đặt Tranh
              </NavLink>

              <NavLink
                to="/store"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? active : inactive}`
                }>
                Cửa Hàng
              </NavLink>

              <NavLink
                to="/community"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? active : inactive}`
                }>
                Cộng Đồng
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `${linkBase} border-r ${isActive ? active : inactive}`
                }>
                Liên Hệ
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;