import axiosClient from "./axiosClient";

// /api/admin/posts
export const adminPostApi = {
  create: ({ title, authorName, content, coverFile } = {}) => {
    const fd = new FormData();
    fd.append("title", title ?? "");
    fd.append("author_name", authorName ?? "");
    if (content != null) fd.append("content", content);
    if (coverFile) fd.append("cover", coverFile);

    return axiosClient.post("/admin/posts", fd);
  },

  update: (id, { title, authorName, content, coverFile } = {}) => {
    const fd = new FormData();
    if (title != null) fd.append("title", title);
    if (authorName != null) fd.append("author_name", authorName);
    if (content != null) fd.append("content", content);
    if (coverFile) fd.append("cover", coverFile);

    return axiosClient.put(`/admin/posts/${id}`, fd);
  },

  list: ({ page = 0, size = 10, keyword = "" } = {}) =>
    axiosClient.get("/admin/posts", {
      params: { page, size, keyword: keyword || undefined },
    }),

  detail: (id) => axiosClient.get(`/admin/posts/${id}`),

  remove: (id) => axiosClient.delete(`/admin/posts/${id}`),
};