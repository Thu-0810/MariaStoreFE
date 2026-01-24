import { Modal, Divider, message } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PaintingForm from "./common/PaintingForm";
import {
  approveCommissionApi,
  rejectCommissionApi,
} from "../api/sellerCommissionApi";

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
          item0?.characters?.map((c, idx) => ({
            id: c.characterIndex ?? idx + 1,
            range: c.poseScope,
            background: c.background || "don-gian",
          })) || [],
      },
    ];
  };

  const forms = buildFormsFromRequest(request);

  const approve = async () => {
    try {
      setLoading(true);
      await approveCommissionApi(request.id);
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
    try {
      setLoading(true);
      await rejectCommissionApi(request.id);
      message.success(t("commission.reject_success"));
      onSuccess?.();
      onClose();
    } catch {
      message.error(t("commission.reject_fail"));
    } finally {
      setLoading(false);
    }
  };

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
          className="rounded-xl border border-[#cbdceb]
          bg-white/60 backdrop-blur-md p-6 mb-6">
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

      <Divider />

      <div className="flex justify-end gap-4">
        <button
          disabled={loading}
          onClick={reject}
          className={`
            h-12 px-8 rounded-full font-medium
            bg-white/30 backdrop-blur-md
            border border-red-600 text-red-600
            hover:bg-red-600 hover:text-white
            transition
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
            hover:bg-blue-900 hover:text-white
            transition
            ${loading ? "opacity-50 cursor-not-allowed" : ""}
          `}>
          {t("commission.approve")}
        </button>
      </div>
    </Modal>
  );
}