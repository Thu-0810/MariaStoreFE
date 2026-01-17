import React, { useState } from "react";
import { Input, Checkbox, Radio, Button } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

function OrderContainer() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === "en" ? "en-US" : "vi-VN";
  const money = (n) => (n || 0).toLocaleString(locale);
  const [forms, setForms] = useState([
    {
      orderInfo: "",
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
          twitterHandle: "",
          useTwitter: false,
          useEmail: true,
          style: "",
          characters: [],
        },
      ]);
    }
  };

  // ==== Nhân vật ====
  const addCharacter = (formIdx) => {
    setForms((prev) =>
      prev.map((f, i) =>
        i === formIdx
          ? {
              ...f,
              characters: [
                ...f.characters,
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
              characters: f.characters.map((ch) =>
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
              characters: [], // reset toàn bộ nhân vật
            }
          : f
      )
    );
  };

  const removeCharacter = (formIdx, charId) => {
    setForms((prev) =>
      prev.map((f, i) =>
        i === formIdx
          ? { ...f, characters: f.characters.filter((ch) => ch.id !== charId) }
          : f
      )
    );
  };

  // Calculate total price for a form based on its characters
  const calculateTotalPrice = (form) => {
    return form.characters.reduce((total, char) => {
      return (
        total +
        (RANGE_PRICE[char.range] || 0) +
        (BG_PRICE[char.background] || 0)
      );
    }, 0);
  };

  const rangeLabelKey = (v) =>
    v === "tu-nguc" ? "tu_nguc" : v === "tu-goi" ? "tu_goi" : v;

  const bgLabelKey = (v) => v;

  return (
    <div className="relative min-h-screen flex flex-col items-center bg-[#f4faff] overflow-hidden">
      {/* Ảnh nền + overlay */}
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
          {/* ==== FORM 1 ==== */}
          {index === 0 && (
            <>
              <h2 className="text-center text-2xl font-bold text-[#133e87] mb-2">
                {t("order.title")}{" "}
              </h2>
              <p className="text-center text-sm text-[#608bc1] mb-6">
                {t("order.subtitle")}
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-[#608bc1] mb-1">
                    {t("order.order_name_optional")}
                  </label>
                  <Input
                    value={form.orderInfo}
                    onChange={(e) =>
                      updateForm(index, "orderInfo", e.target.value)
                    }
                    className="bg-[#f6f6f6] border-[#d9d9d9] focus:border-[#133e87]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#608bc1] mb-1">
                    {t("order.order_detail")}
                  </label>
                  <Input.TextArea
                    rows={4}
                    className="bg-[#f6f6f6] border-[#d9d9d9] focus:border-[#133e87]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#608bc1] mb-2">
                    {t("order.contact_optional")}
                  </label>
                  <div className="space-y-2">
                    <Checkbox
                      checked={form.useTwitter}
                      onChange={(e) =>
                        updateForm(index, "useTwitter", e.target.checked)
                      }>
                      <span className="text-sm text-[#608bc1]">
                        {t("order.twitter")}
                      </span>
                    </Checkbox>
                    <Checkbox
                      checked={form.useEmail}
                      onChange={(e) =>
                        updateForm(index, "useEmail", e.target.checked)
                      }>
                      <span className="text-sm text-[#608bc1]">
                        {t("order.email")}
                      </span>
                    </Checkbox>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#608bc1] mb-1">
                    {t("order.contact_value_optional")}
                  </label>
                  <Input
                    value={form.twitterHandle}
                    onChange={(e) =>
                      updateForm(index, "twitterHandle", e.target.value)
                    }
                    className="bg-[#f6f6f6] border-[#d9d9d9] focus:border-[#133e87]"
                  />
                </div>

                <p className="text-xs text-[#608bc1] leading-relaxed">
                  {t("order.note_check")}
                </p>
              </div>
            </>
          )}

          {/* ==== FORM 2 ==== */}
          {index === 1 && (
            <>
              <h2 className="text-center text-2xl font-bold text-[#133e87] mb-6">
                {t("order.painting_1")}
              </h2>

              <div className="rounded-xl border border-[#cbdceb] bg-white/40 backdrop-blur-md shadow-sm overflow-hidden">
                {["line", "color", "chibi"].map((val, i) => {
                  const styleLabelMap = {
                    line: t("order.style_1"),
                    color: t("order.style_2"),
                    chibi: t("order.style_3"),
                  };

                  const label = styleLabelMap[val];
                  return (
                    <div
                      key={val}
                      className={`px-4 py-3 flex flex-col gap-2 ${
                        i < 2 ? "border-b border-[#cbdceb]" : ""
                      }`}>
                      <Radio
                        value={val}
                        checked={form.style === val}
                        onChange={(e) =>
                          handleStyleChange(index, e.target.value)
                        }
                        className="!text-[#133e87] font-medium">
                        {label}
                      </Radio>

                      {form.style === val && (
                        <div className="mt-2 ml-6 mr-4">
                          {/* Nếu đã có nhân vật */}
                          {form.characters.length > 0 ? (
                            <div className="p-2 rounded-xl border border-[#cbdceb] bg-white/50 backdrop-blur-sm">
                              {form.characters.map((c, charIdx) => (
                                <div
                                  key={c.id}
                                  className="mb-4 p-4 bg-white/70 backdrop-blur-md">
                                  <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-semibold text-[#133e87]">
                                      {t("order.character")} {charIdx + 1}
                                    </h3>
                                    <Button
                                      size="small"
                                      danger
                                      onClick={() =>
                                        removeCharacter(index, c.id)
                                      }>
                                      <CloseOutlined />
                                    </Button>
                                  </div>

                                  {/* === Khối Phạm vi === */}
                                  <div className="p-4 bg-white/60">
                                    <p className="text-sm font-medium text-[#133e87] mb-3">
                                      {t("order.draw_range")}
                                    </p>

                                    {/* Hai khối ngang hàng, KHÔNG khối nào nằm trong khối nào */}
                                    <div className="flex gap-4">
                                      {/* Ô chọn phạm vi */}
                                      <div className="flex-1 p-4 rounded-lg border border-[#cbdceb] bg-white/50">
                                        <Radio.Group
                                          value={c.range}
                                          onChange={(e) =>
                                            updateCharacter(index, c.id, {
                                              range: e.target.value,
                                            })
                                          }>
                                          <Radio.Button value="dau">
                                            {t("order.range.dau")}
                                          </Radio.Button>
                                          <Radio.Button value="tu-nguc">
                                            {t("order.range.tu_nguc")}
                                          </Radio.Button>
                                          <Radio.Button value="nua-nguoi">
                                            {t("order.range.nua_nguoi")}
                                          </Radio.Button>
                                          <Radio.Button value="tu-goi">
                                            {t("order.range.tu_goi")}
                                          </Radio.Button>
                                          <Radio.Button value="ca-nguoi">
                                            {t("order.range.ca_nguoi")}
                                          </Radio.Button>
                                        </Radio.Group>
                                      </div>

                                      {/* Ô đơn giá */}
                                      <div className="w-40 p-4 rounded-lg border border-[#cbdceb] bg-white/50 flex flex-col items-center justify-center">
                                        <p className="text-sm font-medium text-[#133e87] mb-1">
                                          {t("order.unit_price")}
                                        </p>
                                        <p className="text-lg font-bold text-[#133e87]">
                                          {RANGE_PRICE[
                                            c.range
                                          ].toLocaleString()}{" "}
                                          đ
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* === Khối Phần nền === */}
                                  <div className="p-4 bg-white/60">
                                    <p className="text-sm font-medium text-[#133e87] mb-3">
                                      {t("order.draw_range")}
                                    </p>

                                    <div className="flex gap-4">
                                      {/* Ô chọn nền */}
                                      <div className="flex-1 p-4 rounded-lg border border-[#cbdceb] bg-white/50">
                                        <Radio.Group
                                          value={c.background}
                                          onChange={(e) =>
                                            updateCharacter(index, c.id, {
                                              background: e.target.value,
                                            })
                                          }>
                                          <Radio.Button value="dau">
                                            {t("order.range.dau")}
                                          </Radio.Button>
                                          <Radio.Button value="tu-nguc">
                                            {t("order.range.tu_nguc")}
                                          </Radio.Button>
                                          <Radio.Button value="nua-nguoi">
                                            {t("order.range.nua_nguoi")}
                                          </Radio.Button>
                                          <Radio.Button value="tu-goi">
                                            {t("order.range.tu_goi")}
                                          </Radio.Button>
                                          <Radio.Button value="ca-nguoi">
                                            {t("order.range.ca_nguoi")}
                                          </Radio.Button>
                                        </Radio.Group>
                                      </div>

                                      {/* Ô đơn giá */}
                                      <div className="w-40 p-4 rounded-lg border border-[#cbdceb] bg-white/50 flex flex-col items-center justify-center">
                                        <p className="text-sm font-medium text-[#133e87] mb-1">
                                          {t("order.unit_price")}
                                        </p>
                                        <p className="text-lg font-bold text-[#133e87]">
                                          {money(RANGE_PRICE[c.range])}{" "}
                                          {t("order.currency")}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : null}

                          {/* Nút thêm nhân vật – luôn hiển thị */}
                          <div
                            className={`mt-4 p-2 mr-150 flex items-center gap-3 rounded-xl border border-[#cbdceb] ${
                              form.characters.length === 0
                                ? "rounded-xl border border-[#cbdceb] p-0"
                                : ""
                            }`}>
                            <Button
                              type="default"
                              shape="circle"
                              icon={<PlusOutlined />}
                              onClick={() => addCharacter(index)}
                              className="border-[#cbdceb] !text-[#133e87] bg-white/70 hover:bg-white/90"
                            />
                            <span className="!text-[#133e87] font-medium">
                              {t("order.add_character")}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Tổng tiền - Đặt ngoài khối phong cách */}
              {form.characters.length > 0 && (
                <div className="mt-6 p-4 flex flex-col items-center justify-center">
                  <p className="text-2xl font-bold text-[#133e87]">
                    {t("order.total")}
                  </p>
                  <div className="inline-block border-b-4 border-[#163c87] pb-2 mb-4 mt-2">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900">
                      {money(calculateTotalPrice(form))}
                    </h1>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      ))}

      {/* Nút thêm form & đặt tranh */}
      <div className="relative z-10 mt-6 w-full max-w-7xl flex justify-between items-center gap-6 mb-20">
        <div className="flex items-center gap-6">
          <button
            onClick={addForm}
            disabled={forms.length >= 2}
            className={`w-12 h-12 rounded-full backdrop-blur-md border border-[#cbdceb]
        flex items-center justify-center transition
        ${
          forms.length >= 2
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-white/30 hover:bg-white/40"
        }`}>
            <PlusOutlined className="!text-[#133e87] text-xl" />
          </button>

          <button
            className="h-12 px-8 rounded-full bg-white/30 backdrop-blur-md 
        border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white font-medium flex items-center justify-center">
            {t("order.order_btn")}
          </button>
        </div>

        {forms.some((form) => calculateTotalPrice(form) > 0) && (
          <div>
            <button
              className="h-12 px-8 rounded-full bg-white/30 backdrop-blur-md 
      border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white font-medium flex items-center justify-center">
              {t("order.done_btn")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderContainer;