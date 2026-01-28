import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Input, Modal, Upload, message, Spin, Popconfirm } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { Editor } from "@tinymce/tinymce-react";
import { useTranslation } from "react-i18next";
import { postApi } from "../../../api/postApi";

const API_HOST = "http://localhost:8080";

function resolveImg(url, fallback) {
  if (!url) return fallback;
  const s = String(url);
  if (s.startsWith("http")) return s;
  if (s.startsWith("/")) return `${API_HOST}${s}`;
  return `${API_HOST}/${s}`;
}

function useObjectUrl(fileOrNull) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (!(fileOrNull instanceof File)) {
      setUrl(null);
      return;
    }
    const u = URL.createObjectURL(fileOrNull);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [fileOrNull]);

  return url;
}

function MyAddPostModal({ open, onCancel, onAddSuccess }) {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const coverObjectUrl = useObjectUrl(coverImage);

  useEffect(() => {
    if (open) {
      setTitle("");
      setCoverImage(null);
      setContent("");
      setSubmitting(false);
    }
  }, [open]);

  const uploadProps = {
    beforeUpload: (file) => {
      if (file.size > 3 * 1024 * 1024) {
        message.error(
          t("adminPost.addModal.image_too_large") || "Ảnh không được vượt quá 3MB"
        );
        return false;
      }
      setCoverImage(file);
      return false;
    },
    onRemove: () => setCoverImage(null),
  };

  const handleAdd = async () => {
    if (!title.trim()) {
      message.warning(
        t("adminPost.addModal.toast_required") || "Vui lòng nhập tiêu đề"
      );
      return;
    }
    try {
      setSubmitting(true);
      await postApi.createMy({
        title: title.trim(),
        content,
        coverFile: coverImage,
      });
      message.success(
        t("adminPost.addModal.toast_success") || "Tạo bài viết thành công"
      );
      onAddSuccess?.();
    } catch (e) {
      message.error(
        e?.response?.data?.message ||
          t("adminPost.toast.add_failed") ||
          "Thêm bài viết thất bại"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width={1000}
      centered
      closable={false}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h2 className="text-[#133e87] text-2xl font-bold text-center mb-6">
          {t("adminPost.addModal.title") || "Thêm bài viết"}
        </h2>

        <div className="mb-6">
          <Editor
            apiKey="wlrnb7cm26qkks9m0018sky9y15ihbilpclj05851n6a13q8"
            value={content}
            onEditorChange={(newContent) => setContent(newContent)}
            init={{
              height: 400,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | bold italic underline forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image table | removeformat | preview code",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center items-center">
            <div className="w-full h-[280px] bg-[#e8eff6] rounded-xl overflow-hidden">
              <Upload
                {...uploadProps}
                showUploadList={false}
                className="w-full h-full"
              >
                {coverObjectUrl ? (
                  <img
                    src={coverObjectUrl}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col justify-center items-center w-full h-full text-[#133e87]">
                    {t("adminPost.addModal.cover_add") || "+ Thêm Ảnh Bìa"}
                  </div>
                )}
              </Upload>
            </div>
          </div>

          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">
                  {t("adminPost.addModal.post_title_label") || "Tên Bài Viết*"}
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="rounded-lg h-10"
                />
              </div>
            </div>

            <div className="flex justify-start gap-4 mt-6">
              <Button
                onClick={handleAdd}
                type="primary"
                loading={submitting}
                className="px-6 py-1 rounded-full font-medium"
                style={{ backgroundColor: "#133e87", borderColor: "#133e87" }}
              >
                {t("adminPost.addModal.btn_add") || "Thêm Bài Viết"}
              </Button>

              <Button
                onClick={onCancel}
                className="px-6 py-1 rounded-full font-medium"
                style={{ borderColor: "#133e87", color: "#133e87" }}
              >
                {t("adminPost.common.cancel") || "Hủy"}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </Modal>
  );
}

function MyEditPostModal({ open, onCancel, onUpdateSuccess, post }) {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const coverObjectUrl = useObjectUrl(coverImage instanceof File ? coverImage : null);

  useEffect(() => {
    if (open && post) {
      setTitle(post.title || "");
      setContent(post.content || "");
      setCoverImage(post.coverImage || post.cover_image || null);
      setSubmitting(false);
    }
  }, [open, post]);

  const uploadProps = {
    beforeUpload: (file) => {
      if (file.size > 3 * 1024 * 1024) {
        message.error(
          t("adminPost.addModal.image_too_large") || "Ảnh không được vượt quá 3MB"
        );
        return false;
      }
      setCoverImage(file);
      return false;
    },
    onRemove: () => setCoverImage(null),
  };

  const coverPreview = useMemo(() => {
    if (!coverImage) return null;
    if (coverImage instanceof File) return coverObjectUrl;
    if (typeof coverImage === "string") return resolveImg(coverImage, null);
    return null;
  }, [coverImage, coverObjectUrl]);

  const handleUpdate = async () => {
    if (!post?.id) return;
    if (!title.trim()) {
      message.warning(
        t("adminPost.editModal.toast_required") || "Vui lòng nhập tiêu đề"
      );
      return;
    }
    try {
      setSubmitting(true);
      await postApi.updateMy(post.id, {
        title: title.trim(),
        content,
        coverFile: coverImage instanceof File ? coverImage : null,
      });
      message.success(
        t("adminPost.editModal.toast_success") || "Cập nhật thành công"
      );
      onUpdateSuccess?.();
    } catch (e) {
      message.error(
        e?.response?.data?.message ||
          t("adminPost.toast.update_failed") ||
          "Cập nhật thất bại"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width={1000}
      centered
      closable={false}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h2 className="text-[#133e87] text-2xl font-bold text-center mb-6">
          {t("adminPost.editModal.title") || "Chỉnh sửa bài viết"}
        </h2>

        <div className="mb-6">
          <Editor
            apiKey="wlrnb7cm26qkks9m0018sky9y15ihbilpclj05851n6a13q8"
            value={content}
            onEditorChange={(newContent) => setContent(newContent)}
            init={{
              height: 400,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | bold italic underline forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image table | removeformat | preview code",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center items-center">
            <div className="w-full h-[280px] bg-[#e8eff6] rounded-xl overflow-hidden">
              <Upload
                {...uploadProps}
                showUploadList={false}
                className="w-full h-full"
              >
                {coverPreview ? (
                  <img
                    src={coverPreview}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col justify-center items-center w-full h-full text-[#133e87]">
                    {t("adminPost.addModal.cover_add") || "+ Thêm Ảnh Bìa"}
                  </div>
                )}
              </Upload>
            </div>
          </div>

          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">
                  {t("adminPost.addModal.post_title_label") || "Tên Bài Viết*"}
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="rounded-lg h-10"
                />
              </div>
            </div>

            <div className="flex justify-start gap-4 mt-6">
              <Button
                onClick={handleUpdate}
                type="primary"
                loading={submitting}
                className="px-6 py-1 rounded-full font-medium"
                style={{ backgroundColor: "#133e87", borderColor: "#133e87" }}
              >
                {t("adminPost.editModal.btn_update") || "Cập nhật"}
              </Button>

              <Button
                onClick={onCancel}
                className="px-6 py-1 rounded-full font-medium"
                style={{ borderColor: "#133e87", color: "#133e87" }}
              >
                {t("adminPost.common.cancel") || "Hủy"}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </Modal>
  );
}

function MyPostDetailModal({ open, onClose, post, onEdit, onDelete }) {
  const { t } = useTranslation();
  if (!post) return null;

  const coverSrc = resolveImg(
    post.coverImage || post.cover_image,
    "src/assets/img/Illustration153.jpg"
  );

  const author =
    post.userFullName || post.user?.fullName || post.authorName || post.user?.email || "User";

  return (
    <Modal open={open} onCancel={onClose} footer={null} width={900} centered>
      <div className="relative bg-gradient-to-br from-[#d9eafd] via-[#cbdceb] to-[#ffecc8] min-h-[70vh] overflow-y-auto rounded-3xl">
        <div className="relative z-10 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-[#133e87] text-2xl font-bold italic text-center mb-4">
              {post.title || t("adminPost.detailModal.fallback_title") || "(Không có tiêu đề)"}
            </h1>

            <p className="text-[#608bc1] text-sm text-center mb-1">
              {t("adminPost.detailModal.date_prefix") || "Ngày"}{" "}
              {post.createdAt
                ? new Date(post.createdAt).toLocaleDateString("vi-VN")
                : "N/A"}
            </p>

            <p className="text-[#608bc1] text-sm text-center mb-6">
              {t("adminPost.detailModal.written_by") || "Được viết bởi"}{" "}
              <span className="font-semibold">{author}</span>
            </p>

            <div className="rounded-xl overflow-hidden mb-6">
              <img
                src={coverSrc}
                alt="cover"
                className="w-full h-[400px] object-cover"
                onError={(e) =>
                  (e.currentTarget.src = "src/assets/img/Illustration153.jpg")
                }
              />
            </div>

            <div
              className="text-[#133e87] space-y-3 leading-relaxed mb-8"
              dangerouslySetInnerHTML={{
                __html: post.content || "<p>(Chưa có nội dung)</p>",
              }}
            />

            <div className="flex justify-between items-center mt-8">
              <button
                onClick={onEdit}
                className="flex items-center gap-2 border border-[#cbdeed] bg-[#eaf7ff] text-[#133e87] hover:text-white px-4 py-2 rounded-md font-medium hover:bg-[#133e87] transition"
              >
                <EditOutlined />
                {t("adminPost.detailModal.edit_post") || "Chỉnh sửa"}
              </button>

              <Popconfirm
                title={t("adminPost.detailModal.confirm_delete") || "Xoá bài viết?"}
                okText={t("common.delete") || "Xoá"}
                cancelText={t("common.cancel") || "Hủy"}
                onConfirm={onDelete}
              >
                <button className="flex items-center gap-2 border border-red-200 bg-red-50 text-red-600 hover:text-white px-4 py-2 rounded-md font-medium hover:bg-red-600 transition">
                  <DeleteOutlined />
                  {t("common.delete") || "Xoá"}
                </button>
              </Popconfirm>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default function ProfilePostsPage() {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [keyword, setKeyword] = useState("");

  const [addOpen, setAddOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const lastReqId = useRef(0);

  const fetchMyPosts = async (p = 0, kw = keyword) => {
    const reqId = ++lastReqId.current;
    try {
      setLoading(true);
      const res = await postApi.listMy({ page: p, size, keyword: kw });
      if (reqId !== lastReqId.current) return;

      const content = res?.data?.content || [];
      setPosts(content);
      setPage(p);

      if (selected?.id) {
        const fresh = content.find((x) => x.id === selected.id);
        if (fresh) setSelected(fresh);
      }
    } catch (e) {
      if (reqId !== lastReqId.current) return;
      message.error(e?.response?.data?.message || "Không tải được bài viết của bạn");
      setPosts([]);
    } finally {
      if (reqId === lastReqId.current) setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPosts(0, "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMyPosts(0, keyword);
    }, 350);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  const openDetail = (p) => {
    setSelected(p);
    setDetailOpen(true);
  };

  const handleDelete = async () => {
    if (!selected?.id) return;
    try {
      await postApi.deleteMy(selected.id);
      message.success(t("common.deleted") || "Đã xoá bài viết");

      setDetailOpen(false);
      setEditOpen(false);
      setSelected(null);

      await fetchMyPosts(Math.max(0, page), keyword);
    } catch (e) {
      message.error(e?.response?.data?.message || "Xoá thất bại");
    }
  };

  const empty = !loading && posts.length === 0;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex gap-2">
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder={t("profile.posts_search_ph") || "Tìm bài viết..."}
            className="w-[280px]"
            allowClear
          />
          <Button onClick={() => fetchMyPosts(0, keyword)}>
            {t("adminPost.common.search") || "Tìm"}
          </Button>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setAddOpen(true)}
          style={{ backgroundColor: "#133e87", borderColor: "#133e87" }}
        >
          {t("profile.create_post") || "Tạo bài viết"}
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <Spin />
        </div>
      ) : empty ? (
        <p className="text-[#6b7280] text-lg">
          {t("profile.empty_posts") || "Chưa có bài viết"}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {posts.map((p) => {
            const cover = resolveImg(
              p.coverImage || p.cover_image,
              "src/assets/img/Illustration153.jpg"
            );

            const author =
              p.userFullName || p.user?.fullName || p.authorName || p.user?.email || "";

            return (
              <div
                key={p.id}
                onClick={() => openDetail(p)}
                className="cursor-pointer rounded-2xl overflow-hidden border border-[#e5e7eb] bg-white hover:shadow-lg transition"
              >
                <div className="h-[180px] bg-gray-100 overflow-hidden">
                  <img
                    src={cover}
                    alt={p.title}
                    className="w-full h-full object-cover"
                    onError={(e) =>
                      (e.currentTarget.src = "src/assets/img/Illustration153.jpg")
                    }
                  />
                </div>
                <div className="p-4">
                  <div className="text-[#133e87] font-semibold line-clamp-2">
                    {p.title}
                  </div>

                  <div className="text-xs text-[#608bc1] mt-1">
                    {p.createdAt ? new Date(p.createdAt).toLocaleString("vi-VN") : ""}
                  </div>

                  {author ? (
                    <div className="text-sm text-gray-500 mt-2 line-clamp-2">
                      {t("profile.by") || "Bởi"}: {author}
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <MyAddPostModal
        open={addOpen}
        onCancel={() => setAddOpen(false)}
        onAddSuccess={() => {
          setAddOpen(false);
          fetchMyPosts(0, keyword);
        }}
      />

      <MyPostDetailModal
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        post={selected}
        onEdit={() => {
          setDetailOpen(false);
          setEditOpen(true);
        }}
        onDelete={handleDelete}
      />

      <MyEditPostModal
        open={editOpen}
        onCancel={() => setEditOpen(false)}
        post={selected}
        onUpdateSuccess={() => {
          setEditOpen(false);
          fetchMyPosts(page, keyword);
        }}
      />
    </div>
  );
}