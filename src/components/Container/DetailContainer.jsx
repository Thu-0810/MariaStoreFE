import { useEffect, useState } from "react";
import { Card, Rate, Typography, Progress } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

function DetailContainer() {
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const slideInFromBottom = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  return (
    <div className="min-h-screen mt-20 pb-20 relative">
      {/* Ảnh nền */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(src/assets/img/Illustration299.jpg)" }}
      />
      {/* Phần chi tiết sản phẩm */}
      <div className="relative z-10 flex justify-center px-4 pt-16 pb-16">
        <div className="max-w-5xl w-full bg-white/80 rounded-2xl shadow-xl p-8 md:flex gap-8">
          {/* Hình sản phẩm */}
          <div className="md:w-1/2 mb-6 md:mb-0">
            <img
              src="src\assets\img\Illustration309.jpg"
              alt="Trời sao artwork"
              className="w-full h-[800px] object-cover rounded-xl"
            />
          </div>

          {/* Thông tin chi tiết */}
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold text-[#133e87] mb-2">
              “Trời sao”
            </h2>
            <p className="text-[#133e87]">
              <b>Loại sản phẩm:</b> Tranh chân dung
            </p>
            <p className="text-[#133e87] mt-4">
              <b>Miêu tả:</b> Bầu trời sao ở thế giới trong mơ với những vệt
              sáng lấp lánh như sao băng, tạo cảm giác mộng mơ, kỳ ảo.
            </p>
            <p className="italic text-[#133e87] font-bold">
              Fanart nhân vật Firefly dần lộ lưa game Honkai: Star Rail
            </p>
            <h3 className="text-xl font-semibold text-[#133e87] mt-6 mb-4">
              Giá tiền: 2,614,500đ
            </h3>
            {/* Số lượng */}
            {/* Số lượng */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="font-semibold text-[#133e87]">Số lượng</span>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-36">
                <button
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 0))}
                  className="w-12 h-10 flex items-center justify-center text-[#133e87] text-xl font-bold hover:bg-[#e0e7ff] transition">
                  −
                </button>
                <input
                  type="number"
                  min="0"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value) || 0)}
                  className="w-full h-10 text-center text-lg text-[#133e87] font-medium outline-none border-l border-r border-gray-200
                 appearance-none [-moz-appearance:textfield]"
                />
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-12 h-10 flex items-center justify-center text-[#133e87] text-xl font-bold hover:bg-[#e0e7ff] transition">
                  +
                </button>
              </div>
            </div>

            {/* Nút hành động */}
            <div className="flex gap-4 mb-8">
              {/* Thêm vào giỏ hàng */}
              <button className="flex items-center gap-2 border border-[#cbdeed] bg-[#eaf7ff] text-[#133e87] hover:text-white px-4 py-2 rounded-md font-medium hover:bg-[#133e87] transition">
                <ShoppingCartOutlined className="text-lg" />
                Thêm vào giỏ hàng
              </button>

              {/* Mua ngay */}
              <button className="px-5 py-2 bg-[#133e87] text-white font-medium rounded-md hover:bg-[#173f5f] transition">
                Mua ngay
              </button>

              {/* Yêu thích */}
              <button className="w-10 h-10 flex items-center justify-center text-[#133e87] border border-transparent hover:border-[#133e87] rounded-full transition">
                <HeartOutlined className="text-lg" />
              </button>
            </div>
            {/* Thông tin */}
            <h4 className="text-lg font-semibold text-[#133e87] mb-3">
              Thông tin chi tiết
            </h4>
            <div className="space-y-1 text-sm text-[#133e87]">
              <div>Loại tranh: Tranh kỹ thuật số (Digital Artwork)</div>
              <div>Định dạng file: JPG độ phân giải cao</div>
              <div>Kích thước gốc: 2800x4200 px</div>
              <div>Dung lượng file: ~6MB</div>
              <div>Tác giả: Fanart kết hợp với chủ đề watermark (tranh)</div>
              <div>Nguồn gốc: Firefly - Game Honkai: Star Rail</div>
            </div>
            {/* Đánh giá */}
            <h4 className="text-lg font-semibold text-[#133e87] mt-6 mb-3">
              Đánh giá
            </h4>
            <div className="flex items-center space-x-3 mb-4">
              <h2 className="text-2xl font-bold text-[#133e87] mb-0">4.7</h2>
              <Rate disabled defaultValue={4.5} />
              <span className="text-sm text-[#133e87] ml-2">86% lượt</span>
            </div>
            {[5, 4, 3, 2, 1].map((star, i) => (
              <div key={i} className="flex items-center space-x-2 text-xs mb-1">
                <span className="w-2">{star}</span>
                <Progress
                  percent={[68, 18, 9, 3, 2][i]}
                  size="small"
                  strokeColor="#ffd09b"
                  showInfo={false}
                  className="flex-1"
                />
                <span className="w-8 text-[#133e87] ml-2">
                  {[68, 18, 9, 3, 2][i]}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Phần Đặt Hàng */}
      <section className="py-12 sm:py-16 bg-[#f6f6f6]/80 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            className="text-xl sm:text-2xl font-bold text-[#133e87] text-center mb-10 sm:mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={slideInFromBottom}>
            Đặt Tranh
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}>
            {[
              {
                src: "src/assets/img/Illustration248.0.jpg",
                title: "Tranh do @_itsmeangge đặt hàng",
                description: "24.08.2023",
              },
              {
                src: "src/assets/img/Illustration251.1.jpg",
                title: "Tranh do @niklasjann đặt hàng",
                description: "04.10.2023",
              },
              {
                src: "src/assets/img/Illustration330.12.png",
                title: "Tranh do @MariaMari0nette đặt hàng",
                description: "29.08.2024",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="text-center"
                variants={staggerItem}>
                <div className="relative mb-4">
                  <img
                    src={item.src || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-48 sm:h-72 lg:h-80 object-cover rounded-lg"
                  />
                </div>
                <p className="text-[#7a7a7a] text-xs sm:text-sm mb-2">
                  {item.description}
                </p>
                <h3 className="text-[#133e87] font-medium text-sm sm:text-base">
                  {item.title}
                </h3>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={slideInFromBottom}>
            <button className="border border-[#CCCCCC] text-[#133e87] hover:bg-[#133e87] hover:text-white px-6 py-2 text-sm sm:text-base">
              ĐẾN ĐẶT TRANH →
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default DetailContainer;