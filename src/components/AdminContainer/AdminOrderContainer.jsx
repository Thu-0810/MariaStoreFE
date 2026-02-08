import { useEffect, useMemo, useState } from "react";
import { Pagination, message, Tag } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

import {
  deleteAdminOrdersApi,
  getAdminOrderDetailApi,
  getAdminOrdersPagedApi,
  openAdminOrderInvoicePdf,
} from "../../api/adminOrderApi";

import OrderActionBar from "./AdminOrderComponent/OrderActionBar";
import ConfirmDeleteOrderModal from "./AdminOrderComponent/ConfirmDeleteOrderModal";
import OrderDetailModal from "./AdminOrderComponent/OrderDetailModal";
import OrdersTable from "./AdminOrderComponent/OrdersTable";
import OrderIncompleteModal from "./AdminOrderComponent/OrderIncompleteModal";

function AdminOrderContainer() {
  const { t, i18n } = useTranslation();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isIncompleteModalOpen, setIsIncompleteModalOpen] = useState(false);

  const [selectedOrderRow, setSelectedOrderRow] = useState(null);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState(null);

  const [keyword, setKeyword] = useState("");
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);

  const isCompleted = (statusEnum) => statusEnum === "COMPLETED";

  const getStatusLabel = (statusEnum) =>
    isCompleted(statusEnum)
      ? t("adminOrder.status.completed")
      : t("adminOrder.status.incomplete");

  const formatMoneyShort = (value) => {
    if (value == null) return "";
    const locale = i18n.language === "vi" ? "vi-VN" : "en-US";
    return (
      new Intl.NumberFormat(locale).format(value) +
      t("adminOrder.currency_suffix")
    );
  };

  const columns = useMemo(
    () => [
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
        dataIndex: "totalAmountText",
        key: "totalAmountText",
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
            className="font-medium px-3 py-1 rounded-full"
          >
            {getStatusLabel(status)}
          </Tag>
        ),
      },
    ],
    [t, i18n.language]
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const res = await getAdminOrdersPagedApi({
          page: currentPage,
          size: pageSize,
          sort: "createdAt,desc",
          keyword: keyword?.trim() || null,
          status: null,
        });

        const content = res.data?.content || [];
        const mapped = content.map((x, idx) => ({
          ...x,
          stt: (currentPage - 1) * pageSize + idx + 1,
          totalAmountText: formatMoneyShort(x.totalAmount),
        }));

        setData(mapped);
        setTotal(res.data?.totalElements || 0);
      } catch (e) {
        message.error(t("adminOrder.toast.load_failed"));
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [currentPage, keyword, i18n.language, t]);

  const handleRowClick = async (record) => {
    setSelectedOrderRow(record);

    if (!isCompleted(record.status)) {
      setIsIncompleteModalOpen(true);
      return;
    }

    try {
      const res = await getAdminOrderDetailApi(record.id);
      setSelectedOrderDetail(res.data);
      setIsDetailModalOpen(true);
    } catch (e) {
      message.error(t("adminOrder.toast.load_detail_failed"));
    }
  };

  const confirmDelete = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning(t("adminOrder.toast.select_one_for_delete"));
      return;
    }

    try {
      await deleteAdminOrdersApi(selectedRowKeys);
      message.success(t("adminOrder.toast.delete_success"));

      setSelectedRowKeys([]);
      setIsDeleteModalOpen(false);

      const res = await getAdminOrdersPagedApi({
        page: currentPage,
        size: pageSize,
        sort: "createdAt,desc",
        keyword: keyword?.trim() || null,
        status: null,
      });

      const content = res.data?.content || [];
      const mapped = content.map((x, idx) => ({
        ...x,
        stt: (currentPage - 1) * pageSize + idx + 1,
        totalAmountText: formatMoneyShort(x.totalAmount),
      }));

      setData(mapped);
      setTotal(res.data?.totalElements || 0);
    } catch (e) {
      message.error(t("adminOrder.toast.delete_failed"));
    }
  };

  const handlePrintInvoice = async () => {
    const orderId = selectedOrderDetail?.id;
    if (!orderId) return;

    try {
      await openAdminOrderInvoicePdf(orderId);
    } catch (e) {
      message.error(t("adminOrder.toast.print_invoice_failed"));
    }
  };

  return (
    <motion.div
      className="min-h-screen relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
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
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8">
            <h1 className="text-[#133e87] text-3xl font-bold text-center mb-6">
              {t("adminOrder.title")}
            </h1>

            <OrderActionBar
              t={t}
              onOpenDelete={() => setIsDeleteModalOpen(true)}
              onEdit={() => {}}
              searchValue={keyword}
              onSearchChange={(v) => {
                setCurrentPage(1);
                setKeyword(v);
              }}
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
                transition={{ duration: 0.4 }}
              >
                <OrdersTable
                  columns={columns}
                  dataSource={data}
                  rowSelection={rowSelection}
                  onRowClick={handleRowClick}
                />
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-8">
              <Pagination
                current={currentPage}
                total={total}
                pageSize={pageSize}
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
        orderDetail={selectedOrderDetail}
        onDeleteInvoice={() => {}}
        onPrintInvoice={handlePrintInvoice}
      />

      <OrderIncompleteModal
        t={t}
        open={isIncompleteModalOpen}
        onCancel={() => setIsIncompleteModalOpen(false)}
        selectedOrder={{
          orderCode: selectedOrderRow?.orderCode,
        }}
      />
    </motion.div>
  );
}

export default AdminOrderContainer;