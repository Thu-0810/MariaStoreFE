import axiosClient from "./axiosClient";

export const postApi = {
  // GET /api/posts?page=0&size=10&keyword=
  list: ({ page = 0, size = 10, keyword = "" } = {}) =>
    axiosClient.get("/posts", {
      params: { page, size, keyword: keyword || undefined },
    }),

  // GET /api/posts/:id
  detail: (id) => axiosClient.get(`/posts/${id}`),
};