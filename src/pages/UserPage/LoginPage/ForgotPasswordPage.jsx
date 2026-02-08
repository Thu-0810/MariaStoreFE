import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { forgotPasswordApi } from "../../../api/authApi";
import { useTranslation } from "react-i18next";

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const handleForgotPassword = async (values) => {
    try {
      await forgotPasswordApi(values);
      message.success(t("auth.reset_link_sent")); // "Nếu email tồn tại, link đã được gửi"
      navigate("/login");
    } catch (err) {
      // FE vẫn nên báo chung chung
      message.error(t("auth.reset_link_send_failed"));
    }
  };

  return (
    <div className="min-h-screen bg-[#f4faff]">
      <main className="relative min-h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('src/assets/img/Illustration122.jpg')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#d9eafd]/20"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 w-full max-w-md shadow-lg">
            <h2 className="text-[#133e87] text-xl font-bold text-center mb-2">
              {t("auth.forgot_password_title")}
            </h2>

            <p className="text-center text-sm text-[#608bc1] mb-6">
              {t("auth.forgot_password_desc")}
            </p>

            <Form form={form} layout="vertical" onFinish={handleForgotPassword}>
              <Form.Item
                label={t("auth.email")}
                name="email"
                rules={[
                  { required: true, message: t("auth.required_email") },
                  { type: "email", message: t("auth.invalid_email") },
                ]}
              >
                <Input placeholder={t("auth.email_placeholder")} />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                className="w-full font-medium py-2.5 mt-2 h-10"
                style={{ backgroundColor: "#608bc1", borderColor: "#608bc1" }}
              >
                {t("auth.btn_send_reset_link")}
              </Button>
            </Form>

            <div className="text-center mt-4 text-sm">
              <a
                href="/login"
                className="text-[#d61f6f] hover:underline"
              >
                {t("auth.back_to_login")}
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ForgotPasswordPage;