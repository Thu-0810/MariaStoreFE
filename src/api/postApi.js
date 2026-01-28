// postApi.js
import axiosClient from "./axiosClient";

export const postApi = {
  list: ({ page = 0, size = 10, keyword = "" } = {}) =>
    axiosClient.get("/posts", {
      params: { page, size, keyword: keyword || undefined },
    }),

  detail: (id) => axiosClient.get(`/posts/${id}`),

  listMy: ({ page = 0, size = 10, keyword = "" } = {}) =>
    axiosClient.get("/me/posts", {
      params: { page, size, keyword: keyword || undefined },
    }),

  detailMy: (id) => axiosClient.get(`/me/posts/${id}`),

  createMy: ({ title, content, coverFile } = {}) => {
    const fd = new FormData();
    fd.append("title", title ?? "");
    if (content != null) fd.append("content", content);
    if (coverFile) fd.append("cover", coverFile);
    return axiosClient.post("/me/posts", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  updateMy: (id, { title, content, coverFile } = {}) => {
    const fd = new FormData();
    if (title != null) fd.append("title", title);
    if (content != null) fd.append("content", content);
    if (coverFile) fd.append("cover", coverFile);
    return axiosClient.put(`/me/posts/${id}`, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  deleteMy: (id) => axiosClient.delete(`/me/posts/${id}`),
};