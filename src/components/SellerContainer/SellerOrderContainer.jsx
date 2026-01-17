import { useState } from "react";
import {
  Input,
  Button,
  Table,
  Space,
  Pagination,
  Modal,
  message,
  Tag,
} from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

// Dữ liệu sản phẩm mẫu
const products = [
  {
    id: 1,
    name: '"Trời sao"',
    image: "src/assets/img/Illustration309.jpg",
    price: 2614500,
    quantity: 1,
  },
  {
    id: 2,
    name: "Nhân dân ôm",
    image: "src/assets/img/Illustration80.1.jpg",
    price: 392850,
    quantity: 1,
  },
  {
    id: 3,
    name: "Fanart Shishigami Leona",
    image: "src/assets/img/Illustration153.jpg",
    price: 723800,
    quantity: 1,
  },
  {
    id: 4,
    name: '"Chúc may mắn"',
    image: "src/assets/img/Illustration314.jpg",
    price: 1047600,
    quantity: 1,
  },
];

function SellerOrderContainer() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isIncompleteModalOpen, setIsIncompleteModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState([]);

  const { t, i18n } = useTranslation();

  const isCompleted = (s) => s === "Hoàn thành" || s === "Completed";

  const getStatusLabel = (s) =>
    isCompleted(s)
      ? t("adminOrder.status.completed")
      : t("adminOrder.status.incomplete");

  const [data, setData] = useState([
    {
      key: 1,
      stt: 1,
      orderCode: "#AA57069441",
      invoiceCode: "HD6941",
      paymentMethod: "Thanh toán qua ngân hàng",
      totalAmount: "4.729.750đ",
      status: "Hoàn thành",
    },
    {
      key: 2,
      stt: 2,
      orderCode: "#AA14758242",
      invoiceCode: "HD5240",
      paymentMethod: "Thanh toán qua ngân hàng",
      totalAmount: "886.000đ",
      status: "Chưa hoàn thành",
    },
    {
      key: 3,
      stt: 3,
      orderCode: "#AA23085762",
      invoiceCode: "HD5872",
      paymentMethod: "Thanh toán khi nhận hàng",
      totalAmount: "1.720.000đ",
      status: "Hoàn thành",
    },
  ]);

  const totalAmount = products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  const columns = [
    {
      title: t("adminOrder.table.index"),
      dataIndex: "stt",
      key: "stt",
      width: 80,
    },
    {
      title: t("adminOrder.table.order_code"),
      dataIndex: "orderCode",
      key: "orderCode",
    },
    {
      title: t("adminOrder.table.invoice_code"),
      dataIndex: "invoiceCode",
      key: "invoiceCode",
    },
    {
      title: t("adminOrder.table.payment_method"),
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: t("adminOrder.table.total_amount"),
      dataIndex: "totalAmount",
      key: "totalAmount",
      width: 160,
    },
    {
      title: t("adminOrder.table.status"),
      dataIndex: "status",
      key: "status",
      width: 180,
      render: (status) => (
        <Tag
          color={isCompleted(status) ? "green" : "volcano"}
          className="font-medium px-3 py-1 rounded-full">
          {getStatusLabel(status)}
        </Tag>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
  };

  // Khi click vào một dòng
  const handleRowClick = (record) => {
    setSelectedOrder(record);
    if (record.status === "Hoàn thành") {
      setIsDetailModalOpen(true);
    } else {
      setIsIncompleteModalOpen(true);
    }
  };

  return (
    <motion.div
      className="min-h-screen relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}>
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/src/assets/img/Illustration265.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[3px]" />

      <div className="relative z-10 mt-20">
        <motion.div
          className="px-6 pb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}>
          <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8">
            <h1 className="text-[#133e87] text-3xl font-bold text-center mb-6">
              {t("adminOrder.title")}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder={t("adminOrder.search_placeholder")}
                  className="max-w-xs"
                  style={{ borderColor: "#cbdceb" }}
                />
              </div>

              <Space>
                <Button
                  danger
                  type="primary"
                  style={{ backgroundColor: "#ff7383", borderColor: "#ff7383" }}
                  onClick={() => setIsDeleteModalOpen(true)}>
                  {t("adminOrder.btn_delete")}
                </Button>

                {/* MODAL XÓA */}
                <Modal
                  open={isDeleteModalOpen}
                  onCancel={() => setIsDeleteModalOpen(false)}
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
                      style={{
                        backgroundColor: "#ff7383",
                        borderColor: "#ff7383",
                      }}
                      onClick={() => {
                        if (selectedRowKeys.length === 0) {
                          message.warning(
                            t("adminOrder.toast.select_one_for_delete")
                          );
                          return;
                        }
                        const updatedData = data.filter(
                          (item) => !selectedRowKeys.includes(item.key)
                        );
                        setData(updatedData);
                        setSelectedRowKeys([]);
                        setIsDeleteModalOpen(false);
                        message.success(t("adminOrder.toast.delete_success"));
                      }}>
                      {t("adminOrder.btn.delete")}
                    </Button>

                    <Button
                      className="px-6 py-1 rounded-full font-medium"
                      style={{ borderColor: "#133e87", color: "#133e87" }}
                      onClick={() => setIsDeleteModalOpen(false)}>
                      {t("adminOrder.btn.cancel")}
                    </Button>
                  </div>
                </Modal>
                <button className="border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-6 sm:px-4 py-1 text-sm sm:text-base font-medium rounded-lg transition-colors">
                  {t("adminOrder.btn_edit")}
                </button>
              </Space>
            </div>

            {/* Bảng đơn hàng */}
            <AnimatePresence mode="wait">
              <motion.div
                key={"orders"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}>
                <Table
                  columns={columns}
                  dataSource={data}
                  rowSelection={rowSelection}
                  pagination={false}
                  onRow={(record) => ({
                    onClick: () => handleRowClick(record),
                  })}
                  className="custom-table cursor-pointer"
                />
              </motion.div>
            </AnimatePresence>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <Pagination
                current={currentPage}
                total={100}
                pageSize={10}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
                className="custom-ant-pagination"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* MODAL CHI TIẾT ĐƠN HÀNG */}
      <Modal
        open={isDetailModalOpen}
        onCancel={() => setIsDetailModalOpen(false)}
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
          {isDetailModalOpen && (
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
                {/* Header */}
                <div className="mb-6">
                  <h2 className="text-[#133e87] text-lg font-semibold mb-1">
                    {t("adminOrder.modal.detail_title_done")}
                  </h2>
                  <p className="text-sm text-[#608bc1]">
                    26.7.2025 • {t("adminOrder.table.order_code")}{" "}
                    {selectedOrder.orderCode}
                  </p>
                </div>

                {/* Danh sách sản phẩm */}
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

                {/* Tổng tiền */}
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

                {/* Chi tiết hóa đơn */}
                <h3 className="text-sm font-semibold text-[#133e87] mb-4">
                  {t("adminOrder.modal.order_detail")}
                </h3>

                <div className="flex justify-between">
                  <span className="text-[#608bc1]">
                    {t("adminOrder.modal.invoice_code")}
                  </span>
                  <span className="font-medium text-[#133e87]">
                    {selectedOrder.invoiceCode}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#608bc1]">
                    {t("adminOrder.modal.payment_method")}
                  </span>
                  <span className="font-medium text-[#133e87]">
                    {selectedOrder.paymentMethod}
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

                {/* Nút hành động */}
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
    </motion.div>
  );
}

export default SellerOrderContainer;