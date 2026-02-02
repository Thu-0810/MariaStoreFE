import axiosClient from "./axiosClient";

/**
 * Tạo commission (DRAFT)
 */
export const createCommissionApi = (data) => {
  return axiosClient.post("/commission-requests", data);
};

/**
 * Danh sách commission của user hiện tại
 */
export const getMyCommissionsApi = () => {
  return axiosClient.get("/commission-requests/my");
};

/**
 * Submit commission (thanh toán sau)
 */
export const submitCommissionApi = (id) => {
  return axiosClient.post(`/commission-requests/${id}/submit`);
};

/**
 * Checkout commission (chỉ khi APPROVED)
 */
export const checkoutCommissionApi = (id) => {
  return axiosClient.post(`/commission-requests/${id}/checkout`);
};

/**
 * Huỷ commission
 */
export const cancelCommissionApi = (id) => {
  return axiosClient.post(`/commission-requests/${id}/cancel`);
};

export const getCommissionDeliverablesApi = (id) => {
  return axiosClient.get(`/commission-requests/${id}/deliverables`);
};