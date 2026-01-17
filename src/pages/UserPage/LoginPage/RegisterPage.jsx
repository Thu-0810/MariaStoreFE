import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../../../api/authApi";
import { errorMessageMapper } from "../../../utils/errorMessageMapper";
import { useTranslation } from "react-i18next";

function RegisterPage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleRegister = async (values) => {
    try {
      const payload = {
        email: values.email,
        password: values.password,
        phone: values.phone,
        fullName: `${values.firstName} ${values.lastName}`.trim(),
      };

      await registerApi(payload);

      message.success(t("auth.register_success"));
      navigate("/login");
    } catch (err) {
      const backendMessage = err.response?.data?.message;

      // case backend trả string cố định
      if (backendMessage === "Email already exists") {
        form.setFields([
          {
            name: "email",
            errors: [t("auth.email_exists")],
          },
        ]);
        return;
      }

      // fallback: mapper cũ (nếu bạn muốn i18n hóa mapper nữa thì mình chỉ tiếp)
      message.error(errorMessageMapper(backendMessage));
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
            <h2 className="text-[#133e87] text-xl font-bold text-center mb-6">
              {t("auth.register_title")}
            </h2>

            <Form form={form} layout="vertical" onFinish={handleRegister}>
              <Form.Item
                label={t("auth.first_name")}
                name="firstName"
                rules={[{ required: true, message: t("auth.required_first_name") }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={t("auth.last_name")}
                name="lastName"
                rules={[{ required: true, message: t("auth.required_last_name") }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={t("auth.phone_optional")}
                name="phone"
                rules={[
                  {
                    pattern: /^(0|\+84)[0-9]{9}$/,
                    message: t("auth.invalid_phone"),
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={t("auth.email")}
                name="email"
                rules={[
                  { required: true, message: t("auth.required_email") },
                  { type: "email", message: t("auth.invalid_email") },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={t("auth.password")}
                name="password"
                rules={[
                  { required: true, message: t("auth.required_password") },
                  { min: 6, message: t("auth.password_min_6") },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                className="w-full font-medium py-2.5 mt-4 h-10"
                style={{ backgroundColor: "#608bc1", borderColor: "#608bc1" }}
              >
                {t("auth.btn_register")}
              </Button>
            </Form>

            <div className="text-center mt-4">
              <a href="/login" className="text-[#d61f6f] text-sm hover:underline">
                {t("auth.already_have_account")}
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RegisterPage;