import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Upload, Select, message } from "antd";
import { motion } from "framer-motion";
import { Editor } from "@tinymce/tinymce-react";
import { useTranslation } from "react-i18next";

const { Option } = Select;

function EditPostModal({ open, onCancel, onUpdate, post }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [content, setContent] = useState("");

  const { t } = useTranslation();

  useEffect(() => {
    if (open && post) {
      setTitle(post.title || "");
      setAuthor(post.author || "");
      setHashtag(post.hashtag || "");
      setCoverImage(post.coverImage || null);
      setContent(post.content || "");
    }
  }, [open, post]);

  const handleUpdate = () => {
    if (!title || !author || !hashtag) {
      message.warning(t("adminPost.editModal.toast_required"));
      return;
    }
    const updatedPost = {
      ...post,
      title,
      author,
      hashtag,
      coverImage,
      content,
    };
    onUpdate(updatedPost);
    message.success(t("adminPost.editModal.toast_success"));
    onCancel();
  };

  const uploadProps = {
    beforeUpload: (file) => {
      if (file.size > 3 * 1024 * 1024) {
        message.error(t("adminPost.addModal.image_too_large"));
        return false;
      }
      setCoverImage(file);
      return false;
    },
    onRemove: () => setCoverImage(null),
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width={1000}
      centered
      closable={false}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <h2 className="text-[#133e87] text-2xl font-bold text-center mb-6">
          {t("adminPost.editModal.title")}
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
                className="w-full h-full">
                {coverImage ? (
                  <img
                    src={
                      coverImage instanceof File
                        ? URL.createObjectURL(coverImage)
                        : coverImage
                    }
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col justify-center items-center w-full h-full text-[#133e87]">
                    {t("adminPost.addModal.cover_add")}
                  </div>
                )}
              </Upload>
            </div>
          </div>

          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">
                  {t("adminPost.addModal.post_title_label")}
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="rounded-lg h-10"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">
                  {t("adminPost.addModal.author_label")}{" "}
                </label>
                <Input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="rounded-lg h-10"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">
                  {t("adminPost.addModal.hashtag_label")}{" "}
                </label>
                <Select
                  value={hashtag}
                  onChange={(value) => setHashtag(value)}
                  className="w-full rounded-lg h-10">
                  <Option value="tin-tuc">
                    {t("adminPost.addModal.hashtag.news")}
                  </Option>
                  <Option value="su-kien">
                    {t("adminPost.addModal.hashtag.event")}
                  </Option>
                  <Option value="review">
                    {t("adminPost.addModal.hashtag.review")}
                  </Option>
                </Select>
              </div>
            </div>

            <div className="flex justify-start gap-4 mt-6">
              <Button
                onClick={handleUpdate}
                type="primary"
                className="px-6 py-1 rounded-full font-medium"
                style={{ backgroundColor: "#133e87", borderColor: "#133e87" }}>
                {t("adminPost.editModal.btn_update")}
              </Button>

              <Button
                onClick={onCancel}
                className="px-6 py-1 rounded-full font-medium"
                style={{ borderColor: "#133e87", color: "#133e87" }}>
                {t("adminPost.common.cancel")}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </Modal>
  );
}

export default EditPostModal;