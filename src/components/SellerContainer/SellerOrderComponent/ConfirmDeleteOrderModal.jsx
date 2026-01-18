import { Modal, Button } from "antd";

export default function ConfirmDeleteOrderModal({
  t,
  open,
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
      <p className="text-[#133e87] text-base text-center font-medium mb-6">
        {t("adminOrder.modal.delete_confirm")}
      </p>

      <div className="flex justify-center gap-4">
        <Button
          type="primary"
          danger
          className="px-6 py-1 rounded-full text-white font-medium"
          style={{ backgroundColor: "#ff7383", borderColor: "#ff7383" }}
          onClick={onConfirm}>
          {t("adminOrder.btn.delete")}
        </Button>

        <Button
          className="px-6 py-1 rounded-full font-medium"
          style={{ borderColor: "#133e87", color: "#133e87" }}
          onClick={onCancel}>
          {t("adminOrder.btn.cancel")}
        </Button>
      </div>
    </Modal>
  );
}