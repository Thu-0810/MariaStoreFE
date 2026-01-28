import { Card, Modal, Input, message, Spin, Select, DatePicker } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet } from "react-router-dom";
import dayjs from "dayjs";

import bgDefault from "../../assets/img/Illustration328.jpg";
import avatarDefault from "../../assets/img/Illustration158.2.png";

import {
  getMyProfileApi,
  updateMyProfileApi,
  uploadMyAvatarApi,
} from "../../api/userApi";

function ProfileContainer() {
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const [backgroundImage, setBackgroundImage] = useState(bgDefault);

  const [profile, setProfile] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    address: "",
  });

  const avatarSrc = useMemo(() => {
    const url = profile?.avatarUrl;
    if (!url) return avatarDefault;
    if (String(url).startsWith("http")) return url;
    return `http://localhost:8080${url}`;
  }, [profile]);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBackgroundChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setBackgroundImage(URL.createObjectURL(file));
  };

  const fetchProfile = async () => {
    try {
      setLoadingProfile(true);
      const res = await getMyProfileApi();
      const data = res.data;

      setProfile(data);

      setFormData({
        fullName: data?.fullName || "",
        phone: data?.phone || "",
        gender: data?.gender || "",
        dateOfBirth: data?.dateOfBirth || "",
        address: data?.address || "",
      });
    } catch {
      message.error("Không lấy được thông tin user. Vui lòng đăng nhập lại.");
    } finally {
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSaveProfile = async () => {
    try {
      setSaving(true);

      const payload = {
        fullName: formData.fullName,
        phone: formData.phone,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth || null,
        address: formData.address,
      };

      const res = await updateMyProfileApi(payload);
      const data = res.data;
      setProfile(data);
      message.success(t("profile.saved_success") || "Lưu thông tin thành công");
      setIsModalOpen(false);
    } catch {
      message.error(t("profile.saved_failed") || "Lưu thất bại, thử lại sau");
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingAvatar(true);
      const res = await uploadMyAvatarApi(file);
      const { avatarUrl } = res.data || {};

      setProfile((prev) => ({
        ...(prev || {}),
        avatarUrl: avatarUrl || prev?.avatarUrl,
      }));

      message.success(t("profile.avatar_updated") || "Cập nhật avatar thành công");
    } catch {
      message.error(t("profile.avatar_update_failed") || "Upload avatar thất bại");
    } finally {
      setUploadingAvatar(false);
      e.target.value = "";
    }
  };

  const tabClass = ({ isActive }) =>
    `pb-3 font-medium transition-colors ${
      isActive
        ? "text-[#133e87] border-b-2 border-[#133e87]"
        : "text-[#6b7280] hover:text-[#608bc1]"
    }`;

  if (loadingProfile) {
    return (
      <div className="min-h-screen bg-[#ffffff] flex items-center justify-center">
        <Spin />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <style>{`
        .profile-input.ant-input,
        .profile-input .ant-select-selector,
        .profile-input.ant-picker {
          background: #cbddec !important;
          border: 1px solid #e5e7eb !important;
          border-radius: 8px !important;
        }
        .profile-input .ant-select-selector {
          height: 48px !important;
        }
        .profile-input .ant-select-selection-item,
        .profile-input .ant-select-selection-placeholder {
          line-height: 46px !important;
        }
        .profile-input.ant-picker {
          height: 48px !important;
        }
        .profile-input.ant-picker .ant-picker-input > input {
          height: 46px !important;
        }
        .profile-input .ant-select-selector:focus-within,
        .profile-input.ant-picker-focused {
          box-shadow: 0 0 0 2px rgba(19, 62, 135, 0.15) !important;
          border-color: #133e87 !important;
        }
      `}</style>

      <div className="relative h-96 bg-gradient-to-br from-[#133e87] via-[#608bc1] to-[#d9eafd] overflow-hidden">
        <img
          src={backgroundImage}
          alt="bg"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="absolute left-4 -top-35 z-10">
          <Card className="w-72 p-6 bg-[#ffffff] border-[#d9d9d9] shadow-lg">
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden bg-[#f6f6f6] relative">
                <img
                  src={avatarSrc}
                  alt="Profile avatar"
                  className="w-full h-full object-cover"
                />

                {uploadingAvatar ? (
                  <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                    <Spin />
                  </div>
                ) : null}

                <button
                  onClick={showModal}
                  className="absolute bottom-3 right-3 w-10 h-10 rounded-full
                  bg-white/85 text-gray-700 border border-white/60 shadow-lg
                  hover:bg-white hover:text-gray-900 transition-colors
                  flex items-center justify-center"
                  title={t("profile.edit_info_btn")}
                >
                  ✎
                </button>
              </div>

              <div className="text-[#193a80] font-semibold mb-1">
                {profile?.fullName || profile?.email}
              </div>
              <div className="text-xs text-gray-500 mb-1">{profile?.email}</div>
              <div className="text-xs text-gray-500">
                {profile?.phone ? `${t("profile.phone") || "SĐT"}: ${profile.phone}` : ""}
              </div>
            </div>
          </Card>
        </div>

        <Modal
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          width={520}
          centered
          closeIcon={
            <div className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700">
              ✕
            </div>
          }
          className="profile-modal"
          styles={{
            content: { padding: 0, borderRadius: "20px", overflow: "hidden" },
            header: { padding: 0, margin: 0, border: "none" },
          }}
        >
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-center text-[#193a80] font-medium text-base">
                {t("profile.modal_title") || "Chỉnh sửa thông tin hồ sơ"}
              </h2>
            </div>

            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img
                src={backgroundImage}
                alt="bg"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <label
                htmlFor="bg-upload"
                className="absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer
                bg-white/85 text-gray-700 border border-white/60 shadow-lg
                hover:bg-white hover:text-gray-900 transition-colors z-20"
                title="Đổi ảnh bìa (local)"
              >
                <input
                  id="bg-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleBackgroundChange}
                  className="hidden"
                />
                ✎
              </label>
            </div>

            <div className="px-6 pt-4">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={avatarSrc}
                  alt="Profile avatar"
                  className="w-full h-full object-cover"
                />
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-1 right-0 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer
                  bg-white/85 text-gray-700 border border-white/60 shadow
                  hover:bg-white hover:text-gray-900 transition-colors"
                  title="Đổi avatar"
                >
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  ✎
                </label>
              </div>
            </div>

            <div className="px-6 py-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#193a80] mb-2">
                    {t("profile.full_name") || "Họ và tên"}
                  </label>
                  <Input
                    placeholder={t("profile.full_name_ph") || "Nhập họ và tên"}
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className="w-full h-12 rounded-lg"
                    style={{
                      backgroundColor: "#cbddec",
                      border: "1px solid #e5e7eb",
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#193a80] mb-2">
                    {t("profile.phone") || "Số điện thoại"}
                  </label>
                  <Input
                    placeholder={t("profile.phone_ph") || "Nhập số điện thoại"}
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full h-12 rounded-lg"
                    style={{
                      backgroundColor: "#cbddec",
                      border: "1px solid #e5e7eb",
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#193a80] mb-2">
                    {t("profile.gender") || "Giới tính"}
                  </label>
                  <Select
                    value={formData.gender || undefined}
                    onChange={(v) => handleInputChange("gender", v)}
                    placeholder={t("profile.gender_ph") || "Chọn giới tính"}
                    className="w-full profile-input"
                    size="large"
                    options={[
                      { value: "MALE", label: t("profile.gender_male") || "Nam" },
                      { value: "FEMALE", label: t("profile.gender_female") || "Nữ" },
                      { value: "OTHER", label: t("profile.gender_other") || "Khác" },
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#193a80] mb-2">
                    {t("profile.dob") || "Ngày sinh"}
                  </label>
                  <DatePicker
                    value={formData.dateOfBirth ? dayjs(formData.dateOfBirth) : null}
                    onChange={(d) =>
                      handleInputChange("dateOfBirth", d ? d.format("YYYY-MM-DD") : "")
                    }
                    className="w-full profile-input"
                    size="large"
                    placeholder={t("profile.dob_ph") || "Chọn ngày sinh"}
                    format="YYYY-MM-DD"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#193a80] mb-2">
                    {t("profile.address") || "Địa chỉ"}
                  </label>
                  <Input
                    placeholder={t("profile.address_ph") || "Nhập địa chỉ"}
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="w-full h-12 rounded-lg"
                    style={{
                      backgroundColor: "#cbddec",
                      border: "1px solid #e5e7eb",
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="px-8 py-2 text-sm font-medium text-[#193a80] hover:text-white
                  bg-[#d9eafc] border border-[#d9eafc]
                  rounded-3xl hover:bg-[#133e87] hover:border-[#133e87]
                  transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {saving ? t("profile.saving") || "Đang lưu..." : t("profile.save") || "Lưu"}
                </button>
              </div>
            </div>
          </div>
        </Modal>

        <div className="pt-10 pb-8">
          <div className="flex gap-8">
            <div className="w-72" />
            <div className="flex-1">
              <div className="border-b border-[#d9d9d9] mb-6">
                <nav className="flex gap-8">
                  <NavLink to="requests" className={tabClass}>
                    {t("profile.tab_request")}
                  </NavLink>
                  <NavLink to="orders" className={tabClass}>
                    {t("profile.tab_orders")}
                  </NavLink>
                  <NavLink to="favorites" className={tabClass}>
                    {t("profile.tab_favorites")}
                  </NavLink>
                  <NavLink to="posts" className={tabClass}>
                    {t("profile.tab_posts")}
                  </NavLink>
                </nav>
              </div>

              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileContainer;