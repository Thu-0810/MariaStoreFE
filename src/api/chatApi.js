
import axiosClient from "./axiosClient";

export const chatApi = {
  getOrCreateDirect: (otherUserId) =>
    axiosClient.post(`/chat/direct/${otherUserId}`).then((r) => r.data),

  listConversations: () =>
    axiosClient.get(`/chat/conversations`).then((r) => r.data),

  getMessages: (conversationId, { page = 0, size = 30 } = {}) =>
    axiosClient
      .get(`/chat/conversations/${conversationId}/messages`, { params: { page, size } })
      .then((r) => r.data),

  markReadRest: (conversationId, lastReadMessageId) =>
    axiosClient.post(`/chat/conversations/${conversationId}/read`, { lastReadMessageId }),
};