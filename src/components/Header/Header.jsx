import { useEffect, useState } from "react";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  GlobalOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function Header() {
  const [currentUser, setCurrentUser] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setOpenDropdown(false);
    navigate("/dashboard");
  };

  return (
    <header className="bg-[#d9eafd] relative">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/dashboard")}>
            <img
              src="src/assets/img/logo.png"
              alt="MariaStore Logo"
              className="w-15 h-15 object-cover rounded-full"
            />
            <span className="text-[#133e87] font-bold text-xl">MariaStore</span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="flex-1 pl-4 pr-12 py-2 bg-white border border-[#d1d1d1] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#133e87] focus:border-transparent"
              />
              <SearchOutlined className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#888888]" />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4 text-sm text-[#193a80] font-medium relative">
            <div className="flex items-center gap-1">
              <ShoppingCartOutlined />
              <span>Giỏ Hàng</span>
            </div>
            <div className="flex items-center gap-1">
              <GlobalOutlined />
              <span>Tiếng Việt</span>
            </div>

            {currentUser ? (
              <div className="relative">
                <button
                  className="flex items-center gap-2 bg-[#133e87] text-white px-4 py-2 rounded-full"
                  onClick={() => setOpenDropdown(!openDropdown)}>
                  <UserOutlined />
                  <span className="uppercase font-semibold">
                    {currentUser.name ||
                      `${currentUser.firstName || ""} ${
                        currentUser.lastName || ""
                      }`.trim() ||
                      currentUser.email}
                  </span>
                  <DownOutlined />
                </button>

                {openDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl overflow-hidden z-50">
                    <ul className="text-[#133e87] font-medium">
                      {currentUser.role === "ADMIN" ? (
                        <>
                          <li
                            className="px-4 py-2 text-red-600 hover:bg-[#fbeaea] cursor-pointer"
                            onClick={handleLogout}>
                            Đăng xuất
                          </li>
                        </>
                      ) : (
                        <>
                          <li
                            className="px-4 py-2 hover:bg-[#f0f4ff] cursor-pointer"
                            onClick={() => {
                              navigate("/my-profile");
                              setOpenDropdown(false);
                            }}>
                            Tài khoản
                          </li>
                          <li className="px-4 py-2 hover:bg-[#f0f4ff] cursor-pointer">
                            Yêu cầu
                          </li>
                          <li className="px-4 py-2 hover:bg-[#f0f4ff] cursor-pointer">
                            Đơn hàng
                          </li>
                          <li className="px-4 py-2 hover:bg-[#f0f4ff] cursor-pointer">
                            Sản phẩm đã lưu
                          </li>
                          <li className="px-4 py-2 hover:bg-[#f0f4ff] cursor-pointer">
                            Bài viết
                          </li>
                          <hr />
                          <li
                            className="px-4 py-2 text-red-600 hover:bg-[#fbeaea] cursor-pointer"
                            onClick={handleLogout}>
                            Đăng xuất
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => navigate("/register")}>
                  <UserOutlined />
                  <span>Đăng Ký</span>
                </div>
                <span
                  className="pl-4 border-l border-[#193a80] cursor-pointer"
                  onClick={() => navigate("/login")}>
                  Đăng Nhập
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;