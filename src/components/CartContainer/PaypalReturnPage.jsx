import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { message, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { capturePaypalApi } from "../../api/paymentApi";

export default function PaypalReturnPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  const [loadingText, setLoadingText] = useState(
    t("payment.paypal_return.verifying")
  );

  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    const run = async () => {
      const queryOrderId = searchParams.get("orderId");
      const rawOrderId =
        (queryOrderId && queryOrderId.trim()) ||
        localStorage.getItem("pendingPayPalOrderId");

      const orderId = rawOrderId ? Number(rawOrderId) : null;

      if (!orderId || Number.isNaN(orderId)) {
        message.error(t("payment.paypal_return.missing_order_id"));
        navigate("/my-profile/requests", { replace: true });
        return;
      }

      try {
        setLoadingText(t("payment.paypal_return.capturing"));
        await capturePaypalApi(orderId);

        localStorage.removeItem("pendingPayPalOrderId");

        message.success(t("payment.paypal_return.success_toast"));
        setLoadingText(t("payment.paypal_return.success_redirecting"));

        setTimeout(() => {
          navigate("/my-profile/requests", { replace: true });
        }, 500);
      } catch (e) {
        console.error(e);
        message.error(t("payment.paypal_return.capture_failed"));
        localStorage.removeItem("pendingPayPalOrderId");
        navigate("/my-profile/requests", { replace: true });
      }
    };

    void run();
  }, [navigate, searchParams, t]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white/80 backdrop-blur-md border border-[#cbdceb] rounded-2xl p-8 shadow-xl text-center">
        <Spin />
        <p className="mt-4 text-gray-700">{loadingText}</p>
      </div>
    </div>
  );
}