import { Input, message } from "antd";
import { useEffect, useMemo, useState } from "react";
import { SendOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { postApi } from "../../api/postApi";
import { commentApi } from "../../api/commentApi";
import { getCurrentUserApi } from "../../api/authApi";
import bg from "../../assets/img/Illustration311.jpg";

const API_HOST = "http://localhost:8080";

function buildCoverSrc(post) {
  const path = post?.coverImage || post?.cover_image;
  if (!path) return "src/assets/img/Illustration153.jpg";
  if (path.startsWith("http")) return path;
  if (path.startsWith("/")) return `${API_HOST}${path}`;
  return `${API_HOST}/${path}`;
}

function buildMediaSrc(raw, fallback) {
  if (!raw) return fallback;
  if (raw.startsWith("http")) return raw;
  if (raw.startsWith("/")) return `${API_HOST}${raw}`;
  return `${API_HOST}/${raw}`;
}

function buildAvatarSrcFromComment(c) {
  const raw =
    c?.userAvatarUrl ||
    c?.avatarUrl ||
    c?.user_avatar_url ||
    c?.avatar_url ||
    c?.userAvatar;

  return buildMediaSrc(raw, "https://i.pravatar.cc/50?img=1");
}

function DetailCommunityContainer() {
  const { t } = useTranslation();
  const { id } = useParams();

  const [showComments, setShowComments] = useState(false);

  const [post, setPost] = useState(null);
  const [postLoading, setPostLoading] = useState(false);

  const [comments, setComments] = useState([]);
  const [cmtLoading, setCmtLoading] = useState(false);

  const [newComment, setNewComment] = useState("");

  const [me, setMe] = useState(null);

  useEffect(() => {
    const run = async () => {
      if (!id) return;
      try {
        setPostLoading(true);
        const res = await postApi.detail(id);
        setPost(res.data);
      } catch (e) {
        message.error(
          e?.response?.data?.message || t("detailCommunity.load_post_failed")
        );
      } finally {
        setPostLoading(false);
      }
    };
    run();
  }, [id]);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await getCurrentUserApi();
        setMe(res.data);
      } catch (e) {
        setMe(null);
      }
    };
    run();
  }, []);

  useEffect(() => {
    const run = async () => {
      if (!id || !showComments) return;
      try {
        setCmtLoading(true);
        const res = await commentApi.listByPost(id, { page: 0, size: 30 });
        setComments(res.data?.content || []);
      } catch (e) {
        message.error(
          e?.response?.data?.message ||
            t("detailCommunity.load_comments_failed")
        );
      } finally {
        setCmtLoading(false);
      }
    };
    run();
  }, [id, showComments]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await commentApi.create(id, newComment.trim());
      setComments((prev) => [res.data, ...prev]);
      setNewComment("");
      message.success(
        t("detailCommunity.toast_comment_added") || "Đã thêm bình luận"
      );
    } catch (e) {
      if (e?.response?.status === 401) {
        message.warning(t("detailCommunity.need_login_to_comment"));
        return;
      }
      message.error(
        e?.response?.data?.message || t("detailCommunity.add_comment_failed")
      );
    }
  };

  const coverSrc = useMemo(() => buildCoverSrc(post), [post]);

  const myAvatarSrc = useMemo(() => {
    const raw = me?.avatarUrl || me?.avatar_url;
    return buildMediaSrc(raw, "https://i.pravatar.cc/50?img=1");
  }, [me]);

  const myName = me?.fullName || me?.full_name || "Bạn";

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}>
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

      <main className="relative z-10 flex-1 overflow-hidden">
        <div className="relative container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="backdrop-blur-sm rounded-3xl p-6">
              {/* Title */}
              <div className="bg-gradient-to-br from-[#ffffff]/90 to-[#ffecc8]/30 rounded-2xl p-8 mb-6 shadow-md">
                <h1 className="text-[#133e87] text-2xl md:text-3xl font-bold italic text-center leading-tight mb-4">
                  {postLoading
                    ? "..."
                    : post?.title || t("detailCommunity.fallback_title")}
                </h1>

                <p className="text-[#608bc1] text-sm text-center mb-1">
                  {post?.createdAt
                    ? new Date(post.createdAt).toLocaleDateString("vi-VN")
                    : ""}
                </p>

                <p className="text-[#608bc1] text-sm text-center">
                  {t("detailCommunity.written_by") || "Được viết bởi:"}{" "}
                  <span className="font-semibold">
                    {post?.fullName ||
                      post?.authorName ||
                      t("detailCommunity.anonymous") ||
                      "Ẩn danh"}
                  </span>
                </p>
              </div>

              {/* Content */}
              <div className="bg-gradient-to-br from-[#ffffff]/95 to-[#ffecc8]/20 rounded-2xl p-8 shadow-md">
                <div className="bg-gradient-to-br from-[#ffecc8] to-[#ffffff] rounded-xl p-4 mb-6 shadow-sm">
                  <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden">
                    <img
                      src={coverSrc}
                      alt="cover"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div
                  className="space-y-4 text-[#133e87]"
                  dangerouslySetInnerHTML={{
                    __html: post?.content || "<p>...</p>",
                  }}
                />
              </div>

              {/* Toggle */}
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setShowComments(!showComments)}
                  className="flex items-center gap-2 border border-[#cbdeed] bg-[#eaf7ff] text-[#133e87] hover:text-white px-4 py-2 rounded-md font-medium hover:bg-[#133e87] transition">
                  {showComments
                    ? t("detailCommunity.hide_comments")
                    : t("detailCommunity.show_comments")}
                </button>
              </div>

              {/* Comments */}
              {showComments && (
                <div className="mt-8 bg-gradient-to-br from-[#ffffff]/90 to-[#ffecc8]/40 rounded-3xl p-6 shadow-md transition-all duration-500">
                  <h2 className="text-[#133e87] font-semibold mb-4">
                    {t("detailCommunity.comments_title")}
                  </h2>

                  <div className="space-y-4 mb-4 max-h-60 overflow-y-auto">
                    {cmtLoading ? (
                      <p className="text-[#608bc1]">
                        {t("detailCommunity.loading")}
                      </p>
                    ) : (
                      comments.map((c) => (
                        <div key={c.id} className="flex items-start space-x-3">
                          <img
                            src={buildAvatarSrcFromComment(c)}
                            alt={c.userFullName || "user"}
                            className="w-10 h-10 rounded-full"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://i.pravatar.cc/50?img=1";
                            }}
                          />

                          <div className="bg-white rounded-lg p-3 shadow-sm">
                            <p className="font-semibold text-[#133e87]">
                              {c.userFullName || "User"}
                            </p>
                            <p className="text-sm text-[#608bc1]">
                              {c.content}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="flex items-center space-x-3">
                    <img
                      src={myAvatarSrc}
                      alt={me?.fullName || "Bạn"}
                      className="w-10 h-10 rounded-full"
                      onError={(e) =>
                        (e.currentTarget.src = "https://i.pravatar.cc/50?img=1")
                      }
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