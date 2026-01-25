import axiosClient from "./axiosClient";

/**
 * Checkout: POST /api/orders/checkout
 * req: { receiverName, receiverPhone, shippingAddress, paymentMethod }
 */
export const checkoutApi = (payload) => {
  return axiosClient.post("/orders/checkout", payload);
};

/**
 * Order summary: GET /api/orders/{orderId}
 */
export const getOrderSummaryApi = (orderId) => {
  return axiosClient.get(`/orders/${orderId}`);
};

/**
 * GET /api/payments/{orderId}/qr
 */
export const getBankQrApi = (orderId) => {
  return axiosClient.get(`/payments/${orderId}/qr`);
};

/**
 * POST /api/payments/{orderId}/confirm
 */
export const confirmBankPaidApi = (orderId) => {
  return axiosClient.post(`/payments/${orderId}/confirm`);
};

/**
 * ===== VNPAY =====
 * GET /api/payments/vnpay/{orderId}/init
 */
export const initVnpayApi = (orderId) => {
  return axiosClient.get(`/payments/vnpay/${orderId}/init`);
};

/**
 * ===== PAYPAL =====
 * GET /api/payments/paypal/{orderId}/init
 */
export const initPaypalApi = (orderId) => {
  return axiosClient.get(`/payments/paypal/${orderId}/init`);
};

/**
 * POST /api/payments/paypal/{orderId}/capture
 */
export const capturePaypalApi = (orderId) => {
  return axiosClient.post(`/payments/paypal/${orderId}/capture`);
};