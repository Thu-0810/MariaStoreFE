import { MailOutlined, PhoneOutlined } from "@ant-design/icons";

function Footer() {
  return (
    <footer className="bg-[#ffecc8] py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-3 gap-8">
          {/* Logo Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#eae8df] rounded"></div>
              <span className="text-[#133e87] font-bold text-xl">
                MariaStore
              </span>
            </div>
            <p className="text-[#7a7a7a] text-sm mb-2">
              <MailOutlined /> mariastore@gmail.com
            </p>
            <p className="text-[#7a7a7a] text-sm">
              <PhoneOutlined /> 0983271063
            </p>
          </div>

          {/* Info Section */}
          <div>
            <h3 className="text-[#133e87] font-bold mb-4">GIỚI THIỆU</h3>
            <ul className="space-y-2 text-[#7a7a7a] text-sm">
              <li>Trang Chủ</li>
              <li>Đặt Hàng</li>
              <li>Cửa Hàng</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-[#133e87] font-bold mb-4">THÔNG TIN</h3>
            <ul className="space-y-2 text-[#7a7a7a] text-sm">
              <li>Blog</li>
              <li>Liên Hệ</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;