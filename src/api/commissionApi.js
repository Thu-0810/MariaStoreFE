import axiosClient from "./axiosClient";


export const getMyCommissionsApi = () => {
  return axiosClient.get("/commission-requests/my");
};

export const createCommissionApi = (payload) => {
  return axiosClient.post("/commission-requests", payload);
};

export const submitCommissionApi = (id) => {
  return axiosClient.post(`/commission-requests/${id}/submit`);
};

export const checkoutCommissionApi = (id, payload) => {
  return axiosClient.post(`/commission-requests/${id}/checkout`, payload);
};

export const cancelCommissionApi = (id) => {
  return axiosClient.post(`/commission-requests/${id}/cancel`);
};

export const updateCommissionDraftApi = (id, payload) => {
  return axiosClient.put(`/commission-requests/${id}`, payload);
};

export const getCommissionDeliverablesApi = (commissionRequestId) => {
  return axiosClient.get(`/commission-requests/${commissionRequestId}/deliverables`);
};