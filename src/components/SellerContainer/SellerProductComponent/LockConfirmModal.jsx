import { Modal, Button } from "antd";

export default function LockConfirmModal({
  t,
  open,
  isSelectedLocked,
  onCancel,
  onConfirm,
}) {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={360}
      closable={false}
      className="text-center rounded-2xl">
      <p className="text-[#133e87] text-base font-medium mb-6 text-center">
        {isSelectedLocked
          ? t("adminProduct.confirm_unlock")
          : t("adminProduct.confirm_lock")}
      </p>

      <div className="flex justify-center gap-4">
        <Button
          type="primary"
          style={{
            backgroundColor: isSelectedLocked ? "#22c55e" : "#133e87",
            borderColor: isSelectedLocked ? "#22c55e" : "#133e87",
          }}
          onClick={onConfirm}>
          {isSelectedLocked
            ? t("adminProduct.btn_unlock_ok")
            : t("adminProduct.btn_lock_ok")}
        </Button>

        <Button
          className="px-6 py-1 rounded-full font-medium"
          style={{ borderColor: "#133e87", color: "#133e87" }}
          onClick={onCancel}>
          {t("adminProduct.btn_cancel")}
        </Button>
      </div>
    </Modal>
  );
}