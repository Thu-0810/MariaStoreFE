import { Input, Button, Divider, ConfigProvider } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Mock data
const orderData = {
  orderCode: "#MAS708064212",
  fullName: "Meomeo",
  subtotal: "550,000đ",
  discount: "0đ",
  total: "550,000đ",
};

const CheckoutContainer = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/img/Illustration265.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="relative w-full max-w-md bg-white/70 backdrop-blur-md p-8 rounded-[2rem] shadow-xl border border-white/50">
          <h2 className="text-2xl font-bold text-[#1a3673] text-center mb-8">
            Thông tin đơn hàng
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-[#1a3673] font-medium mb-2">
                Mã đơn hàng
              </label>
              <Input
                value={orderData.orderCode}
                readOnly
                className="h-12 border-blue-100 rounded-lg text-gray-600 bg-white/50"
              />
            </div>

            <div>
              <label className="block text-[#1a3673] font-medium mb-2">
                Họ và tên
              </label>
              <Input
                value={orderData.fullName}
                className="h-12 border-blue-100 rounded-lg text-gray-600 bg-white/50"
              />
            </div>

            <div className="space-y-3 pt-4">
              <div className="flex justify-between text-[#1a3673]">
                <span>Tạm tính</span>
                <span className="font-semibold">{orderData.subtotal}</span>
              </div>

              <div className="flex justify-between text-[#1a3673]">
                <span>Giảm giá</span>
                <span className="font-semibold">{orderData.discount}</span>
              </div>

              <Divider className="my-4 border-blue-200" />

              <div className="flex justify-between text-[#1a3673] text-lg font-bold">
                <span>Tổng tiền</span>
                <span>{orderData.total}</span>
              </div>
            </div>

            <div className="pt-6 space-y-4">
              <button
                className="w-full h-14 bg-[#1a3673] hover:bg-[#142a5a] text-white text-lg font-bold rounded-xl"
                onClick={() => navigate("/payment")}>
                THANH TOÁN
              </button>

              <div className="text-center">
                <button
                  className="text-[#1a3673] text-sm font-medium hover:underline"
                  onClick={() => navigate("/cart")}>
                  Quay lại
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutContainer;