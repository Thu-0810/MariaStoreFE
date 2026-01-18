import { Input, Button, Space } from "antd";

export default function ActionBar({
  t,
  isSelectedLocked,
  onOpenDelete,
  onOpenLock,
  onOpenCreate,
}) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex-1">
        <Input
          placeholder={t("adminProduct.search_placeholder")}
          className="max-w-xs"
          style={{ borderColor: "#cbdceb" }}
        />
      </div>

      <Space>
        <Button
          danger
          type="primary"
          style={{ backgroundColor: "#ff7383", borderColor: "#ff7383" }}
          onClick={onOpenDelete}>
          {t("adminProduct.btn_delete")}
        </Button>

        <button
          onClick={onOpenLock}
          className="border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-6 py-1 rounded-lg">
          {isSelectedLocked
            ? t("adminProduct.btn_unlock")
            : t("adminProduct.btn_lock")}
        </button>

        <button
          type="button"
          onClick={onOpenCreate}
          className="border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-6 sm:px-4 py-1 text-sm sm:text-base font-medium rounded-lg transition-colors">
          {t("adminProduct.btn_add")}
        </button>
      </Space>
    </div>
  );
}