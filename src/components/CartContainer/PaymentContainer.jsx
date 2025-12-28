import { Card } from "antd";
import { useNavigate } from "react-router-dom";

const PaymentMethodCard = ({ title, src, altText, onClick }) => {
  return (
    <div onClick={onClick} className="group cursor-pointer flex justify-center">
      <div
        className="
            p-4 rounded-2xl transition-all duration-300
            bg-white border border-blue-100
            hover:border-blue-400
            hover:shadow-[0_0_25px_rgba(59,130,246,0.35)]
          ">
        <Card
          bordered={false}
          style={{ boxShadow: "none" }}
          className="w-48 h-48 flex flex-col items-center justify-center"
          styles={{
            body: {
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            },
          }}>
          <h3 className="text-[#1a3b70] font-semibold text-base mb-4 text-center">
            {title}
          </h3>

          <div className="w-20 h-20 flex items-center justify-center p-2">
            <img
              src={src}
              alt={altText}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

function PaymentContainer() {
  const navigate = useNavigate();
  const methods = [
    {
      title: "Paypal",
      src: "src/assets/payment/paypal.png",
      altText: "Paypal logo",
      type: "paypal",
    },
    {
      title: "VNPay",
      src: "src/assets/payment/vnpay.jpg",
      altText: "VNPay logo",
      type: "vnpay",
    },
    {
      title: "Tài khoản ngân hàng",
      src: "src/assets/payment/qrcode.jpg",
      altText: "QR Code",
      type: "bank",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/img/Illustration265.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />

      <div className="relative z-10 min-h-screen flex items-start justify-center pt-24 px-4">
        <div className="w-full max-w-4xl">
          <div className="bg-[#1a3b70] text-white text-center py-3 rounded-xl shadow-md mb-10">
            <h1 className="text-base font-medium tracking-wide">
              Chọn phương thức thanh toán
            </h1>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl px-10 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {methods.map((method, index) => (
                <PaymentMethodCard
                  key={index}
                  {...method}
                  onClick={() => {
                    if (method.type === "bank") {
                      navigate("/payment/qr");
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentContainer;