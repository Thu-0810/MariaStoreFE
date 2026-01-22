import axiosClient from "./axiosClient";

export const commentApi = {
  // GET /api/posts/:postId/comments?page=0&size=10
  listByPost: (postId, { page = 0, size = 10 } = {}) =>
    axiosClient.get(`/posts/${postId}/comments`, { params: { page, size } }),

  // POST /api/posts/:postId/comments  { content }
  create: (postId, content) =>
    axiosClient.post(`/posts/${postId}/comments`, { content }),
};