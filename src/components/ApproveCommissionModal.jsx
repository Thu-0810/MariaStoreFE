import {
  Modal,
  Divider,
  message,
  Upload,
  Tooltip,
  Image,
  InputNumber,
  Tag,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import PaintingForm from "./common/PaintingForm";
import {
  approveCommissionApi,
  rejectCommissionApi,
  uploadCommissionDeliverableApi,
  getSellerCommissionDeliverablesApi,
  deleteCommissionDeliverableApi,
} from "../api/sellerCommissionApi";
import { EyeOutlined, CloseOutlined, UploadOutlined } from "@ant-design/icons";
import { toServerUrl } from "../utils/url";

export default function ApproveCommissionModal({
  open,
  request,
  onClose,
  onSuccess,
}) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === "en" ? "en-US" : "vi-VN";
  const money = (n) => (n || 0).toLocaleString(locale);

  const [loading, setLoading] = useState(false);

  const [deliverables, setDeliverables] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewSrc, setPreviewSrc] = useState("");

  const [finalPrice, setFinalPrice] = useState(null);

  const requestId = request?.id ?? null;
  const isLocked =
    request?.status === "CONFIRMED" || request?.status === "PAID";

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
    const item0 = req?.items?.[0];

    return [
      {
        orderInfo: req?.title || "",
        orderDetail: req?.description || "",
        twitterHandle: req?.contactValue || "",
        useTwitter: req?.contactMethod === "TWITTER",
        useEmail: req?.contactMethod === "EMAIL",
        style: "",
        characters: [],
      },
      {
        style: item0?.style || "",
        characters:
          item0?.characters?.map((c, idx) => ({
            id: c.characterIndex ?? idx + 1,
            range: c.poseScope,
            background: c.background || "don-gian",
          })) || [],
      },
    ];
  };

  const forms = useMemo(() => buildFormsFromRequest(request), [request]);

  const fetchDeliverables = async () => {
    if (!requestId) return;
    try {
      const res = await getSellerCommissionDeliverablesApi(requestId);
      setDeliverables(res.data || []);
    } catch {
      setDeliverables([]);
    }
  };

  useEffect(() => {
    if (!open) return;
    if (!requestId) return;

    fetchDeliverables();
    setFileList([]);

    setFinalPrice(
      request?.totalPrice != null ? Number(request.totalPrice) : null
    );
  }, [open, requestId]);

  const onChangeUpload = ({ fileList: next }) => {
    setFileList(next);
  };

  const handlePreviewLocal = (file) => {
    const src =
      file.url ||
      file.thumbUrl ||
      (file.originFileObj ? URL.createObjectURL(file.originFileObj) : "");

    setPreviewSrc(src);
    setPreviewOpen(true);
  };

  const handlePreviewServer = (fileUrl) => {
    setPreviewSrc(toServerUrl(fileUrl));
    setPreviewOpen(true);
  };

  const uploadSelectedFiles = async () => {
    if (!requestId) return;
    if (isLocked) return message.error(t("commission.locked_no_upload"));
    if (!fileList.length) return;

    try {
      setLoading(true);
      for (const f of fileList) {
        if (f.originFileObj) {
          await uploadCommissionDeliverableApi(requestId, f.originFileObj);
        }
      }
      setFileList([]);
      message.success(t("commission.upload_success"));
      await fetchDeliverables();
    } catch {
      message.error(t("commission.upload_failed"));
    } finally {
      setLoading(false);
    }
  };

  const deleteServerDeliverable = async (deliverableId) => {
    if (!requestId) return;
    if (isLocked) return;

    try {
      setLoading(true);
      await deleteCommissionDeliverableApi(requestId, deliverableId);
      message.success(t("commission.delete_success"));
      await fetchDeliverables();
    } catch {
      message.error(t("commission.delete_failed"));
    } finally {
      setLoading(false);
    }
  };

  const approve = async () => {
    if (!requestId) return;

    const price = finalPrice == null ? null : Number(finalPrice);
    if (price == null || Number.isNaN(price) || price <= 0) {
      message.error(t("commission.enter_final_price"));
      return;
    }

    try {
      setLoading(true);
      await approveCommissionApi(requestId, price);
      message.success(t("commission.approve_success"));
      onSuccess?.();
      onClose();
    } catch {
      message.error(t("commission.approve_fail"));
    } finally {
      setLoading(false);
    }
  };

  const reject = async () => {
    if (!requestId) return;

    try {
      setLoading(true);
      await rejectCommissionApi(requestId);
      message.success(t("commission.reject_success"));
      onSuccess?.();
      onClose();
    } catch {
      message.error(t("commission.reject_fail"));
    } finally {
      setLoading(false);
    }
  };

  if (!request) return null;

  const suggestedPrice = calculateTotalPrice(forms?.[1] || { characters: [] });

  const finalPriceNumber =
    finalPrice == null ? null : Number(finalPrice || 0);

  const diff =
    finalPriceNumber == null || Number.isNaN(finalPriceNumber)
      ? null
      : finalPriceNumber - Number(suggestedPrice || 0);

  const diffLabel =
    diff == null
      ? null
      : diff > 0
      ? t("commission.higher_than_suggested")
      : diff < 0
      ? t("commission.lower_than_suggested")
      : t("commission.same_as_suggested");

  const diffAbs = diff == null ? null : Math.abs(diff);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={1100}
      centered
      destroyOnClose
      className="!rounded-2xl">
      <h2 className="text-2xl font-bold text-[#133e87] mb-2">
        {t("commission.approve_title")}
      </h2>

      <p className="text-sm text-gray-500 mb-6">
        {t("commission.review_before_approve")}
      </p>

      {forms.map((form, index) => (
        <div
          key={index}
          className="rounded-xl border border-[#cbdceb] bg-white/60 backdrop-blur-md p-6 mb-6">
          <PaintingForm
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

      {/* FINAL PRICE */}
      <div className="rounded-2xl border border-[#cbdceb] bg-white/60 backdrop-blur-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-[#133e87]">
                {t("commission.final_price")}
              </h3>

              <Tooltip title={t("commission.final_price_hint")}>
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-[#cbdceb] text-xs text-gray-600 bg-white/70">
                  ?
                </span>
              </Tooltip>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-gray-500">
                {t("commission.suggested_price")}:
              </span>
              <span className="font-semibold text-gray-800">
                {money(suggestedPrice)} {t("order.currency")}
              </span>

              {diffLabel && diffAbs != null ? (
                <>
                  <span className="text-gray-300">•</span>
                  <Tag
                    color={diff > 0 ? "volcano" : diff < 0 ? "blue" : "green"}
                    className="!m-0">
                    {diffLabel}: {money(diffAbs)} {t("order.currency")}
                  </Tag>
                </>
              ) : null}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                disabled={loading || isLocked}
                onClick={() => setFinalPrice(Number(suggestedPrice || 0))}
                className={`h-9 px-4 rounded-full text-sm font-medium
                  bg-white/40 backdrop-blur-md border border-[#cbdceb]
                  hover:bg-white/70 transition
                  ${loading || isLocked ? "opacity-50 cursor-not-allowed" : ""}`}>
                {t("commission.use_suggested")}
              </button>

              <button
                type="button"
                disabled={loading || isLocked}
                onClick={() =>
                  setFinalPrice((prev) =>
                    Math.max(0, Number(prev || 0) + 50000)
                  )
                }
                className={`h-9 px-4 rounded-full text-sm font-medium
                  bg-white/40 backdrop-blur-md border border-[#cbdceb]
                  hover:bg-white/70 transition
                  ${loading || isLocked ? "opacity-50 cursor-not-allowed" : ""}`}>
                {t("commission.plus_50k")}
              </button>

              <button
                type="button"
                disabled={loading || isLocked}
                onClick={() =>
                  setFinalPrice((prev) =>
                    Math.max(0, Number(prev || 0) - 50000)
                  )
                }
                className={`h-9 px-4 rounded-full text-sm font-medium
                  bg-white/40 backdrop-blur-md border border-[#cbdceb]
                  hover:bg-white/70 transition
                  ${loading || isLocked ? "opacity-50 cursor-not-allowed" : ""}`}>
                {t("commission.minus_50k")}
              </button>

              <button
                type="button"
                disabled={loading || isLocked}
                onClick={() => setFinalPrice(null)}
                className={`h-9 px-4 rounded-full text-sm font-medium
                  bg-white/40 backdrop-blur-md border border-[#cbdceb]
                  hover:bg-white/70 transition
                  ${loading || isLocked ? "opacity-50 cursor-not-allowed" : ""}`}>
                {t("common.reset")}
              </button>
            </div>
          </div>

          <div className="w-full md:w-[360px]">
            <div className="rounded-2xl border border-[#cbdceb] bg-white/70 p-4">
              <div className="text-xs text-gray-500 mb-2">
                {t("commission.enter_final_price")}
              </div>

              <InputNumber
                className="w-full"
                min={0}
                value={finalPrice}
                onChange={(v) => setFinalPrice(v)}
                disabled={loading || isLocked}
                size="large"
                controls
                formatter={(v) => (v ? money(Number(v)) : "")}
                parser={(v) => (v ? Number(String(v).replace(/[^\d]/g, "")) : 0)}
                placeholder={t("commission.enter_final_price")}
              />

              <div className="mt-2 text-xs text-gray-500">
                {t("commission.final_price_note")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* deliverables */}
      <div className="rounded-xl border border-[#cbdceb] bg-white/60 backdrop-blur-md p-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-[#133e87]">
            {t("commission.deliverables_title")}
          </h3>
          {isLocked ? (
            <span className="text-sm text-gray-600">
              {t("commission.deliverables_locked")}
            </span>
          ) : null}
        </div>

        {deliverables.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-5">
            {deliverables.map((d) => {
              const src = toServerUrl(d.fileUrl);
              return (
                <div
                  key={d.id}
                  className="relative rounded-xl overflow-hidden border bg-white">
                  <img
                    src={src}
                    alt={d.originalName || t("commission.deliverable_alt")}
                    className="w-full h-40 object-cover"
                  />

                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      type="button"
                      className="w-9 h-9 rounded-full bg-white/80 backdrop-blur border flex items-center justify-center"
                      onClick={() => handlePreviewServer(d.fileUrl)}
                      title={t("common.preview")}>
                      <EyeOutlined />
                    </button>

                    {!isLocked && (
                      <button
                        type="button"
                        className="w-9 h-9 rounded-full bg-white/80 backdrop-blur border flex items-center justify-center"
                        onClick={() => deleteServerDeliverable(d.id)}
                        title={t("common.remove")}>
                        <CloseOutlined />
                      </button>
                    )}
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

        {!isLocked && (
          <>
            <Upload
              accept="image/*"
              multiple
              listType="picture-card"
              fileList={fileList}
              beforeUpload={() => false}
              onChange={onChangeUpload}
              onPreview={handlePreviewLocal}
              showUploadList={{
                showPreviewIcon: true,
                showRemoveIcon: true,
                previewIcon: (
                  <Tooltip title={t("common.preview")}>
                    <EyeOutlined />
                  </Tooltip>
                ),
                removeIcon: (
                  <Tooltip title={t("common.remove")}>
                    <CloseOutlined />
                  </Tooltip>
                ),
              }}>
              <div className="flex flex-col items-center justify-center">
                <UploadOutlined />
                <div className="mt-2 text-xs">{t("commission.upload_image")}</div>
              </div>
            </Upload>

            <div className="flex justify-end mt-2">
              <button
                disabled={loading || fileList.length === 0}
                onClick={uploadSelectedFiles}
                className={`h-10 px-6 rounded-full font-medium
                  bg-white/30 backdrop-blur-md border border-blue-900 text-blue-900
                  hover:bg-blue-900 hover:text-white transition
                  ${
                    loading || fileList.length === 0
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}>
                {t("commission.upload_now")}
              </button>
            </div>
          </>
        )}

        <Image
          preview={{
            visible: previewOpen,
            onVisibleChange: (v) => setPreviewOpen(v),
          }}
          src={previewSrc}
          style={{ display: "none" }}
        />
      </div>

      <Divider />

      <div className="flex justify-end gap-4">
        <button
          disabled={loading}
          onClick={reject}
          className={`
            h-12 px-8 rounded-full font-medium
            bg-white/30 backdrop-blur-md
            border border-red-600 text-red-600
            hover:bg-red-600 hover:text-white transition
            ${loading ? "opacity-50 cursor-not-allowed" : ""}
          `}>
          {t("commission.reject")}
        </button>

        <button
          disabled={loading}
          onClick={approve}
          className={`
            h-12 px-8 rounded-full font-medium
            bg-white/30 backdrop-blur-md
            border border-blue-900 text-blue-900
            hover:bg-blue-900 hover:text-white transition
            ${loading ? "opacity-50 cursor-not-allowed" : ""}
          `}>
          {t("commission.approve")}
        </button>
      </div>
    </Modal>
  );
}