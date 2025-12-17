
import { useState } from "react";
import {
  Input,
  Button,
  Table,
  Space,
  Pagination,
  Modal,
  Select,
  Form,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";

function AdminProductContainer() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLockModalOpen, setIsLockModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Dữ liệu mẫu cho từng danh mục
  const categoryData = {
    "Nhãn Dán": [
      {
        key: 1,
        stt: 1,
        name: "Nhãn dán ôm",
        category: "Nhãn Dán",
        quantity: 1,
        date: "20/05/2025",
        price: "392,850đ",
        status: "Còn hàng",
        description:
          "Nhãn dán ôm dễ thương, thích hợp trang trí laptop hoặc điện thoại.",
        fileType: "PNG",
        fileSize: "1.2MB",
        size: "640x640px",
        author: "Minh Hoạ Studio",
        character: "Chibi Ôm",
        origin: "Việt Nam",
        style: "Cute / Chibi",
        extraInfo: "Hỗ trợ in trên nền trong suốt.",
        image: "https://example.com/nhan-dan-om.png",
      },
      {
        key: 2,
        stt: 2,
        name: "Sticker Nhãn Dán vui vẻ",
        category: "Nhãn Dán",
        quantity: 1,
        date: "21/06/2025",
        price: "420,000đ",
        status: "Còn hàng",
        description: "Sticker chibi tươi sáng, biểu cảm vui vẻ và năng động.",
        fileType: "JPG",
        fileSize: "950KB",
        size: "800x800px",
        author: "Haru Design",
        character: "Vui Vẻ",
        origin: "Nhật Bản",
        style: "Anime",
        extraInfo: "Có thể dùng làm biểu tượng mạng xã hội.",
        image: "https://example.com/sticker-vui-ve.jpg",
      },
    ],

    Chibi: [
      {
        key: 3,
        stt: 1,
        name: "Maria Thỏ chibi",
        category: "Chibi",
        quantity: 1,
        date: "05/10/2025",
        price: "392,850đ",
        status: "Còn hàng",
        description: "Hình vẽ Maria phong cách thỏ chibi siêu đáng yêu.",
        fileType: "PNG",
        fileSize: "1.1MB",
        size: "720x720px",
        author: "Maria Art",
        character: "Maria Bunny",
        origin: "Hàn Quốc",
        style: "Chibi / Kawaii",
        extraInfo: "Có hiệu ứng ánh sáng nhẹ trên nền.",
        image: "https://example.com/maria-tho-chibi.png",
      },
      {
        key: 4,
        stt: 2,
        name: "Chibi mèo dễ thương",
        category: "Chibi",
        quantity: 1,
        date: "22/07/2025",
        price: "450,000đ",
        status: "Hết hàng",
        description: "Chibi mèo nhỏ ngộ nghĩnh, tông màu pastel nhẹ nhàng.",
        fileType: "JPG",
        fileSize: "870KB",
        size: "640x640px",
        author: "Yuki Studio",
        character: "Mèo Neko",
        origin: "Nhật Bản",
        style: "Pastel / Soft",
        extraInfo: "Sử dụng tốt làm icon chat hoặc avatar.",
        image: "https://example.com/chibi-meo.jpg",
      },
    ],

    "Ảnh Động": [
      {
        key: 5,
        stt: 1,
        name: "Gif tai thỏ",
        category: "Ảnh Động",
        quantity: 1,
        date: "20/05/2025",
        price: "430,850đ",
        status: "Còn hàng",
        description: "Gif ngắn với nhân vật đội tai thỏ chuyển động vui mắt.",
        fileType: "GIF",
        fileSize: "2.3MB",
        size: "480x480px",
        author: "Tomo Art",
        character: "Bunny Girl",
        origin: "Nhật Bản",
        style: "Anime / Motion",
        extraInfo: "Chạy mượt trên mọi nền tảng mạng xã hội.",
        image: "https://example.com/gif-tai-tho.gif",
      },
      {
        key: 6,
        stt: 2,
        name: "Gif Vịt nhỏ",
        category: "Ảnh Động",
        quantity: 1,
        date: "22/03/2025",
        price: "430,850đ",
        status: "Hết hàng",
        description: "Gif vui nhộn chú vịt nhỏ chạy tung tăng.",
        fileType: "GIF",
        fileSize: "1.8MB",
        size: "400x400px",
        author: "CuteMotion",
        character: "Vịt Con",
        origin: "Hàn Quốc",
        style: "Cartoon / Funny",
        extraInfo: "Phổ biến trong cộng đồng chat Discord.",
        image: "https://example.com/gif-vit-nho.gif",
      },
    ],

    "Biểu Tượng Cảm Xúc": [
      {
        key: 7,
        stt: 1,
        name: "Icon vui vẻ",
        category: "Biểu Tượng Cảm Xúc",
        quantity: 1,
        date: "10/02/2025",
        price: "300,000đ",
        status: "Còn hàng",
        description: "Icon thể hiện cảm xúc vui tươi, màu sắc sinh động.",
        fileType: "PNG",
        fileSize: "600KB",
        size: "256x256px",
        author: "EmojiLab",
        character: "Smiley",
        origin: "Việt Nam",
        style: "Flat / Modern",
        extraInfo: "Hỗ trợ nền trong suốt.",
        image: "https://example.com/icon-vui-ve.png",
      },
      {
        key: 8,
        stt: 2,
        name: "Icon buồn nhẹ",
        category: "Biểu Tượng Cảm Xúc",
        quantity: 1,
        date: "12/03/2025",
        price: "310,000đ",
        status: "Hàng trưng bày",
        description: "Icon diễn tả cảm xúc nhẹ nhàng, gam màu lạnh.",
        fileType: "SVG",
        fileSize: "400KB",
        size: "256x256px",
        author: "EmojiLab",
        character: "SadFace",
        origin: "Hàn Quốc",
        style: "Minimal",
        extraInfo: "Phù hợp với giao diện web.",
        image: "https://example.com/icon-buon-nhe.svg",
      },
    ],

    "Tranh Chân Dung": [
      {
        key: 9,
        stt: 1,
        name: "Tranh gió nổi",
        category: "Tranh Chân Dung",
        quantity: 1,
        date: "01/04/2025",
        price: "900,000đ",
        status: "Còn hàng",
        description: "Tranh chân dung với hiệu ứng gió và ánh sáng.",
        fileType: "JPG",
        fileSize: "5MB",
        size: "1920x1080px",
        author: "ArtWind Studio",
        character: "Wind Girl",
        origin: "Việt Nam",
        style: "Realism",
        extraInfo: "In chất lượng cao trên canvas.",
        image: "https://example.com/tranh-gio-noi.jpg",
      },
      {
        key: 10,
        stt: 2,
        name: "Tranh sấm sét",
        category: "Tranh Chân Dung",
        quantity: 1,
        date: "10/06/2025",
        price: "1,200,000đ",
        status: "Hết hàng",
        description: "Chân dung trừu tượng lấy cảm hứng từ sấm sét.",
        fileType: "PNG",
        fileSize: "4.8MB",
        size: "1920x1080px",
        author: "StormyArt",
        character: "Thunder Soul",
        origin: "Pháp",
        style: "Abstract",
        extraInfo: "Tác phẩm đạt giải tại triển lãm 2025.",
        image: "https://example.com/tranh-sam-set.png",
      },
    ],

    "Avatar 2D": [
      {
        key: 11,
        stt: 1,
        name: "Avatar mèo con",
        category: "Avatar 2D",
        quantity: 1,
        date: "20/07/2025",
        price: "250,000đ",
        status: "Còn hàng",
        description: "Hình đại diện mèo con dễ thương tông màu hồng pastel.",
        fileType: "PNG",
        fileSize: "900KB",
        size: "512x512px",
        author: "MeowArt",
        character: "Mèo Con",
        origin: "Nhật Bản",
        style: "Chibi / Pastel",
        extraInfo: "Dùng tốt cho profile mạng xã hội.",
        image: "https://example.com/avatar-meo-con.png",
      },
      {
        key: 12,
        stt: 2,
        name: "Avatar gấu ngủ",
        category: "Avatar 2D",
        quantity: 1,
        date: "28/08/2025",
        price: "280,000đ",
        status: "Còn hàng",
        description: "Avatar chú gấu đang ngủ, phong cách tối giản.",
        fileType: "PNG",
        fileSize: "800KB",
        size: "512x512px",
        author: "Bear Studio",
        character: "Gấu Ngủ",
        origin: "Hàn Quốc",
        style: "Minimal / Cute",
        extraInfo: "Dành cho người yêu thích phong cách dễ thương.",
        image: "https://example.com/avatar-gau-ngu.png",
      },
    ],
  };

  const columns = [
    { title: "STT", dataIndex: "stt", key: "stt", width: 80 },
    { title: "Tên sản phẩm", dataIndex: "name", key: "name" },
    { title: "Số lượng", dataIndex: "quantity", key: "quantity", width: 120 },
    { title: "Ngày nhập", dataIndex: "date", key: "date", width: 140 },
    { title: "Giá tiền", dataIndex: "price", key: "price", width: 140 },
    {
      title: "Tình trạng hàng",
      dataIndex: "status",
      key: "status",
      width: 160,
    },
  ];

  const [data, setData] = useState(categoryData);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
  };

  const categories = [
    "Nhãn Dán",
    "Chibi",
    "Ảnh Động",
    "Biểu Tượng Cảm Xúc",
    "Tranh Chấn Động",
    "Avatar 2D",
  ];

  // ✅ Gộp toàn bộ danh mục để hiển thị mặc định
  const allProducts = Object.values(categoryData).flat();

  // ✅ Lọc theo danh mục (nếu có chọn)
  const filteredProducts = selectedCategory
    ? categoryData[selectedCategory] || []
    : allProducts;

  const handleCancel = () => {
    form.resetFields();
    setImagePreview(null);
    setIsModalOpen(false);
  };

  const handleSubmit = (values) => {
    // Kiểm tra có ảnh chưa
    if (!imagePreview) {
      message.warning("Vui lòng tải lên hình ảnh sản phẩm!");
      return;
    }

    // Tạo sản phẩm mới
    const newProduct = {
      key: Date.now(),
      stt: data[values.category].length + 1,
      name: values.name,
      quantity: 1,
      date: new Date().toLocaleDateString("vi-VN"),
      price: `${Number(values.price).toLocaleString("vi-VN")}đ`,
      status: values.status,
      description: values.description,
      size: values.size || "640x640",
      fileType: values.fileType || "JPG",
      fileSize: values.fileSize || "1.2 MB",
      author: values.author || "Chưa rõ",
      character: values.character || "Không có",
      origin: values.origin || "Việt Nam",
      style: values.style || "Hiện đại",
      extraInfo: values.extraInfo || "",
      image: imagePreview,
    };

    // Thêm sản phẩm vào danh mục tương ứng
    const updatedCategoryData = [...data[values.category], newProduct];

    // Cập nhật state tổng
    setData({
      ...data,
      [values.category]: updatedCategoryData,
    });

    // Nếu thêm đúng vào danh mục đang xem → cập nhật bảng ngay
    if (values.category === selectedCategory) {
      message.success("Thêm sản phẩm thành công!");
    } else {
      message.success(`Đã thêm vào danh mục "${values.category}"`);
    }

    // Reset form + đóng modal
    form.resetFields();
    setImagePreview(null);
    setIsModalOpen(false);
  };

  const handleRowClick = (record) => {
    setSelectedProduct(record);
    form.setFieldsValue({
      name: record.name,
      category: selectedCategory,
      status: record.status,
      price: record.price.replace(/\D/g, ""),
      description: record.description || "",
      size: record.size || "640x640",
      fileType: record.fileType || "JPG",
      fileSize: record.fileSize || "1.2 MB",
      author: record.author || "Chưa rõ",
      character: record.character || "Không có",
      origin: record.origin || "Việt Nam",
      style: record.style || "Hiện đại",
      extraInfo: record.extraInfo || "",
    });

    setImagePreview(record.image || null);
    setIsViewModalOpen(true);
  };

  const handleImageUpload = (info) => {
    const file = info.file.originFileObj || info.file; // ✅ hỗ trợ cả 2 dạng
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      message.error("Vui lòng chọn tệp hình ảnh hợp lệ!");
      return;
    }

    const fileType = file.type.split("/")[1].toUpperCase();
    const reader = new FileReader();

    reader.onload = (e) => {
      const imageUrl = e.target.result;
      setImagePreview(imageUrl);

      const img = new Image();
      img.onload = () => {
        const size = `${img.width}x${img.height}`;
        // ✅ Gán giá trị form sau khi load xong
        form.setFieldsValue({
          size: size,
          fileType: fileType,
        });
      };
      img.src = imageUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    form.setFieldsValue({
      size: "",
      fileType: "",
    });
  };

  return (
    <motion.div
      className="min-h-screen relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}>
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/src/assets/img/Illustration265.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[3px]" />

      <div className="relative z-10">
        {/* Category Buttons */}
        <motion.div
          className="px-6 py-8"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}>
          <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat)}
                className={`px-8 py-3 rounded-2xl text-lg font-semibold shadow-md transition-all ${
                  selectedCategory === cat
                    ? "bg-[#133e87] text-white"
                    : "bg-white/80 text-[#133e87] hover:bg-[#e8f1ff]"
                }`}>
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="px-6 pb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}>
          <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8">
            <h1 className="text-[#133e87] text-3xl font-bold text-center mb-6">
              {`Quản lý ${selectedCategory || "sản phẩm"}`}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Tìm Kiếm..."
                  className="max-w-xs"
                  style={{ borderColor: "#cbdceb" }}
                />
              </div>
              <Space>
                <Button
                  danger
                  type="primary"
                  style={{
                    backgroundColor: "#ff7383",
                    borderColor: "#ff7383",
                  }}
                  onClick={() => setIsDeleteModalOpen(true)}>
                  Xóa Sản Phẩm
                </Button>
                <Modal
                  open={isDeleteModalOpen}
                  onCancel={() => setIsDeleteModalOpen(false)}
                  footer={null}
                  centered
                  width={360}
                  closable={false}
                  className="text-center rounded-2xl">
                  <p className="text-[#133e87] text-base text-center font-medium mb-6">
                    Xác nhận muốn xóa sản phẩm chứ?
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button
                      type="primary"
                      danger
                      className="px-6 py-1 rounded-full text-white font-medium"
                      style={{
                        backgroundColor: "#ff7383",
                        borderColor: "#ff7383",
                      }}
                      onClick={() => {
                        if (selectedRowKeys.length === 0) {
                          message.warning(
                            "Vui lòng chọn ít nhất một sản phẩm để xóa!"
                          );
                          return;
                        }

                        // Lọc bỏ sản phẩm được chọn khỏi danh mục hiện tại
                        const updatedCategoryData = data[
                          selectedCategory
                        ].filter((item) => !selectedRowKeys.includes(item.key));

                        // Cập nhật state tổng
                        setData({
                          ...data,
                          [selectedCategory]: updatedCategoryData,
                        });

                        // Đặt lại selection
                        setSelectedRowKeys([]);

                        // Đóng modal
                        setIsDeleteModalOpen(false);

                        // Thông báo
                        message.success("Xóa sản phẩm thành công!");
                      }}>
                      Xóa
                    </Button>
                    <Button
                      className="px-6 py-1 rounded-full font-medium"
                      style={{
                        borderColor: "#133e87",
                        color: "#133e87",
                      }}
                      onClick={() => setIsDeleteModalOpen(false)}>
                      Hủy
                    </Button>
                  </div>
                </Modal>

                <button
                  onClick={() => setIsLockModalOpen(true)}
                  className="border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-6 sm:px-8 py-1 text-sm sm:text-base font-medium rounded-lg transition-colors">
                  Khóa Sản Phẩm
                </button>

                <Modal
                  open={isLockModalOpen}
                  onCancel={() => setIsLockModalOpen(false)}
                  footer={null}
                  centered
                  width={360}
                  closable={false}
                  className="text-center rounded-2xl">
                  <p className="text-[#133e87] text-base text-center font-medium mb-6">
                    Xác nhận muốn khóa sản phẩm chứ?
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button
                      type="primary"
                      className="px-6 py-1 rounded-full text-white font-medium"
                      style={{
                        backgroundColor: "#133e87",
                        borderColor: "#133e87",
                      }}
                      onClick={() => {
                        console.log("Đã xác nhận khóa sản phẩm");
                        setIsLockModalOpen(false);
                      }}>
                      Khóa
                    </Button>
                    <Button
                      className="px-6 py-1 rounded-full font-medium"
                      style={{
                        borderColor: "#133e87",
                        color: "#133e87",
                      }}
                      onClick={() => setIsLockModalOpen(false)}>
                      Hủy
                    </Button>
                  </div>
                </Modal>

                <button
                  onClick={() => {
                    form.resetFields();
                    setImagePreview(null);
                    setSelectedProduct(null);
                    setIsModalOpen(true);
                  }}
                  className="border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-6 sm:px-4 py-1 text-sm sm:text-base font-medium rounded-lg transition-colors">
                  Thêm Sản Phẩm
                </button>
                <Modal
                  open={isModalOpen}
                  onCancel={handleCancel}
                  footer={null}
                  width={1200}
                  centered
                  destroyOnClose>
                  <div className="p-8">
                    <h1 className="text-3xl font-bold text-[#133e87] text-center mb-8">
                      Thông Tin Sản Phẩm
                    </h1>

                    <Form
                      form={form}
                      layout="vertical"
                      onFinish={handleSubmit}
                      initialValues={{ category: selectedCategory }}>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* LEFT: Hình ảnh */}
                        <div className="flex flex-col items-center justify-center">
                          <div className="bg-[#d9eafd]/40 rounded-2xl h-[480px] w-full flex items-center justify-center border-2 border-dashed border-[#cbdceb] relative overflow-hidden">
                            {imagePreview ? (
                              <div className="relative w-full h-full flex items-center justify-center">
                                <img
                                  src={imagePreview}
                                  alt="preview"
                                  className="rounded-2xl object-contain max-h-full"
                                />
                                <Button
                                  type="text"
                                  danger
                                  size="small"
                                  className="!absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 font-medium border rounded-md"
                                  onClick={handleRemoveImage}>
                                  Xóa ảnh
                                </Button>
                              </div>
                            ) : (
                              <Upload
                                accept="image/*"
                                showUploadList={false}
                                beforeUpload={() => false}
                                onChange={handleImageUpload}>
                                <Button
                                  icon={<UploadOutlined />}
                                  size="large"
                                  className="bg-white/80 hover:bg-white text-[#608bc1] font-medium border-0">
                                  Thêm Ảnh
                                </Button>
                              </Upload>
                            )}
                          </div>
                        </div>

                        {/* MIDDLE: Thông tin cơ bản */}
                        <div className="flex flex-col gap-4">
                          {/* Tên */}
                          <Form.Item
                            name="name"
                            label={
                              <span className="text-[#133e87] font-medium">
                                Tên
                              </span>
                            }
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập tên sản phẩm",
                              },
                            ]}>
                            <Input
                              size="large"
                              className="bg-white border-[#cbdceb]"
                            />
                          </Form.Item>

                          {/* Loại tranh & Tình trạng */}
                          <div className="grid grid-cols-2 gap-4">
                            <Form.Item
                              name="category"
                              label={
                                <span className="text-[#133e87] font-medium">
                                  Loại Tranh
                                </span>
                              }
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng chọn loại sản phẩm",
                                },
                              ]}>
                              <Select
                                size="large"
                                options={categories.map((cat) => ({
                                  value: cat,
                                  label: cat,
                                }))}
                              />
                            </Form.Item>

                            <Form.Item
                              name="status"
                              label={
                                <span className="text-[#133e87] font-medium">
                                  Tình Trạng
                                </span>
                              }
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng chọn tình trạng",
                                },
                              ]}>
                              <Select
                                size="large"
                                options={[
                                  { value: "Còn hàng", label: "Còn hàng" },
                                  { value: "Hết hàng", label: "Hết hàng" },
                                  {
                                    value: "Hàng trưng bày",
                                    label: "Hàng trưng bày",
                                  },
                                ]}
                              />
                            </Form.Item>
                          </div>

                          {/* Giá tiền & Định dạng file */}
                          <div className="grid grid-cols-2 gap-4">
                            <Form.Item
                              name="price"
                              label={
                                <span className="text-[#133e87] font-medium">
                                  Giá Tiền
                                </span>
                              }
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng nhập giá tiền",
                                },
                              ]}>
                              <Input
                                size="large"
                                className="bg-white border-[#cbdceb]"
                                onChange={(e) => {
                                  const value = e.target.value.replace(
                                    /\D/g,
                                    ""
                                  );
                                  form.setFieldsValue({ price: value });
                                }}
                              />
                            </Form.Item>

                            <Form.Item
                              name="fileType"
                              label={
                                <span className="text-[#133e87] font-medium">
                                  Định Dạng File
                                </span>
                              }>
                              <Input
                                size="large"
                                disabled
                                className="bg-gray-50 border-[#cbdceb]"
                              />
                            </Form.Item>
                          </div>

                          {/* Miêu tả */}
                          <Form.Item
                            name="description"
                            label={
                              <span className="text-[#133e87] font-medium">
                                Miêu Tả
                              </span>
                            }>
                            <Input.TextArea
                              rows={3}
                              className="bg-white border-[#cbdceb]"
                            />
                          </Form.Item>

                          {/* Kích thước & Dung lượng */}
                          <div className="grid grid-cols-2 gap-4">
                            <Form.Item
                              name="size"
                              label={
                                <span className="text-[#133e87] font-medium">
                                  Kích Thước Gốc
                                </span>
                              }>
                              <Input
                                size="large"
                                disabled
                                className="bg-gray-50 border-[#cbdceb]"
                              />
                            </Form.Item>

                            <Form.Item
                              name="fileSize"
                              label={
                                <span className="text-[#133e87] font-medium">
                                  Dung Lượng File
                                </span>
                              }>
                              <Input
                                size="large"
                                disabled
                                className="bg-gray-50 border-[#cbdceb]"
                              />
                            </Form.Item>
                          </div>
                        </div>

                        {/* RIGHT: Thông tin thêm */}
                        <div className="flex flex-col gap-4">
                          {/* Tác giả & Nhân vật */}
                          <div className="grid grid-cols-2 gap-4">
                            <Form.Item
                              name="author"
                              label={
                                <span className="text-[#133e87] font-medium">
                                  Tác Giả
                                </span>
                              }>
                              <Input
                                size="large"
                                className="bg-white border-[#cbdceb]"
                              />
                            </Form.Item>
                            <Form.Item
                              name="character"
                              label={
                                <span className="text-[#133e87] font-medium">
                                  Nhân Vật
                                </span>
                              }>
                              <Input
                                size="large"
                                className="bg-white border-[#cbdceb]"
                              />
                            </Form.Item>
                          </div>

                          {/* Nguồn gốc & Phong cách */}
                          <div className="grid grid-cols-2 gap-4">
                            <Form.Item
                              name="origin"
                              label={
                                <span className="text-[#133e87] font-medium">
                                  Nguồn Gốc
                                </span>
                              }>
                              <Input
                                size="large"
                                className="bg-white border-[#cbdceb]"
                              />
                            </Form.Item>
                            <Form.Item
                              name="style"
                              label={
                                <span className="text-[#133e87] font-medium">
                                  Phong Cách
                                </span>
                              }>
                              <Input
                                size="large"
                                className="bg-white border-[#cbdceb]"
                              />
                            </Form.Item>
                          </div>

                          {/* Thông tin thêm */}
                          <Form.Item
                            name="extraInfo"
                            label={
                              <span className="text-[#133e87] font-medium">
                                Thông Tin Thêm
                              </span>
                            }>
                            <Input.TextArea
                              rows={8}
                              className="bg-white border-[#cbdceb]"
                            />
                          </Form.Item>

                          <div className="flex justify-end gap-4 mt-auto">
                            <button
                              onClick={handleCancel}
                              className="border text-white bg-red-600 hover:bg-red-400 hover:text-white px-6 sm:px-4 py-1 text-sm sm:text-base font-medium rounded-lg transition-colors">
                              Hủy
                            </button>

                            <button
                              type="submit"
                              className="border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-6 sm:px-4 py-1 text-sm sm:text-base font-medium rounded-lg transition-colors">
                              Lưu Thông Tin
                            </button>
                          </div>
                        </div>
                      </div>
                    </Form>
                  </div>
                </Modal>

                {/* Modal Xem Chi Tiết Sản Phẩm */}
                <Modal
                  open={isViewModalOpen}
                  onCancel={() => {
                    setIsViewModalOpen(false);
                    setSelectedProduct(null);
                  }}
                  footer={null}
                  width={1200}
                  centered
                  destroyOnClose>
                  <div className="p-8">
                    <h1 className="text-3xl font-bold text-[#133e87] text-center mb-8">
                      Chi Tiết Sản Phẩm
                    </h1>

                    <Form form={form} layout="vertical">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* LEFT: Ảnh sản phẩm */}
                        <div className="flex flex-col items-center justify-center">
                          <div className="bg-[#d9eafd]/40 rounded-2xl h-[530px] w-full flex items-center justify-center border-2 border-dashed border-[#cbdceb] relative overflow-hidden">
                            {imagePreview ? (
                              <img
                                src={imagePreview}
                                alt="product"
                                className="rounded-2xl object-contain max-h-full"
                              />
                            ) : (
                              <span className="text-[#608bc1] font-medium">
                                Không có ảnh hiển thị
                              </span>
                            )}
                          </div>
                        </div>

                        {/* CENTER: Thông tin chính */}
                        <div className="flex flex-col gap-4">
                          {/* Tên sản phẩm */}
                          <Form.Item
                            label={
                              <span className="text-[#133e87] font-medium">
                                Tên
                              </span>
                            }
                            name="name">
                            <Input
                              size="large"
                              disabled
                              className="bg-gray-50 border-[#cbdceb]"
                            />
                          </Form.Item>

                          {/* Loại & Tình trạng */}
                          <div className="grid grid-cols-2 gap-4">
                            <Form.Item
                              label={
                                <span className="text-[#133e87] font-medium">
                                  Loại Sản Phẩm
                                </span>
                              }
                              name="category">
                              <Input
                                size="large"
                                disabled
                                className="bg-gray-50 border-[#cbdceb]"
                              />
                            </Form.Item>
                            <Form.Item
                              label={
                                <span className="text-[#133e87] font-medium">
                                  Tình Trạng Hàng
                                </span>
                              }
                              name="status">
                              <Input
                                size="large"
                                disabled
                                className="bg-gray-50 border-[#cbdceb]"
                              />
                            </Form.Item>
                          </div>

                          {/* Giá tiền & Định dạng */}
                          <div className="grid grid-cols-2 gap-4">
                            <Form.Item
                              label={
                                <span className="text-[#133e87] font-medium">
                                  Giá Tiền
                                </span>
                              }
                              name="price">
                              <Input
                                size="large"
                                disabled
                                className="bg-gray-50 border-[#cbdceb]"
                              />
                            </Form.Item>
                            <Form.Item
                              label={
                                <span className="text-[#133e87] font-medium">
                                  Định Dạng File
                                </span>
                              }
                              name="fileType">
                              <Input
                                size="large"
                                disabled
                                className="bg-gray-50 border-[#cbdceb]"
                              />
                            </Form.Item>
                          </div>

                          {/* Miêu tả */}
                          <Form.Item
                            label={
                              <span className="text-[#133e87] font-medium">
                                Miêu Tả
                              </span>
                            }
                            name="description">
                            <Input.TextArea
                              rows={2}
                              disabled
                              className="bg-gray-50 border-[#cbdceb]"
                            />
                          </Form.Item>

                          {/* Kích thước & Dung lượng */}
                          <div className="grid grid-cols-2 gap-4">
                            <Form.Item
                              label={
                                <span className="text-[#133e87] font-medium">
                                  Kích Thước Gốc
                                </span>
                              }
                              name="size">
                              <Input
                                size="large"
                                disabled
                                className="bg-gray-50 border-[#cbdceb]"
                              />
                            </Form.Item>
                            <Form.Item
                              label={
                                <span className="text-[#133e87] font-medium">
                                  Dung Lượng File
                                </span>
                              }
                              name="fileSize">
                              <Input
                                size="large"
                                disabled
                                className="bg-gray-50 border-[#cbdceb]"
                              />
                            </Form.Item>
                          </div>
                        </div>

                        {/* RIGHT: Thông tin bổ sung */}
                        <div className="flex flex-col gap-4">
                          <div className="grid grid-cols-2 gap-4">
                            <Form.Item
                              label={
                                <span className="text-[#133e87] font-medium">
                                  Tác Giả
                                </span>
                              }
                              name="author">
                              <Input
                                size="large"
                                disabled
                                className="bg-gray-50 border-[#cbdceb]"
                              />
                            </Form.Item>
                            <Form.Item
                              label={
                                <span className="text-[#133e87] font-medium">
                                  Nhân Vật
                                </span>
                              }
                              name="character">
                              <Input
                                size="large"
                                disabled
                                className="bg-gray-50 border-[#cbdceb]"
                              />
                            </Form.Item>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <Form.Item
                              label={
                                <span className="text-[#133e87] font-medium">
                                  Nguồn Gốc
                                </span>
                              }
                              name="origin">
                              <Input
                                size="large"
                                disabled
                                className="bg-gray-50 border-[#cbdceb]"
                              />
                            </Form.Item>
                            <Form.Item
                              label={
                                <span className="text-[#133e87] font-medium">
                                  Phong Cách
                                </span>
                              }
                              name="style">
                              <Input
                                size="large"
                                disabled
                                className="bg-gray-50 border-[#cbdceb]"
                              />
                            </Form.Item>
                          </div>

                          <Form.Item
                            label={
                              <span className="text-[#133e87] font-medium">
                                Thông Tin Thêm
                              </span>
                            }
                            name="extraInfo">
                            <Input.TextArea
                              rows={4}
                              disabled
                              className="bg-gray-50 border-[#cbdceb]"
                            />
                          </Form.Item>
                        </div>
                      </div>

                      <div className="flex justify-end gap-4 mt-auto">
                        <button
                          onClick={() => setIsViewModalOpen(false)}
                          className="border text-white bg-red-600 hover:bg-red-400 hover:text-white px-6 sm:px-4 py-1 text-sm sm:text-base font-medium rounded-lg transition-colors">
                          Hủy
                        </button>

                        <button
                          type="submit"
                          className="border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-6 sm:px-4 py-1 text-sm sm:text-base font-medium rounded-lg transition-colors">
                          Sửa Thông Tin
                        </button>
                      </div>
                    </Form>
                  </div>
                </Modal>
              </Space>
            </div>

            {/* Table with Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}>
                <Table
                  columns={columns}
                  dataSource={filteredProducts}
                  rowSelection={rowSelection}
                  pagination={false}
                  className="custom-table"
                  onRow={(record) => ({
                    onClick: () => handleRowClick(record),
                  })}
                />
              </motion.div>
            </AnimatePresence>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <Pagination
                current={currentPage}
                total={100}
                pageSize={10}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
                className="custom-ant-pagination"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default AdminProductContainer;
