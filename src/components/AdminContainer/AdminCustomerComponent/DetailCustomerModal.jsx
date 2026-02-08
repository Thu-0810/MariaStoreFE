import { useMemo } from "react";
import {
  Modal,
  Button,
  Upload,
  Input,
  Select,
  DatePicker,
  Table,
  Pagination,
  message,
} from "antd";
import { DownOutlined, EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { adminUploadUserAvatarApi } from "../../../api/adminUserApi";

const BASE_BACKEND = "http://localhost:8080";

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

  ordersPage = 1,
  ordersTotal = 0,
  ordersPageSize = 10,
  onOrdersPageChange,
  ordersLoading = false,
}) {
  const displayName = selectedCustomer?.displayName ?? "";
  const phone = selectedCustomer?.phone ?? "";
  const gender = selectedCustomer?.gender ?? undefined;
  const birthday = selectedCustomer?.birthday ?? null;
  const email = selectedCustomer?.email ?? "";
  const address = selectedCustomer?.address ?? "";
  const ordersDetail = selectedCustomer?.ordersDetail ?? [];
  const totalAmount = selectedCustomer?.totalAmount ?? "";
  const isLocked = selectedCustomer?.status === "LOCKED";

  const roles = selectedCustomer?.roles ?? [];
  const isUserRole = useMemo(() => {
    if (!roles) return false;
    if (Array.isArray(roles)) return roles.includes("USER");
    return String(roles).includes("USER");
  }, [roles]);

  const birthdayValue =
    birthday && dayjs(birthday).isValid() ? dayjs(birthday) : null;

  const resolvedAvatar =
    avatarUrl ||
    (selectedCustomer?.avatarUrl
      ? selectedCustomer.avatarUrl.startsWith("http")
        ? selectedCustomer.avatarUrl
        : `${BASE_BACKEND}${selectedCustomer.avatarUrl}`
      : null);

  const handleUploadAvatar = async (file) => {
    try {
      if (!selectedCustomer?.id) {
        message.error(t("adminCustomer.toast.missing_user_id"));
        return false;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setAvatarUrl(reader.result);

      const res = await adminUploadUserAvatarApi(selectedCustomer.id, file);
      const newAvatarUrl = res.data?.avatarUrl;

      if (newAvatarUrl) {
        onChangeField("avatarUrl", newAvatarUrl);
        setAvatarUrl(`${BASE_BACKEND}${newAvatarUrl}`);
        message.success(t("adminCustomer.toast.avatar_upload_success"));
      } else {
        message.warning(t("adminCustomer.toast.avatar_upload_no_url"));
      }
    } catch (err) {
      message.error(t("adminCustomer.toast.avatar_upload_failed"));
    }

    return false;
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width={1200}
      centered
      className="rounded-3xl overflow-hidden custom-colored-modal"
      destroyOnClose
    >
      {selectedCustomer && (
        <main className="container mx-auto px-6 py-12">
          <div className="flex gap-6 max-w-7xl mx-auto">
            {/* LEFT */}
            <div className="w-[280px] flex-shrink-0">
              <div className="bg-[#ffffff] backdrop-blur-md rounded-3xl p-6 shadow-lg">
                <div className="flex flex-col items-center gap-6">
                  <div className="relative w-40 h-40 flex items-center justify-center">
                    <div className="w-36 h-36 rounded-full bg-[#f6f6f6] flex items-center justify-center overflow-hidden">
                      {resolvedAvatar ? (
                        <img
                          src={resolvedAvatar}
                          alt={t("adminCustomer.detail.avatar_alt")}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center" />
                      )}
                    </div>

                    {isEditing && (
                      <Upload
                        showUploadList={false}
                        beforeUpload={handleUploadAvatar}
                        accept="image/png,image/jpeg,image/webp"
                        className="absolute bottom-4 right-8 translate-x-1/3 translate-y-1/3 cursor-pointer"
                      >
                        <Button
                          type="default"
                          shape="circle"
                          icon={<EditOutlined />}
                          className="bg-white/80 hover:bg-white text-blue-700 border border-blue-400 shadow-md"
                          aria-label={t("adminCustomer.detail.upload_avatar")}
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
                      onClick={onToggleEditOrSave}
                    >
                      {isEditing
                        ? t("adminCustomer.detail.btn_save")
                        : t("adminCustomer.detail.btn_edit")}
                    </Button>

                    <Button
                      type="primary"
                      style={{
                        backgroundColor: isLocked ? "#22c55e" : "#133e87",
                        borderColor: isLocked ? "#22c55e" : "#133e87",
                      }}
                      className="w-full rounded-lg text-white font-medium hover:opacity-90 transition"
                      onClick={onOpenLock}
                    >
                      {isLocked
                        ? t("adminCustomer.btn_unlock")
                        : t("adminCustomer.btn_lock")}
                    </Button>

                    <Button
                      danger
                      type="primary"
                      style={{
                        backgroundColor: "#ff7383",
                        borderColor: "#ff7383",
                      }}
                      className="w-full rounded-lg text-white font-medium hover:opacity-90 transition"
                      onClick={onOpenDelete}
                    >
                      {t("adminCustomer.btn_delete")}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex-1">
              <div className="bg-[#ffffff]/70 backdrop-blur-md rounded-3xl p-8 shadow-lg">
                {/* Row 1 */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div>
                    <label className="text-[#133e87] text-sm font-medium mb-2 block">
                      {t("adminCustomer.detail.display_name")}
                    </label>
                    <Input
                      value={displayName}
                      onChange={(e) =>
                        onChangeField("displayName", e.target.value)
                      }
                      disabled={!isEditing}
                      placeholder={t("adminCustomer.detail.display_name")}
                    />
                  </div>

                  <div>
                    <label className="text-[#133e87] text-sm font-medium mb-2 block">
                      {t("adminCustomer.detail.address")}
                    </label>
                    <Input
                      value={address}
                      onChange={(e) => onChangeField("address", e.target.value)}
                      disabled={!isEditing}
                      placeholder={t("adminCustomer.detail.address")}
                    />
                  </div>

                  <div>
                    <label className="text-[#133e87] text-sm font-medium mb-2 block">
                      {t("adminCustomer.detail.phone")}
                    </label>
                    <Input
                      value={phone}
                      onChange={(e) => onChangeField("phone", e.target.value)}
                      disabled={!isEditing}
                      placeholder={t("adminCustomer.detail.phone")}
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div>
                    <label className="text-[#133e87] text-sm font-medium mb-2 block">
                      {t("adminCustomer.detail.gender")}
                    </label>
                    <Select
                      value={gender}
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
                      allowClear
                      placeholder={t("adminCustomer.detail.gender_ph")}
                    />
                  </div>

                  <div>
                    <label className="text-[#133e87] text-sm font-medium mb-2 block">
                      {t("adminCustomer.detail.birthday")}
                    </label>
                    <DatePicker
                      value={birthdayValue}
                      onChange={(date) =>
                        onChangeField(
                          "birthday",
                          date ? date.format("YYYY-MM-DD") : null
                        )
                      }
                      disabled={!isEditing}
                      format="DD/MM/YYYY"
                      className="w-full"
                      placeholder={t("adminCustomer.detail.birthday_ph")}
                      allowClear
                    />
                  </div>

                  <div>
                    <label className="text-[#133e87] text-sm font-medium mb-2 block">
                      {t("adminCustomer.detail.email")}
                    </label>
                    <Input
                      value={email}
                      onChange={(e) => onChangeField("email", e.target.value)}
                      disabled={!isEditing}
                      placeholder={t("adminCustomer.detail.email")}
                    />
                  </div>
                </div>

                {/* Orders + Total: chỉ hiện với role USER */}
                {isUserRole && (
                  <>
                    <div className="mb-6">
                      <h3 className="text-[#133e87] font-semibold mb-4">
                        {t("adminCustomer.detail.orders_stats")}
                      </h3>

                      <Table
                        loading={ordersLoading}
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
                            title: t(
                              "adminCustomer.detail.order_table.order_date"
                            ),
                            dataIndex: "date",
                            key: "date",
                          },
                          {
                            title: t("adminCustomer.detail.order_table.total"),
                            dataIndex: "total",
                            key: "total",
                          },
                        ]}
                        dataSource={Array.isArray(ordersDetail) ? ordersDetail : []}
                        pagination={false}
                        className="custom-table"
                        locale={{
                          emptyText: t("adminCustomer.detail.no_orders"),
                        }}
                        rowKey={(row) => row?.key ?? row?.orderNumber}
                      />

                      {typeof onOrdersPageChange === "function" && (
                        <div className="flex justify-center items-center mt-4">
                          <Pagination
                            current={ordersPage}
                            total={ordersTotal}
                            pageSize={ordersPageSize}
                            onChange={onOrdersPageChange}
                            showSizeChanger={false}
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-[#d1d1d1]">
                      <span className="text-[#133e87] font-semibold text-lg">
                        {t("adminCustomer.detail.total_value")}
                      </span>
                      <span className="text-[#133e87] font-bold text-2xl">
                        {totalAmount}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
      )}
    </Modal>
  );
}