import { Modal, Button } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { toServerUrl } from "../../../utils/url";

export default function OrderDetailModal({
  t,
  i18n,
  open,
  onCancel,
  orderDetail,
  onDeleteInvoice,
  onPrintInvoice,
}) {
  const items = orderDetail?.items || [];

  const formatMoney = (value) => {
    if (value == null) return "";
    const locale = i18n.language === "vi" ? "vi-VN" : "en-US";
    return (
      new Intl.NumberFormat(locale).format(value) +
      t("adminOrder.currency_suffix")
    );
  };

  const formatDateTime = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleString(i18n.language === "vi" ? "vi-VN" : "en-US");
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={720}
      closable={true}
      className="rounded-3xl overflow-hidden p-0"
      maskStyle={{
        backdropFilter: "blur(3px)",
        backgroundColor: "rgba(255,255,255,0.4)",
      }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            key="orderDetail"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative rounded-3xl overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(243,248,255,0.96) 100%)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="p-8">
              <div className="mb-6">
                <h2 className="text-[#133e87] text-lg font-semibold mb-1">
                  {t("adminOrder.modal.detail_title_done")}
                </h2>
                <p className="text-sm text-[#608bc1]">
                  {formatDateTime(orderDetail?.createdAt)} •{" "}
                  {t("adminOrder.table.order_code")} {orderDetail?.orderCode}
                </p>
              </div>

              <div className="bg-white/40 rounded-2xl p-4 mb-6">
                <h3 className="text-sm font-semibold text-[#133e87] mb-4">
                  {t("adminOrder.modal.product_list")}
                </h3>

                <div className="space-y-4">
                  {items.map((it, idx) => (
                    <motion.div
                      key={it.productId ?? idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="flex items-center justify-between pb-3 border-b border-[#e6effa]"
                    >
                      <div className="flex items-center gap-4">
                        {it.thumbnailUrl ? (
                          <img
                            src={toServerUrl(it.thumbnailUrl)}
                            alt={it.productName || ""}
                            className="w-16 h-16 rounded-lg object-cover shadow-sm"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                            {t("store.misc.no_image")}
                          </div>
                        )}

                        <div>
                          <p className="font-medium text-[#133e87]">
                            {it.productName}
                          </p>
                          <p className="text-xs text-[#608bc1]">
                            {it.fileFormat
                              ? t("adminOrder.modal.file_format", {
                                  format: it.fileFormat,
                                })
                              : ""}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-[#608bc1] mb-1">
                          {t("adminOrder.modal.qty_prefix", { count: it.quantity ?? 0 })}
                        </p>
                        <p className="font-semibold text-[#133e87]">
                          {formatMoney((it.unitPrice || 0) * (it.quantity || 0))}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#d9eafd]">
                <p className="font-semibold text-[#133e87]">
                  {t("adminOrder.modal.total")}
                </p>
                <p className="font-bold text-lg text-[#133e87]">
                  {formatMoney(orderDetail?.totalAmount)}
                </p>
              </div>

              <h3 className="text-sm font-semibold text-[#133e87] mb-4">
                {t("adminOrder.modal.order_detail")}
              </h3>

              <div className="flex justify-between">
                <span className="text-[#608bc1]">
                  {t("adminOrder.modal.invoice_code")}
                </span>
                <span className="font-medium text-[#133e87]">
                  {orderDetail?.invoiceCode}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#608bc1]">
                  {t("adminOrder.modal.payment_method")}
                </span>
                <span className="font-medium text-[#133e87]">
                  {orderDetail?.paymentMethod}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#608bc1]">
                  {t("adminOrder.modal.paid_time")}
                </span>
                <span className="font-medium text-[#133e87]">
                  {formatDateTime(orderDetail?.paidAt)}
                </span>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center gap-6 mt-10"
              >
                <Button
                  type="primary"
                  shape="round"
                  size="large"
                  style={{
                    backgroundColor: "#ff7383",
                    borderColor: "#ff7383",
                    width: 160,
                  }}
                  onClick={onDeleteInvoice}
                >
                  {t("adminOrder.btn.delete_invoice")}
                </Button>
                <Button
                  type="primary"
                  shape="round"
                  size="large"
                  style={{
                    backgroundColor: "#133e87",
                    borderColor: "#133e87",
                    width: 160,
                  }}
                  onClick={onPrintInvoice}
                  disabled={!orderDetail?.id}
                >
                  {t("adminOrder.btn.print_invoice")}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
}