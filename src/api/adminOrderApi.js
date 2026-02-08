import axiosClient from "./axiosClient";

export const getAdminOrdersPagedApi = (params) => {
  return axiosClient.get("/admin/orders/paged", { params });
};

export const getAdminOrderDetailApi = (id) => {
  return axiosClient.get(`/admin/orders/${id}/detail`);
};

export const updateAdminOrderApi = (id, data) => {
  return axiosClient.put(`/admin/orders/${id}`, data);
};

export const deleteAdminOrdersApi = (ids) => {
  return axiosClient.delete("/admin/orders", { data: ids });
};

export const printAdminOrderInvoiceApi = (id) => {
  return axiosClient.get(`/admin/orders/${id}/invoice`, {
    responseType: "blob",
  });
};

export const openAdminOrderInvoicePdf = async (id) => {
  const res = await printAdminOrderInvoiceApi(id);

  const blob = new Blob([res.data], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);

  window.open(url, "_blank", "noopener,noreferrer");

  setTimeout(() => window.URL.revokeObjectURL(url), 60_000);

  return true;
};