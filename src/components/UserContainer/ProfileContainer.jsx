import { Card, Modal, Input } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet } from "react-router-dom";

import bgDefault from "../../assets/img/Illustration328.jpg";
import avatarDefault from "../../assets/img/Illustration158.2.png";

function ProfileContainer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const [backgroundImage, setBackgroundImage] = useState(bgDefault);
  const [avatarImage, setAvatarImage] = useState(avatarDefault);

  const [formData, setFormData] = useState({
    username: "",
    accountName: "",
    detailedInfo: "",
  });

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBackgroundChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setBackgroundImage(URL.createObjectURL(file));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setAvatarImage(URL.createObjectURL(file));
  };

  const tabClass = ({ isActive }) =>
    `pb-3 font-medium transition-colors ${
      isActive
        ? "text-[#133e87] border-b-2 border-[#133e87]"
        : "text-[#6b7280] hover:text-[#608bc1]"
    }`;

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <div className="relative h-96 bg-gradient-to-br from-[#133e87] via-[#608bc1] to-[#d9eafd] overflow-hidden">
        <img
          src={backgroundImage}
          alt="Anime character"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="absolute left-4 -top-35 z-10">
          <Card className="w-72 p-6 bg-[#ffffff] border-[#d9d9d9] shadow-lg">
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden bg-[#f6f6f6]">
                <img
                  src={avatarImage}
                  alt="Profile avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={showModal}
                className="px-4 py-2 text-sm font-medium text-[#193a80] hover:text-white
                bg-[#d9eafc] border border-[#d9eafc]
                rounded-3xl hover:bg-[#133e87] hover:border-[#133e87]
                transition-colors duration-200">
                {t("profile.edit_info_btn")}
              </button>
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
          }}>
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-center text-[#193a80] font-medium text-base">
                {t("profile.modal_title")}
              </h2>
            </div>

            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img
                src={backgroundImage}
                alt="Anime character"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <label
                htmlFor="bg-upload"
                className="absolute bottom-4 right-4 w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors z-20 shadow-lg">
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
                  src={avatarImage}
                  alt="Profile avatar"
                  className="w-full h-full object-cover"
                />
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-1 right-1 w-7 h-7 bg-gray-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors">
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
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#193a80] mb-2">
                    Username
                  </label>
                  <Input
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    className="w-full h-12 rounded-lg"
                    style={{
                      backgroundColor: "#cbddec",
                      border: "1px solid #e5e7eb",
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#193a80] mb-2">
                    {t("profile.account_name")}
                  </label>
                  <Input
                    placeholder="Tên Tài Khoản"
                    value={formData.accountName}
                    onChange={(e) =>
                      handleInputChange("accountName", e.target.value)
                    }
                    className="w-full h-12 rounded-lg"
                    style={{
                      backgroundColor: "#cbddec",
                      border: "1px solid #e5e7eb",
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#193a80] mb-2">
                    {t("profile.detail_info")}
                  </label>
                  <Input
                    placeholder={t("profile.detail_info_ph")}
                    value={formData.detailedInfo}
                    onChange={(e) =>
                      handleInputChange("detailedInfo", e.target.value)
                    }
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
                  onClick={handleOk}
                  className="px-8 py-2 text-sm font-medium text-[#193a80] hover:text-white
                  bg-[#d9eafc] border border-[#d9eafc]
                  rounded-3xl hover:bg-[#133e87] hover:border-[#133e87]
                  transition-colors duration-200">
                  {t("profile.save")}
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