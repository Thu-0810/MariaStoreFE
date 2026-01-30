import { useEffect, useState } from "react";
import { Input, Button, Table, Space, Pagination, Modal, message } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { adminPostApi } from "../../api/adminPostApi";
import AddPostModal from "./SellerPostComponent/AddPostModal";
import DetailPostModal from "./SellerPostComponent/DetailPostModal";

function SellerPostContainer() {
  const { t } = useTranslation();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [selectedPost, setSelectedPost] = useState(null);

  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const pageSize = 10;

  const fetchPosts = async (page = currentPage, kw = keyword) => {
    try {
      setLoading(true);
  
      const res = await adminPostApi.list({ page: page - 1, keyword: kw, size: pageSize });

      console.log("res:", res);
      console.log("res.data:", res?.data);
      const pageData = res?.data ?? res;
      console.log("pageData:", pageData);
      console.log("content:", pageData?.content);
      setData(Array.isArray(pageData?.content) ? pageData.content : []);
      setTotal(Number(pageData?.totalElements ?? 0));
    } catch (e) {
      message.error(e?.response?.data?.message || t("adminPost.toast.load_posts_failed"));
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchPosts(1, "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: t("adminPost.table.index"),
      key: "stt",
      width: 80,
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: t("adminPost.table.post_name"),
      dataIndex: "title",
      key: "title",
      render: (text) => text || "",
    },
    {
      title: t("adminPost.table.author"),
      dataIndex: "authorName",
      key: "authorName",
      render: (text) => text || "",
    },
    {
      title: t("adminPost.table.created_at"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) =>
        text ? new Date(text).toLocaleDateString("vi-VN") : "",
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
  };

  const handleDeleteSelected = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning(t("adminPost.toast.select_one_for_delete"));
      return;
    }

    try {
      setLoading(true);
      await Promise.all(selectedRowKeys.map((id) => adminPostApi.remove(id)));
      message.success(t("adminPost.toast.delete_success"));
      setSelectedRowKeys([]);
      setIsDeleteModalOpen(false);

      const remaining = total - selectedRowKeys.length;
      const lastPage = Math.max(1, Math.ceil(remaining / pageSize));
      const nextPage = Math.min(currentPage, lastPage);

      setCurrentPage(nextPage);
      await fetchPosts(nextPage, keyword);
    } catch (e) {
      message.error(
        e?.response?.data?.message || t("adminPost.toast.delete_failed")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}>
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
              {t("adminPost.title")}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1">
                <Input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onPressEnter={() => {
                    setCurrentPage(1);
                    fetchPosts(1, keyword);
                  }}
                  placeholder={t("adminPost.search_placeholder")}
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
                  {t("adminPost.btn_delete")}
                </Button>

                <Button
                  className="border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-6 py-1 font-medium rounded-lg transition-colors"
                  style={{ borderColor: "#133e87", color: "#133e87" }}
                  onClick={() => setIsAddModalOpen(true)}>
                  {t("adminPost.btn_add")}
                </Button>
              </Space>
            </div>

            <Modal
              open={isDeleteModalOpen}
              onCancel={() => setIsDeleteModalOpen(false)}
              footer={null}
              centered
              width={360}
              closable={false}
              className="text-center rounded-2xl">
              <p className="text-[#133e87] text-base text-center font-medium mb-6">
                {t("adminPost.modal.delete_confirm")}
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  type="primary"
                  danger
                  className="px-6 py-1 rounded-full text-white font-medium"
                  style={{ backgroundColor: "#ff7383", borderColor: "#ff7383" }}
                  onClick={handleDeleteSelected}>
                  {t("adminPost.common.delete")}
                </Button>
                <Button
                  className="px-6 py-1 rounded-full font-medium"
                  style={{ borderColor: "#133e87", color: "#133e87" }}
                  onClick={() => setIsDeleteModalOpen(false)}>
                  {t("adminPost.common.cancel")}
                </Button>
              </div>
            </Modal>

            <AnimatePresence mode="wait">
              <motion.div
                key={"posts"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}>
                <Table
                  rowKey="id"
                  loading={loading}
                  columns={columns}
                  dataSource={data}
                  rowSelection={rowSelection}
                  pagination={false}
                  onRow={(record) => ({
                    onClick: async () => {
                      setSelectedPost(record);
                      setIsDetailModalOpen(true);
                    },
                  })}
                  className="custom-table cursor-pointer"
                />
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-8">
              <Pagination
                current={currentPage}
                total={total}
                pageSize={pageSize}
                onChange={(page) => {
                  setCurrentPage(page);
                  fetchPosts(page, keyword);
                }}
                showSizeChanger={false}
              />
            </div>

            <AddPostModal
              open={isAddModalOpen}
              onCancel={() => setIsAddModalOpen(false)}
              onAddSuccess={async () => {
                setIsAddModalOpen(false);
                setCurrentPage(1);
                await fetchPosts(1, keyword);
              }}
            />

            <DetailPostModal
              open={isDetailModalOpen}
              onClose={() => setIsDetailModalOpen(false)}
              post={selectedPost}
              onUpdated={async () => {
                await fetchPosts(currentPage, keyword);
              }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default SellerPostContainer;