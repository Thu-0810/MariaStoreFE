import { Modal, Button } from "antd";

export default function OrderIncompleteModal({
  t,
  open,
  onCancel,
  selectedOrder,
}) {
  return (
    <Modal open={open} onCancel={onCancel} footer={null} centered width={420}>
      <h3 className="text-[#133e87] font-semibold mb-2">
        {t("adminOrder.status.incomplete")}
      </h3>
      <p className="text-[#608bc1] mb-4">
        {t("adminOrder.table.order_code")} {selectedOrder?.orderCode}
      </p>

      <div className="flex justify-end gap-3">
        <Button onClick={onCancel}>{t("adminOrder.btn.cancel")}</Button>
        <Button
          type="primary"
          style={{ backgroundColor: "#133e87", borderColor: "#133e87" }}>
          OK
        </Button>
      </div>
    </Modal>
  );
}