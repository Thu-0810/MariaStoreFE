import React from "react";
import { Card } from "antd";

function CommunityContainer() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('src/assets/img/Illustration311.jpg')",
      }}>
      {/* Lớp phủ làm mờ toàn trang */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

      {/* Nội dung chính */}
      <main className="relative z-10 max-w-[90%] md:max-w-5xl mx-auto px-4 py-6 sm:py-10 lg:py-12">
        {/* Khung trắng mờ */}
        <Card className="bg-gray-300/70 backdrop-blur-md border-none rounded-3xl p-4 sm:p-6 lg:p-10 shadow-lg">
          {/* ===== HERO ===== */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-[#133e87] text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
              Cộng Đồng
            </h1>
            <p className="text-[#608bc1] text-base sm:text-lg">
              Các chia sẻ về tranh vẽ được viết bởi những người yêu vẽ tranh
            </p>
          </div>

          {/* ===== BÀI VIẾT NỔI BẬT ===== */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-[#133e87] text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              Bài Viết Nổi Bật
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  src: "src/assets/img/Illustration153.jpg",
                  title: "Mua Tranh Tại Maria Store",
                },
                {
                  src: "src/assets/img/Illustration212.jpg",
                  title: "Biểu Tượng Cảm Xúc",
                },
                {
                  src: "src/assets/img/Illustration122.jpg",
                  title: "Biểu Tượng Cảm Xúc",
                },
              ].map((item, idx) => (
                <CardItem key={idx} item={item} />
              ))}
            </div>
          </section>

          {/* ===== TẤT CẢ BÀI VIẾT ===== */}
          <ArticleSection
            title="Tất Cả Bài Viết"
            items={[
              { src: "src/assets/img/Illustration164.jpg", title: "Nhãn Dán" },
              { src: "src/assets/img/Illustration173.jpg", title: "Chibi" },
              { src: "src/assets/img/Illustration161.jpg", title: "Ảnh Động" },
              {
                src: "src/assets/img/Illustration133.jpg",
                title: "Biểu Tượng Cảm Xúc",
              },
              {
                src: "src/assets/img/Illustration318.1.jpg",
                title: "Tranh Chân Dung",
              },
              {
                src: "src/assets/img/Illustration43.1.jpg",
                title: "2D Avatars",
              },
            ]}
          />

          {/* ===== CÁC BÀI VIẾT KHÁC ===== */}
          <ArticleSection
            title="Các Bài Viết Khác"
            items={[
              { src: "src/assets/img/Illustration196.jpg", title: "Nhãn Dán" },
              { src: "src/assets/img/Illustration254.3.jpg", title: "Chibi" },
              { src: "src/assets/img/Illustration165.jpg", title: "Ảnh Động" },
              {
                src: "src/assets/img/Illustration192.jpg",
                title: "Biểu Tượng Cảm Xúc",
              },
              {
                src: "src/assets/img/Illustration200.jpg",
                title: "Tranh Chân Dung",
              },
              {
                src: "src/assets/img/Illustration187.jpg",
                title: "2D Avatars",
              },
            ]}
          />
        </Card>
      </main>
    </div>
  );
}

function CardItem({ item }) {
  return (
    <div className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300">
      <div className="relative">
        <img
          src={item.src}
          alt={item.title}
          className="w-full h-48 sm:h-56 lg:h-60 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/30 opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-full p-3 sm:p-4 z-10">
        <h3 className="font-semibold text-white text-sm sm:text-base">
          {item.title}
        </h3>
      </div>
    </div>
  );
}

function ArticleSection({ title, items }) {
  return (
    <section className="mb-8 sm:mb-12">
      <h2 className="text-[#133e87] text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {items.map((item, idx) => (
          <CardItem key={idx} item={item} />
        ))}
      </div>
      <div className="text-center mt-6 sm:mt-8">
        <button className="border border-[#CCCCCC] text-[#133e87] bg-white hover:bg-[#133e87] hover:text-white px-4 sm:px-6 py-2 text-sm sm:text-base">
          XEM THÊM →
        </button>
      </div>
    </section>
  );
}

export default CommunityContainer;