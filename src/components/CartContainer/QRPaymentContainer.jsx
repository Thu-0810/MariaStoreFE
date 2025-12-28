import { Card, QRCode } from "antd";
import { useNavigate } from "react-router-dom";

function QRPaymentContainer() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden z-0">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/img/Illustration265.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />

      <div className="relative z-10 min-h-screen flex items-start justify-center pt-24 px-4">
        <div className="w-full max-w-md">
          <Card
            bordered={false}
            className="rounded-2xl shadow-xl overflow-hidden"
            bodyStyle={{ padding: 0 }}>
            <div className="bg-[#1a3b70] text-white text-center py-3">
              <h2 className="text-sm font-medium tracking-wide">
                Xác nhận thanh toán
              </h2>
            </div>

            <div className="px-8 py-6 flex flex-col items-center bg-white/90">
              <p className="text-sm text-[#1a3b70] mb-5">Thông tin nhận hàng</p>

              <div className="bg-white p-4 rounded-xl border border-gray-200 mb-5">
                <QRCode
                  value="https://v0.dev"
                  size={200}
                  bordered={false}
                  errorLevel="H"
                />
              </div>

              <div className="w-full text-center text-sm text-[#1a3b70] space-y-2 mb-6">
                <div className="border-t border-b border-gray-200 py-2">
                  Mã đơn hàng: <b>#MAS708084212</b>
                </div>
                <div>
                  Số tiền thanh toán: <b className="text-[#1a3b70]">550,000đ</b>
                </div>
              </div>

              <button
                onClick={() => navigate("/payment/success")}
                className="w-[160px] h-10 bg-[#1a3b70] hover:bg-[#142a5a] text-white text-sm font-medium rounded-md transition">
                Xác nhận
              </button>

              <button
                onClick={() => navigate(-1)}
                className="mt-3 text-xs text-gray-400 hover:text-[#1a3b70]">
                Quay lại
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default QRPaymentContainer;