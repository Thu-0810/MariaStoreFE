import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Rate, Progress, Spin, message, Input } from "antd";
import {
  HeartOutlined,
  MessageOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import QuantityControl from "../QuantityControl";
import { getProductDetailApi } from "../../api/productApi";
import bgImage from "../../assets/img/Illustration299.jpg";
import { useTranslation } from "react-i18next";
import { toServerUrl } from "../../utils/url";
import { cartApi } from "../../api/cartApi";
import { favoriteApi } from "../../api/favoriteApi";
import { reviewApi } from "../../api/reviewApi";
import { chatApi } from "../../api/chatApi";
import { openChatWithConversation } from "../Chat/chatEvents";

const fallbackImage = "src/assets/img/Illustration309.jpg";

function DetailContainer() {
  const { id } = useParams();
  const productId = Number(id);

  const { t, i18n } = useTranslation();
  const locale = i18n.language === "en" ? "en-US" : "vi-VN";

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const [adding, setAdding] = useState(false);

  const [ratingSummary, setRatingSummary] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favLoading, setFavLoading] = useState(false);

  const [myRating, setMyRating] = useState(0);
  const [myComment, setMyComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [deletingReview, setDeletingReview] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await getProductDetailApi(productId);
        const data = res.data;

        const primary =
          data.images?.find((x) => x.isPrimary)?.imageUrl ||
          data.images?.[0]?.imageUrl;

        setProduct({
          ...data,
          primaryImage: primary ? toServerUrl(primary) : null,
          imageUrls: (data.images || []).map((x) => toServerUrl(x.imageUrl)),
        });
      } catch (err) {
        console.error(t("productDetail.log_fetch_failed"), err);
        message.error(t("productDetail.msg_load_failed"));
      } finally {
        setLoading(false);
      }
    };

    if (!Number.isFinite(productId)) return;
    fetchDetail();
  }, [productId, t]);

  useEffect(() => {
    if (!Number.isFinite(productId)) return;

    reviewApi
      .getSummary(productId)
      .then((res) => setRatingSummary(res.data))
      .catch(() => setRatingSummary(null));

    const token = localStorage.getItem("accessToken");

    if (!token) {
      setIsFavorited(false);
      setMyRating(0);
      setMyComment("");
      return;
    }

    favoriteApi
      .getMyFavorites()
      .then((res) => {
        const liked = (res.data || []).some(
          (x) => Number(x.productId) === productId
        );
        setIsFavorited(liked);
      })
      .catch(() => {});

    reviewApi
      .getMyReview(productId)
      .then((res) => {
        if (!res?.data) return;
        setMyRating(Number(res.data.rating || 0));
        setMyComment(res.data.comment || "");
      })
      .catch(() => {});
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        message.warning(t("productDetail.msg_need_login"));
        navigate("/login");
        return;
      }

      setAdding(true);
      await cartApi.addToCart(productId, quantity);
      message.success(t("productDetail.msg_add_success"));
      window.dispatchEvent(new Event("cart:changed"));
    } catch (err) {
      const serverMsg = err?.response?.data?.message;
      message.error(serverMsg || t("productDetail.msg_add_failed"));
    } finally {
      setAdding(false);
    }
  };

  const handleToggleFavorite = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      message.warning(t("productDetail.msg_need_login"));
      navigate("/login");
      return;
    }

    try {
      setFavLoading(true);
      if (isFavorited) {
        await favoriteApi.unlike(productId);
        setIsFavorited(false);
        message.success(t("productDetail.msg_unliked"));
      } else {
        await favoriteApi.like(productId);
        setIsFavorited(true);
        message.success(t("productDetail.msg_liked"));
      }
    } catch (err) {
      const serverMsg = err?.response?.data?.message;
      message.error(serverMsg || t("common.action_failed"));
    } finally {
      setFavLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      message.warning(t("productDetail.msg_need_login"));
      navigate("/login");
      return;
    }

    if (!myRating || myRating < 1 || myRating > 5) {
      message.warning(t("productDetail.msg_choose_star"));
      return;
    }

    try {
      setSubmittingReview(true);

      await reviewApi.create(productId, {
        rating: myRating,
        comment: myComment,
      });

      message.success(t("productDetail.msg_review_success"));

      const sumRes = await reviewApi.getSummary(productId);
      setRatingSummary(sumRes.data);
    } catch (err) {
      const serverMsg = err?.response?.data?.message;
      message.error(serverMsg || t("productDetail.msg_review_failed"));
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleDeleteReview = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      message.warning(t("productDetail.msg_need_login"));
      navigate("/login");
      return;
    }

    try {
      setDeletingReview(true);

      await reviewApi.remove(productId);

      message.success(t("productDetail.msg_review_deleted"));

      setMyRating(0);
      setMyComment("");

      const sumRes = await reviewApi.getSummary(productId);
      setRatingSummary(sumRes.data);
    } catch (err) {
      const serverMsg = err?.response?.data?.message;
      message.error(serverMsg || t("productDetail.msg_review_delete_failed"));
    } finally {
      setDeletingReview(false);
    }
  };

  const handleChatSeller = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      message.warning(t("productDetail.msg_need_login"));
      navigate("/login");
      return;
    }

    try {
      const conv = await chatApi.getOrCreateDirect(4);
      openChatWithConversation(conv.id);
    } catch (err) {
      console.error(err);
      message.error(t("productDetail.msg_chat_failed"));
    }
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "VND",
    }).format(Number(price || 0));

  const STATUS_UI = {
    ACTIVE: {
      label: t("productDetail.status_active"),
      className: "bg-green-100 text-green-700",
    },
    OUT_OF_STOCK: {
      label: t("productDetail.status_out_of_stock"),
      className: "bg-red-100 text-red-700",
    },
    DISPLAY: {
      label: t("productDetail.status_display"),
      className: "bg-blue-100 text-blue-700",
    },
    LOCKED: {
      label: t("productDetail.status_locked"),
      className: "bg-gray-200 text-gray-700",
    },
  };

  const slideInFromBottom = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  if (loading || !product) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  const statusKey = (product?.status || "").toUpperCase();
  const statusUi = STATUS_UI[statusKey] || {
    label: product?.status || t("productDetail.updating"),
    className: "bg-gray-100 text-gray-700",
  };

  const rating = ratingSummary || product?.rating || {};
  const avg = Number(rating.averageRating ?? 0);
  const total = Number(rating.totalReviews ?? 0);

  const starCounts = {
    5: Number(rating.fiveStar ?? 0),
    4: Number(rating.fourStar ?? 0),
    3: Number(rating.threeStar ?? 0),
    2: Number(rating.twoStar ?? 0),
    1: Number(rating.oneStar ?? 0),
  };

  const totalFromStars =
    starCounts[5] +
    starCounts[4] +
    starCounts[3] +
    starCounts[2] +
    starCounts[1];

  const safeTotal = total > 0 ? total : totalFromStars;

  const starPercents = [5, 4, 3, 2, 1].map((s) =>
    safeTotal > 0 ? Math.round((starCounts[s] / safeTotal) * 100) : 0
  );

  const positivePercent =
    safeTotal > 0
      ? Math.round(((starCounts[5] + starCounts[4]) / safeTotal) * 100)
      : 0;

  const isLoggedIn = !!localStorage.getItem("accessToken");

  const suggestedCategoryText =
    product.categories?.join(", ") || t("productDetail.updating");

  const sampleItems = [
    { src: "src/assets/img/Illustration248.0.jpg", handle: "@_itsmeangge", date: "24.08.2023" },
    { src: "src/assets/img/Illustration251.1.jpg", handle: "@niklasjann", date: "04.10.2023" },
    { src: "src/assets/img/Illustration330.12.png", handle: "@MariaMari0nette", date: "29.08.2024" },
  ];

  return (
    <div className="min-h-screen pb-20 relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      <div className="relative z-10 flex justify-center px-4 pt-16 pb-16">
        <div className="max-w-6xl w-full bg-white/80 rounded-2xl shadow-xl p-8 md:flex gap-8 items-start">
          {/* LEFT: IMAGE */}
          <div className="md:w-1/2 w-full mb-6 md:mb-0">
            <img
              src={product.primaryImage || fallbackImage}
              alt={product.name}
              className="w-full h-auto rounded-xl block"
              style={{ maxHeight: "80vh", objectFit: "contain" }}
              loading="lazy"
            />
          </div>

          {/* RIGHT: INFO */}
          <div className="md:w-1/2 w-full">
            <h2 className="text-4xl font-bold text-[#133e87] mb-2">
              {product.name}
            </h2>

            <p className="text-[#133e87]">
              <b>{t("productDetail.type")}: </b>
              {suggestedCategoryText}
            </p>

            <p className="text-[#133e87] mt-4">
              <b>{t("productDetail.description")}:</b> {product.description}
            </p>

            <h3 className="text-xl font-semibold text-[#133e87] mt-6 mb-4">
              {t("productDetail.price")}: {formatPrice(product.price)}
            </h3>

            <div className="flex items-center space-x-4 mb-6">
              <span className="font-semibold text-[#133e87]">
                {t("productDetail.quantity")}
              </span>
              <QuantityControl
                value={quantity}
                min={1}
                onDecrease={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                onIncrease={() => setQuantity((prev) => prev + 1)}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <button
                type="button"
                disabled={adding}
                onClick={handleAddToCart}
                className="shrink-0 whitespace-nowrap flex items-center gap-2 border border-[#cbdeed] bg-[#eaf7ff] text-[#133e87] hover:text-white px-4 py-2 rounded-md font-medium hover:bg-[#133e87] transition disabled:opacity-60">
                <ShoppingCartOutlined className="text-lg" />
                {t("productDetail.add_to_cart")}
              </button>

              <button
                type="button"
                onClick={handleChatSeller}
                className="shrink-0 whitespace-nowrap flex items-center gap-2 border border-[#cbdeed] bg-white text-[#133e87] px-4 py-2 rounded-md font-medium hover:bg-[#eaf7ff] transition">
                <MessageOutlined className="text-lg" />
                {t("productDetail.chat_with_seller")}
              </button>

              <button
                type="button"
                disabled={favLoading}
                onClick={handleToggleFavorite}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition border shrink-0
                  ${
                    isFavorited
                      ? "border-[#133e87] bg-[#133e87] text-white"
                      : "border-transparent text-[#133e87] hover:border-[#133e87]"
                  }
                  ${favLoading ? "opacity-60" : ""}
                `}>
                <HeartOutlined className="text-lg" />
              </button>
            </div>

            <h4 className="text-lg font-semibold text-[#133e87] mb-3">
              {t("productDetail.detail_info")}
            </h4>
            <div className="space-y-1 text-sm text-[#133e87]">
              <div>
                {t("productDetail.art_type")}: {product.categories}
              </div>
              <div>
                {t("productDetail.file_format")}: {product.meta?.fileFormat}
              </div>
              <div>
                {t("productDetail.category")}: {suggestedCategoryText}
              </div>
              <div className="flex items-center gap-2">
                <span>{t("productDetail.status")}:</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${statusUi.className}`}>
                  {statusUi.label}
                </span>
              </div>
            </div>

            <h4 className="text-lg font-semibold text-[#133e87] mt-6 mb-3">
              {t("productDetail.rating")}
            </h4>

            <div className="flex items-center space-x-3 mb-4">
              <h2 className="text-2xl font-bold text-[#133e87] mb-0">
                {avg.toFixed(1)}
              </h2>

              <Rate disabled allowHalf value={avg} />

              <span className="text-sm text-[#133e87] ml-2">
                {positivePercent}% {t("productDetail.rating_suffix")} ({safeTotal})
              </span>
            </div>

            {[5, 4, 3, 2, 1].map((star, i) => (
              <div key={star} className="flex items-center space-x-2 text-xs mb-1">
                <span className="w-2">{star}</span>

                <Progress
                  percent={starPercents[i]}
                  size="small"
                  strokeColor="#ffd09b"
                  showInfo={false}
                  className="flex-1"
                />

                <span className="w-8 text-[#133e87] ml-2">
                  {starPercents[i]}%
                </span>
              </div>
            ))}

            <div className="mt-6 p-4 rounded-xl bg-white/70 border border-[#cbdeed]">
              <h4 className="text-base font-semibold text-[#133e87] mb-3">
                {t("productDetail.write_review")}
              </h4>

              {!isLoggedIn ? (
                <div className="text-sm text-[#133e87]">
                  {t("productDetail.review_login_required")}
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm text-[#133e87] font-medium">
                      {t("productDetail.your_rating")}:
                    </span>

                    <Rate
                      value={myRating}
                      onChange={(v) => setMyRating(v)}
                      allowClear
                    />

                    {myRating > 0 && (
                      <span className="text-sm text-[#133e87]">
                        {myRating}/5
                      </span>
                    )}
                  </div>

                  <Input.TextArea
                    value={myComment}
                    onChange={(e) => setMyComment(e.target.value)}
                    placeholder={t("productDetail.review_placeholder")}
                    rows={4}
                  />

                  <div className="flex flex-wrap gap-3 mt-3">
                    <button
                      type="button"
                      disabled={submittingReview || deletingReview}
                      onClick={handleSubmitReview}
                      className="shrink-0 whitespace-nowrap px-4 py-2 rounded-md bg-[#133e87] text-white font-medium hover:bg-[#173f5f] transition disabled:opacity-60">
                      {submittingReview
                        ? t("productDetail.submitting")
                        : t("productDetail.submit_review")}
                    </button>

                    <button
                      type="button"
                      disabled={submittingReview || deletingReview}
                      onClick={() => {
                        setMyRating(0);
                        setMyComment("");
                      }}
                      className="shrink-0 whitespace-nowrap px-4 py-2 rounded-md border border-[#133e87] text-[#133e87] font-medium hover:bg-[#eaf7ff] transition disabled:opacity-60">
                      {t("productDetail.clear")}
                    </button>

                    <button
                      type="button"
                      disabled={submittingReview || deletingReview}
                      onClick={handleDeleteReview}
                      className="shrink-0 whitespace-nowrap px-4 py-2 rounded-md border border-red-500 text-red-600 font-medium hover:bg-red-50 transition disabled:opacity-60">
                      {deletingReview
                        ? t("productDetail.deleting")
                        : t("productDetail.delete_review")}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <section className="py-12 sm:py-16 bg-[#f6f6f6]/80 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            className="text-xl sm:text-2xl font-bold text-[#133e87] text-center mb-10 sm:mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={slideInFromBottom}>
            {t("productDetail.order_painting")}
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}>
            {sampleItems.map((item, idx) => (
              <motion.div key={idx} className="text-center" variants={staggerItem}>
                <img
                  src={item.src}
                  alt={t("productDetail.sample.alt", { index: idx + 1 })}
                  className="w-full h-48 sm:h-72 lg:h-80 object-cover rounded-lg mb-3"
                />
                <p className="text-[#7a7a7a] text-xs sm:text-sm">{item.date}</p>
                <h3 className="text-[#133e87] font-medium text-sm sm:text-base">
                  {t("productDetail.sample.title", { handle: item.handle })}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default DetailContainer;