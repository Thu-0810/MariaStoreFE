import axiosClient from "./axiosClient";

export const reviewApi = {
  getSummary(productId) {
    return axiosClient.get(`/products/${productId}/reviews/summary`);
  },
  getPreview(productId) {
    return axiosClient.get(`/products/${productId}/reviews`);
  },
  getMyReview(productId) {
    return axiosClient.get(`/products/${productId}/reviews/me`);
  },
  create(productId, payload) {
    return axiosClient.post(`/products/${productId}/reviews`, payload);
  },
  remove(productId) {
    return axiosClient.delete(`/products/${productId}/reviews`);
  },
};