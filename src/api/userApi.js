import axiosClient from "./axiosClient";

export const getMyProfileApi = () => axiosClient.get("/users/me");

export const updateMyProfileApi = (data) => axiosClient.put("/users/me", data);

export const uploadMyAvatarApi = (file) => {
  const form = new FormData();
  form.append("file", file);
  return axiosClient.post("/users/me/avatar", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const changeMyPasswordApi = (data) =>
  axiosClient.put("/users/me/change-password", data);