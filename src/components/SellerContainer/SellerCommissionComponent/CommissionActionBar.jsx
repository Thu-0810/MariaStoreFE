import { Input, Button, Space } from "antd";

export default function CommissionActionBar({ t, onOpenDelete, onEdit }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex-1">
        <Input
          placeholder={t("adminOrder.search_placeholder")}
          className="max-w-xs"
          style={{ borderColor: "#cbdceb" }}
        />
      </div>
    </div>
  );
}