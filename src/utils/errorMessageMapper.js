export const errorMessageMapper = (backendMessage) => {
    const map = {
      "Email already exists": "Email đã tồn tại",
      "Invalid credentials": "Email hoặc mật khẩu không đúng",
      "ROLE_USER not found": "Hệ thống chưa khởi tạo quyền người dùng",
    };
  
    return map[backendMessage] || "Có lỗi xảy ra, vui lòng thử lại";
  };
  