
"use client";

import { Modal, Tag, Image, Input, Radio, Spin, message } from "antd";
import { EyeOutlined, DownloadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import PaintingOrderForm from "./common/PaintingForm";
import { useEffect, useMemo, useState } from "react";
import { toServerUrl } from "../utils/url";
import {
  getCommissionDeliverablesApi,
  updateCommissionDraftApi,
  submitCommissionApi,
} from "../api/commissionApi";
import {
  getBankQrApi,
  confirmBankPaidApi,
  initVnpayApi,
  initPaypalApi,
} from "../api/paymentApi";

export default function CommissionDetailModal({
  open,
  request,
  onClose,

  onPay,
  onPaidSuccess,
  onRequestUpdated,
}) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === "en" ? "en-US" : "vi-VN";
  const money = (n) => (n || 0).toLocaleString(locale);

  const [loading, setLoading] = useState(false);

  const [deliverables, setDeliverables] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewSrc, setPreviewSrc] = useState(null);

  const [formsState, setFormsState] = useState([
    {
      orderInfo: "",
      orderDetail: "",
      twitterHandle: "",
      useTwitter: false,
      useEmail: true,
      style: "",
      characters: [],
    },
    {
      style: "",
      characters: [],
    },
  ]);

  const [checkoutForm, setCheckoutForm] = useState({
    receiverName: "",
    receiverPhone: "",
    shippingAddress: "",
    paymentMethod: "BANK_QR",
  });

  const [createdOrderId, setCreatedOrderId] = useState(null);
  const [qrInfo, setQrInfo] = useState(null);

  const status = request?.status;
  const isDraft = status === "DRAFT";
  const isPaid = status === "PAID";
  const canPay = status === "APPROVED";

  const canShowFinalPrice = useMemo(() => {
    const s = String(status || "").toUpperCase();
    return s === "APPROVED" || s === "CONFIRMED" || s === "PAID";
  }, [status]);

  const finalPrice = useMemo(() => {
    if (!canShowFinalPrice) return null;
    if (request?.totalPrice == null) return null;
    const n = Number(request.totalPrice);
    return Number.isFinite(n) ? n : null;
  }, [canShowFinalPrice, request?.totalPrice]);

  const RANGE_PRICE = useMemo(
    () => ({
      dau: 100000,
      "tu-nguc": 150000,
      "nua-nguoi": 200000,
      "tu-goi": 250000,
      "ca-nguoi": 300000,
    }),
    []
  );

  const BG_PRICE = useMemo(
    () => ({
      "don-sac": 50000,
      "don-gian": 100000,
      "trung-binh": 150000,
      "chi-tiet": 200000,
    }),
    []
  );

  const calculateTotalPrice = (form) => {
    return (form.characters || []).reduce((total, char) => {
      if (typeof char.extraPrice === "number") return total + char.extraPrice;
      return (
        total +
        (RANGE_PRICE[char.range] || 0) +
        (BG_PRICE[char.background] || 0)
      );
    }, 0);
  };

  const updateForm = (index, field, value) => {
    setFormsState((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const addCharacter = (formIdx) => {
    setFormsState((prev) =>
      prev.map((f, i) =>
        i === formIdx
          ? {
              ...f,
              characters: [
                ...(f.characters || []),
                { id: Date.now(), range: "dau", background: "don-gian" },
              ],
            }
          : f
      )
    );
  };

  const updateCharacter = (formIdx, charId, updates) => {
    setFormsState((prev) =>
      prev.map((f, i) =>
        i === formIdx
          ? {
              ...f,
              characters: (f.characters || []).map((ch) =>
                ch.id === charId ? { ...ch, ...updates } : ch
              ),
            }
          : f
      )
    );
  };

  const removeCharacter = (formIdx, charId) => {
    setFormsState((prev) =>
      prev.map((f, i) =>
        i === formIdx
          ? {
              ...f,
              characters: (f.characters || []).filter((ch) => ch.id !== charId),
            }
          : f
      )
    );
  };

  const handleStyleChange = (formIdx, newStyle) => {
    setFormsState((prev) =>
      prev.map((f, i) =>
        i === formIdx ? { ...f, style: newStyle, characters: [] } : f
      )
    );
  };

  useEffect(() => {
    if (!open || !request?.id) return;

    setCheckoutForm({
      receiverName: "",
      receiverPhone: "",
      shippingAddress: "",
      paymentMethod: "BANK_QR",
    });

    setCreatedOrderId(null);
    setQrInfo(null);
    setDeliverables([]);
    setPreviewOpen(false);
    setPreviewSrc(null);

    const item0 = request?.items?.[0];

    setFormsState([
      {
        orderInfo: request?.title || "",
        orderDetail: request?.description || "",
        twitterHandle: request?.contactValue || "",
        useTwitter: request?.contactMethod === "TWITTER",
        useEmail: request?.contactMethod === "EMAIL",
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
    ]);
  }, [open, request?.id]);

  useEffect(() => {
    if (!open || !request?.id) return;

    if (!isPaid) {
      setDeliverables([]);
      return;
    }

    getCommissionDeliverablesApi(request.id)
      .then((res) => setDeliverables(res.data || []))
      .catch(() => setDeliverables([]));
  }, [open, request?.id, isPaid]);

  if (!request) return null;

  const downloadByBlob = async (url, filename) => {
    try {
      const res = await fetch(url, { method: "GET" });
      const blob = await res.blob();

      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = filename || t("common.download");
      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(objectUrl);
    } catch (e) {
      console.error(e);
      message.error(t("common.download_failed"));
    }
  };

  const buildDraftPayload = () => {
    const main = formsState[0];
    const painting = formsState[1];

    const title = (main.orderInfo || "").trim();
    if (!title) {
      message.error(t("order.title_required"));
      return null;
    }

    if (!painting?.style) {
      message.error(t("order.style_required"));
      return null;
    }

    if (!painting?.characters?.length) {
      message.error(t("order.need_character"));
      return null;
    }

    const contactMethod = main.useTwitter ? "TWITTER" : "EMAIL";
    const contactValue = (main.twitterHandle || "").trim();

    return {
      title,
      description: (main.orderDetail || "").trim(),
      contactMethod,
      contactValue,
      items: [
        {
          style: painting.style,
          basePrice: 0,
          characters: (painting.characters || []).map((c, idx) => ({
            characterIndex: idx + 1,
            poseScope: c.range,
            extraPrice:
              (RANGE_PRICE[c.range] || 0) + (BG_PRICE[c.background] || 0),
          })),
        },
      ],
    };
  };

  const handleSaveDraft = async () => {
    if (!request?.id) return;
    const payload = buildDraftPayload();
    if (!payload) return;

    try {
      setLoading(true);
      const res = await updateCommissionDraftApi(request.id, payload);
      message.success(t("commission.draft_saved"));
      onRequestUpdated?.(res?.data || null);
    } catch (e) {
      console.error(e);
      message.error(t("commission.draft_save_failed"));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitDraft = async () => {
    if (!request?.id) return;
    const payload = buildDraftPayload();
    if (!payload) return;

    try {
      setLoading(true);

      const saved = await updateCommissionDraftApi(request.id, payload);
      await submitCommissionApi(request.id);

      message.success(t("commission.submitted"));

      onRequestUpdated?.({
        ...(saved?.data || request),
        status: "SUBMITTED",
      });

      onClose?.();
    } catch (e) {
      console.error(e);
      message.error(t("commission.submit_failed"));
    } finally {
      setLoading(false);
    }
  };

  const validateCheckoutInfo = () => {
    const method = (checkoutForm.paymentMethod || "BANK_QR").toUpperCase();

    const receiverName = (checkoutForm.receiverName || "").trim();
    const receiverPhone = (checkoutForm.receiverPhone || "").trim();
    const shippingAddress = (checkoutForm.shippingAddress || "").trim();

    if (!receiverName || !receiverPhone || !shippingAddress) {
      message.error(t("order.msg_missing_info"));
      return null;
    }

    return {
      receiverName,
      receiverPhone,
      shippingAddress,
      paymentMethod: method,
    };
  };

  const handlePayNow = async () => {
    const reqBody = validateCheckoutInfo();
    if (!reqBody) return;

    try {
      setLoading(true);

      const summary = await onPay?.(reqBody);
      const orderId = summary?.orderId;
      if (!orderId) throw new Error("OrderId not found from checkout response");

      setCreatedOrderId(orderId);

      const method = reqBody.paymentMethod;

      if (method === "VNPAY") {
        const res = await initVnpayApi(orderId);
        const url = res?.data?.paymentUrl;
        if (!url) throw new Error("VNPay paymentUrl missing");
        window.location.href = url;
        return;
      }

      if (method === "PAYPAL") {
        const res = await initPaypalApi(orderId);
        const url = res?.data?.approveUrl;
        if (!url) throw new Error("PayPal approveUrl missing");

        localStorage.setItem("pendingPayPalOrderId", String(orderId));
        window.location.href = url;
        return;
      }

      const qrRes = await getBankQrApi(orderId);
      setQrInfo(qrRes?.data || null);
      message.success(t("checkout.msg_checkout_success"));
    } catch (e) {
      console.error(e);
      message.error(t("checkout.msg_checkout_failed"));
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmManualPaid = async () => {
    if (!createdOrderId) {
      message.error(t("order.order_not_ready"));
      return;
    }

    try {
      setLoading(true);
      await confirmBankPaidApi(createdOrderId);

      message.success(t("order.payment_confirmed"));

      await onPaidSuccess?.();
      onClose?.();

      setQrInfo(null);
      setCreatedOrderId(null);
    } catch (e) {
      console.error(e);
      message.error(t("order.payment_confirm_failed"));
    } finally {
      setLoading(false);
    }
  };

  const readonlyAll = !isDraft;

  const suggestedPrice = calculateTotalPrice(formsState?.[1] || { characters: [] });

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={1000}
      centered
      destroyOnClose
      className="!rounded-2xl"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#133e87]">
          {request.title || t("profile.request_default_title")}
        </h2>

        <div className="flex items-center gap-3 mt-2">
          <Tag color={statusColor(request.status)}>
            {t(`commission.status.${String(request.status || "").toLowerCase()}`)}
          </Tag>
          <span className="text-sm text-gray-500">
            {request.createdAt
              ? new Date(request.createdAt).toLocaleDateString(locale)
              : ""}
          </span>
        </div>

        {canShowFinalPrice ? (
          <div className="mt-4 rounded-2xl border border-[#cbdceb] bg-white/70 backdrop-blur-md p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs text-gray-500">
                  {t("commission.final_price_label")}
                </div>
                <div className="mt-1 text-3xl font-bold text-[#133e87]">
                  {finalPrice != null ? money(finalPrice) : "-"}{" "}
                  <span className="text-base font-semibold text-gray-500">
                    {t("order.currency")}
                  </span>
                </div>

                <div className="mt-2 text-xs text-gray-500">
                  {t("commission.suggested_price")}:{" "}
                  <span className="font-semibold">{money(suggestedPrice)}</span>{" "}
                  {t("order.currency")}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-[#cbdceb] bg-white/40 backdrop-blur-md p-5">
            <div className="text-sm text-gray-600">
              {t("commission.final_price_pending")}
            </div>
            <div className="mt-2 text-xs text-gray-500">
              {t("commission.suggested_price")}:{" "}
              <span className="font-semibold">{money(suggestedPrice)}</span>{" "}
              {t("order.currency")}
            </div>
          </div>
        )}
      </div>

      {formsState.map((form, index) => (
        <div
          key={index}
          className="rounded-xl border border-[#cbdceb] bg-white/60 backdrop-blur-md p-6 mb-6"
        >
          <PaintingOrderForm
            index={index}
            form={form}
            readonly={readonlyAll}
            updateForm={updateForm}
            addCharacter={addCharacter}
            updateCharacter={updateCharacter}
            removeCharacter={removeCharacter}
            handleStyleChange={handleStyleChange}
            RANGE_PRICE={RANGE_PRICE}
            BG_PRICE={BG_PRICE}
            calculateTotalPrice={calculateTotalPrice}
            money={money}
          />
        </div>
      ))}

      {canPay && !isPaid && (
        <>
          <div className="rounded-xl border border-[#cbdceb] bg-white/60 backdrop-blur-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-[#133e87] mb-3">
              {t("payment.choose_title")}
            </h3>

            <Radio.Group
              value={checkoutForm.paymentMethod}
              onChange={(e) =>
                setCheckoutForm((p) => ({
                  ...p,
                  paymentMethod: e.target.value,
                }))
              }
              disabled={loading}
            >
              <Radio value="BANK_QR">{t("payment.methods.bank")}</Radio>
              <Radio value="VNPAY">{t("payment.methods.vnpay")}</Radio>
              <Radio value="PAYPAL">{t("payment.methods.paypal")}</Radio>
            </Radio.Group>

            <div className="mt-4 text-sm text-gray-600">
              {t("order.amount_to_pay")}:{" "}
              <span className="font-semibold text-[#133e87]">
                {finalPrice != null ? money(finalPrice) : money(suggestedPrice)}{" "}
                {t("order.currency")}
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-[#cbdceb] bg-white/60 backdrop-blur-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-[#133e87] mb-3">
              {t("qrPayment.shipping_info")}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  {t("checkout.receiver_name")}
                </label>
                <Input
                  value={checkoutForm.receiverName}
                  onChange={(e) =>
                    setCheckoutForm((p) => ({
                      ...p,
                      receiverName: e.target.value,
                    }))
                  }
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  {t("checkout.receiver_phone")}
                </label>
                <Input
                  value={checkoutForm.receiverPhone}
                  onChange={(e) =>
                    setCheckoutForm((p) => ({
                      ...p,
                      receiverPhone: e.target.value,
                    }))
                  }
                  disabled={loading}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm text-gray-600 mb-1">
                  {t("checkout.shipping_address")}
                </label>
                <Input.TextArea
                  rows={2}
                  value={checkoutForm.shippingAddress}
                  onChange={(e) =>
                    setCheckoutForm((p) => ({
                      ...p,
                      shippingAddress: e.target.value,
                    }))
                  }
                  disabled={loading}
                />
              </div>
            </div>

            {qrInfo && (
              <div className="mt-5 p-4 rounded-xl border bg-white">
                <div className="text-sm text-gray-600">
                  {t("qrPayment.order_code")}:{" "}
                  <span className="font-semibold">{qrInfo.orderCode}</span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("qrPayment.amount")}:{" "}
                  <span className="font-semibold">{money(qrInfo.amount)}</span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t("qrPayment.transaction_id")}:{" "}
                  <span className="font-semibold">{qrInfo.transactionId}</span>
                </div>

                <div className="text-xs text-gray-500 break-all mt-3">
                  <div className="font-semibold mb-1">
                    {t("qrPayment.qr_value")}
                  </div>
                  {qrInfo.qrValue}
                </div>

                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={handleConfirmManualPaid}
                    className={`
                      h-11 px-6 rounded-full font-medium
                      bg-white/30 backdrop-blur-md
                      border border-blue-900 text-blue-900
                      hover:bg-blue-900 hover:text-white transition
                      ${loading ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                  >
                    {t("qrPayment.confirm_btn")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Deliverables */}
      <div className="rounded-xl border border-[#cbdceb] bg-white/60 backdrop-blur-md p-6 mb-6">
        <h3 className="text-lg font-semibold text-[#133e87] mb-3">
          {t("commission.deliverables_title")}
        </h3>

        {!isPaid ? (
          <p className="text-gray-500 text-sm">
            {t("commission.deliverables_locked_until_paid")}
          </p>
        ) : deliverables.length === 0 ? (
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
                  className="relative rounded-xl overflow-hidden border bg-white"
                >
                  <img
                    src={src}
                    alt={d.originalName || t("commission.deliverable_alt")}
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
                      title={t("common.preview")}
                    >
                      <EyeOutlined />
                    </button>

                    <button
                      type="button"
                      onClick={() => downloadByBlob(src, d.originalName)}
                      className="w-9 h-9 rounded-full bg-white/80 backdrop-blur border flex items-center justify-center"
                      title={t("common.download")}
                    >
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
          `}
        >
          {t("common.cancel")}
        </button>

        {isDraft && (
          <>
            <button
              type="button"
              disabled={loading}
              onClick={handleSaveDraft}
              className={`
                h-12 px-8 rounded-full font-medium
                bg-white/30 backdrop-blur-md
                border border-blue-900 text-blue-900
                hover:bg-blue-900 hover:text-white transition
                ${loading ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Spin size="small" /> {t("common.processing")}
                </span>
              ) : (
                t("commission.save_draft")
              )}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={handleSubmitDraft}
              className={`
                h-12 px-8 rounded-full font-medium
                bg-blue-900 text-white border border-blue-900
                hover:opacity-90 transition
                ${loading ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Spin size="small" /> {t("common.processing")}
                </span>
              ) : (
                t("commission.submit")
              )}
            </button>
          </>
        )}

        {canPay && !isPaid && (
          <button
            type="button"
            disabled={loading}
            onClick={handlePayNow}
            className={`
              h-12 px-8 rounded-full font-medium
              bg-white/30 backdrop-blur-md
              border border-blue-900 text-blue-900
              hover:bg-blue-900 hover:text-white transition
              ${loading ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <Spin size="small" /> {t("common.processing")}
              </span>
            ) : (
              t("order.pay_now")
            )}
          </button>
        )}
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
    case "PAID":
      return "green";
    case "CONFIRMED":
      return "purple";
    case "REJECTED":
      return "red";
    case "CANCELLED":
      return "orange";
    default:
      return "default";
  }
}
