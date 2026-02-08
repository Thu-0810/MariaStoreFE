import { Form, Input, Button, message } from "antd";
import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPasswordApi } from "../../../api/authApi";
import { useTranslation } from "react-i18next";

function ResetPasswordPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();

  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);

  const handleResetPassword = async (values) => {
    if (!token) {
      message.error(t("auth.reset_token_missing"));
      return;
    }

    try {
      await resetPasswordApi({
        token,
        newPassword: values.newPassword,
      });

      message.success(t("auth.reset_password_success"));
      navigate("/login");
    } catch (err) {
      message.error(t("auth.reset_password_failed"));
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
              {t("auth.reset_password_title")}
            </h2>

            <p className="text-center text-sm text-[#608bc1] mb-6">
              {t("auth.reset_password_desc")}
            </p>

            {!token ? (
              <div className="text-center">
                <p className="text-sm text-[#d61f6f]">
                  {t("auth.reset_token_invalid")}
                </p>

                <div className="mt-4">
                  <a href="/forgot-password" className="text-[#133e87] font-medium hover:underline">
                    {t("auth.go_to_forgot_password")}
                  </a>
                </div>
              </div>
            ) : (
              <Form form={form} layout="vertical" onFinish={handleResetPassword}>
                <Form.Item
                  label={t("auth.new_password")}
                  name="newPassword"
                  rules={[
                    { required: true, message: t("auth.required_password") },
                    { min: 6, message: t("auth.password_min_6") },
                  ]}
                >
                  <Input.Password placeholder={t("auth.new_password_placeholder")} />
                </Form.Item>

                <Form.Item
                  label={t("auth.confirm_password")}
                  name="confirmPassword"
                  dependencies={["newPassword"]}
                  rules={[
                    { required: true, message: t("auth.required_confirm_password") },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error(t("auth.password_not_match")));
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder={t("auth.confirm_password_placeholder")} />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full font-medium py-2.5 mt-2 h-10"
                  style={{ backgroundColor: "#608bc1", borderColor: "#608bc1" }}
                >
                  {t("auth.btn_reset_password")}
                </Button>
              </Form>
            )}

            <div className="text-center mt-4 text-sm">
              <a href="/login" className="text-[#d61f6f] hover:underline">
                {t("auth.back_to_login")}
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ResetPasswordPage;