import axiosClient from "../api/axiosClient";

const API_BASE = String(axiosClient.defaults.baseURL || "");
const ORIGIN = API_BASE.replace(/\/api\/?$/, "");

export const resolveMediaUrl = (url) => {
  if (!url) return null;
  const s = String(url);
  if (s.startsWith("http")) return s;
  if (s.startsWith("/")) return `${ORIGIN}${s}`;
  return `${ORIGIN}/${s}`;
};