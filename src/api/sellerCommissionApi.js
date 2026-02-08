import axiosClient from "./axiosClient";


export const getSellerCommissionsApi = () => {
  return axiosClient.get("/seller/commissions");
};

export const getPendingCommissionsApi = () => {
  return axiosClient.get("/seller/commissions/pending");
};

export const approveCommissionApi = (id, finalPrice) => {
  return axiosClient.post(`/seller/commissions/${id}/approve`, {
    finalPrice,
  });
};

export const rejectCommissionApi = (id) => {
  return axiosClient.post(`/seller/commissions/${id}/reject`);
};

export const uploadCommissionDeliverableApi = (id, file) => {
  const formData = new FormData();
  formData.append("file", file);

  return axiosClient.post(`/seller/commissions/${id}/deliverables`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getSellerCommissionDeliverablesApi = (id) => {
  return axiosClient.get(`/seller/commissions/${id}/deliverables`);
};

export const deleteCommissionDeliverableApi = (id, deliverableId) => {
  return axiosClient.delete(
    `/seller/commissions/${id}/deliverables/${deliverableId}`
  );
};