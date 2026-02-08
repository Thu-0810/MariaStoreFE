import { DownOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Card, Dropdown, message, Pagination, Rate, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { getProductsPagedApi } from "../../api/productApi";
import { getCategoriesApi } from "../../api/categoryApi";
import { toServerUrl } from "../../utils/url";
import { cartApi } from "../../api/cartApi";
import { useTranslation } from "react-i18next";

function StoreContainer() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [addingId, setAddingId] = useState(null);

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(false);

  const [catLoading, setCatLoading] = useState(false);

  const sortMenuItems = useMemo(
    () => [
      { key: "newest", label: t("store.sort.newest") },
      { key: "oldest", label: t("store.sort.oldest") },
      { key: "a-z", label: t("store.sort.a_z") },
      { key: "z-a", label: t("store.sort.z_a") },
    ],
    [t]
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCatLoading(true);
        const res = await getCategoriesApi();
        setCategories(res.data || []);
      } catch (err) {
        console.error("Fetch categories failed", err);
        message.error(t("store.msg.load_categories_failed"));
      } finally {
        setCatLoading(false);
      }
    };

    fetchCategories();
  }, [t]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await getProductsPagedApi({
          page: page - 1,
          size: pageSize,
          sort,
          category: selectedCategory,
        });

        setProducts(res.data.content || []);
        setTotal(res.data.totalElements || 0);
      } catch (err) {
        console.error("Fetch products failed", err);
        message.error(t("store.msg.load_products_failed"));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, sort, selectedCategory, pageSize, t]);

  const formatPrice = (price) => {
    const locale = i18n.language === "en" ? "en-US" : "vi-VN";
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "VND",
    }).format(Number(price || 0));
  };

  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        message.warning(t("productDetail.msg_need_login"));
        navigate("/login");
        return;
      }

      setAddingId(productId);
      await cartApi.addToCart(productId, 1);
      message.success(t("store.msg.add_success"));
      window.dispatchEvent(new Event("cart:changed"));
    } catch (err) {
      const msg = err?.response?.data?.message || t("store.msg.add_failed");
      message.error(msg);
    } finally {
      setAddingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      <section className="relative h-[420px] sm:h-[520px] lg:h-[620px] bg-gradient-to-r from-[#d9eafd] to-[#cbdceb] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="src/assets/img/Illustration251.jpg"
            alt={t("store.hero_alt")}
            className="w-full h-full object-cover"
          />
        </div>

        {/* CATEGORY OVERLAY (DYNAMIC) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full px-2">
          <div className="flex gap-4 overflow-x-auto no-scrollbar justify-center">
            {catLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-48 h-28 rounded-2xl bg-black/10 animate-pulse flex-shrink-0"
                    aria-label={t("common.loading")}
                  />
                ))
              : categories.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.name);
                      setPage(1);
                    }}
                    className="
                      group relative w-48 h-28 rounded-2xl overflow-hidden shadow-sm
                      hover:shadow-2xl transition-all duration-300 flex-shrink-0
                      cursor-pointer hover:-translate-y-1
                    "
                    role="button"
                    tabIndex={0}
                    title={t("store.category_filter_title", { category: cat.name })}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setSelectedCategory(cat.name);
                        setPage(1);
                      }
                    }}
                  >
                    <img
                      src={
                        cat.thumbnailUrl
                          ? toServerUrl(cat.thumbnailUrl)
                          : "/placeholder.svg"
                      }
                      alt={cat.name || t("store.category_alt")}
                      className="
                        w-full h-full object-cover
                        transition-transform duration-500
                        group-hover:scale-110
                      "
                    />

                    <div
                      className={`
                        absolute inset-0 transition-opacity duration-300
                        ${
                          selectedCategory === cat.name
                            ? "bg-black/0"
                            : "bg-black/30 group-hover:bg-black/0"
                        }
                      `}
                    />

                    <div className="absolute bottom-0 left-0 w-full p-3 z-10">
                      <h3 className="font-semibold text-white text-left">
                        {cat.name}
                      </h3>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-36 py-6">
        {/* SORT */}
        <div className="flex justify-end mb-6">
          <span className="text-[#133e87] font-semibold">
            {t("store.sort_by")}&nbsp;
          </span>

          <Dropdown
            menu={{
              items: sortMenuItems,
              onClick: ({ key }) => {
                setSort(key);
                setPage(1);
              },
            }}
          >
            <span className="cursor-pointer text-[#133e87] font-semibold flex items-center gap-1 hover:text-[#608bc1]">
              {sortMenuItems.find((i) => i.key === sort)?.label}
              <DownOutlined className="text-[#608bc1]" />
            </span>
          </Dropdown>

          {selectedCategory && (
            <span
              onClick={() => {
                setSelectedCategory(null);
                setPage(1);
              }}
              className="ml-4 cursor-pointer text-sm text-[#608bc1] hover:underline"
              title={t("store.clear_filter")}
            >
              {t("store.clear_filter")}
            </span>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Spin size="large" />
          </div>
        ) : products.length === 0 ? (
          <div className="flex justify-center py-20 text-[#133e87]">
            {t("store.misc.no_products")}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {products.map((product) => {
              const avg = Number(
                product.ratingAvg ?? product?.rating?.averageRating ?? 0
              );
              const count = Number(
                product.ratingCount ?? product?.rating?.totalReviews ?? 0
              );

              return (
                <div
                  key={product.id}
                  className="transition-transform duration-200 hover:-translate-y-1"
                >
                  <Card
                    bodyStyle={{ padding: "8px" }}
                    cover={
                      <div className="relative overflow-hidden aspect-[4/5] bg-gray-100">
                        {product.primaryImageUrl ? (
                          <img
                            src={toServerUrl(product.primaryImageUrl)}
                            alt={product.name || t("store.product_alt")}
                            className="w-full h-full object-cover object-top"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
                            {t("store.misc.no_image")}
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product.id);
                          }}
                          disabled={addingId === product.id}
                          title={t("store.add_to_cart")}
                          className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-gray-300 hover:bg-gray-400 flex items-center justify-center disabled:opacity-60 transition-colors"
                        >
                          <ShoppingCartOutlined className="text-white" />
                        </button>
                      </div>
                    }
                    onClick={() => navigate(`/detail/${product.id}`)}
                  >
                    <h4 className="text-sm font-medium text-[#133e87] line-clamp-2">
                      {product.name}
                    </h4>

                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm font-bold text-[#133e87]">
                        {formatPrice(product.price)}
                      </span>

                      <div className="flex items-center gap-2">
                        <Rate
                          allowHalf
                          disabled
                          value={avg}
                          style={{ fontSize: 14 }}
                        />
                        <span className="text-xs text-[#133e87]">
                          ({count})
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex justify-center mt-10">
          <Pagination
            current={page}
            pageSize={pageSize}
            total={total}
            onChange={(p) => setPage(p)}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
}

export default StoreContainer;