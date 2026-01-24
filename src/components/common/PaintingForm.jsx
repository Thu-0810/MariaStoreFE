"use client";
import { Input, Checkbox, Radio, Button } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

function PaintingForm({
  index,
  form,
  readonly = false,

  updateForm,
  addCharacter,
  updateCharacter,
  removeCharacter,
  handleStyleChange,
  RANGE_PRICE,
  BG_PRICE,
  calculateTotalPrice,
  money,
}) {
  const { t } = useTranslation();

  const safeUpdateForm = (idx, field, value) => {
    if (readonly) return;
    updateForm?.(idx, field, value);
  };

  const safeAddCharacter = (idx) => {
    if (readonly) return;
    addCharacter?.(idx);
  };

  const safeUpdateCharacter = (idx, charId, updates) => {
    if (readonly) return;
    updateCharacter?.(idx, charId, updates);
  };

  const safeRemoveCharacter = (idx, charId) => {
    if (readonly) return;
    removeCharacter?.(idx, charId);
  };

  const safeHandleStyleChange = (idx, style) => {
    if (readonly) return;
    handleStyleChange?.(idx, style);
  };

  if (index === 0) {
    return (
      <>
        <h2 className="text-center text-2xl font-bold text-[#133e87] mb-2">
          {t("order.title")}
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
              disabled={readonly}
              onChange={(e) =>
                safeUpdateForm(index, "orderInfo", e.target.value)
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
              value={form.orderDetail || ""}
              disabled={readonly}
              onChange={(e) =>
                safeUpdateForm(index, "orderDetail", e.target.value)
              }
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
                disabled={readonly}
                onChange={(e) =>
                  safeUpdateForm(index, "useTwitter", e.target.checked)
                }>
                <span className="text-sm text-[#608bc1]">
                  {t("order.twitter")}
                </span>
              </Checkbox>

              <Checkbox
                checked={form.useEmail}
                disabled={readonly}
                onChange={(e) =>
                  safeUpdateForm(index, "useEmail", e.target.checked)
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
              disabled={readonly}
              onChange={(e) =>
                safeUpdateForm(index, "twitterHandle", e.target.value)
              }
              className="bg-[#f6f6f6] border-[#d9d9d9] focus:border-[#133e87]"
            />
          </div>

          <p className="text-xs text-[#608bc1] leading-relaxed">
            {t("order.note_check")}
          </p>
        </div>
      </>
    );
  }

  if (index === 1) {
    return (
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
                  disabled={readonly}
                  onChange={(e) => safeHandleStyleChange(index, e.target.value)}
                  className="!text-[#133e87] font-medium">
                  {label}
                </Radio>

                {form.style === val && (
                  <div className="mt-2 ml-6 mr-4">
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
                                disabled={readonly}
                                onClick={() =>
                                  safeRemoveCharacter(index, c.id)
                                }>
                                <CloseOutlined />
                              </Button>
                            </div>

                            <div className=" bg-white/60">
                              <p className="text-sm font-medium text-[#133e87] mb-3">
                                {t("order.draw_range")}
                              </p>

                              <div className="flex gap-4">
                                <div className="flex-1 p-4 rounded-lg border border-[#cbdceb] bg-white/50">
                                  <Radio.Group
                                    value={c.range}
                                    disabled={readonly}
                                    onChange={(e) =>
                                      safeUpdateCharacter(index, c.id, {
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

                                <div className="w-40 p-4 rounded-lg border border-[#cbdceb] bg-white/50 flex flex-col items-center justify-center">
                                  <p className="text-sm font-medium text-[#133e87] mb-1">
                                    {t("order.unit_price")}
                                  </p>
                                  <p className="text-lg font-bold text-[#133e87]">
                                    {(
                                      RANGE_PRICE?.[c.range] || 0
                                    ).toLocaleString()}{" "}
                                    {t("order.currency")}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className=" pt-2 bg-white/60">
                              <p className="text-sm font-medium text-[#133e87] mb-3">
                                {t(".background")}
                              </p>

                              <div className="flex gap-4">
                                <div className="flex-1 p-4 rounded-lg border border-[#cbdceb] bg-white/50">
                                  <Radio.Group
                                    value={c.background}
                                    disabled={readonly}
                                    onChange={(e) =>
                                      safeUpdateCharacter(index, c.id, {
                                        background: e.target.value,
                                      })
                                    }>
                                    <Radio.Button value="don-sac">
                                      {t("order.bg.don_sac")}
                                    </Radio.Button>
                                    <Radio.Button value="don-gian">
                                      {t("order.bg.don_gian")}
                                    </Radio.Button>
                                    <Radio.Button value="trung-binh">
                                      {t("order.bg.trung_binh")}
                                    </Radio.Button>
                                    <Radio.Button value="chi-tiet">
                                      {t("order.bg.chi_tiet")}
                                    </Radio.Button>
                                  </Radio.Group>
                                </div>

                                <div className="w-40 p-4 rounded-lg border border-[#cbdceb] bg-white/50 flex flex-col items-center justify-center">
                                  <p className="text-sm font-medium text-[#133e87] mb-1">
                                    {t("order.unit_price")}
                                  </p>
                                  <p className="text-lg font-bold text-[#133e87]">
                                    {money(BG_PRICE?.[c.background] || 0)}{" "}
                                    {t("order.currency")}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}

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
                        disabled={readonly}
                        onClick={() => safeAddCharacter(index)}
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
    );
  }

  return null;
}

export default PaintingForm;