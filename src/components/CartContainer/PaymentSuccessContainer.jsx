import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import success from "../../assets/payment/success.png";

function PaymentSuccessContainer() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/my-profile");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative min-h-screen overflow-hidden z-0">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/img/Illustration265.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-10 text-center">
          <div className="flex justify-center mb-6">
            <img
              src={success}
              alt="Payment success"
              className="w-40 h-40 object-contain"
            />
          </div>

          <h2 className="text-2xl font-bold text-[#133e87] mb-2">
            Hoàn tất thanh toán
          </h2>

          <p className="text-[#133e87] text-base">
            Chuyển tiếp tới trang cá nhân
          </p>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccessContainer;