import { Input, Button, Space } from "antd";

export default function OrderActionBar({
  t,
  onOpenDelete,
  onEdit,
  searchValue,
  onSearchChange,
}) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex-1">
        <Input
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t("adminOrder.search_placeholder")}
          className="max-w-xs"
          style={{ borderColor: "#cbdceb" }}
          allowClear
        />
      </div>

      <Space>
        <Button
          danger
          type="primary"
          style={{ backgroundColor: "#ff7383", borderColor: "#ff7383" }}
          onClick={onOpenDelete}>
          {t("adminOrder.btn_delete")}
        </Button>

        <button
          onClick={onEdit}
          className="border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-6 sm:px-4 py-1 text-sm sm:text-base font-medium rounded-lg transition-colors">
          {t("adminOrder.btn_edit")}
        </button>
      </Space>
    </div>
  );
}