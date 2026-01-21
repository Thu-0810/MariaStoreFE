import axiosClient from "./axiosClient";

export const uploadProductDigitalApi = (productId, file) => {
  const formData = new FormData();
  formData.append("file", file);

  return axiosClient.post(
    `/admin/products/${productId}/digital-file`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};