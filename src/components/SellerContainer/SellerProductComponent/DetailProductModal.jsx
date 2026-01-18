import { Modal, Form, Input, Select, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export default function DetailProductModal({
  t,
  open,
  onCancel,
  onClose,
  editForm,
  categories,
  selectedProduct,
  isEditMode,
  submitting,
  editImagePreview,
  onRemoveEditImage,
  onEditImageChange,
  onToggleEdit,
  onSave,
}) {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
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
            {/* LEFT: image */}
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
                        onClick={onRemoveEditImage}>
                        Xóa ảnh
                      </Button>
                    )}
                  </div>
                ) : (
                  <Upload
                    accept="image/*"
                    showUploadList={false}
                    beforeUpload={() => false}
                    onChange={onEditImageChange}>
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

            {/* CENTER */}
            <div className="flex flex-col gap-4">
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
                      { value: "Hàng trưng bày", label: "Hàng trưng bày" },
                    ]}
                  />
                </Form.Item>
              </div>

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

            {/* RIGHT */}
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
              onClick={onClose}
              className="border text-white bg-red-600 hover:bg-red-400 px-6 py-1 rounded-lg">
              {t("adminProduct.btn_cancel")}
            </button>

            {!isEditMode ? (
              <button
                type="button"
                disabled={selectedProduct?.status === "LOCKED"}
                onClick={onToggleEdit}
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
                onClick={onSave}
                className="border border-green-700 text-green-700 hover:bg-green-700 hover:text-white px-6 py-1 rounded-lg">
                {t("adminProduct.action.save")}
              </button>
            )}
          </div>
        </Form>
      </div>
    </Modal>
  );
}