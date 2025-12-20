import { useState } from "react";
import {
  Input,
  Button,
  Table,
  Space,
  Pagination,
  Modal,
  Select,
  Form,
  Upload,
  message,
  DatePicker,
} from "antd";
import {
  CalendarOutlined,
  DownOutlined,
  EditOutlined,
  RightOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";

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
    { title: "STT", dataIndex: "stt", key: "stt", width: 80 },
    { title: "Tên hiển thị", dataIndex: "displayName", key: "displayName" },
    { title: "Tên người dùng", dataIndex: "username", key: "username" },
    { title: "Số đơn đã mua", dataIndex: "orders", key: "orders", width: 140 },
    {
      title: "Ngày tạo tài khoản",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 180,
    },
    {
      title: "Tổng tiền",
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
    message.success("Cập nhật thông tin thành công!");
  };

  const handleChange = (field, value) => {
    setSelectedCustomer((prev) => ({ ...prev, [field]: value }));
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
        {/* Main Content */}
        <motion.div
          className="px-6 pb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}>
          <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8">
            <h1 className="text-[#133e87] text-3xl font-bold text-center mb-6">
              {`Quản lý ${selectedCategory || "khách hàng"}`}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Tìm Kiếm..."
                  className="max-w-xs"
                  style={{ borderColor: "#cbdceb" }}
                />
              </div>
              <Space>
                <Button
                  danger
                  type="primary"
                  style={{
                    backgroundColor: "#ff7383",
                    borderColor: "#ff7383",
                  }}
                  onClick={() => setIsDeleteModalOpen(true)}>
                  Xóa Tài Khoản
                </Button>
                <Modal
                  open={isDeleteModalOpen}
                  onCancel={() => setIsDeleteModalOpen(false)}
                  footer={null}
                  centered
                  width={360}
                  closable={false}
                  className="text-center rounded-2xl">
                  <p className="text-[#133e87] text-base text-center font-medium mb-6">
                    Xác nhận muốn xóa tài khoản chứ?
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
                            "Vui lòng chọn ít nhất một tài khoản để xóa!"
                          );
                          return;
                        }

                        // Lọc bỏ tài khoản được chọn khỏi danh sách
                        const updatedData = data.filter(
                          (item) => !selectedRowKeys.includes(item.key)
                        );

                        // Cập nhật state
                        setData(updatedData);

                        // Đặt lại selection
                        setSelectedRowKeys([]);

                        // Đóng modal
                        setIsDeleteModalOpen(false);

                        // Thông báo
                        message.success("Xóa tài khoản thành công!");
                      }}>
                      Xóa
                    </Button>
                    <Button
                      className="px-6 py-1 rounded-full font-medium"
                      style={{
                        borderColor: "#133e87",
                        color: "#133e87",
                      }}
                      onClick={() => setIsDeleteModalOpen(false)}>
                      Hủy
                    </Button>
                  </div>
                </Modal>

                <button
                  onClick={() => setIsLockModalOpen(true)}
                  className="border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-6 sm:px-8 py-1 text-sm sm:text-base font-medium rounded-lg transition-colors">
                  Khóa Tài Khoản
                </button>

                <Modal
                  open={isLockModalOpen}
                  onCancel={() => setIsLockModalOpen(false)}
                  footer={null}
                  centered
                  width={360}
                  closable={false}
                  className="text-center rounded-2xl">
                  <p className="text-[#133e87] text-base text-center font-medium mb-6">
                    Xác nhận muốn khóa tài khoản chứ?
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button
                      type="primary"
                      className="px-6 py-1 rounded-full text-white font-medium"
                      style={{
                        backgroundColor: "#133e87",
                        borderColor: "#133e87",
                      }}
                      onClick={() => {
                        console.log("Đã xác nhận khóa tài khoản");
                        setIsLockModalOpen(false);
                      }}>
                      Khóa
                    </Button>
                    <Button
                      className="px-6 py-1 rounded-full font-medium"
                      style={{
                        borderColor: "#133e87",
                        color: "#133e87",
                      }}
                      onClick={() => setIsLockModalOpen(false)}>
                      Hủy
                    </Button>
                  </div>
                </Modal>
              </Space>
            </div>

            {/* Table with Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}>
                <Table
                  columns={columns}
                  dataSource={data}
                  rowSelection={rowSelection}
                  pagination={false}
                  className="custom-table"
                  onRow={(record) => ({
                    onClick: () => handleRowClick(record),
                  })}
                />
              </motion.div>
            </AnimatePresence>

            <Modal
              open={isViewModalOpen}
              onCancel={() => setIsViewModalOpen(false)}
              footer={null}
              width={1200}
              centered
              className="rounded-3xl overflow-hidden custom-colored-modal">
              {selectedCustomer && (
                <main className="container mx-auto px-6 py-12">
                  <div className="flex gap-6 max-w-7xl mx-auto">
                    {/* Sidebar */}
                    <div className="w-[280px] flex-shrink-0">
                      <div className="bg-[#ffffff] backdrop-blur-md rounded-3xl p-6 shadow-lg">
                        <div className="flex flex-col items-center gap-6">
                          <div className="relative w-40 h-40 flex items-center justify-center">
                            {/* Ảnh hoặc nền trống */}
                            <div className="w-36 h-36 rounded-full bg-[#f6f6f6] flex items-center justify-center overflow-hidden">
                              {avatarUrl ? (
                                <img
                                  src={avatarUrl}
                                  alt="avatar"
                                  className="w-full h-full object-cover rounded-full"
                                />
                              ) : (
                                <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center" />
                              )}
                            </div>

                            {/* Nút Edit nằm ở góc dưới bên phải trên viền */}
                            {isEditing && (
                              <Upload
                                showUploadList={false}
                                beforeUpload={(file) => {
                                  const reader = new FileReader();
                                  reader.readAsDataURL(file);
                                  reader.onload = () =>
                                    setAvatarUrl(reader.result);
                                  return false;
                                }}
                                className="absolute bottom-4 right-8 translate-x-1/3 translate-y-1/3 cursor-pointer">
                                <Button
                                  type="default"
                                  shape="circle"
                                  icon={<EditOutlined />}
                                  className="bg-white/80 hover:bg-white text-blue-700 border border-blue-400 shadow-md"
                                />
                              </Upload>
                            )}
                          </div>

                          <div className="w-full flex flex-col gap-3">
                            <Button
                              type="primary"
                              style={{
                                backgroundColor: "#133e87",
                                borderColor: "#133e87",
                              }}
                              className="w-full rounded-lg text-white font-medium hover:opacity-90 transition"
                              onClick={() => {
                                if (isEditing) handleSave();
                                else setIsEditing(true);
                              }}>
                              {isEditing ? "Lưu Thông Tin" : "Sửa Thông Tin"}
                            </Button>
                            <Button
                              type="primary"
                              style={{
                                backgroundColor: "#133e87",
                                borderColor: "#133e87",
                              }}
                              className="w-full rounded-lg text-white font-medium hover:opacity-90 transition"
                              onClick={() => setIsLockModalOpen(true)}>
                              Khóa Tài Khoản
                            </Button>

                            <Modal
                              open={isLockModalOpen}
                              onCancel={() => setIsLockModalOpen(false)}
                              footer={null}
                              centered
                              width={360}
                              closable={false}
                              className="text-center rounded-2xl">
                              <p className="text-[#133e87] text-base text-center font-medium mb-6">
                                Xác nhận muốn khóa tài khoản chứ?
                              </p>
                              <div className="flex justify-center gap-4">
                                <Button
                                  type="primary"
                                  className="px-6 py-1 rounded-full text-white font-medium"
                                  style={{
                                    backgroundColor: "#133e87",
                                    borderColor: "#133e87",
                                  }}
                                  onClick={() => {
                                    console.log(
                                      `Đã khóa tài khoản: ${selectedCustomer.username}`
                                    );
                                    message.success(
                                      "Khóa tài khoản thành công!"
                                    );
                                    setIsLockModalOpen(false);
                                  }}>
                                  Khóa
                                </Button>
                                <Button
                                  className="px-6 py-1 rounded-full font-medium"
                                  style={{
                                    borderColor: "#133e87",
                                    color: "#133e87",
                                  }}
                                  onClick={() => setIsLockModalOpen(false)}>
                                  Hủy
                                </Button>
                              </div>
                            </Modal>
                            <Button
                              danger
                              type="primary"
                              style={{
                                backgroundColor: "#ff7383",
                                borderColor: "#ff7383",
                              }}
                              className="w-full rounded-lg text-white font-medium hover:opacity-90 transition"
                              onClick={() => setIsDeleteModalOpen(true)}>
                              Xóa Tài Khoản
                            </Button>

                            <Modal
                              open={isDeleteModalOpen}
                              onCancel={() => setIsDeleteModalOpen(false)}
                              footer={null}
                              centered
                              width={360}
                              closable={false}
                              className="text-center rounded-2xl">
                              <p className="text-[#133e87] text-base text-center font-medium mb-6">
                                Xác nhận muốn xóa tài khoản chứ?
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
                                    if (!selectedCustomer) return;

                                    // Đóng ngay modal xác nhận
                                    setIsDeleteModalOpen(false);

                                    // Dùng requestAnimationFrame để chắc chắn modal đóng trước khi xóa
                                    requestAnimationFrame(() => {
                                      setData((prev) =>
                                        prev.filter(
                                          (item) =>
                                            item.key !== selectedCustomer.key
                                        )
                                      );
                                      setSelectedCustomer(null);
                                      setIsViewModalOpen(false);
                                      message.success(
                                        "Xóa tài khoản thành công!"
                                      );
                                    });
                                  }}>
                                  Xóa
                                </Button>
                                <Button
                                  className="px-6 py-1 rounded-full font-medium"
                                  style={{
                                    borderColor: "#133e87",
                                    color: "#133e87",
                                  }}
                                  onClick={() => setIsDeleteModalOpen(false)}>
                                  Hủy
                                </Button>
                              </div>
                            </Modal>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Thông tin chi tiết */}
                    <div className="flex-1">
                      <div className="bg-[#ffffff]/70 backdrop-blur-md rounded-3xl p-8 shadow-lg">
                        {/* Thông tin cá nhân */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                          <div>
                            <label className="text-[#133e87] text-sm font-medium mb-2 block">
                              Tên Hiển Thị
                            </label>
                            <Input
                              value={selectedCustomer.displayName}
                              onChange={(e) =>
                                handleChange("displayName", e.target.value)
                              }
                              disabled={!isEditing}
                            />
                          </div>
                          <div>
                            <label className="text-[#133e87] text-sm font-medium mb-2 block">
                              Tên Người Dùng
                            </label>
                            <Input
                              value={selectedCustomer.username}
                              onChange={(e) =>
                                handleChange("username", e.target.value)
                              }
                              disabled={!isEditing}
                            />
                          </div>
                          <div>
                            <label className="text-[#133e87] text-sm font-medium mb-2 block">
                              Số Điện Thoại
                            </label>
                            <Input
                              value={selectedCustomer.phone}
                              onChange={(e) =>
                                handleChange("phone", e.target.value)
                              }
                              disabled={!isEditing}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-8">
                          <div>
                            <label className="text-[#133e87] text-sm font-medium mb-2 block">
                              Giới Tính
                            </label>
                            <Select
                              value={selectedCustomer.gender}
                              onChange={(val) => handleChange("gender", val)}
                              options={[
                                { value: "male", label: "Nam" },
                                { value: "female", label: "Nữ" },
                                { value: "other", label: "Khác" },
                              ]}
                              disabled={!isEditing}
                              className="w-full"
                              suffixIcon={<DownOutlined />}
                            />
                          </div>
                          <div>
                            <label className="text-[#133e87] text-sm font-medium mb-2 block">
                              Ngày Sinh
                            </label>
                            <DatePicker
                              value={
                                selectedCustomer.birthday
                                  ? dayjs(selectedCustomer.birthday)
                                  : null
                              }
                              onChange={(date) =>
                                handleChange(
                                  "birthday",
                                  date ? date.format("YYYY-MM-DD") : null
                                )
                              }
                              disabled={!isEditing}
                              format="DD/MM/YYYY"
                              className="w-full"
                            />
                          </div>
                          <div>
                            <label className="text-[#133e87] text-sm font-medium mb-2 block">
                              Email
                            </label>
                            <Input
                              value={selectedCustomer.email}
                              onChange={(e) =>
                                handleChange("email", e.target.value)
                              }
                              disabled={!isEditing}
                            />
                          </div>
                        </div>

                        {/* Lịch sử đơn hàng */}
                        <div className="mb-6">
                          <h3 className="text-[#133e87] font-semibold mb-4">
                            Thống kê đơn hàng:
                          </h3>
                          <Table
                            columns={[
                              {
                                title: "STT",
                                dataIndex: "stt",
                                key: "stt",
                                width: 80,
                              },
                              {
                                title: "Mã đơn",
                                dataIndex: "orderNumber",
                                key: "orderNumber",
                              },
                              {
                                title: "Ngày đặt",
                                dataIndex: "date",
                                key: "date",
                              },
                              {
                                title: "Tổng tiền",
                                dataIndex: "total",
                                key: "total",
                              },
                            ]}
                            dataSource={selectedCustomer.ordersDetail || []}
                            pagination={false}
                            className="custom-table"
                          />

                          <div className="flex justify-center items-center gap-2 mt-4">
                            <Button
                              type="text"
                              className="text-[#133e87] font-semibold">
                              1
                            </Button>
                            <Button type="text" className="text-[#608bc1]">
                              2
                            </Button>
                            <Button
                              type="default"
                              className="border-[#133e87] text-[#133e87]"
                              icon={<RightOutlined />}
                            />
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-[#d1d1d1]">
                          <span className="text-[#133e87] font-semibold text-lg">
                            Tổng Giá Trị
                          </span>
                          <span className="text-[#133e87] font-bold text-2xl">
                            {selectedCustomer.totalAmount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </main>
              )}
            </Modal>

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
    </motion.div>
  );
}

export default AdminCustomerContainer;