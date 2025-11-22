import { Card, Space } from "antd";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";

function ContactContainer() {
  return (
    <div className="relative min-h-screen">
      {/* Ảnh nền */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('src/assets/img/Illustration265.jpg')",
        }}
      />
      {/* Lớp phủ mờ xám */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/75 via-purple-50/60 to-pink-50/50" />

      {/* Nội dung */}
      <div className="relative flex flex-col items-center justify-center min-h-screen px-4 space-y-6">
        {/* Khối xanh tiêu đề */}
        <div className="w-full max-w-lg bg-[#133e87] text-white text-center py-4 shadow-md">
          <h2 className="text-lg font-semibold">Liên hệ với chúng tôi</h2>
        </div>

        {/* Khối trắng nội dung */}
        <Card
          className="w-full max-w-lg shadow-lg"
          styles={{
            body: { padding: 24 },
          }}>
          <p className="text-gray-700 mb-6 text-center">
            Liên hệ với chúng tôi qua:
          </p>
          <Space direction="vertical" size="middle" className="w-full">
            <div className="flex items-center gap-3">
              <MailOutlined className="text-[#608bc1] text-lg" />
              <span className="text-[#608bc1]">mariastore@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <PhoneOutlined className="text-[#608bc1] text-lg" />
              <span className="text-[#608bc1]">0985271003</span>
            </div>
          </Space>
        </Card>
      </div>
    </div>
  );
}

export default ContactContainer;