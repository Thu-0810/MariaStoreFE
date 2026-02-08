"use client";

import { useState } from "react";
import { message } from "antd";
import { useTranslation } from "react-i18next";
import FormActions from "../common/FormActions";
import PaintingOrderForm from "../common/PaintingForm";
import { createCommissionApi, submitCommissionApi } from "../../api/commissionApi";

function OrderContainer() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === "en" ? "en-US" : "vi-VN";
  const money = (n) => (n || 0).toLocaleString(locale);

  const [forms, setForms] = useState([
    {
      orderInfo: "",
      orderDetail: "",
      twitterHandle: "",
      useTwitter: false,
      useEmail: true,
      style: "",
      characters: [],
    },
  ]);

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

  const updateForm = (index, field, value) => {
    setForms((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const addForm = () => {
    if (forms.length < 2) {
      setForms((prev) => [
        ...prev,
        {
          orderInfo: "",
          orderDetail: "",
          twitterHandle: "",
          useTwitter: false,
          useEmail: true,
          style: "",
          characters: [],
        },
      ]);
    }
  };

  const addCharacter = (formIdx) => {
    setForms((prev) =>
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
    setForms((prev) =>
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

  const handleStyleChange = (formIdx, newStyle) => {
    setForms((prev) =>
      prev.map((f, i) =>
        i === formIdx
          ? {
              ...f,
              style: newStyle,
              characters: [],
            }
          : f
      )
    );
  };

  const removeCharacter = (formIdx, charId) => {
    setForms((prev) =>
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

  const calculateTotalPrice = (form) => {
    return (form.characters || []).reduce((total, char) => {
      return (
        total +
        (RANGE_PRICE[char.range] || 0) +
        (BG_PRICE[char.background] || 0)
      );
    }, 0);
  };

  const validateMainForm = (mainForm) => {
    const title = (mainForm.orderInfo || "").trim();
    if (!title) {
      message.error(t("order.required_order_name"));
      return null;
    }

    const useTwitter = !!mainForm.useTwitter;
    const useEmail = !!mainForm.useEmail;

    const contactMethod = useTwitter ? "TWITTER" : "EMAIL";

    return {
      title,
      description: (mainForm.orderDetail || "").trim(),
      contactMethod,
      contactValue: (mainForm.twitterHandle || "").trim(),
      useEmail,
      useTwitter,
    };
  };

  const buildCommissionPayload = () => {
    const mainForm = forms[0];
    const paintingForm = forms[1];

    const validated = validateMainForm(mainForm);
    if (!validated) throw new Error("VALIDATION_FAILED");

    if (!paintingForm || !paintingForm.style) {
      message.error(t("order.style_required"));
      throw new Error("VALIDATION_FAILED");
    }

    if (!paintingForm.characters || paintingForm.characters.length === 0) {
      message.error(t("order.need_character"));
      throw new Error("VALIDATION_FAILED");
    }

    return {
      title: validated.title,
      description: validated.description,
      contactMethod: validated.contactMethod,
      contactValue: validated.contactValue,
      items: [
        {
          style: paintingForm.style,
          basePrice: 0,
          characters: paintingForm.characters.map((c, idx) => ({
            characterIndex: idx + 1,
            poseScope: c.range,
            background: c.background,
            extraPrice: (RANGE_PRICE[c.range] || 0) + (BG_PRICE[c.background] || 0),
          })),
        },
      ],
    };
  };

  const handleSaveDraft = async () => {
    try {
      const payload = buildCommissionPayload();
      await createCommissionApi(payload);
      message.success(t("commission.draft_saved"));
    } catch (e) {
      if (String(e?.message) === "VALIDATION_FAILED") return;
      message.error(e?.message || t("commission.draft_save_failed"));
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = buildCommissionPayload();

      const res = await createCommissionApi(payload);
      const commissionId = res?.data?.id;

      if (!commissionId) {
        message.error(t("commission.id_not_found"));
        return;
      }

      await submitCommissionApi(commissionId);
      message.success(t("commission.submitted"));
    } catch (e) {
      if (String(e?.message) === "VALIDATION_FAILED") return;
      console.error(e);
      message.error(t("commission.submit_failed"));
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center bg-[#f4faff] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('src/assets/img/Illustration389.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/75 via-purple-50/60 to-pink-50/50" />

      {forms.map((form, index) => (
        <div
          key={index}
          className="relative z-10 w-full max-w-7xl mx-4 rounded-2xl
            bg-white/40 backdrop-blur-md border border-[#cbdceb]
            shadow-xl p-6 sm:p-10 mt-20">
          <PaintingOrderForm
            index={index}
            form={form}
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

      <FormActions
        formsLength={forms.length}
        onAddForm={addForm}
        onSaveDraft={handleSaveDraft}
        onSubmit={handleSubmit}
        showSubmitButton={forms.some((form) => calculateTotalPrice(form) > 0)}
        isAddFormDisabled={forms.length >= 2}
      />
    </div>
  );
}

export default OrderContainer;