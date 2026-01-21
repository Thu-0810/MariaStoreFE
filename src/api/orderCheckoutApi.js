import axiosClient from "./axiosClient";

export const checkoutApi = {
  createOrderFromCart: (data) => axiosClient.post("/orders/checkout", data),
  getOrderSummary: (orderId) => axiosClient.get(`/orders/${orderId}`),
};

export const paymentApi = {
  getQr: (orderId) => axiosClient.get(`/payments/${orderId}/qr`),
  confirmPaid: (orderId) => axiosClient.post(`/payments/${orderId}/confirm`),
};