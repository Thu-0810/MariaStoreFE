import axiosClient from "./axiosClient";

export const uploadProductImageApi = (productId, file, isPrimary = true) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("isPrimary", isPrimary);

  return axiosClient.post(`/products/${productId}/images`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteProductImageApi = (imageId) => {
  return axiosClient.delete(`/products/images/${imageId}`);
};

export const setPrimaryImageApi = (imageId) => {
  return axiosClient.put(`/products/images/${imageId}/primary`);
};