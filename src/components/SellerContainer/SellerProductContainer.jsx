import { useEffect, useState } from "react";
import { Pagination, Form, message } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

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

import CategoryButtons from "./SellerProductComponent/CategoryButtons";
import ActionBar from "./SellerProductComponent/ActionBar";
import DeleteConfirmModal from "./SellerProductComponent/DeleteConfirmModal";
import LockConfirmModal from "./SellerProductComponent/LockConfirmModal";
import CreateProductModal from "./SellerProductComponent/CreateProductModal";
import DetailProductModal from "./SellerProductComponent/DetailProductModal";
import ProductsTable from "./SellerProductComponent/ProductsTable";

function SellerProductContainer() {
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

      setSelectedProduct(product);

      setRemovedImageIds([]);
      setEditImageFile(null);

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
    createForm.setFieldsValue({ size: "", fileType: "" });
  };

  const handleRemoveEditImage = () => {
    if (selectedProduct?.images?.[0]?.id) {
      setRemovedImageIds([selectedProduct.images[0].id]);
    }

    setEditImagePreview(null);
    setEditImageFile(null);
    editForm.setFieldsValue({ size: "", fileType: "" });
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
        <CategoryButtons
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={(catName) => {
            setSelectedCategory(catName);
            setCurrentPage(1);
          }}
        />

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

            <ActionBar
              t={t}
              isSelectedLocked={isSelectedLocked}
              onOpenDelete={() => setIsDeleteModalOpen(true)}
              onOpenLock={() => setIsLockModalOpen(true)}
              onOpenCreate={() => {
                createForm.resetFields();
                setCreateImagePreview(null);
                setSelectedProduct(null);
                setIsModalOpen(true);
              }}
            />

            <DeleteConfirmModal
              t={t}
              open={isDeleteModalOpen}
              onCancel={() => setIsDeleteModalOpen(false)}
              onConfirm={removeProducts}
            />

            <LockConfirmModal
              t={t}
              open={isLockModalOpen}
              isSelectedLocked={isSelectedLocked}
              onCancel={() => setIsLockModalOpen(false)}
              onConfirm={toggleLockProducts}
            />

            <CreateProductModal
              t={t}
              open={isModalOpen}
              onCancel={handleCreateCancel}
              createForm={createForm}
              selectedCategory={selectedCategory}
              categories={categories}
              createImagePreview={createImagePreview}
              onImageChange={(info) =>
                handleImageUpload(
                  info,
                  createForm,
                  setCreateImagePreview,
                  setImageFile
                )
              }
              onRemoveImage={handleRemoveCreateImage}
              onSubmit={handleCreateSubmit}
            />

            <DetailProductModal
              t={t}
              open={isViewModalOpen}
              onCancel={() => {
                setIsViewModalOpen(false);
                setSelectedProduct(null);
              }}
              editForm={editForm}
              categories={categories}
              selectedProduct={selectedProduct}
              isEditMode={isEditMode}
              submitting={submitting}
              editImagePreview={editImagePreview}
              onRemoveEditImage={handleRemoveEditImage}
              onEditImageChange={(info) =>
                handleImageUpload(
                  info,
                  editForm,
                  setEditImagePreview,
                  setEditImageFile
                )
              }
              onClose={() => {
                setIsEditMode(false);
                setIsViewModalOpen(false);
              }}
              onToggleEdit={() => setIsEditMode(true)}
              onSave={async () => {
                try {
                  const values = await editForm.validateFields();
                  await handleEditSubmit(values);
                } catch (err) {}
              }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}>
                <ProductsTable
                  products={products}
                  columns={columns}
                  loading={loading}
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
    </motion.div>
  );
}

export default SellerProductContainer;