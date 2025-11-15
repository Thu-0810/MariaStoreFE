import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

function Header() {
  return (
    <header className="bg-[#d9eafd] ">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#eae8df] rounded"></div>
            <span className="text-[#133e87] font-bold text-xl">MariaStore</span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="flex-1 pl-4 pr-12 py-2 bg-white border border-l-0 border-[#d1d1d1] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#133e87] focus:border-transparent"
              />
              <SearchOutlined className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#888888]" />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4 text-sm text-[#193a80] font-medium">
            <div className="flex items-center gap-1">
              <ShoppingCartOutlined />
              <span>Giỏ Hàng</span>
            </div>
            <div className="flex items-center gap-1">
              <GlobalOutlined />
              <span>Tiếng Việt</span>
            </div>
            <div className="flex items-center gap-1">
              <UserOutlined />
              <span>Đăng Ký</span>
            </div>
            <span className="pl-4 border-l border-[#193a80]">Đăng Nhập</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-t border-[#d1d1d1]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center py-3">
            <a
              href="#"
              className="text-[#133e87] font-medium px-4 border-l border-[#d1d1d1]">
              Trang Chủ
            </a>
            <a
              href="#"
              className="text-[#7a7a7a] hover:text-[#133e87] px-4 border-l border-[#d1d1d1]">
              Đặt Tranh
            </a>
            <a
              href="#"
              className="text-[#7a7a7a] hover:text-[#133e87] px-4 border-l border-[#d1d1d1]">
              Cửa Hàng
            </a>
            <a
              href="#"
              className="text-[#7a7a7a] hover:text-[#133e87] px-4 border-l border-[#d1d1d1]">
              Cộng Đồng
            </a>
            <a
              href="#"
              className="text-[#7a7a7a] hover:text-[#133e87] px-4 border-l border-r border-[#d1d1d1]">
              Liên Hệ
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;