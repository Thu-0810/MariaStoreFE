import { useState } from "react";
import { Input, Button, Table, Space, Pagination, Modal, message } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import AddPostModal from "../SellerModal/AddPostModal";
import DetailPostModal from "../SellerModal/DetailPostModal";

function SellerPostContainer() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const [data, setData] = useState([
    {
      key: 1,
      stt: 1,
      title: "Mua Tranh Tại Maria Store...",
      author: "Meomeo",
      username: "meomeo1234",
      createdAt: "30/07/2024",
    },
    { key: 2, stt: 2 },
    { key: 3, stt: 3 },
    { key: 4, stt: 4 },
    { key: 5, stt: 5 },
    { key: 6, stt: 6 },
    { key: 7, stt: 7 },
    { key: 8, stt: 8 },
    { key: 9, stt: 9 },
    { key: 10, stt: 10 },
  ]);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 80,
    },
    {
      title: "Tên bài viết",
      dataIndex: "title",
      key: "title",
      render: (text) => text || "",
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      key: "author",
      render: (text) => text || "",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text) => text || "",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => text || "",
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
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
              Quản Lý Bài Viết
            </h1>

            {/* Thanh công cụ */}
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
                  Xóa Bài Viết
                </Button>

                <Button
                  className="border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-6 py-1 font-medium rounded-lg transition-colors"
                  style={{ borderColor: "#133e87", color: "#133e87" }}
                  onClick={() => setIsAddModalOpen(true)}>
                  Thêm Bài Viết
                </Button>
              </Space>
            </div>

            {/* Modal Xóa */}
            <Modal
              open={isDeleteModalOpen}
              onCancel={() => setIsDeleteModalOpen(false)}
              footer={null}
              centered
              width={360}
              closable={false}
              className="text-center rounded-2xl">
              <p className="text-[#133e87] text-base text-center font-medium mb-6">
                Xác nhận muốn xóa bài viết chứ?
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
                      message.warning("Vui lòng chọn ít nhất một bài viết!");
                      return;
                    }
                    const updatedData = data.filter(
                      (item) => !selectedRowKeys.includes(item.key)
                    );
                    setData(updatedData);
                    setSelectedRowKeys([]);
                    setIsDeleteModalOpen(false);
                    message.success("Xóa bài viết thành công!");
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

            {/* Bảng bài viết */}
            <AnimatePresence mode="wait">
              <motion.div
                key={"posts"}
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
                    onClick: () => {
                      setSelectedPost(record);
                      setIsDetailModalOpen(true);
                    },
                  })}
                  className="custom-table cursor-pointer"
                />
              </motion.div>
            </AnimatePresence>

            {/* Phân trang */}
            <div className="flex justify-center mt-8">
              <Pagination
                current={currentPage}
                total={100}
                pageSize={10}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
              />
            </div>

            <AddPostModal
              open={isAddModalOpen}
              onCancel={() => setIsAddModalOpen(false)}
              onAdd={(newPost) => {
                setData((prev) => [
                  ...prev,
                  { key: prev.length + 1, stt: prev.length + 1, ...newPost },
                ]);
              }}
            />

            <DetailPostModal
              open={isDetailModalOpen}
              onClose={() => setIsDetailModalOpen(false)}
              post={selectedPost}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default SellerPostContainer;