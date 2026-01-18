import { Modal, Button, Upload, Input, Select, DatePicker, Table } from "antd";
import { DownOutlined, EditOutlined, RightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

export default function DetailCustomerModal({
  t,
  open,
  onCancel,
  selectedCustomer,
  isEditing,
  avatarUrl,
  setAvatarUrl,
  onToggleEditOrSave,
  onOpenLock,
  onOpenDelete,
  onChangeField,
}) {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width={1200}
      centered
      className="rounded-3xl overflow-hidden custom-colored-modal">
      {selectedCustomer && (
        <main className="container mx-auto px-6 py-12">
          <div className="flex gap-6 max-w-7xl mx-auto">
            <div className="w-[280px] flex-shrink-0">
              <div className="bg-[#ffffff] backdrop-blur-md rounded-3xl p-6 shadow-lg">
                <div className="flex flex-col items-center gap-6">
                  <div className="relative w-40 h-40 flex items-center justify-center">
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

                    {isEditing && (
                      <Upload
                        showUploadList={false}
                        beforeUpload={(file) => {
                          const reader = new FileReader();
                          reader.readAsDataURL(file);
                          reader.onload = () => setAvatarUrl(reader.result);
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
                      onClick={onToggleEditOrSave}>
                      {isEditing
                        ? t("adminCustomer.detail.btn_save")
                        : t("adminCustomer.detail.btn_edit")}
                    </Button>

                    <Button
                      type="primary"
                      style={{
                        backgroundColor: "#133e87",
                        borderColor: "#133e87",
                      }}
                      className="w-full rounded-lg text-white font-medium hover:opacity-90 transition"
                      onClick={onOpenLock}>
                      {t("adminCustomer.btn_lock")}
                    </Button>

                    <Button
                      danger
                      type="primary"
                      style={{
                        backgroundColor: "#ff7383",
                        borderColor: "#ff7383",
                      }}
                      className="w-full rounded-lg text-white font-medium hover:opacity-90 transition"
                      onClick={onOpenDelete}>
                      {t("adminCustomer.btn_delete")}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="bg-[#ffffff]/70 backdrop-blur-md rounded-3xl p-8 shadow-lg">
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div>
                    <label className="text-[#133e87] text-sm font-medium mb-2 block">
                      {t("adminCustomer.detail.display_name")}
                    </label>
                    <Input
                      value={selectedCustomer.displayName}
                      onChange={(e) =>
                        onChangeField("displayName", e.target.value)
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <label className="text-[#133e87] text-sm font-medium mb-2 block">
                      {t("adminCustomer.detail.username")}
                    </label>
                    <Input
                      value={selectedCustomer.username}
                      onChange={(e) =>
                        onChangeField("username", e.target.value)
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <label className="text-[#133e87] text-sm font-medium mb-2 block">
                      {t("adminCustomer.detail.phone")}
                    </label>
                    <Input
                      value={selectedCustomer.phone}
                      onChange={(e) => onChangeField("phone", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div>
                    <label className="text-[#133e87] text-sm font-medium mb-2 block">
                      {t("adminCustomer.detail.gender")}
                    </label>
                    <Select
                      value={selectedCustomer.gender}
                      onChange={(val) => onChangeField("gender", val)}
                      options={[
                        {
                          value: "male",
                          label: t("adminCustomer.detail.gender_male"),
                        },
                        {
                          value: "female",
                          label: t("adminCustomer.detail.gender_female"),
                        },
                        {
                          value: "other",
                          label: t("adminCustomer.detail.gender_other"),
                        },
                      ]}
                      disabled={!isEditing}
                      className="w-full"
                      suffixIcon={<DownOutlined />}
                    />
                  </div>

                  <div>
                    <label className="text-[#133e87] text-sm font-medium mb-2 block">
                      {t("adminCustomer.detail.birthday")}{" "}
                    </label>
                    <DatePicker
                      value={
                        selectedCustomer.birthday
                          ? dayjs(selectedCustomer.birthday)
                          : null
                      }
                      onChange={(date) =>
                        onChangeField(
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
                      {t("adminCustomer.detail.email")}{" "}
                    </label>
                    <Input
                      value={selectedCustomer.email}
                      onChange={(e) => onChangeField("email", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-[#133e87] font-semibold mb-4">
                    {t("adminCustomer.detail.orders_stats")}
                  </h3>

                  <Table
                    columns={[
                      {
                        title: t("adminCustomer.detail.order_table.index"),
                        dataIndex: "stt",
                        key: "stt",
                        width: 80,
                      },
                      {
                        title: t(
                          "adminCustomer.detail.order_table.order_number"
                        ),
                        dataIndex: "orderNumber",
                        key: "orderNumber",
                      },
                      {
                        title: t("adminCustomer.detail.order_table.order_date"),
                        dataIndex: "date",
                        key: "date",
                      },
                      {
                        title: t("adminCustomer.detail.order_table.total"),
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
                    {t("adminCustomer.detail.total_value")}
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
  );
}