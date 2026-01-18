import { useState } from "react";
import { Input, Button, Table, Space, Pagination, message } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import CustomerActionBar from "./AdminCustomerComponent/CustomerActionBar";
import ConfirmDeleteCustomerModal from "./AdminCustomerComponent/ConfirmDeleteCustomerModal";
import ConfirmLockCustomerModal from "./AdminCustomerComponent/ConfirmLockCustomerModal";
import CustomersTable from "./AdminCustomerComponent/CustomersTable";
import DetailCustomerModal from "./AdminCustomerComponent/DetailCustomerModal";

function AdminCustomerContainer() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLockModalOpen, setIsLockModalOpen] = useState(false);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const { t } = useTranslation();

  // Dữ liệu mẫu cho từng danh mục
  const [data, setData] = useState([
    {
      key: 1,
      stt: 1,
      displayName: "Meomeo",
      username: "meomeo1234",
      phone: "0987654321",
      gender: "female",
      birthday: "2001-04-12",
      email: "meomeo1234@gmail.com",
      orders: 2,
      createdAt: "20/05/2025",
      totalAmount: "5,328,750đ",
      ordersDetail: [
        {
          key: 1,
          stt: 1,
          orderNumber: "ĐH001",
          date: "10/04/2025",
          total: "2,000,000đ",
        },
        {
          key: 2,
          stt: 2,
          orderNumber: "ĐH002",
          date: "02/05/2025",
          total: "3,328,750đ",
        },
      ],
    },
    {
      key: 2,
      stt: 2,
      displayName: "Mimi",
      username: "mimi123",
      orders: 1,
      createdAt: "18/06/2025",
      totalAmount: "1,200,000đ",
    },
  ]);

  const columns = [
    {
      title: t("adminCustomer.table.index"),
      dataIndex: "stt",
      key: "stt",
      width: 80,
    },
    {
      title: t("adminCustomer.table.display_name"),
      dataIndex: "displayName",
      key: "displayName",
    },
    {
      title: t("adminCustomer.table.username"),
      dataIndex: "username",
      key: "username",
    },
    {
      title: t("adminCustomer.table.orders_count"),
      dataIndex: "orders",
      key: "orders",
      width: 140,
    },
    {
      title: t("adminCustomer.table.created_at"),
      dataIndex: "createdAt",
      key: "createdAt",
      width: 180,
    },
    {
      title: t("adminCustomer.table.total_amount"),
      dataIndex: "totalAmount",
      key: "totalAmount",
      width: 160,
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
  };

  const handleRowClick = (record) => {
    setSelectedCustomer(record);
    setIsViewModalOpen(true);
  };

  const handleSave = () => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === selectedCustomer.key
          ? { ...selectedCustomer, avatar: avatarUrl }
          : item
      )
    );
    setIsEditing(false);
    message.success(t("adminCustomer.toast.update_success"));
  };

  const handleChange = (field, value) => {
    setSelectedCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const confirmDelete = () => {
    if (isViewModalOpen && selectedCustomer) {
      setIsDeleteModalOpen(false);
      requestAnimationFrame(() => {
        setData((prev) =>
          prev.filter((item) => item.key !== selectedCustomer.key)
        );
        setSelectedCustomer(null);
        setIsViewModalOpen(false);
        message.success(t("adminCustomer.toast.delete_success"));
      });
      return;
    }

    if (selectedRowKeys.length === 0) {
      message.warning(t("adminCustomer.toast.select_one_for_delete"));
      return;
    }

    const updatedData = data.filter(
      (item) => !selectedRowKeys.includes(item.key)
    );
    setData(updatedData);
    setSelectedRowKeys([]);
    setIsDeleteModalOpen(false);
    message.success(t("adminCustomer.toast.delete_success"));
  };

  const confirmLock = () => {
    if (isViewModalOpen) {
      message.success(t("adminCustomer.toast.delete_success"));
    }
    setIsLockModalOpen(false);
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
              {t("adminCustomer.title_manage", {
                category:
                  selectedCategory || t("adminCustomer.title_manage_default"),
              })}
            </h1>

            <CustomerActionBar
              t={t}
              onOpenDelete={() => setIsDeleteModalOpen(true)}
              onOpenLock={() => setIsLockModalOpen(true)}
            />

            <ConfirmDeleteCustomerModal
              t={t}
              open={isDeleteModalOpen}
              onCancel={() => setIsDeleteModalOpen(false)}
              onConfirm={confirmDelete}
            />

            <ConfirmLockCustomerModal
              t={t}
              open={isLockModalOpen}
              onCancel={() => setIsLockModalOpen(false)}
              onConfirm={confirmLock}
              isInDetail={isViewModalOpen}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}>
                <CustomersTable
                  columns={columns}
                  dataSource={data}
                  rowSelection={rowSelection}
                  onRowClick={handleRowClick}
                />
              </motion.div>
            </AnimatePresence>

            <DetailCustomerModal
              t={t}
              open={isViewModalOpen}
              onCancel={() => setIsViewModalOpen(false)}
              selectedCustomer={selectedCustomer}
              isEditing={isEditing}
              avatarUrl={avatarUrl}
              setAvatarUrl={setAvatarUrl}
              onToggleEditOrSave={() => {
                if (isEditing) handleSave();
                else setIsEditing(true);
              }}
              onOpenLock={() => setIsLockModalOpen(true)}
              onOpenDelete={() => setIsDeleteModalOpen(true)}
              onChangeField={handleChange}
            />

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
    </motion.div>
  );
}

export default AdminCustomerContainer;