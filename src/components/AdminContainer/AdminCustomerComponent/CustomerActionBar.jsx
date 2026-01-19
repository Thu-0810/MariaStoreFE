import { Input, Button, Space, Select } from "antd";

export default function CustomerActionBar({
  t,
  onOpenDelete,
  onOpenLock,
  searchValue,
  onSearchChange,
  statusValue,
  onStatusChange,
}) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex-1 flex gap-3">
        <Input
          placeholder={t("adminCustomer.search_placeholder")}
          className="max-w-xs"
          style={{ borderColor: "#cbdceb" }}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          allowClear
        />

        <Select
          className="w-40"
          value={statusValue}
          onChange={onStatusChange}
          allowClear
          placeholder={t("adminCustomer.filter_status") || "Status"}
          options={[
            { value: "ACTIVE", label: t("adminCustomer.status_active") },
            { value: "LOCKED", label: t("adminCustomer.status_locked") },
          ]}
        />
      </div>

      <Space>
        <Button
          danger
          type="primary"
          style={{ backgroundColor: "#ff7383", borderColor: "#ff7383" }}
          onClick={onOpenDelete}>
          {t("adminCustomer.btn_delete")}
        </Button>

        {/* <button
          onClick={onOpenLock}
          className="border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-6 sm:px-8 py-1 text-sm sm:text-base font-medium rounded-lg transition-colors">
          {t("adminCustomer.btn_lock")}
        </button> */}
      </Space>
    </div>
  );
}