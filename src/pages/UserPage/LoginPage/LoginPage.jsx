import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { getCurrentUserApi, loginApi } from "../../../api/authApi";

function LoginPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleLogin = async (values) => {
    try {
      const res = await loginApi(values);
      const { token } = res.data;

      localStorage.setItem("accessToken", token);

      try {
        const userRes = await getCurrentUserApi();
        console.log("USER RES:", userRes.data);

        const user = {
          id: userRes.data.id,
          email: userRes.data.email,
          name: userRes.data.fullName,
          role: userRes.data.roles[0],
        };

        localStorage.setItem("currentUser", JSON.stringify(user));

        message.success("Đăng nhập thành công!");

        if (user.role === "ADMIN") {
          navigate("/admin-dashboard");
        } else if (user.role === "SELLER") {
          navigate("/seller-dashboard");
        } else {
          navigate("/dashboard");
        }
      } catch (profileErr) {
        console.error("PROFILE ERROR:", profileErr?.response);
        message.error(
          "Đăng nhập thành công nhưng không lấy được thông tin user"
        );
      }
    } catch (loginErr) {
      message.error("Email hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div className="min-h-screen bg-[#f4faff]">
      <main className="relative min-h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('src/assets/img/Illustration122.jpg')`,
          }}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#d9eafd]/20"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 w-full max-w-md shadow-lg">
            <h2 className="text-[#133e87] text-xl font-bold text-center mb-6">
              Đăng nhập tài khoản
            </h2>

            <Form form={form} layout="vertical" onFinish={handleLogin}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập email!",
                  },
                  {
                    type: "email",
                    message: "Email không đúng định dạng!",
                  },
                ]}>
                <Input />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu!",
                  },
                  {
                    min: 6,
                    message: "Mật khẩu phải có ít nhất 6 ký tự!",
                  },
                ]}>
                <Input.Password />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                className="w-full font-medium py-2.5 mt-4 h-10"
                style={{
                  backgroundColor: "#608bc1",
                  borderColor: "#608bc1",
                }}>
                Đăng nhập
              </Button>
            </Form>

            <div className="text-center mt-4">
              <a href="#" className="text-[#d61f6f] text-sm hover:underline">
                Quên mật khẩu ?
              </a>
            </div>

            <div className="text-center mt-4 text-sm text-[#608bc1]">
              Chưa có tài khoản?{" "}
              <a
                href="/register"
                className="text-[#133e87] font-medium hover:underline">
                Đăng kí ngay
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;