import { Input, Button, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Kiểm tra email trùng
    if (users.find((u) => u.email === form.email)) {
      message.error("Email đã tồn tại!");
      return;
    }

    // Tạo user mới có role mặc định
    const newUser = {
      id: Date.now(),
      ...form,
      role: "USER",
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    message.success("Đăng ký thành công! Vui lòng đăng nhập.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f4faff]">
      {" "}
      <main className="relative min-h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('src/assets/img/Illustration122.jpg')`,
          }}>
          {" "}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#d9eafd]/20"></div>{" "}
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 w-full max-w-md shadow-lg">
            <h2 className="text-[#133e87] text-xl font-bold text-center mb-6">
              Đăng ký tài khoản
            </h2>

            <form className="space-y-4">
              <div>
                <label className="block text-[#133e87] text-sm font-medium mb-2">
                  Họ
                </label>
                <Input name="firstName" onChange={handleChange} />
              </div>

              <div>
                <label className="block text-[#133e87] text-sm font-medium mb-2">
                  Tên
                </label>
                <Input name="lastName" onChange={handleChange} />
              </div>

              <div>
                <label className="block text-[#133e87] text-sm font-medium mb-2">
                  Số điện thoại (Tùy chọn)
                </label>
                <Input name="phone" onChange={handleChange} />
              </div>

              <div>
                <label className="block text-[#133e87] text-sm font-medium mb-2">
                  Email
                </label>
                <Input type="email" name="email" onChange={handleChange} />
              </div>

              <div>
                <label className="block text-[#133e87] text-sm font-medium mb-2">
                  Mật khẩu
                </label>
                <Input.Password name="password" onChange={handleChange} />
              </div>

              <Button
                type="primary"
                htmlType="button"
                className="w-full font-medium py-2.5 mt-6 h-10"
                style={{ backgroundColor: "#608bc1", borderColor: "#608bc1" }}
                onClick={handleRegister}>
                Đăng ký
              </Button>
            </form>

            <div className="text-center mt-4">
              <a
                href="/login"
                className="text-[#d61f6f] text-sm hover:underline">
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