import { Input, Button } from "antd";
import { useState } from "react";
import { SendOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

function DetailCommunityContainer() {
  const [showComments, setShowComments] = useState(false);
  const { t } = useTranslation();
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Ray",
      text: "Bức tranh rất đẹp!",
      avatar: "https://i.pravatar.cc/50?img=3",
    },
    {
      id: 2,
      name: "Mi",
      text: "Bức tranh rất đẹp!",
      avatar: "https://i.pravatar.cc/50?img=5",
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const newItem = {
      id: Date.now(),
      name: "Bạn",
      text: newComment,
      avatar: "https://i.pravatar.cc/50?img=1",
    };
    setComments([...comments, newItem]);
    setNewComment("");
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('src/assets/img/Illustration311.jpg')",
      }}>
      {/* Lớp phủ làm mờ toàn trang */}
      <div className="absolute inset-0 backdrop-blur-sm"></div>

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#d9eafd] via-[#cbdceb] to-[#ffecc8] opacity-60" />

        <div className="relative container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Main Card Container */}
            <div className=" backdrop-blur-sm rounded-3xl p-6">
              {/* Title Card */}
              <div className="bg-gradient-to-br from-[#ffffff]/90 to-[#ffecc8]/30 rounded-2xl p-8 mb-6 shadow-md">
                <h1 className="text-[#133e87] text-2xl md:text-3xl font-bold italic text-center leading-tight mb-4">
                  Mua Tranh Tại Maria Store – "Fanart Shishigami Leona Khiến
                  Mình Phải Mua Ngay Không Do Dự!" 🥰💛
                </h1>
                <p className="text-[#608bc1] text-sm text-center mb-1">
                  Ngày 30/07/2024
                </p>
                <p className="text-[#608bc1] text-sm text-center">
                  Được viết bởi: <span className="font-semibold">Meomeo</span>
                </p>
              </div>

              {/* Content Card */}
              <div className="bg-gradient-to-br from-[#ffffff]/95 to-[#ffecc8]/20 rounded-2xl p-8 shadow-md">
                <div className="bg-gradient-to-br from-[#ffecc8] to-[#ffffff] rounded-xl p-4 mb-6 shadow-sm">
                  <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden">
                    <img
                      src="src\assets\img\Illustration153.jpg"
                      alt="Shishigami Leona Fanart"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Article Content */}
                <div className="space-y-4 text-[#133e87]">
                  <p className="text-sm leading-relaxed">Chào các bạn,</p>

                  <p className="text-sm leading-relaxed">
                    Mình là Hanh – một fan của VTuber và cũng là người mê tranh
                    tự thuật số. Hôm nay mình muốn chia sẻ cảm nhận khi mua bức
                    fanart cực kỳ xinh xắn của Shishigami Leona tại Maria Store,
                    một trải nghiệm khiến mình rất hài lòng từ A đến Z. 🌟
                  </p>

                  <div className="space-y-2">
                    <p className="text-sm leading-relaxed">
                      🍊{" "}
                      <span className="font-semibold">
                        Bức tranh: "Shishigami Leona – Dịu Dàng và Tỏa Sáng"
                      </span>
                    </p>
                    <p className="text-sm leading-relaxed">
                      Ngay khi nhìn thấy bức tranh này, mình đã nhận ra ngay đây
                      là Leona-chan! 🦁
                    </p>
                    <p className="text-sm leading-relaxed">
                      Nét vẽ mềm mại, ánh mắt vừng sáng, tóc vàng óng ánh cùng
                      với biểu cảm có chút lạnh lùng nhưng lại rất ấm áp – đúng
                      chuẩn khí chất của "Sư tử cá hát"! Cảng ấn tượng hơn khi
                      có đội gấu trúc lẩn đẩu, ấm plushe hình sư tử và bước tóc
                      bằng những chi tiết cực kỳ dễ mê! Hình ảnh sticker này
                      thật sự khiến mình cảm thấy Leona đang ở ngay trước mắt.
                    </p>
                  </div>

                  <p className="text-sm leading-relaxed">
                    Không chỉ đẹp về mặt hình ảnh, mà còn thể hiện được cá tính
                    của Leona một cách tinh tế, nhẹ nhàng nhưng đầy cuốn hút.
                  </p>

                  <div className="space-y-2">
                    <p className="text-sm leading-relaxed font-semibold">
                      💻 Trải nghiệm Mua Hàng
                    </p>
                    <p className="text-sm leading-relaxed">
                      Mua cực nhanh: Chỉ cần vài cú click là thanh toán xong quá
                      ư điện tốc.
                    </p>
                    <p className="text-sm leading-relaxed">
                      Nhận file ngay lập tức: Sau khi thanh toán, chỉ cần vài
                      giây trong email – không cần chờ đợi.
                    </p>
                    <p className="text-sm leading-relaxed">
                      Chất lượng tuyệt vời: Ảnh độ phân giải cao, màu sắc rõ
                      ràng, không bị vỡ hình kể cả khi hình nền máy tính hoặc in
                      treo.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm leading-relaxed">
                      🖼️{" "}
                      <span className="font-semibold">
                        Mình Đã Dùng Tranh Thế Nào?
                      </span>
                    </p>
                    <p className="text-sm leading-relaxed">
                      Đặt làm hình nền desktop và điện thoại (xem xíu luôn!).
                    </p>
                    <p className="text-sm leading-relaxed">
                      In ra làm postcard để trang trí góc làm việc.
                    </p>
                    <p className="text-sm leading-relaxed">
                      Làm hình nền slideshow khi stream reaction VTuber nữa!
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm leading-relaxed">
                      💎 <span className="font-semibold">Cảm Nhận Cá Nhân</span>
                    </p>
                    <p className="text-sm leading-relaxed">
                      Mình đã từng mua tranh từ ở nhiều nơi, nhưng Maria Store
                      là một trong những nơi dịch vụ và nhanh – tranh đẹp – giá
                      hợp lý nhất. Đặc biệt, tranh fanart Leona hiếm khi được vẽ
                      đẹp và đầy yêu như thể này nên mình thực sự cảm thấy rất
                      "đáng đồng tiền bát gạo".
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm leading-relaxed">
                      💙{" "}
                      <span className="font-semibold">
                        Lời Nhắn Tới Fan Nhà Sư Tử
                      </span>
                    </p>
                    <p className="text-sm leading-relaxed">
                      Nếu bạn là fan của Shishigami Leona, hoặc đơn giản là
                      người yêu phong cách anime ngọt ngào, dễ thương thì đừng
                      bỏ lỡ bức tranh này!
                    </p>
                  </div>

                  <p className="text-sm leading-relaxed">
                    Cảm ơn Maria Store đã giúp mình có thêm một khoảnh khắc đẹp
                    thương để lưu giữ.
                  </p>

                  <p className="text-sm leading-relaxed">
                    Hẹn gặp lại ở những lần mua tiếp theo nhé! 🌸
                  </p>

                  <p className="text-sm leading-relaxed">
                    — Meomeo / @meomeo1234
                  </p>
                </div>
              </div>

              {/* Nút toggle bình luận */}
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setShowComments(!showComments)}
                  className="flex items-center gap-2 border border-[#cbdeed] bg-[#eaf7ff] text-[#133e87] hover:text-white px-4 py-2 rounded-md font-medium hover:bg-[#133e87] transition">
                  {showComments
                    ? t("detailCommunity.hide_comments")
                    : t("detailCommunity.show_comments")}
                </button>
              </div>

              {/* Khung bình luận */}
              {showComments && (
                <div className="mt-8 bg-gradient-to-br from-[#ffffff]/90 to-[#ffecc8]/40 rounded-3xl p-6 shadow-md transition-all duration-500">
                  <h2 className="text-[#133e87] font-semibold mb-4">
                    {t("detailCommunity.comments_title")}
                  </h2>

                  {/* Danh sách bình luận */}
                  <div className="space-y-4 mb-4 max-h-60 overflow-y-auto">
                    {comments.map((c) => (
                      <div key={c.id} className="flex items-start space-x-3">
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                          <p className="font-semibold text-[#133e87]">
                            {c.name}
                          </p>
                          <p className="text-sm text-[#608bc1]">{c.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Ô nhập bình luận mới */}
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://i.pravatar.cc/50?img=1"
                      alt="user"
                      className="w-10 h-10 rounded-full"
                    />
                    <Input
                      placeholder={t("detailCommunity.comment_placeholder")}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onPressEnter={handleAddComment}
                      className="flex-1 rounded-xl shadow-sm"
                    />
                    <button
                      onClick={handleAddComment}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-[#133e87] text-white shadow-sm hover:bg-[#4a6fa3] transition mx-2">
                      <SendOutlined className="text-lg" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DetailCommunityContainer;