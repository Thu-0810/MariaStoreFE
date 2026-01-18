export const API_BASE_URL = "http://localhost:8080/api";
export const SERVER_BASE_URL = "http://localhost:8080";

export const toServerUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${SERVER_BASE_URL}${path}`;
};