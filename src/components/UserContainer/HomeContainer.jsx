import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getCategoriesApi } from "../../api/categoryApi";
import { toServerUrl } from "../../utils/url";
import { getProductDetailApi, getProductsPagedApi } from "../../api/productApi";

function HomeContainer() {
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  const [promoProducts, setPromoProducts] = useState([]);
  const [promoSecondDetail, setPromoSecondDetail] = useState(null);

  const [promoLoading, setPromoLoading] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const res = await getCategoriesApi();
        setCategories(res.data || []);
      } catch (err) {
        console.error("Fetch categories failed", err);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPromoProducts = async () => {
      try {
        setPromoLoading(true);

        const res = await getProductsPagedApi({
          page: 0,
          size: 2,
          sort: "newest",
          category: null,
        });

        const list = res?.data?.content || [];
        setPromoProducts(list);

        if (list[1]?.id) {
          const detailRes = await getProductDetailApi(list[1].id);
          setPromoSecondDetail(detailRes?.data || null);
        } else {
          setPromoSecondDetail(null);
        }
      } catch (err) {
        console.error("Fetch promo products failed", err);
      } finally {
        setPromoLoading(false);
      }
    };

    fetchPromoProducts();
  }, []);

  const formatVnd = (value) => {
    if (value == null) return "";
    const num = typeof value === "string" ? Number(value) : value;
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const formatDate = (iso) => {
    if (!iso) return "";
    const [y, m, d] = iso.slice(0, 10).split("-");
    return `${d}.${m}.${y}`;
  };

  const clampText = (text, max = 180) => {
    if (!text) return "";
    return text.length > max ? text.slice(0, max).trim() + "..." : text;
  };

  const heroProduct = promoProducts?.[0] || null;
  const secondProduct = promoSecondDetail || promoProducts?.[1] || null;

  const heroImg = heroProduct?.primaryImageUrl
    ? toServerUrl(heroProduct.primaryImageUrl)
    : "src/assets/img/Illustration309.jpg";

  const secondImg =
    (secondProduct?.images?.[0]?.imageUrl &&
      toServerUrl(secondProduct.images[0].imageUrl)) ||
    (secondProduct?.primaryImageUrl &&
      toServerUrl(secondProduct.primaryImageUrl)) ||
    "src/assets/img/Illustration287.jpg";

  const heroCategory =
    heroProduct?.categories && Array.isArray([...heroProduct.categories])
      ? [...heroProduct.categories][0]
      : heroProduct?.categories?.[0];

  const secondCategory =
    secondProduct?.categories && Array.isArray([...secondProduct.categories])
      ? [...secondProduct.categories][0]
      : secondProduct?.categories?.[0];

  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/95 via-purple-50/80 to-pink-50/70" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left */}
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-block border-b-4 border-[#163c87] pb-2 mb-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900">
                  {promoLoading ? "Đang tải..." : heroProduct?.name || "—"}
                </h1>
              </div>

              <p className="text-gray-400 text-sm sm:text-md">
                {promoLoading ? "" : formatDate(heroProduct?.createdAt)}
              </p>

              <div className="space-y-3 text-blue-900 leading-relaxed text-base sm:text-lg lg:text-xl">
                <p>
                  Loại sản phẩm:{" "}
                  <span className="font-semibold">
                    {promoLoading ? "—" : heroCategory || "—"}
                  </span>
                </p>
                <p>
                  Giá tiền:{" "}
                  <span className="font-bold">
                    {!promoLoading && heroProduct?.price != null
                      ? formatVnd(heroProduct.price)
                      : "—"}
                  </span>
                </p>
                <p>
                  {promoLoading
                    ? ""
                    : clampText(heroProduct?.description || "")}
                </p>
              </div>

              <button
                className="border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base lg:text-lg font-medium rounded-lg transition-colors disabled:opacity-60"
                disabled={promoLoading || !heroProduct?.id}
                onClick={() => {
                  if (!heroProduct?.id) return;
                  navigate(`/detail/${heroProduct.id}`);
                }}>
                {t("nav.more")} →
              </button>
            </div>

            {/* Right */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-56 h-56 sm:w-72 sm:h-72 lg:w-96 lg:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30">
                <img
                  src={heroImg}
                  alt={heroProduct?.name || "Artwork"}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Store Section */}
      <section className="relative py-12 sm:py-16 px-4 mt-12">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(src/assets/img/Illustration192.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/95 via-purple-50/80 to-pink-50/70" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center justify-center mb-10 sm:mb-12">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-blue-900"></div>
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mx-6 text-center">
              {t("nav.store")}
            </h2>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-blue-900"></div>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {categoriesLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-48 sm:h-56 lg:h-64 rounded-2xl bg-black/10 animate-pulse"
                  />
                ))
              : categories.slice(0, 6).map((cat) => (
                  <div
                    key={cat.id}
                    className="group relative h-48 sm:h-56 lg:h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
                    onClick={() =>
                      navigate(
                        `/store?category=${encodeURIComponent(cat.name)}`
                      )
                    }>
                    <img
                      src={
                        cat.thumbnailUrl
                          ? toServerUrl(cat.thumbnailUrl)
                          : "src/assets/img/Illustration309.jpg"
                      }
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt={cat.name}
                    />

                    <div className="absolute inset-0 bg-black/30 opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>

                    <div className="absolute bottom-0 left-0 w-full p-3 z-10">
                      <h3 className="font-semibold text-white text-left">
                        {cat.name}
                      </h3>
                    </div>
                  </div>
                ))}
          </div>

          <div className="text-center">
            <button
              className="border border-[#CCCCCC] bg-[#ffffff] text-[#133e87] hover:bg-[#133e87] hover:text-white px-6 py-2 text-sm sm:text-base transition-transform duration-200 hover:scale-105 active:scale-95"
              onClick={() => navigate("/store")}>
              {t("nav.more")} →
            </button>
          </div>
        </div>
      </section>

      {/* Birthday Section */}
      <section className="relative py-12 sm:py-16 bg-gradient-to-r from-[#d9eafd] to-[#f6f6f6] mt-12 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${secondImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/95 via-purple-50/80 to-pink-50/70" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 lg:gap-20">
            {/* Image */}
            <div className="w-full md:w-1/2 lg:w-80 flex-shrink-0">
              <img
                src={secondImg}
                alt={secondProduct?.name || "Artwork"}
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-block border-b-4 border-[#163c87] pb-2 mb-4">
                <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-blue-900">
                  {promoLoading ? "Đang tải..." : secondProduct?.name || "—"}
                </h1>
              </div>

              <p className="text-gray-400 text-sm sm:text-md mb-2">
                {promoLoading ? "" : formatDate(secondProduct?.createdAt)}
              </p>

              <h3 className="text-lg sm:text-xl lg:text-3xl font-bold text-blue-900 mb-2">
                {!promoLoading && secondCategory
                  ? `Danh mục: ${secondCategory}`
                  : ""}
              </h3>

              <p className="text-gray-400 text-xs sm:text-sm mb-4">
                {!promoLoading && secondProduct?.price != null
                  ? `Giá: ${formatVnd(secondProduct.price)}`
                  : ""}
              </p>

              <div className="space-y-2 mb-6 sm:mb-8">
                <p className="text-[#133e87] text-base sm:text-xl font-bold">
                  Loại Sản Phẩm: {!promoLoading ? secondCategory || "—" : "—"}
                </p>

                <p className="text-[#133e87] text-base sm:text-xl font-bold">
                  Kích Thước:{" "}
                  {!promoLoading ? secondProduct?.meta?.resolution || "—" : "—"}
                </p>
                <p className="text-[#133e87] text-base sm:text-xl font-bold">
                  Loại File:{" "}
                  {!promoLoading ? secondProduct?.meta?.fileFormat || "—" : "—"}
                </p>
              </div>

              <p className="text-blue-900 leading-relaxed mb-6">
                {promoLoading
                  ? ""
                  : clampText(secondProduct?.description || "", 220)}
              </p>

              <button
                className="border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-lg font-medium rounded-lg transition-colors disabled:opacity-60"
                disabled={promoLoading || !secondProduct?.id}
                onClick={() => {
                  const id = secondProduct?.id;
                  if (!id) return;
                  navigate(`/detail/${id}`);
                }}>
                {t("nav.more")} →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Commission Section */}
      <section className="py-12 sm:py-16 bg-[#f6f6f6]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#133e87] text-center mb-10 sm:mb-12">
            {t("nav.order_painting")}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                src: "src/assets/img/Illustration248.0.jpg",
                title: "Tranh do @_itsmeangge đặt hàng",
                description: "24.08.2023",
              },
              {
                src: "src/assets/img/Illustration251.1.jpg",
                title: "Tranh do @niklasjann đặt hàng",
                description: "04.10.2023",
              },
              {
                src: "src/assets/img/Illustration330.12.png",
                title: "Tranh do @MariaMari0nette đặt hàng",
                description: "29.08.2024",
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="relative mb-4">
                  <img
                    src={item.src || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-48 sm:h-72 lg:h-80 object-cover rounded-lg"
                  />
                </div>
                <p className="text-[#7a7a7a] text-xs sm:text-sm mb-2">
                  {item.description}
                </p>
                <h3 className="text-[#133e87] font-medium text-sm sm:text-base">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              className="border border-[#CCCCCC] text-[#133e87] hover:bg-[#133e87] hover:text-white px-6 py-2 text-sm sm:text-base transition-transform duration-200 hover:scale-105 active:scale-95"
              onClick={() => navigate("/order")}>
              {t("nav.go_order")} →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeContainer;