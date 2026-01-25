import { Card, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { initPaypalApi, initVnpayApi } from "../../api/paymentApi";

const PaymentMethodCard = ({ title, src, altText, onClick }) => {
  return (
    <div onClick={onClick} className="group cursor-pointer flex justify-center">
      <div className="p-4 rounded-2xl transition-all duration-300 bg-white border border-blue-100 hover:border-blue-400 hover:shadow-[0_0_25px_rgba(59,130,246,0.35)]">
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
  const location = useLocation();
  const { t } = useTranslation();

  const stateOrderId = location.state?.orderId;
  const storedOrderId = localStorage.getItem("pendingOrderId");
  const resolvedOrderId =
    stateOrderId ?? (storedOrderId ? Number(storedOrderId) : null);

  const methods = [
    {
      title: t("payment.methods.paypal"),
      src: "src/assets/payment/paypal.png",
      altText: t("payment.alt.paypal"),
      type: "paypal",
    },
    {
      title: t("payment.methods.vnpay"),
      src: "src/assets/payment/vnpay.jpg",
      altText: t("payment.alt.vnpay"),
      type: "vnpay",
    },
    {
      title: t("payment.methods.bank"),
      src: "src/assets/payment/qrcode.jpg",
      altText: t("payment.alt.bank"),
      type: "bank",
    },
  ];

  const handleChoose = async (type) => {
    if (!resolvedOrderId) {
      message.warning(t("payment.missing_order"));
      navigate("/checkout");
      return;
    }

    if (type === "bank") {
      navigate("/payment/qr", { state: { orderId: resolvedOrderId } });
      return;
    }

    try {
      if (type === "paypal") {
        const res = await initPaypalApi(resolvedOrderId);
        const approveUrl = res?.data?.approveUrl;
        if (!approveUrl) {
          message.error("Không lấy được approveUrl từ PayPal.");
          return;
        }
        localStorage.setItem("pendingPayPalOrderId", String(resolvedOrderId));
        window.location.href = approveUrl;
        return;
      }

      if (type === "vnpay") {
        const res = await initVnpayApi(resolvedOrderId);
        const paymentUrl = res?.data?.paymentUrl;
        if (!paymentUrl) {
          message.error("Không lấy được paymentUrl từ VNPay.");
          return;
        }
        window.location.href = paymentUrl;
        return;
      }

      message.info(t("payment.not_integrated"));
    } catch (err) {
      console.error(err);
      message.error("Gọi thanh toán thất bại.");
    }
  };

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
              {t("payment.choose_title")}
            </h1>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl px-10 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {methods.map((method) => (
                <PaymentMethodCard
                  key={method.type}
                  {...method}
                  onClick={() => handleChoose(method.type)}
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