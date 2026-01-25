import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { capturePaypalApi, getOrderSummaryApi } from "../../api/paymentApi";

export default function PaypalReturnPage() {
  const navigate = useNavigate();
  const [loadingText, setLoadingText] = useState("Đang xác nhận thanh toán PayPal...");

  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    const run = async () => {
      const rawOrderId = localStorage.getItem("pendingPayPalOrderId");
      const orderId = rawOrderId ? Number(rawOrderId) : null;

      if (!orderId || Number.isNaN(orderId)) {
        message.error("Không tìm thấy orderId để capture.");
        navigate("/payment", { replace: true });
        return;
      }

      try {
        await capturePaypalApi(orderId);

        const sum = await getOrderSummaryApi(orderId);
        const paid = sum?.data?.payment?.paymentStatus === "PAID";

        localStorage.removeItem("pendingPayPalOrderId");

        setLoadingText(paid ? "Thanh toán thành công! Đang chuyển trang..." : "Đã capture, đang cập nhật...");
        setTimeout(() => navigate("/payment/success", { replace: true, state: { orderId } }), 700);
      } catch (e) {
        console.error(e);
        message.error("Capture PayPal thất bại. Vui lòng kiểm tra đơn hàng.");
        navigate("/my-profile/orders", { replace: true });
      }
    };

    void run();
  }, [navigate]);

  return (
    <div style={{ padding: 24 }}>
      <h2>PayPal Return</h2>
      <p>{loadingText}</p>
    </div>
  );
}