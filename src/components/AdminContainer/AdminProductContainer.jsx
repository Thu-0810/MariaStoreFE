import { useEffect, useState } from "react";
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
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { getCategoriesApi } from "../../api/categoryApi";
import {
  createProductApi,
  getProductDetailApi,
  getProductsPagedApi,
  lockProductsApi,
  softDeleteProductsApi,
  unlockProductsApi,
  updateProductApi,
} from "../../api/productApi";
import {
  deleteProductImageApi,
  uploadProductImageApi,
} from "../../api/productMediaApi";
import { useTranslation } from "react-i18next";

function AdminProductContainer() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLockModalOpen, setIsLockModalOpen] = useState(false);
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [createImagePreview, setCreateImagePreview] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const [imageFile, setImageFile] = useState(null);
  const [editImageFile, setEditImageFile] = useState(null);
  const [removedImageIds, setRemovedImageIds] = useState([]);

  const { t } = useTranslation();
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategoriesApi();
        setCategories(res.data);
      } catch (err) {
        message.error(t("adminProduct.toast.load_products_failed"));
      }
    };
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getProductsPagedApi({
        page: currentPage - 1,
        size: pageSize,
        sort: "createdAt,desc",
        category: selectedCategory,
      });

      setProducts(res.data.content);
      setTotal(res.data.totalElements);
    } catch (err) {
      message.error(t("adminProduct.toast.load_products_failed"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, selectedCategory]);

  const columns = [
    {
      title: t("adminProduct.table.index"),
      render: (_, __, index) => index + 1,
    },
    { title: t("adminProduct.table.product_name"), dataIndex: "name" },
    { title: t("adminProduct.table.quantity"), dataIndex: "quantity" },
    { title: t("adminProduct.table.created_at"), dataIndex: "createdAt" },
    {
      title: t("adminProduct.table.price"),
      dataIndex: "price",
      render: (v) => `${v.toLocaleString("vi-VN")}đ`,
    },
    { title: t("adminProduct.table.status"), dataIndex: "status" },
  ];

  const mapPayload = (values) => ({
    name: values.name,
    price: Number(values.price),
    description: values.description,
    status: values.status,
    categoryIds: [Number(values.category)],

    fileFormat: values.fileType,
    resolution: values.size,
    fileSize: values.fileSize,
    author: values.author,
    style: values.style,
    origin: values.origin,
    characterName: values.character,
    extraInfo: values.extraInfo,
  });

  const handleCreateSubmit = async (values) => {
    try {
      const payload = mapPayload(values);

      const res = await createProductApi(payload);
      const productId = res.data.id;

      if (imageFile) {
        await uploadProductImageApi(productId, imageFile, true);
      }

      message.success(t("adminProduct.toast.create_success"));
      setIsModalOpen(false);
      createForm.resetFields();
      fetchProducts();
    } catch (err) {
      console.error(err);
      message.error(t("adminProduct.toast.create_failed"));
    }
  };

  const handleEditSubmit = async (values) => {
    if (!isEditMode || submitting) return;

    try {
      setSubmitting(true);

      const payload = mapPayload(values);

      await updateProductApi(selectedProduct.id, payload);

      for (const imageId of removedImageIds) {
        await deleteProductImageApi(imageId);
      }

      if (editImageFile) {
        await uploadProductImageApi(selectedProduct.id, editImageFile, true);
      }

      message.success(t("adminProduct.toast.update_success"));

      setIsEditMode(false);
      setIsViewModalOpen(false);
      setSelectedProduct(null);

      fetchProducts();
    } catch (err) {
      console.error(err);
      message.error(t("adminProduct.toast.update_failed"));
    } finally {
      setSubmitting(false);
    }
  };

  const getCategoryIdByName = (name) => {
    const found = categories.find((c) => c.name === name);
    return found ? found.id : null;
  };

  const handleRowClick = async (record) => {
    try {
      const res = await getProductDetailApi(record.id);
      const product = res.data;

      console.log("DETAIL PRODUCT:", product);

      setSelectedProduct(product);

      setRemovedImageIds([]);
      setEditImageFile(null);

      // Ảnh (nếu có)
      if (product.images?.length > 0) {
        setEditImagePreview(
          `http://localhost:8080${product.images[0].imageUrl}`
        );
      } else {
        setEditImagePreview(null);
      }
      editForm.setFieldsValue({
        name: product.name,
        category: getCategoryIdByName(product.categories?.[0]),
        status: product.status,
        price: product.price,
        description: product.description,

        fileType: product.meta?.fileFormat,
        size: product.meta?.resolution,
        fileSize: product.meta?.fileSize,
        author: product.meta?.author,
        character: product.meta?.characterName,
        origin: product.meta?.origin,
        style: product.meta?.style,
        extraInfo: product.meta?.extraInfo,
      });
      setIsEditMode(false);
      setIsViewModalOpen(true);
    } catch (err) {
      console.error("DETAIL ERROR:", err);
      message.error(t("adminProduct.toast.load_detail_failed"));
    }
  };

  const handleImageUpload = (info, targetForm, setPreview, setFile) => {
    const file = info.file.originFileObj || info.file;
    if (!file) return;

    if (!file.type?.startsWith("image/")) {
      message.error(t("adminProduct.toast.invalid_image"));
      return;
    }

    setFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);

      const img = new Image();
      img.onload = () => {
        targetForm.setFieldsValue({
          size: `${img.width}x${img.height}`,
          fileType: file.type.split("/")[1].toUpperCase(),
        });
      };
      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveCreateImage = () => {
    setCreateImagePreview(null);
    setImageFile(null);
    createForm.setFieldsValue({
      size: "",
      fileType: "",
    });
  };

  const handleRemoveEditImage = () => {
    if (selectedProduct?.images?.[0]?.id) {
      setRemovedImageIds([selectedProduct.images[0].id]);
    }

    setEditImagePreview(null);
    setEditImageFile(null);

    editForm.setFieldsValue({
      size: "",
      fileType: "",
    });
  };

  const handleCreateCancel = () => {
    createForm.resetFields();
    setCreateImagePreview(null);
    setImageFile(null);
    setIsModalOpen(false);
  };

  const removeProducts = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning(t("adminProduct.toast.select_one_for_delete"));
      return;
    }

    try {
      setLoading(true);

      await softDeleteProductsApi(selectedRowKeys);

      message.success(t("adminProduct.toast.delete_success"));

      setSelectedRowKeys([]);
      setIsDeleteModalOpen(false);
      fetchProducts();
    } catch (err) {
      console.error("DELETE ERROR:", err);
      message.error(t("adminProduct.toast.delete_failed"));
    } finally {
      setLoading(false);
    }
  };

  const isSelectedLocked =
    selectedRowKeys.length === 1 &&
    products.find((p) => p.id === selectedRowKeys[0])?.status === "LOCKED";

  const lockProducts = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning(t("adminProduct.toast.select_one_for_lock"));
      return;
    }

    try {
      setLoading(true);

      await lockProductsApi(selectedRowKeys);

      message.success(t("adminProduct.toast.lock_success"));

      setSelectedRowKeys([]);
      setIsLockModalOpen(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
      message.error(t("adminProduct.toast.lock_failed"));
    } finally {
      setLoading(false);
    }
  };

  const toggleLockProducts = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning(t("adminProduct.toast.select_one_for_action"));
      return;
    }

    try {
      setLoading(true);

      if (isSelectedLocked) {
        await unlockProductsApi(selectedRowKeys);
        message.success(t("adminProduct.toast.unlock_success"));
      } else {
        await lockProductsApi(selectedRowKeys);
        message.success(t("adminProduct.toast.lock_success"));
      }

      setSelectedRowKeys([]);
      setIsLockModalOpen(false);
      fetchProducts();

      if (selectedProduct) {
        const res = await getProductDetailApi(selectedProduct.id);
        setSelectedProduct(res.data);

        if (res.data.images?.length > 0) {
          setEditImagePreview(
            `http://localhost:8080${res.data.images[0].imageUrl}`
          );
        }

        editForm.setFieldsValue({
          name: res.data.name,
          category: getCategoryIdByName(res.data.categories?.[0]),
          status: res.data.status,
          price: res.data.price,
          description: res.data.description,
        });
      }
    } catch (err) {
      console.error(err);
      message.error(t("adminProduct.toast.action_failed"));
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

      <div className="relative z-10">
        {/* Category Buttons */}
        <motion.div
          className="px-6 py-8"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}>
          <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.name);
                  setCurrentPage(1);
                }}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-3 rounded-2xl text-lg font-semibold shadow-md transition-all ${
                  selectedCategory === cat.name
                    ? "bg-[#133e87] text-white"
                    : "bg-white/80 text-[#133e87] hover:bg-[#e8f1ff]"
                }`}>
                {cat.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="px-6 pb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}>
          <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8">
            <h1 className="text-[#133e87] text-3xl font-bold text-center mb-6">
              {t("adminProduct.title_manage", {
                category:
                  selectedCategory || t("adminProduct.title_manage_default"),
              })}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder={t("adminProduct.search_placeholder")}
                  className="max-w-xs"
                  style={{ borderColor: "#cbdceb" }}
                />
              </div>

              <Space>
                {/* Delete */}
                <Button
                  danger
                  type="primary"
                  style={{
                    backgroundColor: "#ff7383",
                    borderColor: "#ff7383",
                  }}
                  onClick={() => setIsDeleteModalOpen(true)}>
                  {t("adminProduct.btn_delete")}
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
                    {t("adminProduct.confirm_delete")}
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
                      onClick={removeProducts}>
                      {t("adminProduct.btn_delete_ok")}
                    </Button>
                    <Button
                      className="px-6 py-1 rounded-full font-medium"
                      style={{
                        borderColor: "#133e87",
                        color: "#133e87",
                      }}
                      onClick={() => setIsDeleteModalOpen(false)}>
                      {t("adminProduct.btn_cancel")}
                    </Button>
                  </div>
                </Modal>

                {/* Lock / Unlock */}
                <button
                  onClick={() => setIsLockModalOpen(true)}
                  className="border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-6 py-1 rounded-lg">
                  {isSelectedLocked
                    ? t("adminProduct.btn_unlock")
                    : t("adminProduct.btn_lock")}
                </button>

                <Modal
                  open={isLockModalOpen}
                  onCancel={() => setIsLockModalOpen(false)}
                  footer={null}
                  centered
                  width={360}
                  closable={false}
                  className="text-center rounded-2xl">
                  <p className="text-[#133e87] text-base font-medium mb-6 text-center">
                    {isSelectedLocked
                      ? t("adminProduct.confirm_unlock")
                      : t("adminProduct.confirm_lock")}
                  </p>

                  <div className="flex justify-center gap-4">
                    <Button
                      type="primary"
                      style={{
                        backgroundColor: isSelectedLocked
                          ? "#22c55e"
                          : "#133e87",
                        borderColor: isSelectedLocked ? "#22c55e" : "#133e87",
                      }}
                      onClick={toggleLockProducts}>
                      {isSelectedLocked
                        ? t("adminProduct.btn_unlock_ok")
                        : t("adminProduct.btn_lock_ok")}
                    </Button>

                    <Button
                      className="px-6 py-1 rounded-full font-medium"
                      style={{
                        borderColor: "#133e87",
                        color: "#133e87",
                      }}
                      onClick={() => setIsLockModalOpen(false)}>
                      {t("adminProduct.btn_cancel")}
                    </Button>
                  </div>
                </Modal>

                {/* Create */}
                <button
                  type="button"
                  onClick={() => {
                    createForm.resetFields();
                    setCreateImagePreview(null);
                    setSelectedProduct(null);
                    setIsModalOpen(true);
                  }}
                  className="border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-6 sm:px-4 py-1 text-sm sm:text-base font-medium rounded-lg transition-colors">
                  {t("adminProduct.btn_add")}
                </button>

                <Modal
                  open={isModalOpen}
                  onCancel={handleCreateCancel}
                  footer={null}
                  width={1200}
                  centered
                  destroyOnClose>
                  <div className="p-8">
                    <h1 className="text-3xl font-bold text-[#133e87] text-center mb-8">
                      {t("adminProduct.modal_create_title")}
                    </h1>

                    <Form
                      form={createForm}
                      layout="vertical"
                      onFinish={handleCreateSubmit}
                      initialValues={{ category: selectedCategory }}>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center justify-center">
                          <div className="bg-[#d9eafd]/40 rounded-2xl h-[480px] w-full flex items-center justify-center border-2 border-dashed border-[#cbdceb] relative overflow-hidden">
                            {createImagePreview ? (
                              <div className="relative w-full h-full flex items-center justify-center">
                                <img
                                  src={createImagePreview}
                                  alt="preview"
                                  className="rounded-2xl object-contain max-h-full"
                                />
                                <Button
                                  type="text"
                                  danger
                                  size="small"
                                  className="!absolute top-2 right-2"
                                  onClick={handleRemoveCreateImage}>
                                  {t("adminProduct.image.remove")}
                                </Button>
                              </div>
                            ) : (
                              <Upload
                                accept="image/*"
                                showUploadList={false}
                                beforeUpload={() => false}
                                onChange={(info) =>
                                  handleImageUpload(
                                    info,
                                    createForm,
                                    setCreateImagePreview,
                                    setImageFile
                                  )
                                }>
                                <Button
                                  icon={<UploadOutlined />}
                                  size="large"
                                  className="bg-white/80 hover:bg-white text-[#608bc1] font-medium border-0">
                                  {t("adminProduct.image.add")}
                                </Button>
                              </Upload>
                            )}
                          </div>
                        </div>

                        {/* MIDDLE: Thông tin cơ bản */}
                        <div className="flex flex-col gap-4">
                          <Form.Item
                            name="name"
                            label={
                              <span className="text-[#133e87] font-medium">
                                {t("adminProduct.field.name")}
                              </span>
                            }
                            rules={[
                              {
                                required: true,
                                message: t(
                                  "adminProduct.validation.required_name"
                                ),
                              },
                            ]}>
                            <Input
                              size="large"
                              className="bg-white border-[#cbdceb]"
                            />
                          </Form.Item>

                          <div className="grid grid-cols-2 gap-4">
                            <Form.Item
                              name="category"
                              label={
                                <span className="text-[#133e87] font-medium">
                                  {t("adminProduct.field.category")}
                                </span>
                              }
                              rules={[
                                {
                                  required: true,
                                  message: t(
                                    "adminProduct.validation.required_category"
                                  ),
                                },
                              ]}>
                              <Select
                                size="large"
                                options={categories.map((cat) => ({
                                  value: cat.id,
                                  label: cat.name,
                                }))}
                              />
                            </Form.Item>

                            <Form.Item
                              name="status"
                              label={
                                <span className="text-[#133e87] font-medium">
                                  {t("adminProduct.field.status")}
                                </span>
                              }
                              rules={[
                                {
                                  required: true,
                                  message: t(
                                    "adminProduct.validation.required_status"
                                  ),
                                },
                              ]}>
                              <Select
                                size="large"
                                options={[
                                  { value: "Còn hàng", label: "Còn hàng" },
                                  { value: "Hết hàng", label: "Hết hàng" },
                                  {
                                    value: "Hàng trưng bày",
                                    label: "Hàng trưng bày",
                                  },
                                ]}
                              />
                            </Form.Item>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <Form.Item
                              name="price"
                              label={
                                <span className="text-[#133e87] font-medium">
                                  {t("adminProduct.field.price")}
                                </span>
                              }
                              rules={[
                                {
                                  required: true,
                                  message: t(
                                    "adminProduct.validation.required_price"
                                  ),
                                },
                              ]}>
                              <Input
                                size="large"
                                className="bg-white border-[#cbdceb]"
                                onChange={(e) => {
                                  const value = e.target.value.replace(
                                    /\D/g,
                                    ""
                                  );
                                  createForm.setFieldsValue({ price: value });
                                }}
                              />
                            </Form.Item>

                            <Form.Item
                              name="fileType"
                              label={
                                <span className="text-[#133e87] font-medium">
                                  {t("adminProduct.field.fileType")}
                                </span>
                              }>
                              <Input
                                size="large"
                                disabled
                                className="bg-gray-50 border-[#cbdceb]"
                              />
                            </Form.Item>
                          </div>

                          <Form.Item
                            name="description"
                            label={
                              <span className="text-[#133e87] font-medium">
                                {t("adminProduct.field.description")}
                              </span>
                            }>
                            <Input.TextArea
                              rows={3}
                              className="bg-white border-[#cbdceb]"
                            />
                          </Form.Item>

                          <div className="grid grid-cols-2 gap-4">
                            <Form.Item
                              name="size"
                              label={
                                <span className="text-[#133e87] font-medium">
                                  {t("adminProduct.field.size")}
                                </span>
                              }>
                              <Input
                                size="large"
                                disabled
                                className="bg-gray-50 border-[#cbdceb]"
                              />
                            </Form.Item>

                            <Form.Item
                              name="fileSize"
                              label={
                                <span className="text-[#133e87] font-medium">
                                  {t("adminProduct.field.fileSize")}
                                </span>
                              }>
                              <Input
                                size="large"
                                disabled
                                className="bg-gray-50 border-[#cbdceb]"
                              />
                            </Form.Item>
                          </div>
                        </div>

                        {/* RIGHT: Thông tin thêm */}
                        <div className="flex flex-col gap-4">
                          <div className="grid grid-cols-2 gap-4">
                            <Form.Item
                              name="author"
                              label={
                                <span className="text-[#133e87] font-medium">
                                  {t("adminProduct.field.author")}
                                </span>
                              }>
                              <Input
                                size="large"
                                className="bg-white border-[#cbdceb]"
                              />
                            </Form.Item>

                            <Form.Item
                              name="character"
                              label={
                                <span className="text-[#133e87] font-medium">
                                  {t("adminProduct.field.character")}
                                </span>
                              }>
                              <Input
                                size="large"
                                className="bg-white border-[#cbdceb]"
                              />
                            </Form.Item>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <Form.Item
                              name="origin"
                              label={
                                <span className="text-[#133e87] font-medium">
                                  {t("adminProduct.field.origin")}
                                </span>
                              }>
                              <Input
                                size="large"
                                className="bg-white border-[#cbdceb]"
                              />
                            </Form.Item>

                            <Form.Item
                              name="style"
                              label={
                                <span className="text-[#133e87] font-medium">
                                  {t("adminProduct.field.style")}
                                </span>
                              }>
                              <Input
                                size="large"
                                className="bg-white border-[#cbdceb]"
                              />
                            </Form.Item>
                          </div>

                          <Form.Item
                            name="extraInfo"
                            label={
                              <span className="text-[#133e87] font-medium">
                                {t("adminProduct.field.extraInfo")}
                              </span>
                            }>
                            <Input.TextArea
                              rows={8}
                              className="bg-white border-[#cbdceb]"
                            />
                          </Form.Item>

                          <div className="flex justify-end gap-4 mt-auto">
                            <button
                              type="button"
                              onClick={handleCreateCancel}
                              className="border text-white bg-red-600 hover:bg-red-400 hover:text-white px-6 sm:px-4 py-1 text-sm sm:text-base font-medium rounded-lg transition-colors">
                              {t("adminProduct.btn_cancel")}
                            </button>

                            <button
                              type="submit"
                              className="border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-6 sm:px-4 py-1 text-sm sm:text-base font-medium rounded-lg transition-colors">
                              {t("adminProduct.action.create")}
                            </button>
                          </div>
                        </div>
                      </div>
                    </Form>
                  </div>
                </Modal>

                {/* Modal Xem Chi Tiết Sản Phẩm */}
                <Modal
                  open={isViewModalOpen}
                  onCancel={() => {
                    setIsViewModalOpen(false);
                    setSelectedProduct(null);
                  }}
                  footer={null}
                  width={1200}
                  centered
                  destroyOnClose>
                  <div className="p-8">
                    <h1 className="text-3xl font-bold text-[#133e87] text-center mb-8">
                      {t("adminProduct.modal_detail_title")}
                    </h1>

                    <Form
                      form={editForm}
                      disabled={selectedProduct?.status === "LOCKED"}
                      layout="vertical"
                      validateTrigger="onSubmit">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center justify-center">
                          <div className="bg-[#d9eafd]/40 rounded-2xl h-[530px] w-full flex items-center justify-center border-2 border-dashed border-[#cbdceb] relative overflow-hidden">
                            {editImagePreview ? (
                              <div className="relative w-full h-full flex items-center justify-center">
                                <img
                                  src={editImagePreview}
                                  alt="preview"
                                  className="rounded-2xl object-contain max-h-full"
                                />
                                {isEditMode && (
                                  <Button
                                    type="text"
                                    danger
                                    size="small"
                                    className="!absolute top-2 right-2"
                                    onClick={handleRemoveEditImage}>
                                    Xóa ảnh
                                  </Button>
                                )}
                              </div>
                            ) : (
                              <Upload
                                accept="image/*"
                                showUploadList={false}
                                beforeUpload={() => false}
                                onChange={(info) =>
                                  handleImageUpload(
                                    info,
                                    editForm,
                                    setEditImagePreview,
                                    setEditImageFile
                                  )
                                }>
                                <Button
                                  icon={<UploadOutlined />}
                                  size="large"
                                  disabled={!isEditMode}
                                  className="bg-white/80 hover:bg-white text-[#608bc1] font-medium border-0">
                                  {t("adminProduct.image.add")}
                                </Button>
                              </Upload>
                            )}
                          </div>
                        </div>

                        {/* CENTER: Thông tin chính */}
                        <div className="flex flex-col gap-4">
                          {/* Tên sản phẩm */}
                          <Form.Item
                            label={
                              <span className="text-[#133e87] font-medium">
                                {t("adminProduct.field.name")}
                              </span>
                            }
                            name="name">
                            <Input
                              size="large"
                              disabled={!isEditMode}
                              className="bg-gray-50 border-[#cbdceb]"
                            />
                          </Form.Item>

                          {/* Loại & Tình trạng */}
                          <div className="grid grid-cols-2 gap-4">
                            <Form.Item
                              label={
                                <span className="text-[#133e87] font-medium">
                                  {t("adminProduct.field.category")}
                                </span>
                              }
                              name="category">
                              <Select
                                size="large"
                                disabled={!isEditMode}
                                options={categories.map((cat) => ({
                                  value: cat.id,
                                  label: cat.name,
                                }))}
                              />
                            </Form.Item>
                            <Form.Item
                              label={
                                <span className="text-[#133e87] font-medium">
                                  {t("adminProduct.field.status")}
                                </span>
                              }
                              name="status">
                              <Select
                                size="large"
                                disabled={!isEditMode}
                                options={[
                                  { value: "Còn hàng", label: "Còn hàng" },
                                  { value: "Hết hàng", label: "Hết hàng" },
                                  {
                                    value: "Hàng trưng bày",
                                    label: "Hàng trưng bày",
                                  },
                                ]}
                              />
                            </Form.Item>
                          </div>

                          {/* Giá tiền & Định dạng */}
                          <div className="grid grid-cols-2 gap-4">
                            <Form.Item
                              label={
                                <span className="text-[#133e87] font-medium">
                                  {t("adminProduct.field.price")}
                                </span>
                              }
                              name="price">
                              <Input
                                size="large"
                                disabled={!isEditMode}
                                className="bg-gray-50 border-[#cbdceb]"
                              />
                            </Form.Item>
                            <Form.Item
                              label={
                                <span className="text-[#133e87] font-medium">
                                  {t("adminProduct.field.fileType")}
                                </span>
                              }
                              name="fileType">
                              <Input
                                size="large"
                                disabled
                                className="bg-gray-50 border-[#cbdceb]"
                              />
                            </Form.Item>
                          </div>

                          {/* Miêu tả */}
                          <Form.Item
                            label={
                              <span className="text-[#133e87] font-medium">
                                {t("adminProduct.field.description")}
                              </span>
                            }
                            name="description">
                            <Input.TextArea
                              rows={2}
                              disabled={!isEditMode}
                              className="bg-gray-50 border-[#cbdceb]"
                            />
                          </Form.Item>

                          {/* Kích thước & Dung lượng */}
                          <div className="grid grid-cols-2 gap-4">
                            <Form.Item
                              label={
                                <span className="text-[#133e87] font-medium">
                                  {t("adminProduct.field.size")}
                                </span>
                              }
                              name="size">
                              <Input
                                size="large"
                                disabled
                                className="bg-gray-50 border-[#cbdceb]"
                              />
                            </Form.Item>
                            <Form.Item
                              label={
                                <span className="text-[#133e87] font-medium">
                                  {t("adminProduct.field.fileSize")}
                                </span>
                              }
                              name="fileSize">
                              <Input
                                size="large"
                                disabled
                                className="bg-gray-50 border-[#cbdceb]"
                              />
                            </Form.Item>
                          </div>
                        </div>

                        {/* RIGHT: Thông tin bổ sung */}
                        <div className="flex flex-col gap-4">
                          <div className="grid grid-cols-2 gap-4">
                            <Form.Item
                              label={
                                <span className="text-[#133e87] font-medium">
                                  {t("adminProduct.field.author")}
                                </span>
                              }
                              name="author">
                              <Input
                                size="large"
                                disabled={!isEditMode}
                                className="bg-gray-50 border-[#cbdceb]"
                              />
                            </Form.Item>
                            <Form.Item
                              label={
                                <span className="text-[#133e87] font-medium">
                                  {t("adminProduct.field.character")}
                                </span>
                              }
                              name="character">
                              <Input
                                size="large"
                                disabled={!isEditMode}
                                className="bg-gray-50 border-[#cbdceb]"
                              />
                            </Form.Item>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <Form.Item
                              label={
                                <span className="text-[#133e87] font-medium">
                                  {t("adminProduct.field.origin")}
                                </span>
                              }
                              name="origin">
                              <Input
                                size="large"
                                disabled={!isEditMode}
                                className="bg-gray-50 border-[#cbdceb]"
                              />
                            </Form.Item>
                            <Form.Item
                              label={
                                <span className="text-[#133e87] font-medium">
                                  {t("adminProduct.field.style")}
                                </span>
                              }
                              name="style">
                              <Input
                                size="large"
                                disabled={!isEditMode}
                                className="bg-gray-50 border-[#cbdceb]"
                              />
                            </Form.Item>
                          </div>

                          <Form.Item
                            label={
                              <span className="text-[#133e87] font-medium">
                                {t("adminProduct.field.extraInfo")}
                              </span>
                            }
                            name="extraInfo">
                            <Input.TextArea
                              rows={4}
                              disabled={!isEditMode}
                              className="bg-gray-50 border-[#cbdceb]"
                            />
                          </Form.Item>
                        </div>
                      </div>

                      <div className="flex justify-end gap-4 mt-auto">
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditMode(false);
                            setIsViewModalOpen(false);
                          }}
                          className="border text-white bg-red-600 hover:bg-red-400 px-6 py-1 rounded-lg">
                          {t("adminProduct.btn_cancel")}
                        </button>

                        {!isEditMode ? (
                          <button
                            type="button"
                            disabled={selectedProduct?.status === "LOCKED"}
                            onClick={() => setIsEditMode(true)}
                            className={`border px-6 py-1 rounded-lg ${
                              selectedProduct?.status === "LOCKED"
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white"
                            }`}>
                            {t("adminProduct.action.edit")}
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled={submitting}
                            onClick={async () => {
                              try {
                                const values = await editForm.validateFields();
                                await handleEditSubmit(values);
                              } catch (err) {}
                            }}
                            className="border border-green-700 text-green-700 hover:bg-green-700 hover:text-white px-6 py-1 rounded-lg">
                            {t("adminProduct.action.save")}
                          </button>
                        )}
                      </div>
                    </Form>
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
                  rowKey="id"
                  columns={columns}
                  dataSource={products}
                  loading={loading}
                  pagination={false}
                  rowSelection={rowSelection}
                  className="custom-table"
                  onRow={(record) => ({
                    onClick: () => handleRowClick(record),
                  })}
                />
              </motion.div>
            </AnimatePresence>

            {/* Pagination */}
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
    </motion.div>
  );
}

export default AdminProductContainer;