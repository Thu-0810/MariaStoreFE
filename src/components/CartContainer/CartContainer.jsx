import { useEffect, useMemo, useState } from "react";
import { Button, message, Spin } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import QuantityControl from "../QuantityControl";
import { useNavigate } from "react-router-dom";
import { cartApi } from "../../api/cartApi";
import { toServerUrl } from "../../utils/url";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const CartContainer = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await cartApi.getCart();
      setCartItems(res.data?.items || []);
    } catch (e) {
      message.error(t("cart.msg.fetch_failed"));
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const price = Number(item.price || 0);
      const qty = Number(item.quantity || 0);
      return sum + price * qty;
    }, 0);
  }, [cartItems]);

  const updateQuantity = async (productId, delta) => {
    const current = cartItems.find((x) => x.productId === productId);
    if (!current) return;

    const nextQty = Math.max(1, current.quantity + delta);

    setCartItems((prev) =>
      prev.map((it) =>
        it.productId === productId ? { ...it, quantity: nextQty } : it
      )
    );

    try {
      await cartApi.updateQuantity(productId, nextQty);
      window.dispatchEvent(new Event("cart:changed"));
    } catch (e) {
      message.error(t("cart.msg.qty_update_failed"));
      fetchCart();
    }
  };

  const removeItem = async (productId) => {
    setCartItems((prev) => prev.filter((it) => it.productId !== productId));

    try {
      await cartApi.removeItem(productId);
      window.dispatchEvent(new Event("cart:changed"));
    } catch (e) {
      message.error(t("cart.msg.remove_failed"));
      fetchCart();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin />
      </div>
    );
  }

  const leftSlide = {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0 },
  };

  const rightSlide = {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/img/Illustration265.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/70 via-purple-100/60 to-pink-100/60 backdrop-blur-[2px]" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {cartItems.length === 0 ? (
          <div className="flex justify-center items-start pt-24">
            <div className="w-full max-w-2xl">
              <div className="bg-[#133d87] text-white text-center py-3 rounded-t-xl font-semibold">
                {t("cart.title")}
              </div>

              <div className="bg-white/90 rounded-b-xl shadow-lg px-8 py-10 text-center">
                <p className="text-[#133d87] font-medium">{t("cart.empty")}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            <motion.div
              className="flex-grow"
              variants={leftSlide}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, ease: "easeOut" }}>
              <div className="grid grid-cols-12 bg-[#133d87] text-white rounded-xl px-6 py-4 font-semibold">
                <div className="col-span-5">{t("cart.table.product_info")}</div>
                <div className="col-span-2 text-center">
                  {t("cart.table.quantity")}
                </div>
                <div className="col-span-2 text-center">
                  {t("cart.table.unit_price")}
                </div>
                <div className="col-span-2 text-center">
                  {t("cart.table.subtotal")}
                </div>
                <div className="col-span-1"></div>
              </div>

              <div className="mt-6 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.productId}
                    className="grid grid-cols-12 items-center bg-white/95 rounded-2xl px-6 py-4 shadow-md hover:shadow-lg transition">
                    <div
                      className="col-span-5 flex items-center gap-4 cursor-pointer"
                      onClick={() => navigate(`/detail/${item.productId}`)}
                      title={t("cart.misc.view_detail")}>
                      {item.imageUrl ? (
                        <img
                          src={toServerUrl(item.imageUrl)}
                          alt={item.productName}
                          className="w-30 h-40 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="w-30 h-40 rounded-xl bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                          {t("cart.misc.no_image")}
                        </div>
                      )}

                      <div>
                        <div className="font-bold text-xl text-[#133e87] hover:underline">
                          {item.productName}
                        </div>
                        <div className="text-xs text-[#133e87]">
                          ID: {item.productId}
                        </div>
                      </div>
                    </div>

                    <div className="col-span-2 flex justify-center">
                      <QuantityControl
                        value={item.quantity}
                        min={1}
                        onDecrease={() => updateQuantity(item.productId, -1)}
                        onIncrease={() => updateQuantity(item.productId, 1)}
                      />
                    </div>

                    <div className="col-span-2 text-center font-medium text-[#133d87]">
                      {Number(item.price || 0).toLocaleString()}đ
                    </div>

                    <div className="col-span-2 text-center font-bold text-[#133d87]">
                      {(
                        Number(item.price || 0) * Number(item.quantity || 0)
                      ).toLocaleString()}
                      đ
                    </div>

                    <div className="col-span-1 text-center">
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => removeItem(item.productId)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="w-full lg:w-[300px]"
              variants={rightSlide}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}>
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center sticky top-24">
                <div className="text-[#133d87] font-bold">
                  {t("cart.total")}
                </div>

                <div className="text-3xl font-black text-[#133d87] my-4">
                  {totalPrice.toLocaleString()}đ
                </div>

                <Button
                  type="primary"
                  size="large"
                  block
                  className="!bg-[#133d87] hover:!bg-[#123b7a]"
                  onClick={() => navigate("/checkout")}>
                  {t("cart.checkout")}
                </Button>

                <div
                  className="text-xs text-[#133d87] mt-3 cursor-pointer hover:underline"
                  onClick={() => navigate("/store")}>
                  {t("cart.continue_shopping")}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartContainer;