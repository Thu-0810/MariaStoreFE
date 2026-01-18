import { Modal, Button } from "antd";

export default function ConfirmLockCustomerModal({
  t,
  open,
  onCancel,
  onConfirm,
  isInDetail,
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
      <p className="text-[#133e87] text-base text-center font-medium mb-6">
        {t("adminCustomer.confirm_lock")}
      </p>

      <div className="flex justify-center gap-4">
        <Button
          type="primary"
          className="px-6 py-1 rounded-full text-white font-medium"
          style={{ backgroundColor: "#133e87", borderColor: "#133e87" }}
          onClick={onConfirm}>
          {isInDetail
            ? t("adminCustomer.btn_delete_ok")
            : t("adminCustomer.btn_lock_ok")}
        </Button>

        <Button
          className="px-6 py-1 rounded-full font-medium"
          style={{ borderColor: "#133e87", color: "#133e87" }}
          onClick={onCancel}>
          {t("adminCustomer.btn_cancel")}
        </Button>
      </div>
    </Modal>
  );
}