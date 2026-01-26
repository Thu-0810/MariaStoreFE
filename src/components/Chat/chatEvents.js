export const CHAT_OPEN_EVENT = "chat:open";

export function openChatWithConversation(conversationId) {
  window.dispatchEvent(
    new CustomEvent(CHAT_OPEN_EVENT, { detail: { conversationId } })
  );
}