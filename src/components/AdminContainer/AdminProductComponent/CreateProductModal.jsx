import { Modal, Form, Input, Select, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export default function CreateProductModal({
  t,
  open,
  onCancel,
  createForm,
  selectedCategory,
  categories,
  createImagePreview,
  onImageChange,
  onRemoveImage,
  onSubmit,
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
          {t("adminProduct.modal_create_title")}
        </h1>

        <Form
          form={createForm}
          layout="vertical"
          onFinish={onSubmit}
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
                      onClick={onRemoveImage}>
                      {t("adminProduct.image.remove")}
                    </Button>
                  </div>
                ) : (
                  <Upload
                    accept="image/*"
                    showUploadList={false}
                    beforeUpload={() => false}
                    onChange={onImageChange}>
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
                    message: t("adminProduct.validation.required_name"),
                  },
                ]}>
                <Input size="large" className="bg-white border-[#cbdceb]" />
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
                      message: t("adminProduct.validation.required_category"),
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
                      message: t("adminProduct.validation.required_status"),
                    },
                  ]}>
                  <Select
                    size="large"
                    options={[
                      { value: "ACTIVE", label: "Còn hàng" },
                      { value: "OUT_OF_STOCK", label: "Hết hàng" },
                      { value: "DISPLAY", label: "Hàng trưng bày" },
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
                      message: t("adminProduct.validation.required_price"),
                    },
                  ]}>
                  <Input
                    size="large"
                    className="bg-white border-[#cbdceb]"
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
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

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  name="author"
                  label={
                    <span className="text-[#133e87] font-medium">
                      {t("adminProduct.field.author")}
                    </span>
                  }>
                  <Input size="large" className="bg-white border-[#cbdceb]" />
                </Form.Item>

                <Form.Item
                  name="character"
                  label={
                    <span className="text-[#133e87] font-medium">
                      {t("adminProduct.field.character")}
                    </span>
                  }>
                  <Input size="large" className="bg-white border-[#cbdceb]" />
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
                  <Input size="large" className="bg-white border-[#cbdceb]" />
                </Form.Item>

                <Form.Item
                  name="style"
                  label={
                    <span className="text-[#133e87] font-medium">
                      {t("adminProduct.field.style")}
                    </span>
                  }>
                  <Input size="large" className="bg-white border-[#cbdceb]" />
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
                  onClick={onCancel}
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
  );
}