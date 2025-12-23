import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Upload, Select, message } from "antd";
import { motion } from "framer-motion";
import { PlusOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";

const { Option } = Select;

function AddPostModal({ open, onCancel, onAdd }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [content, setContent] = useState("");

  // Reset form mỗi lần mở modal
  useEffect(() => {
    if (open) {
      setTitle("");
      setAuthor("");
      setHashtag("");
      setCoverImage(null);
      setContent("");
    }
  }, [open]);

  const handleAdd = () => {
    if (!title || !author || !hashtag) {
      message.warning("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    onAdd({ title, author, hashtag, coverImage, content });
    message.success("Thêm bài viết thành công!");
    onCancel();
  };

  const uploadProps = {
    beforeUpload: (file) => {
      if (file.size > 3 * 1024 * 1024) {
        message.error("Ảnh không được vượt quá 3MB");
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
          Thêm bài viết
        </h2>

        {/* Trình soạn thảo TinyMCE ---> ĐƯA LÊN TRÊN */}
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

        {/* PHẦN DƯỚI */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* CỘT TRÁI - KHUNG ẢNH FULL */}
          <div className="flex justify-center items-center">
            <div className="w-full h-[280px] bg-[#e8eff6] rounded-xl overflow-hidden">
              <Upload
                {...uploadProps}
                showUploadList={false}
                className="w-full h-full">
                {coverImage ? (
                  <img
                    src={URL.createObjectURL(coverImage)}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col justify-center items-center w-full h-full text-[#133e87]">
                    + Thêm Ảnh Bìa
                  </div>
                )}
              </Upload>
            </div>
          </div>

          {/* CỘT PHẢI - FORM NHẬP LIỆU + NÚT */}
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">
                  Tên Bài Viết*
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="rounded-lg h-10"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">
                  Tên Người Viết*
                </label>
                <Input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="rounded-lg h-10"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">
                  Hashtag*
                </label>
                <Select
                  value={hashtag}
                  onChange={(value) => setHashtag(value)}
                  className="w-full rounded-lg h-10">
                  <Option value="tin-tuc">#TinTuc</Option>
                  <Option value="su-kien">#SuKien</Option>
                  <Option value="review">#Review</Option>
                </Select>
              </div>
            </div>

            {/* NÚT HÀNH ĐỘNG - NGAY DƯỚI FORM */}
            <div className="flex justify-start gap-4 mt-6">
              <Button
                onClick={handleAdd}
                type="primary"
                className="px-6 py-1 rounded-full font-medium"
                style={{ backgroundColor: "#133e87", borderColor: "#133e87" }}>
                Thêm Bài Viết
              </Button>

              <Button
                onClick={onCancel}
                className="px-6 py-1 rounded-full font-medium"
                style={{ borderColor: "#133e87", color: "#133e87" }}>
                Hủy
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </Modal>
  );
}

export default AddPostModal;