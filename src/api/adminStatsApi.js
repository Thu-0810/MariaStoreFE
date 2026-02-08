
import axiosClient from "./axiosClient";

export const getAdminRevenueStatsApi = (params = {}) => {
  // chỉ gửi param nếu có
  const safeParams = {};
  if (params.from) safeParams.from = params.from;
  if (params.to) safeParams.to = params.to;

  return axiosClient.get("/admin/stats/revenue", { params: safeParams });
};
