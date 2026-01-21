import { Input, Divider, message, Spin } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cartApi } from "../../api/cartApi";
import { checkoutApi } from "../../api/orderCheckoutApi";
import { getCurrentUserApi } from "../../api/authApi";

const CheckoutContainer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchAll = async () => {
      try {
        setLoading(true);

        const [cartRes, userRes] = await Promise.allSettled([
          cartApi.getCart(),
          getCurrentUserApi(),
        ]);

        if (cartRes.status === "fulfilled") {
          setCartItems(cartRes.value.data?.items || []);
        } else {
          setCartItems([]);
          message.error(t("checkout.msg_cart_load_failed"));
        }

        if (userRes.status === "fulfilled") {
          const u = userRes.value.data;

          const fullName = u?.fullName || u?.name || u?.username || "";
          const phone = u?.phone || u?.phoneNumber || "";
          const address = u?.address || u?.shippingAddress || "";

          setReceiverName((prev) => (prev ? prev : fullName));
          setReceiverPhone((prev) => (prev ? prev : phone));
          setShippingAddress((prev) => (prev ? prev : address));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [t]);

  const total = useMemo(() => {
    return cartItems.reduce((sum, it) => {
      const price = Number(it.price || 0);
      const qty = Number(it.quantity || 0);
      return sum + price * qty;
    }, 0);
  }, [cartItems]);

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      message.warning(t("checkout.msg_cart_empty"));
      return;
    }
    if (
      !receiverName.trim() ||
      !receiverPhone.trim() ||
      !shippingAddress.trim()
    ) {
      message.warning(t("checkout.msg_missing_info"));
      return;
    }

    try {
      setSubmitting(true);
      const res = await checkoutApi.createOrderFromCart({
        receiverName,
        receiverPhone,
        shippingAddress,
        paymentMethod: "BANK",
      });

      const orderId = res.data?.orderId;
      if (!orderId) throw new Error("Missing orderId");

      navigate("/payment", { state: { orderId } });
    } catch (e) {
      message.error(t("checkout.msg_checkout_failed"));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin />
      </div>
    );
  }

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
            {t("checkout.title")}
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-[#1a3673] font-medium mb-2">
                {t("checkout.receiver_name")}
              </label>
              <Input
                value={receiverName}
                onChange={(e) => setReceiverName(e.target.value)}
                className="h-12 border-blue-100 rounded-lg text-gray-600 bg-white/50"
              />
            </div>

            <div>
              <label className="block text-[#1a3673] font-medium mb-2">
                {t("checkout.receiver_phone")}
              </label>
              <Input
                value={receiverPhone}
                onChange={(e) => setReceiverPhone(e.target.value)}
                className="h-12 border-blue-100 rounded-lg text-gray-600 bg-white/50"
              />
            </div>

            <div>
              <label className="block text-[#1a3673] font-medium mb-2">
                {t("checkout.shipping_address")}
              </label>
              <Input
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="h-12 border-blue-100 rounded-lg text-gray-600 bg-white/50"
              />
            </div>

            <div className="space-y-3 pt-4">
              <div className="flex justify-between text-[#1a3673]">
                <span>{t("checkout.subtotal")}</span>
                <span className="font-semibold">{total.toLocaleString()}đ</span>
              </div>

              <div className="flex justify-between text-[#1a3673]">
                <span>{t("checkout.discount")}</span>
                <span className="font-semibold">0đ</span>
              </div>

              <Divider className="my-4 border-blue-200" />

              <div className="flex justify-between text-[#1a3673] text-lg font-bold">
                <span>{t("checkout.total")}</span>
                <span>{total.toLocaleString()}đ</span>
              </div>
            </div>

            <div className="pt-6 space-y-4">
              <button
                disabled={submitting}
                className="w-full h-14 bg-[#1a3673] hover:bg-[#142a5a] disabled:opacity-60 text-white text-lg font-bold rounded-xl"
                onClick={handleCheckout}>
                {t("checkout.pay")}
              </button>

              <div className="text-center">
                <button
                  className="text-[#1a3673] text-sm font-medium hover:underline"
                  onClick={() => navigate("/cart")}>
                  {t("checkout.back")}
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