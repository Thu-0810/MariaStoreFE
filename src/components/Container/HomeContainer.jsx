import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { Button } from "antd";

function HomeContainer() {
  return (
    <div className="min-h-screen bg-[#f6f6f6] mt-20">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(src/assets/img/Illustration309.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/95 via-purple-50/80 to-pink-50/70" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left */}
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-block border-b-4 border-[#163c87] pb-2 mb-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900">
                  "Trời Sao"
                </h1>
              </div>
              <p className="text-gray-400 text-sm sm:text-md">24.02.2024</p>

              <div className="space-y-3 text-blue-900 leading-relaxed text-base sm:text-lg lg:text-xl">
                <p>Loại sản phẩm: Tranh chân dung</p>
                <p>
                  Giá tiền: <span className="font-bold">2,614,500đ</span>
                </p>
                <p>
                  Mẫu tự: Bầu trời sao ở thế giới trong mơ với những vệt sáng
                  lấp lánh như sao băng, tạo cảm giác mộng mơ, kỳ ảo.
                </p>
                <p>
                  Fanart nhân vật Firefly đến từ trò game Honkai: Star Rail.
                </p>
              </div>

              <button className="border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base lg:text-lg font-medium rounded-lg transition-colors">
                XEM THÊM →
              </button>
            </div>

            {/* Right */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-56 h-56 sm:w-72 sm:h-72 lg:w-96 lg:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30">
                <img
                  src="src/assets/img/Illustration309.jpg"
                  alt="Trời Sao artwork - Firefly character"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Store Section */}
      <section className="relative py-12 sm:py-16 px-4 mt-12">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(src/assets/img/Illustration192.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/95 via-purple-50/80 to-pink-50/70" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center justify-center mb-10 sm:mb-12">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-blue-900"></div>
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mx-6 text-center">
              Cửa Hàng
            </h2>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-blue-900"></div>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {[
              { src: "src/assets/img/Illustration128.jpg", title: "Nhãn Dán" },
              { src: "src/assets/img/Illustration156.jpg", title: "Chibi" },
              {
                src: "src/assets/img/Illustration157.2.jpg",
                title: "Ảnh Động",
              },
              {
                src: "src/assets/img/Illustration212.jpg",
                title: "Biểu Tượng Cảm Xúc",
              },
              {
                src: "src/assets/img/Illustration318.1.jpg",
                title: "Tranh Chân Dung",
              },
              { src: "src/assets/img/Kigoro.2.jpg", title: "2D Avatar" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group relative h-48 sm:h-56 lg:h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300">
                {/* Ảnh */}
                <img
                  src={item.src}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt={item.title}
                />

                {/* Overlay mặc định tối, hover thì biến mất */}
                <div className="absolute inset-0 bg-black/30 opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>

                {/* Text */}
                <div className="absolute bottom-0 left-0 w-full p-3 z-10">
                  <h3 className="font-semibold text-white text-left">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="border border-[#CCCCCC] bg-[#ffffff] text-[#133e87] hover:bg-[#133e87] hover:text-white px-6 py-2 text-sm sm:text-base">
              XEM THÊM →
            </button>
          </div>
        </div>
      </section>

      {/* Birthday Section */}
      <section className="relative py-12 sm:py-16 bg-gradient-to-r from-[#d9eafd] to-[#f6f6f6] mt-12 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(src/assets/img/Illustration287.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/95 via-purple-50/80 to-pink-50/70" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 lg:gap-20">
            {/* Image */}
            <div className="w-full md:w-1/2 lg:w-80 flex-shrink-0">
              <img
                src="src/assets/img/Illustration287.jpg"
                alt="Kỉ Niệm Ngày Sinh Nhật"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-block border-b-4 border-[#163c87] pb-2 mb-4">
                <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-blue-900">
                  Kỉ Niệm Ngày Sinh Nhật
                </h1>
              </div>
              <p className="text-gray-400 text-sm sm:text-md mb-2">
                07.12.2023
              </p>
              <h3 className="text-lg sm:text-xl lg:text-3xl font-bold text-blue-900 mb-2">
                Fanart Vtuber Maria Marionette đến từ Nijisanji.
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm mb-4">
                Sản phẩm chỉ dùng để trưng bày, không sử dụng cho mục đích
                thương mại
              </p>

              <div className="space-y-2 mb-6 sm:mb-8">
                <p className="text-[#133e87] text-base sm:text-xl font-bold">
                  Loại Sản Phẩm: Tranh Chân Dung
                </p>
                <p className="text-[#133e87] text-base sm:text-xl font-bold">
                  Kích Thước: 2100×3200
                </p>
                <p className="text-[#133e87] text-base sm:text-xl font-bold">
                  Loại File: JPG
                </p>
              </div>

              <button className="border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-lg font-medium rounded-lg transition-colors">
                XEM THÊM →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Commission Section */}
      <section className="py-12 sm:py-16 bg-[#f6f6f6]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#133e87] text-center mb-10 sm:mb-12">
            Đặt Tranh
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
              <div key={idx} className="text-center">
                <div className="relative mb-4">
                  <img
                    src={item.src}
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
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="border border-[#CCCCCC] text-[#133e87] hover:bg-[#133e87] hover:text-white px-6 py-2 text-sm sm:text-base">
              ĐẾN ĐẶT TRANH →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeContainer;