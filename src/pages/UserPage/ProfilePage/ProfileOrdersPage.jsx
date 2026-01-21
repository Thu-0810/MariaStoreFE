// ProfileOrdersPage.jsx
import { useEffect, useState } from "react";
import { Button, Spin, message, Tag, Pagination } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { getMyOrdersApi, downloadMyOrderItemApi } from "../../../api/orderApi";
import { toServerUrl } from "../../../utils/url";

export default function ProfileOrdersPage() {
  const { t, i18n } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [sortMode, setSortMode] = useState("new");

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const sort = sortMode === "new" ? "createdAt,desc" : "createdAt,asc";

      const res = await getMyOrdersApi({
        page: page - 1,
        size: pageSize,
        sort,
      });

      const data = res.data;
      setOrders(data?.content || []);
      setTotal(data?.totalElements || 0);
    } catch (e) {
      message.error(
        t("profile.order.orders_load_failed") || "Load orders failed"
      );
      setOrders([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sortMode, i18n.language]);

  const formatMoney = (v) => {
    const locale = i18n.language === "vi" ? "vi-VN" : "en-US";
    return new Intl.NumberFormat(locale).format(Number(v || 0)) + "đ";
  };

  const downloadItem = async (orderId, item) => {
    try {
      const res = await downloadMyOrderItemApi(orderId, item.itemId);

      const disposition = res.headers?.["content-disposition"] || "";
      const match = disposition.match(/filename="(.+?)"/);
      const filename = match?.[1] || item.downloadName || "download";

      const blob = new Blob([res.data], {
        type: res.headers?.["content-type"] || "application/octet-stream",
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      message.error(t("profile.order.download_failed") || "Download failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <Spin />
      </div>
    );
  }

  if (!orders.length) {
    return (
      <p className="text-[#6b7280] text-lg">
        {t("profile.order.empty_orders") || "Your orders will appear here"}
      </p>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="inline-flex rounded-full bg-[#D9EAFE] p-1">
          <button
            onClick={() => {
              setPage(1);
              setSortMode("new");
            }}
            className={[
              "px-4 py-1.5 rounded-full text-sm font-medium transition",
              sortMode === "new"
                ? "bg-[#133e87] text-white"
                : "text-[#133e87] hover:bg-white/70",
            ].join(" ")}>
            {t("profile.order.sort_newest") || "Newest"}
          </button>

          <button
            onClick={() => {
              setPage(1);
              setSortMode("old");
            }}
            className={[
              "px-4 py-1.5 rounded-full text-sm font-medium transition",
              sortMode === "old"
                ? "bg-[#133e87] text-white"
                : "text-[#133e87] hover:bg-white/70",
            ].join(" ")}>
            {t("profile.order.sort_oldest") || "Oldest"}
          </button>
        </div>
      </div>

      {/* order cards */}
      {orders.map((o) => {
        const canDownloadOrder =
          o.status === "COMPLETED" && (o.paymentStatus || "") === "PAID";

        return (
          <div
            key={o.id}
            className="
              rounded-[28px] overflow-hidden
              border border-white/50
              shadow-[0_4px_10px_rgba(0,0,0,0.25)]
            "
            style={{
              background:
                "linear-gradient(90deg, #D9EAFE 0%, #EAF3F8 50%, #FFF6E9 100%)",
            }}>
            <div className="grid grid-cols-[1fr_240px]">
              <div className="px-8 pt-6 pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-bold text-[#133e87]">
                      {o.status === "COMPLETED"
                        ? t("profile.order.order_completed") ||
                          "Order completed"
                        : t("profile.order.order") || "Order"}
                    </div>

                    <div className="text-sm text-[#4b78c2] mt-1">
                      {dayjs(o.createdAt).format("DD.MM.YYYY")}
                      <span className="mx-2">•</span>
                      {t("profile.order.order_code") || "Order"}{" "}
                      <span className="font-semibold">{o.orderCode}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div />

              <div className="col-span-2 px-8">
                <div className="h-px bg-[rgba(19,62,135,0.12)]" />
              </div>

              {(o.items || []).map((it) => (
                <div key={it.itemId} className="contents">
                  <div className="px-8 py-5">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white/60 flex-shrink-0">
                        {it.thumbnailUrl ? (
                          <img
                            src={toServerUrl(it.thumbnailUrl)}
                            alt={it.productName}
                            className="w-full h-full object-cover"
                          />
                        ) : null}
                      </div>

                      <div className="min-w-0">
                        <div className="font-semibold text-[#133e87] truncate">
                          {it.productName}
                        </div>

                        <div className="text-sm text-[#6b8fc7] mt-1">
                          {it.fileFormat || "JPG File"}
                        </div>

                        <div className="text-sm text-[#6b8fc7] mt-0.5">
                          {formatMoney(it.unitPrice)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-5 flex items-center justify-center">
                    <Button
                      type="primary"
                      className="!bg-[#133e87] hover:!bg-[#123b7a] !rounded-full !px-8 !h-10 font-medium"
                      disabled={!canDownloadOrder}
                      onClick={() => downloadItem(o.id, it)}>
                      {t("profile.order.download") || "Download File"}
                    </Button>
                  </div>
                </div>
              ))}

              <div className="px-8 py-4">
                <div className="text-[#133e87] font-semibold">
                  {t("profile.order.order_total") || "Total"}:{" "}
                  <span className="font-bold">
                    {formatMoney(o.totalAmount)}
                  </span>
                </div>
              </div>

              <div />
            </div>
          </div>
        );
      })}

      <div className="flex justify-center pt-2">
        <Pagination
          current={page}
          total={total}
          pageSize={pageSize}
          onChange={(p) => setPage(p)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}