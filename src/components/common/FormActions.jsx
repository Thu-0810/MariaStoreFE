"use client";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

function FormActions({
  formsLength,
  onAddForm,
  onSaveDraft,
  onSubmit,
  showSubmitButton,
  isAddFormDisabled,
}) {
  const { t } = useTranslation();

  return (
    <div className="relative z-10 mt-6 w-full max-w-7xl flex justify-between items-center gap-6 mb-20 mx-4">
      <div className="flex items-center gap-6">
        <button
          onClick={onAddForm}
          disabled={isAddFormDisabled}
          className={`w-12 h-12 rounded-full backdrop-blur-md border border-[#cbdceb]
        flex items-center justify-center transition
        ${
          isAddFormDisabled
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-white/30 hover:bg-white/40"
        }`}>
          <PlusOutlined className="!text-[#133e87] text-xl" />
        </button>

        <button
          onClick={onSaveDraft}
          className="h-12 px-8 rounded-full bg-white/30 backdrop-blur-md 
  border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white font-medium">
          {t("order.order_btn")}
        </button>
      </div>

      {showSubmitButton && (
        <div>
          <button
            onClick={onSubmit}
            className="h-12 px-8 rounded-full bg-white/30 backdrop-blur-md 
  border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white font-medium">
            {t("order.done_btn")}
          </button>
        </div>
      )}
    </div>
  );
}

export default FormActions;