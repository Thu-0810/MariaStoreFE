import axiosClient from "./axiosClient";

/**
@param {Object} params
@param {number} params.page
@param {number} params.size
@param {string} params.sort
@param {string | null} params.category
 */
export const getProductsPagedApi = (params) => {
  return axiosClient.get("/products/paged", { params });
};

/**
 * Lấy chi tiết sản phẩm theo id
 * @param {number | string} id
 */
export const getProductDetailApi = (id) => {
  return axiosClient.get(`/products/${id}/detail`);
};

/**
 * Thêm sản phẩm mới
 * @param {Object} data
 */
export const createProductApi = (data) => {
  return axiosClient.post("/products", data);
};

/**
 * Sửa sản phẩm
 * @param {number|string} id
 * @param {Object} data
 */
export const updateProductApi = (id, data) => {
  return axiosClient.put(`/products/${id}`, data);
};

/**
 * Xóa mềm nhiều sản phẩm
 * @param {number[]} ids
 */
export const softDeleteProductsApi = (ids) => {
  return axiosClient.delete("/products/batch", {
    data: { ids },
  });
};

export const lockProductsApi = (ids) => {
  return axiosClient.put("/products/lock", { ids });
};

export const unlockProductsApi = (ids) => {
  return axiosClient.put("/products/unlock", { ids });
};