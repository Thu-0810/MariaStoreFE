import axiosClient from "./axiosClient";

export const favoriteApi = {
  // POST /api/products/{productId}/favorite
  like(productId) {
    return axiosClient.post(`/products/${productId}/favorite`);
  },

  // DELETE /api/products/{productId}/favorite
  unlike(productId) {
    return axiosClient.delete(`/products/${productId}/favorite`);
  },

  // GET /api/products/favorites/me  (đúng theo controller mình đưa)
  getMyFavorites() {
    return axiosClient.get(`/products/favorites/me`);
  },

};