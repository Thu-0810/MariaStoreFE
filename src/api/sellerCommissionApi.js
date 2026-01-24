import axiosClient from "./axiosClient";

/**
 * Seller lấy danh sách commission đang chờ duyệt
 */
export const getPendingCommissionsApi = () => {
  return axiosClient.get("/seller/commissions");
};

/**
 * Seller duyệt commission + chỉnh giá
 */
export const approveCommissionApi = (id, finalPrice) => {
  return axiosClient.post(`/seller/commissions/${id}/approve`, {
    finalPrice,
  });
};

/**
 * Seller từ chối commission
 */
export const rejectCommissionApi = (id) => {
  return axiosClient.post(`/seller/commissions/${id}/reject`);
};