import { Modal, Input, message, Spin } from "antd";
import { useEffect, useMemo, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import EditPostModal from "./EditPostModal";
import { useTranslation } from "react-i18next";
import { adminPostApi } from "../../../api/adminPostApi";
import { commentApi } from "../../../api/commentApi";

const API_HOST = "http://localhost:8080";

function buildCoverSrc(post) {
  const coverPath = post?.coverImage || post?.cover_image;
  if (!coverPath) return "src/assets/img/Illustration153.jpg";
  return coverPath.startsWith("http") ? coverPath : `${API_HOST}${coverPath}`;
}

function buildAvatarSrc(c) {
  const raw =
    c?.userAvatarUrl ||
    c?.avatarUrl ||
    c?.user_avatar_url ||
    c?.avatar_url ||
    c?.userAvatar;

  if (!raw) return "https://i.pravatar.cc/50?img=1";
  if (raw.startsWith("http")) return raw;
  if (raw.startsWith("/")) return `${API_HOST}${raw}`;
  return `${API_HOST}/${raw}`;
}

function DetailPostModal({ open, onClose, post: initialPost }) {
  const [post, setPost] = useState(initialPost || {});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [cmtLoading, setCmtLoading] = useState(false);

  const [keyword, setKeyword] = useState("");

  const { t } = useTranslation();

  useEffect(() => {
    setPost(initialPost || {});
  }, [initialPost, open]);

  useEffect(() => {
    const run = async () => {
      if (open && initialPost?.id) {
        try {
          const res = await adminPostApi.detail(initialPost.id);
          setPost(res.data);
        } catch {}
      }
    };
    run();
  }, [open, initialPost]);

  useEffect(() => {
    const run = async () => {
      if (!open || !showComments || !post?.id) return;
      try {
        setCmtLoading(true);
        const res = await commentApi.listByPost(post.id, { page: 0, size: 50 });
        setComments(res.data?.content || []);
      } catch (e) {
        message.error(e?.response?.data?.message || "Không tải được bình luận");
      } finally {
        setCmtLoading(false);
      }
    };
    run();
  }, [open, showComments, post?.id]);

  const coverSrc = useMemo(() => buildCoverSrc(post), [post]);

  const filteredComments = useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    if (!kw) return comments;
    return comments.filter((c) => {
      const name = (c.userFullName || c.fullName || "").toLowerCase();
      const content = (c.content || "").toLowerCase();
      return name.includes(kw) || content.includes(kw);
    });
  }, [comments, keyword]);

  const handleEditPost = () => setIsEditModalOpen(true);

  const handleUpdatePost = (updatedPost) => {
    setPost(updatedPost);
    setIsEditModalOpen(false);
  };

  if (!post) return null;

  return (
    <>
      <Modal open={open} onCancel={onClose} footer={null} width={900} centered>
        <div className="relative bg-gradient-to-br from-[#d9eafd] via-[#cbdceb] to-[#ffecc8] min-h-[90vh] overflow-y-auto rounded-3xl">
          <div className="relative z-10 p-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-[#133e87] text-2xl font-bold italic text-center mb-4">
                {post.title || t("adminPost.detailModal.fallback_title")}
              </h1>

              <p className="text-[#608bc1] text-sm text-center mb-1">
                {t("adminPost.detailModal.date_prefix")}{" "}
                {post.createdAt
                  ? new Date(post.createdAt).toLocaleDateString("vi-VN")
                  : t("adminPost.detailModal.date_na")}
              </p>

              <p className="text-[#608bc1] text-sm text-center mb-6">
                {t("adminPost.detailModal.written_by")}{" "}
                <span className="font-semibold">
                  {post.authorName ||
                    post.author ||
                    t("adminPost.detailModal.anonymous")}
                </span>
              </p>

              <div className="rounded-xl overflow-hidden mb-6">
                <img
                  src={coverSrc}
                  alt="preview"
                  className="w-full h-[400px] object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "src/assets/img/Illustration153.jpg";
                  }}
                />
              </div>

              <div
                className="text-[#133e87] space-y-3 leading-relaxed mb-8"
                dangerouslySetInnerHTML={{
                  __html:
                    post.content ||
                    `<p>Đây là phần nội dung chi tiết của bài viết <b>${post.title}</b>.</p>`,
                }}
              />

              <div className="flex justify-between items-center mt-8">
                <button
                  onClick={handleEditPost}
                  className="flex items-center gap-2 border border-[#cbdeed] bg-[#eaf7ff] text-[#133e87] hover:text-white px-4 py-2 rounded-md font-medium hover:bg-[#133e87] transition">
                  <EditOutlined />
                  {t("adminPost.detailModal.edit_post")}
                </button>

                <button
                  onClick={() => setShowComments(!showComments)}
                  className="flex items-center gap-2 border border-[#cbdeed] bg-[#eaf7ff] text-[#133e87] hover:text-white px-4 py-2 rounded-md font-medium hover:bg-[#133e87] transition">
                  {showComments
                    ? t("adminPost.detailModal.hide_comments")
                    : t("adminPost.detailModal.show_comments")}
                </button>
              </div>

              {showComments && (
                <div className="mt-6 bg-[#ffffff]/90 rounded-2xl p-6 shadow-inner">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <h2 className="text-[#133e87] font-semibold">
                      {t("adminPost.detailModal.comments_title") || "Bình luận"}
                    </h2>

                    <Input
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      placeholder={t(
                        "adminPost.detailModal.comment_search_placeholder"
                      )}
                      className="max-w-xs"
                    />
                  </div>

                  <div className="space-y-4 max-h-80 overflow-y-auto">
                    {cmtLoading ? (
                      <div className="flex justify-center py-4">
                        <Spin />
                      </div>
                    ) : filteredComments.length === 0 ? (
                      <p className="text-[#608bc1]">
                        {t("adminPost.detailModal.no_comments")}
                      </p>
                    ) : (
                      filteredComments.map((c) => (
                        <div key={c.id} className="flex items-start space-x-3">
                          <img
                            src={buildAvatarSrc(c)}
                            alt={c.userFullName || "user"}
                            className="w-10 h-10 rounded-full"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://i.pravatar.cc/50?img=1";
                            }}
                          />
                          <div className="bg-white rounded-lg p-3 shadow-sm w-full">
                            <div className="flex items-center justify-between gap-2">
                              <p className="font-semibold text-[#133e87]">
                                {c.userFullName || "User"}
                              </p>
                              {c.createdAt && (
                                <p className="text-xs text-[#9bb3d1]">
                                  {new Date(c.createdAt).toLocaleString(
                                    "vi-VN"
                                  )}
                                </p>
                              )}
                            </div>
                            <p className="text-sm text-[#608bc1] whitespace-pre-wrap">
                              {c.content}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>

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