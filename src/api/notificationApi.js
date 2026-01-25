import axiosClient from "./axiosClient";

/**
 * GET /notifications
 * @param {Object} params
 * @param {number} params.page
 * @param {number} params.size
 * @param {boolean|null} params.unread
 */
export async function getNotifications({
  page = 0,
  size = 20,
  unread = null,
} = {}) {
  const params = { page, size };
  if (unread !== null) params.unread = unread;

  const { data } = await axiosClient.get("/notifications", { params });
  return data;
}

/**
 * GET /notifications/unread-count
 */
export async function getUnreadCount() {
  const { data } = await axiosClient.get("/notifications/unread-count");
  return data;
}

/**
 * POST /notifications/:id/read
 */
export async function markNotificationRead(id) {
  await axiosClient.post(`/notifications/${id}/read`);
}

/**
 * POST /notifications/read-all
 * @returns {number}
 */
export async function markAllNotificationsRead() {
  const { data } = await axiosClient.post("/notifications/read-all");
  return data;
}