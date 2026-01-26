import { useEffect, useState } from "react";
import { Card, Rate, Spin, message } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { favoriteApi } from "../../../api/favoriteApi";
import { toServerUrl } from "../../../utils/url";

export default function ProfileFavoritesPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setItems([]);
      return;
    }

    const fetch = async () => {
      try {
        setLoading(true);
        const res = await favoriteApi.getMyFavorites();
        setItems(res.data || []);
      } catch (err) {
        const serverMsg = err?.response?.data?.message;
        message.error(
          serverMsg || t("profile.msg_load_favorites_failed") || "Tải yêu thích thất bại"
        );
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [t]);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Spin />
      </div>
    );
  }

  if (!items.length) {
    return (
      <p className="text-[#6b7280] text-lg">{t("profile.empty_favorites")}</p>
    );
  }

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN").format(Number(price || 0)) + "đ";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((p) => {
        const avg = Number(p.ratingAvg || 0);
        const count = Number(p.ratingCount || 0);

        return (
          <Card
            key={p.productId}
            hoverable
            onClick={() => navigate(`/detail/${p.productId}`)}
            bodyStyle={{ padding: 12 }}
          >
            <div className="flex gap-3">
              <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                {p.primaryImageUrl ? (
                  <img
                    src={toServerUrl(p.primaryImageUrl)}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>

              <div className="flex-1">
                <div className="font-semibold text-[#133e87] line-clamp-2">
                  {p.name}
                </div>

                <div className="text-sm font-bold text-[#133e87] mt-1">
                  {formatPrice(p.price)}
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <Rate allowHalf disabled value={avg} />
                  <span className="text-xs text-[#133e87]">({count})</span>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}