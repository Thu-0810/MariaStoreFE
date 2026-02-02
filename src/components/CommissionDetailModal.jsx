import { Modal, Button, Tag, Image } from "antd";
import { EyeOutlined, DownloadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import PaintingOrderForm from "./common/PaintingForm";
import { useEffect, useState } from "react";
import { getCommissionDeliverablesApi } from "../api/commissionApi";
import { toServerUrl } from "../utils/url";

export default function CommissionDetailModal({
  open,
  request,
  onClose,
  onPay,
}) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === "en" ? "en-US" : "vi-VN";
  const money = (n) => (n || 0).toLocaleString(locale);

  const [loading, setLoading] = useState(false);

  const [deliverables, setDeliverables] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewSrc, setPreviewSrc] = useState(null);

  useEffect(() => {
    if (!open || !request?.id) return;

    getCommissionDeliverablesApi(request.id)
      .then((res) => setDeliverables(res.data || []))
      .catch(() => setDeliverables([]));
  }, [open, request?.id]);

  if (!request) return null;

  const RANGE_PRICE = {
    dau: 100000,
    "tu-nguc": 150000,
    "nua-nguoi": 200000,
    "tu-goi": 250000,
    "ca-nguoi": 300000,
  };

  const BG_PRICE = {
    "don-sac": 50000,
    "don-gian": 100000,
    "trung-binh": 150000,
    "chi-tiet": 200000,
  };

  const calculateTotalPrice = (form) => {
    return (form.characters || []).reduce((total, char) => {
      return (
        total +
        (RANGE_PRICE[char.range] || 0) +
        (BG_PRICE[char.background] || 0)
      );
    }, 0);
  };

  const buildFormsFromRequest = (req) => {
    const item0 = req.items?.[0];

    return [
      {
        orderInfo: req.title || "",
        orderDetail: req.description || "",
        twitterHandle: req.contactValue || "",
        useTwitter: req.contactMethod === "TWITTER",
        useEmail: req.contactMethod === "EMAIL",
        style: "",
        characters: [],
      },
      {
        style: item0?.style || "",
        characters:
          item0?.characters?.map((c) => ({
            id: c.characterIndex,
            range: c.poseScope,
            background: c.background || "don-gian",
          })) || [],
      },
    ];
  };

  const forms = buildFormsFromRequest(request);

  const downloadByBlob = async (url, filename) => {
    try {
      const res = await fetch(url, { method: "GET" });
      const blob = await res.blob();

      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = filename || "deliverable";
      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(objectUrl);
    } catch (e) {
      console.error(e);
      message.error(t("common.download_failed"));
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={1000}
      className="!rounded-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#133e87]">
          {request.title || t("profile.request_default_title")}
        </h2>

        <div className="flex items-center gap-3 mt-2">
          <Tag color={statusColor(request.status)}>
            {t(`commission.status.${request.status.toLowerCase()}`)}
          </Tag>
          <span className="text-sm text-gray-500">
            {new Date(request.createdAt).toLocaleDateString(locale)}
          </span>
        </div>
      </div>

      {forms.map((form, index) => (
        <div
          key={index}
          className="rounded-xl border border-[#cbdceb] bg-white/60 backdrop-blur-md p-6 mb-6">
          <PaintingOrderForm
            index={index}
            form={form}
            readonly
            RANGE_PRICE={RANGE_PRICE}
            BG_PRICE={BG_PRICE}
            calculateTotalPrice={calculateTotalPrice}
            money={money}
          />
        </div>
      ))}

      <div className="rounded-xl border border-[#cbdceb] bg-white/60 backdrop-blur-md p-6 mb-6">
        <h3 className="text-lg font-semibold text-[#133e87] mb-3">
          {t("commission.deliverables_title")}
        </h3>

        {deliverables.length === 0 ? (
          <p className="text-gray-500 text-sm">
            {t("commission.no_deliverables_yet")}
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {deliverables.map((d) => {
              const src = d?.fileUrl ? toServerUrl(d.fileUrl) : null;
              if (!src) return null;
              return (
                <div
                  key={d.id}
                  className="relative rounded-xl overflow-hidden border bg-white">
                  <img
                    src={src}
                    alt={d.originalName || "deliverable"}
                    className="w-full h-40 object-cover"
                  />

                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      type="button"
                      className="w-9 h-9 rounded-full bg-white/80 backdrop-blur border flex items-center justify-center"
                      onClick={() => {
                        setPreviewSrc(src);
                        setPreviewOpen(true);
                      }}
                      title={t("common.preview")}>
                      <EyeOutlined />
                    </button>

                    <button
                      type="button"
                      onClick={() => downloadByBlob(src, d.originalName)}
                      className="w-9 h-9 rounded-full bg-white/80 backdrop-blur border flex items-center justify-center"
                      title={t("common.download")}>
                      <DownloadOutlined />
                    </button>
                  </div>

                  {d.originalName && (
                    <div className="px-3 py-2 text-xs text-gray-600 truncate">
                      {d.originalName}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <Image
          preview={{
            visible: previewOpen,
            onVisibleChange: (v) => setPreviewOpen(v),
          }}
          src={previewSrc || undefined}
          style={{ display: "none" }}
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          disabled={loading}
          onClick={onClose}
          className={`
            h-12 px-8 rounded-full font-medium
            bg-white/30 backdrop-blur-md
            border border-red-600 text-red-600
            hover:bg-red-600 hover:text-white transition
            ${loading ? "opacity-50 cursor-not-allowed" : ""}
          `}>
          {t("order.cancel")}
        </button>

        <button
          disabled={loading}
          className={`
            h-12 px-8 rounded-full font-medium
            bg-white/30 backdrop-blur-md
            border border-blue-900 text-blue-900
            hover:bg-blue-900 hover:text-white transition
            ${loading ? "opacity-50 cursor-not-allowed" : ""}
          `}>
          {t("order.pay_now")}
        </button>
      </div>
    </Modal>
  );
}

function statusColor(status) {
  switch (status) {
    case "DRAFT":
      return "default";
    case "SUBMITTED":
      return "blue";
    case "APPROVED":
      return "cyan";
    case "CONFIRMED":
      return "green";
    case "REJECTED":
      return "red";
    case "CANCELLED":
      return "orange";
    default:
      return "default";
  }
}