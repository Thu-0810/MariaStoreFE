import axiosClient from "./axiosClient";

/**
 * GET /api/admin/users
 */
export const getAdminUsersApi = (params = {}) => {
  return axiosClient.get("/admin/users", { params });
};

/**
 * GET /api/admin/users/{id}
 */
export const getAdminUserByIdApi = (id) => {
  return axiosClient.get(`/admin/users/${id}`);
};

/**
 * PUT /api/admin/users/{id}
 */
export const updateAdminUserApi = (id, data) => {
  return axiosClient.put(`/admin/users/${id}`, data);
};

/**
 * PATCH /api/admin/users/{id}/lock
 */
export const lockAdminUserApi = (id) => {
  return axiosClient.patch(`/admin/users/${id}/lock`);
};

/**
 * PATCH /api/admin/users/{id}/unlock
 */
export const unlockAdminUserApi = (id) => {
  return axiosClient.patch(`/admin/users/${id}/unlock`);
};

/**
 * DELETE /api/admin/users/{id}
 */
export const deleteAdminUserApi = (id) => {
  return axiosClient.delete(`/admin/users/${id}`);
};

export const adminUploadUserAvatarApi = (userId, file) => {
  const form = new FormData();
  form.append("file", file);
  return axiosClient.post(`/admin/users/${userId}/avatar`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};