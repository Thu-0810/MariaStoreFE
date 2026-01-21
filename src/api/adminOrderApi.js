import axiosClient from "./axiosClient";

/**
 * GET /api/admin/orders/paged
 */
export const getAdminOrdersPagedApi = (params) => {
  return axiosClient.get("/admin/orders/paged", { params });
};

/**
 * GET /api/admin/orders/{id}/detail
 */
export const getAdminOrderDetailApi = (id) => {
  return axiosClient.get(`/admin/orders/${id}/detail`);
};

/**
 * PUT /api/admin/orders/{id}
 */
export const updateAdminOrderApi = (id, data) => {
  return axiosClient.put(`/admin/orders/${id}`, data);
};

/**
 * DELETE /api/admin/orders */
export const deleteAdminOrdersApi = (ids) => {
  return axiosClient.delete("/admin/orders", { data: ids });
};

/**
 * (Optional) GET /api/admin/orders/{id}/invoice
 */
export const printAdminOrderInvoiceApi = (id) => {
  return axiosClient.get(`/admin/orders/${id}/invoice`, {
    responseType: "blob",
  });
};