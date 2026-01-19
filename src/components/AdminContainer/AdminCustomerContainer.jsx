import { useEffect, useState } from "react";
import { Pagination, message } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

import CustomerActionBar from "./AdminCustomerComponent/CustomerActionBar";
import ConfirmDeleteCustomerModal from "./AdminCustomerComponent/ConfirmDeleteCustomerModal";
import ConfirmLockCustomerModal from "./AdminCustomerComponent/ConfirmLockCustomerModal";
import CustomersTable from "./AdminCustomerComponent/CustomersTable";
import DetailCustomerModal from "./AdminCustomerComponent/DetailCustomerModal";

import {
  getAdminUsersApi,
  getAdminUserByIdApi,
  updateAdminUserApi,
  lockAdminUserApi,
  unlockAdminUserApi,
  deleteAdminUserApi,
} from "../../api/adminUserApi";
const BASE_BACKEND = "http://localhost:8080";

const toCustomerUI = (u, stt) => {
  const createdAt = u?.createdAt ? dayjs(u.createdAt).format("DD/MM/YYYY") : "";

  const rawAvatarUrl = u?.avatarUrl || "";
  const fullAvatar =
    rawAvatarUrl && !rawAvatarUrl.startsWith("http")
      ? `${BASE_BACKEND}${rawAvatarUrl}`
      : rawAvatarUrl;

  return {
    key: u.id,
    id: u.id,
    stt,

    displayName: u.fullName || "",
    username: "",

    phone: u.phone || "",
    gender: u.gender || "",
    birthday: u.dateOfBirth ? dayjs(u.dateOfBirth).format("YYYY-MM-DD") : null,
    email: u.email || "",

    orders: 0,
    totalAmount: "",
    ordersDetail: [],

    createdAt,

    address: u.address || "",
    isVerified: !!u.isVerified,
    status: u.status || "ACTIVE",
    roles: u.roles || [],
    avatarUrl: rawAvatarUrl || "",
    avatarFullUrl: fullAvatar || "",
  };
};

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

  const [searchValue, setSearchValue] = useState("");
  const [statusValue, setStatusValue] = useState(undefined);

  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const pageSize = 10;

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
      title: t("adminCustomer.table.birthday") || "Ngày sinh",
      dataIndex: "birthday",
      key: "birthday",
      width: 140,
      render: (val) => (val ? dayjs(val).format("DD/MM/YYYY") : ""),
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

  const fetchUsers = async () => {
    try {
      const res = await getAdminUsersApi({
        q: searchValue?.trim() || undefined,
        status: statusValue || undefined,
        page: currentPage - 1,
        size: pageSize,
        sort: "createdAt,desc",
      });

      const page = res.data;
      const mapped = (page.content || []).map((u, idx) =>
        toCustomerUI(u, (currentPage - 1) * pageSize + idx + 1)
      );

      setData(mapped);
      setTotal(page.totalElements || 0);
    } catch (err) {
      message.error(
        "Không tải được danh sách user (kiểm tra token/role ADMIN)."
      );
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchValue, statusValue]);

  const handleRowClick = async (record) => {
    try {
      const res = await getAdminUserByIdApi(record.id);
      const u = res.data;

      const ui = toCustomerUI(u, record.stt);

      setSelectedCustomer((prev) => ({
        ...(prev || record),
        ...ui,

        orders: (prev || record)?.orders || 0,
        totalAmount: (prev || record)?.totalAmount || "",
        ordersDetail: (prev || record)?.ordersDetail || [],
      }));

      const full =
        ui.avatarUrl && !ui.avatarUrl.startsWith("http")
          ? `${BASE_BACKEND}${ui.avatarUrl}`
          : ui.avatarUrl;
      setAvatarUrl(full || null);

      setIsViewModalOpen(true);
      setIsEditing(false);
    } catch (err) {
      setSelectedCustomer(record);
      setAvatarUrl(record?.avatarFullUrl || null);
      setIsViewModalOpen(true);
      setIsEditing(false);
    }
  };

  const handleChange = (field, value) => {
    setSelectedCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!selectedCustomer?.id) return;

    try {
      await updateAdminUserApi(selectedCustomer.id, {
        fullName: selectedCustomer.displayName || null,
        phone: selectedCustomer.phone || null,
        address: selectedCustomer.address || null,
        gender: selectedCustomer.gender || null,
        dateOfBirth: selectedCustomer.birthday || null,
        avatarUrl: selectedCustomer.avatarUrl || null,
        isVerified: selectedCustomer.isVerified ?? false,
        status: selectedCustomer.status || "ACTIVE",
      });

      setIsEditing(false);
      message.success(t("adminCustomer.toast.update_success"));

      await fetchUsers();

      try {
        const res = await getAdminUserByIdApi(selectedCustomer.id);
        const u = res.data;
        const ui = toCustomerUI(u, selectedCustomer.stt || 1);

        setSelectedCustomer((prev) => ({
          ...(prev || {}),
          ...ui,
          orders: prev?.orders || 0,
          totalAmount: prev?.totalAmount || "",
          ordersDetail: prev?.ordersDetail || [],
        }));

        const full =
          ui.avatarUrl && !ui.avatarUrl.startsWith("http")
            ? `${BASE_BACKEND}${ui.avatarUrl}`
            : ui.avatarUrl;
        setAvatarUrl(full || null);
      } catch (_) {}
    } catch (err) {
      message.error("Cập nhật thất bại.");
    }
  };

  const confirmDelete = async () => {
    try {
      if (isViewModalOpen && selectedCustomer?.id) {
        await deleteAdminUserApi(selectedCustomer.id);

        setIsDeleteModalOpen(false);
        setIsViewModalOpen(false);
        setSelectedCustomer(null);
        setAvatarUrl(null);

        message.success(t("adminCustomer.toast.delete_success"));
        await fetchUsers();
        return;
      }

      if (selectedRowKeys.length === 0) {
        message.warning(t("adminCustomer.toast.select_one_for_delete"));
        return;
      }

      await Promise.all(selectedRowKeys.map((id) => deleteAdminUserApi(id)));
      setSelectedRowKeys([]);
      setIsDeleteModalOpen(false);

      message.success(t("adminCustomer.toast.delete_success"));
      await fetchUsers();
    } catch (err) {
      message.error("Xóa thất bại.");
    }
  };

  const confirmLock = async () => {
    try {
      if (isViewModalOpen && selectedCustomer?.id) {
        if (selectedCustomer.status === "LOCKED") {
          await unlockAdminUserApi(selectedCustomer.id);
          message.success("Đã mở khóa");
        } else {
          await lockAdminUserApi(selectedCustomer.id);
          message.success("Đã khóa");
        }

        setIsLockModalOpen(false);
        await fetchUsers();

        try {
          const res = await getAdminUserByIdApi(selectedCustomer.id);
          const u = res.data;
          const ui = toCustomerUI(u, selectedCustomer.stt || 1);

          setSelectedCustomer((prev) => ({
            ...(prev || {}),
            ...ui,
            orders: prev?.orders || 0,
            totalAmount: prev?.totalAmount || "",
            ordersDetail: prev?.ordersDetail || [],
          }));

          const full =
            ui.avatarUrl && !ui.avatarUrl.startsWith("http")
              ? `${BASE_BACKEND}${ui.avatarUrl}`
              : ui.avatarUrl;
          setAvatarUrl(full || null);
        } catch (_) {}

        return;
      }

      if (selectedRowKeys.length === 0) {
        message.warning("Chọn ít nhất 1 user để khóa");
        return;
      }

      await Promise.all(selectedRowKeys.map((id) => lockAdminUserApi(id)));
      setSelectedRowKeys([]);
      setIsLockModalOpen(false);

      message.success("Đã khóa các user đã chọn");
      await fetchUsers();
    } catch (err) {
      message.error("Khóa/Mở khóa thất bại.");
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
              {t("adminCustomer.title_manage", {
                category:
                  selectedCategory || t("adminCustomer.title_manage_default"),
              })}
            </h1>

            <CustomerActionBar
              t={t}
              onOpenDelete={() => setIsDeleteModalOpen(true)}
              onOpenLock={() => setIsLockModalOpen(true)}
              searchValue={searchValue}
              onSearchChange={(val) => {
                setSearchValue(val);
                setCurrentPage(1);
              }}
              statusValue={statusValue}
              onStatusChange={(val) => {
                setStatusValue(val);
                setCurrentPage(1);
              }}
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
              isLocked={selectedCustomer?.status === "LOCKED"}
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
              onCancel={() => {
                setIsViewModalOpen(false);
                setIsEditing(false);
              }}
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
                total={total}
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