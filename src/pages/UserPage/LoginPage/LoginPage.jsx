import { Input, Button, message } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Tạo tài khoản admin mặc định nếu chưa có
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const hasAdmin = users.some((u) => u.role === "ADMIN");
    const hasSeller = users.some((u) => u.role === "SELLER");

    if (!hasAdmin) {
      const defaultAdmin = {
        id: "admin-1",
        email: "admin@gmail.com",
        password: "Admin@123",
        role: "ADMIN",
        name: "Administrator",
      };
      users.push(defaultAdmin);
    }

    if (!hasSeller) {
      const defaultSeller = {
        id: "seller-1",
        email: "seller@gmail.com",
        password: "Seller@123",
        role: "SELLER",
        name: "Default Seller",
      };
      users.push(defaultSeller);
    }

    localStorage.setItem("users", JSON.stringify(users));
    console.log("Default users created:", users);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Lấy danh sách người dùng từ localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Tìm người dùng trùng email và mật khẩu
    const user = users.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (user) {
      // Lưu người dùng hiện tại
      localStorage.setItem("currentUser", JSON.stringify(user));
      message.success("Đăng nhập thành công!");

      // Điều hướng theo quyền
      if (user.role === "ADMIN") {
        navigate("/admin-dashboard");
      } else if (user.role === "SELLER") {
        navigate("/seller-dashboard");
      } else {
        navigate("/dashboard");
      }
    } else {
      message.error("Email hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div className="min-h-screen bg-[#f4faff]">
      <main className="relative min-h-screen">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('src/assets/img/Illustration122.jpg')`,
          }}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#d9eafd]/20"></div>
        </div>

        {/* Login Form */}
        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 w-full max-w-md shadow-lg">
            <h2 className="text-[#133e87] text-xl font-bold text-center mb-6">
              Đăng nhập tài khoản
            </h2>

            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="block text-[#133e87] text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-[#133e87] text-sm font-medium mb-2">
                  Mật khẩu
                </label>
                <Input.Password
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>

              <Button
                type="primary"
                htmlType="submit"
                className="w-full font-medium py-2.5 mt-6 h-10"
                style={{ backgroundColor: "#608bc1", borderColor: "#608bc1" }}>
                Đăng nhập
              </Button>
            </form>

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