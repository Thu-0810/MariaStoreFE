import axiosClient from "./axiosClient";

/**
 * GET /api/orders/my
 */
export const getMyOrdersApi = (params = {}) => {
  return axiosClient.get("/orders/my", { params });
};

/**
 * GET /api/orders/my/{orderId}/items/{itemId}/download
 */
export const downloadMyOrderItemApi = (orderId, itemId) => {
  return axiosClient.get(`/orders/my/${orderId}/items/${itemId}/download`, {
    responseType: "blob",
  });
};

const downloadItem = async (orderId, itemId) => {
  try {
    const res = await downloadMyOrderItemApi(orderId, itemId);

    const blob = new Blob([res.data], { type: res.headers["content-type"] });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "download";
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  } catch (err) {
    const data = err?.response?.data;
    if (data instanceof Blob) {
      const text = await data.text();
      console.error("Download error:", err.response?.status, text);
    } else {
      console.error("Download error:", err.response?.status, data);
    }
  }
};