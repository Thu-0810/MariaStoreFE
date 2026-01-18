import { Modal, Button } from "antd";
import { motion, AnimatePresence } from "framer-motion";

export default function OrderDetailModal({
  t,
  i18n,
  open,
  onCancel,
  selectedOrder,
  products,
  totalAmount,
}) {
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
      }}>
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
            }}>
            <div className="p-8">
              <div className="mb-6">
                <h2 className="text-[#133e87] text-lg font-semibold mb-1">
                  {t("adminOrder.modal.detail_title_done")}
                </h2>
                <p className="text-sm text-[#608bc1]">
                  26.7.2025 • {t("adminOrder.table.order_code")}{" "}
                  {selectedOrder?.orderCode}
                </p>
              </div>

              <div className="bg-white/40 rounded-2xl p-4 mb-6">
                <h3 className="text-sm font-semibold text-[#133e87] mb-4">
                  {t("adminOrder.modal.product_list")}
                </h3>
                <div className="space-y-4">
                  {products.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: product.id * 0.05 }}
                      className="flex items-center justify-between pb-3 border-b border-[#e6effa]">
                      <div className="flex items-center gap-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 rounded-lg object-cover shadow-sm"
                        />
                        <div>
                          <p className="font-medium text-[#133e87]">
                            {product.name}
                          </p>
                          <p className="text-xs text-[#608bc1]">JPG File</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[#608bc1] mb-1">
                          x{product.quantity}
                        </p>
                        <p className="font-semibold text-[#133e87]">
                          {(product.price * product.quantity).toLocaleString(
                            "vi-VN"
                          )}
                          đ
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
                  {totalAmount.toLocaleString(
                    i18n.language === "vi" ? "vi-VN" : "en-US"
                  )}
                  {t("adminOrder.currency_suffix")}
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
                  {selectedOrder?.invoiceCode}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#608bc1]">
                  {t("adminOrder.modal.payment_method")}
                </span>
                <span className="font-medium text-[#133e87]">
                  {selectedOrder?.paymentMethod}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#608bc1]">
                  {t("adminOrder.modal.paid_time")}
                </span>
                <span className="font-medium text-[#133e87]">
                  26/7/2025 4:10PM
                </span>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center gap-6 mt-10">
                <Button
                  type="primary"
                  shape="round"
                  size="large"
                  style={{
                    backgroundColor: "#ff7383",
                    borderColor: "#ff7383",
                    width: 160,
                  }}>
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
                  }}>
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