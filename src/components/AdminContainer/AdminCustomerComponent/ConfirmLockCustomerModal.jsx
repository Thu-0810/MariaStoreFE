import { Modal, Button } from "antd";

export default function ConfirmLockCustomerModal({
  t,
  open,
  onCancel,
  onConfirm,
  isLocked,
}) {
  const titleText = isLocked
    ? t("adminCustomer.confirm_unlock") || "Xác nhận mở khóa tài khoản này?"
    : t("adminCustomer.confirm_lock") || "Xác nhận khóa tài khoản này?";

  const okText = isLocked
    ? t("adminCustomer.btn_unlock_ok") || "Mở khóa"
    : t("adminCustomer.btn_lock_ok") || "Khóa";

  const okStyle = isLocked
    ? { backgroundColor: "#22c55e", borderColor: "#22c55e" }
    : { backgroundColor: "#133e87", borderColor: "#133e87" };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={360}
      closable={false}
      className="text-center rounded-2xl">
      <p className="text-[#133e87] text-base text-center font-medium mb-6">
        {titleText}
      </p>

      <div className="flex justify-center gap-4">
        <Button
          type="primary"
          className="px-6 py-1 rounded-full text-white font-medium"
          style={okStyle}
          onClick={onConfirm}>
          {okText}
        </Button>

        <Button
          className="px-6 py-1 rounded-full font-medium"
          style={{ borderColor: "#133e87", color: "#133e87" }}
          onClick={onCancel}>
          {t("adminCustomer.btn_cancel") || "Hủy"}
        </Button>
      </div>
    </Modal>
  );
}