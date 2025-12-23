import { Modal, Input, message } from "antd";
import { useState } from "react";
import { SendOutlined, EditOutlined } from "@ant-design/icons";
import EditPostModal from "./EditPostModal";

function DetailPostModal({ open, onClose, post: initialPost }) {
  const [post, setPost] = useState(initialPost || {});
  const [showComments, setShowComments] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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
      text: "Bức tranh tuyệt vời!",
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
    message.success("Đã thêm bình luận!");
  };

  const handleEditPost = () => {
    setIsEditModalOpen(true);
  };

  const handleUpdatePost = (updatedPost) => {
    setPost(updatedPost); // 🔹 Cập nhật lại bài viết trong modal chi tiết
    setIsEditModalOpen(false);
  };

  if (!post) return null;

  return (
    <>
      <Modal open={open} onCancel={onClose} footer={null} width={900} centered>
        <div className="relative bg-gradient-to-br from-[#d9eafd] via-[#cbdceb] to-[#ffecc8] min-h-[90vh] overflow-y-auto rounded-3xl">
          <div className="relative z-10 p-8">
            <div className="max-w-4xl mx-auto">
              {/* Tiêu đề */}
              <h1 className="text-[#133e87] text-2xl font-bold italic text-center mb-4">
                {post.title || "Tiêu đề bài viết"}
              </h1>
              <p className="text-[#608bc1] text-sm text-center mb-1">
                Ngày {post.createdAt || "N/A"}
              </p>
              <p className="text-[#608bc1] text-sm text-center mb-6">
                Được viết bởi:{" "}
                <span className="font-semibold">
                  {post.author || "Ẩn danh"}
                </span>
              </p>

              {/* Ảnh bài viết */}
              <div className="rounded-xl overflow-hidden mb-6">
                <img
                  src={
                    post.coverImage
                      ? post.coverImage instanceof File
                        ? URL.createObjectURL(post.coverImage)
                        : post.coverImage
                      : "src/assets/img/Illustration153.jpg"
                  }
                  alt="preview"
                  className="w-full h-[400px] object-cover"
                />
              </div>

              {/* Nội dung */}
              <div
                className="text-[#133e87] space-y-3 leading-relaxed mb-8"
                dangerouslySetInnerHTML={{
                  __html:
                    post.content ||
                    `<p>Đây là phần nội dung chi tiết của bài viết <b>${post.title}</b>.</p>`,
                }}
              />

              {/* Hai nút dưới cùng */}
              <div className="flex justify-between items-center mt-8">
                <button
                  onClick={handleEditPost}
                  className="flex items-center gap-2 border border-[#cbdeed] bg-[#eaf7ff] text-[#133e87] hover:text-white px-4 py-2 rounded-md font-medium hover:bg-[#133e87] transition">
                  <EditOutlined />
                  Chỉnh sửa bài viết
                </button>

                <button
                  onClick={() => setShowComments(!showComments)}
                  className="flex items-center gap-2 border border-[#cbdeed] bg-[#eaf7ff] text-[#133e87] hover:text-white px-4 py-2 rounded-md font-medium hover:bg-[#133e87] transition">
                  {showComments ? "Ẩn bình luận" : "Xem bình luận"}
                </button>
              </div>

              {/* Khu vực bình luận */}
              {showComments && (
                <div className="mt-6 bg-[#ffffff]/90 rounded-2xl p-6 shadow-inner">
                  <h2 className="text-[#133e87] font-semibold mb-4">
                    Bình luận
                  </h2>
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

                  {/* Ô nhập bình luận */}
                  <div className="flex items-center gap-2 mt-4">
                    <Input
                      placeholder="Viết bình luận..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onPressEnter={handleAddComment}
                      className="flex-1 border-[#cbdeed] rounded-full px-4 py-2"
                    />
                    <button
                      onClick={handleAddComment}
                      className="flex items-center justify-center bg-[#133e87] text-white px-4 py-2 rounded-full hover:bg-[#0f2e6e] transition">
                      <SendOutlined />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>

      {/* Modal chỉnh sửa bài viết */}
      <EditPostModal
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdatePost}
        post={post}
      />
    </>
  );
}

export default DetailPostModal;