import axiosClient from "./axiosClient";

export const loginApi = (data) => {
  return axiosClient.post("/auth/login", data);
};

export const registerApi = (data) => {
  return axiosClient.post("/auth/register", data);
};

export const getCurrentUserApi = () => {
  return axiosClient.get("/users/me");
};

export const forgotPasswordApi = (data) => {
  return axiosClient.post("/auth/forgot-password", data);
};

export const resetPasswordApi = (data) => {
  return axiosClient.post("/auth/reset-password", data);
};

export const verifyEmailApi = (data) => axiosClient.post("/auth/verify-email", data);