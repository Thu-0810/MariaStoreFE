import { useState } from "react";
import { Pagination, message, Tag } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import OrderActionBar from "./SellerOrderComponent/OrderActionBar";
import ConfirmDeleteOrderModal from "./SellerOrderComponent/ConfirmDeleteOrderModal";
import OrderDetailModal from "./SellerOrderComponent/OrderDetailModal";
import OrdersTable from "./SellerOrderComponent/OrdersTable";
import OrderIncompleteModal from "./SellerOrderComponent/OrderIncompleteModal";

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

  const confirmDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning(t("adminOrder.toast.select_one_for_delete"));
      return;
    }
    const updatedData = data.filter(
      (item) => !selectedRowKeys.includes(item.key)
    );
    setData(updatedData);
    setSelectedRowKeys([]);
    setIsDeleteModalOpen(false);
    message.success(t("adminOrder.toast.delete_success"));
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

            <OrderActionBar
              t={t}
              onOpenDelete={() => setIsDeleteModalOpen(true)}
              onEdit={() => {}}
            />

            <ConfirmDeleteOrderModal
              t={t}
              open={isDeleteModalOpen}
              onCancel={() => setIsDeleteModalOpen(false)}
              onConfirm={confirmDelete}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={"orders"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}>
                <OrdersTable
                  columns={columns}
                  dataSource={data}
                  rowSelection={rowSelection}
                  onRowClick={handleRowClick}
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

      <OrderDetailModal
        t={t}
        i18n={i18n}
        open={isDetailModalOpen}
        onCancel={() => setIsDetailModalOpen(false)}
        selectedOrder={selectedOrder}
        products={products}
        totalAmount={totalAmount}
      />

      <OrderIncompleteModal
        t={t}
        open={isIncompleteModalOpen}
        onCancel={() => setIsIncompleteModalOpen(false)}
        selectedOrder={selectedOrder}
      />
    </motion.div>
  );
}

export default SellerOrderContainer;