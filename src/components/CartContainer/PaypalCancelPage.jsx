import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export default function PaypalCancelPage() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("pendingPayPalOrderId");
    message.info("Bạn đã hủy thanh toán PayPal.");
    navigate("/payment", { replace: true });
  }, [navigate]);

  return null;
}