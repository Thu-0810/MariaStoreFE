import { Card, QRCode, message, Spin } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { paymentApi } from "../../api/orderCheckoutApi";

function QRPaymentContainer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const orderId = location.state?.orderId;

  const [loading, setLoading] = useState(true);
  const [qr, setQr] = useState(null);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!orderId) {
      navigate("/checkout");
      return;
    }

    const fetchQr = async () => {
      try {
        setLoading(true);
        const res = await paymentApi.getQr(orderId);
        setQr(res.data);
      } catch (e) {
        message.error(t("qrPayment.fetch_qr_failed"));
      } finally {
        setLoading(false);
      }
    };

    fetchQr();
  }, [orderId, navigate, t]);

  const confirm = async () => {
    if (!orderId) return;
    try {
      setConfirming(true);
      await paymentApi.confirmPaid(orderId);

      window.dispatchEvent(new Event("cart:changed"));

      navigate("/payment/success");
    } catch (e) {
      message.error(t("qrPayment.confirm_failed"));
    } finally {
      setConfirming(false);
    }
  };

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
                {t("qrPayment.title")}
              </h2>
            </div>

            <div className="px-8 py-6 flex flex-col items-center bg-white/90">
              <p className="text-sm text-[#1a3b70] mb-5">
                {t("qrPayment.shipping_info")}
              </p>

              {loading ? (
                <div className="py-10">
                  <Spin />
                </div>
              ) : (
                <>
                  <div className="bg-white p-4 rounded-xl border border-gray-200 mb-5">
                    <QRCode
                      value={qr?.qrValue || "EMPTY"}
                      size={200}
                      bordered={false}
                      errorLevel="H"
                    />
                  </div>

                  <div className="w-full text-center text-sm text-[#1a3b70] space-y-2 mb-6">
                    <div className="border-t border-b border-gray-200 py-2">
                      {t("qrPayment.order_code")}:{" "}
                      <b>{qr?.orderCode || "..."}</b>
                    </div>

                    <div>
                      {t("qrPayment.amount")}:{" "}
                      <b className="text-[#1a3b70]">
                        {Number(qr?.amount || 0).toLocaleString()}
                        {t("qrPayment.currency")}
                      </b>
                    </div>

                    <div className="text-xs text-gray-500">
                      {t("qrPayment.transaction_id")}:{" "}
                      <b>{qr?.transactionId || "..."}</b>
                    </div>
                  </div>

                  <button
                    disabled={confirming}
                    onClick={confirm}
                    className="w-[160px] h-10 bg-[#1a3b70] hover:bg-[#142a5a] disabled:opacity-60 text-white text-sm font-medium rounded-md transition">
                    {t("qrPayment.confirm_btn")}
                  </button>
                </>
              )}

              <button
                onClick={() => navigate(-1)}
                className="mt-3 text-xs text-gray-400 hover:text-[#1a3b70]">
                {t("qrPayment.back_btn")}
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default QRPaymentContainer;