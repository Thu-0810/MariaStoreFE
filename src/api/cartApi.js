import axiosClient from "./axiosClient";

export const cartApi = {
  getCart() {
    return axiosClient.get("/cart");
  },

  addToCart(productId, quantity = 1) {
    return axiosClient.post("/cart/items", { productId, quantity });
  },

  updateQuantity(productId, quantity) {
    return axiosClient.patch(`/cart/items/${productId}`, { quantity });
  },

  removeItem(productId) {
    return axiosClient.delete(`/cart/items/${productId}`);
  },
};