import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../../../api/authApi";
import { errorMessageMapper } from "../../../utils/errorMessageMapper";

function RegisterPage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    try {
      const payload = {
        email: values.email,
        password: values.password,
        phone: values.phone,
        fullName: `${values.firstName} ${values.lastName}`.trim(),
      };

      await registerApi(payload);

      message.success("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/login");
    } catch (err) {
      const backendMessage = err.response?.data?.message;

      if (backendMessage === "Email already exists") {
        form.setFields([
          {
            name: "email",
            errors: ["Email đã tồn tại trong hệ thống"],
          },
        ]);
      } else {
        message.error(errorMessageMapper(backendMessage));
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f4faff]">
      <main className="relative min-h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('src/assets/img/Illustration122.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#d9eafd]/20"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 w-full max-w-md shadow-lg">
            <h2 className="text-[#133e87] text-xl font-bold text-center mb-6">
              Đăng ký tài khoản
            </h2>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleRegister}
            >
              <Form.Item
                label="Họ"
                name="firstName"
                rules={[
                  { required: true, message: "Vui lòng nhập họ!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Tên"
                name="lastName"
                rules={[
                  { required: true, message: "Vui lòng nhập tên!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Số điện thoại (Tùy chọn)"
                name="phone"
                rules={[
                  {
                    pattern: /^(0|\+84)[0-9]{9}$/,
                    message: "Số điện thoại không hợp lệ!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không đúng định dạng!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu!" },
                  {
                    min: 6,
                    message: "Mật khẩu phải có ít nhất 6 ký tự!",
                  },
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
                Đăng ký
              </Button>
            </Form>

            <div className="text-center mt-4">
              <a
                href="/login"
                className="text-[#d61f6f] text-sm hover:underline"
              >
                Đã có tài khoản? Đăng nhập
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RegisterPage;