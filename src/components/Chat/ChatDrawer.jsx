import { useEffect, useMemo, useRef, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { chatApi } from "../../api/chatApi";
import { useChatRealtime } from "../../hooks/useChatRealtime";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";

function buildChatName(conv, meId) {
  if (conv.type === "DIRECT") {
    const otherId =
      Number(conv.directUser1Id) === Number(meId)
        ? conv.directUser2Id
        : conv.directUser1Id;

    return `User #${otherId}`;
  }
  return conv.title || `${conv.type} #${conv.id}`;
}

const API_BASE = String(axiosClient.defaults.baseURL || ""); // http://localhost:8080/api
const ORIGIN = API_BASE.replace(/\/api\/?$/, ""); // http://localhost:8080

const resolveAvatarUrl = (url) => {
  if (!url) return null;
  const s = String(url);
  if (s.startsWith("http")) return s;
  if (s.startsWith("/")) return `${ORIGIN}${s}`; // /uploads/.. => http://localhost:8080/uploads/..
  return `${ORIGIN}/${s}`;
};

export default function ChatDrawer({ onAnyNewMessage, initialConversationId }) {
  const rt = useChatRealtime();
  const [me, setMe] = useState(null);

  const [conversations, setConversations] = useState([]);
  const [activeConvId, setActiveConvId] = useState(null);

  const [messagesDesc, setMessagesDesc] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadMe = async () => {
    const res = await axiosClient.get("/users/me");
    setMe(res.data);
  };

  const loadConversations = async () => {
    const list = await chatApi.listConversations();
    setConversations(list);

    if (initialConversationId) {
      setActiveConvId(Number(initialConversationId));
      return;
    }

    if (!activeConvId && list.length > 0) setActiveConvId(list[0].id);
  };

  const loadMessages = async (conversationId, p) => {
    const res = await chatApi.getMessages(conversationId, {
      page: p,
      size: 30,
    });
    const content = res.content || [];

    setMessagesDesc((prev) => (p === 0 ? content : [...prev, ...content]));
    setHasMore(!res.last);
    setPage(p);

    if (content.length > 0) {
      try {
        await chatApi.markReadRest(conversationId, content[0].id);
      } catch {}
    }
  };

  // connect ws once
  useEffect(() => {
    rt.connect();
    return () => rt.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadMe().catch(() => {});
    loadConversations().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // nếu được mở từ event
  useEffect(() => {
    if (initialConversationId) {
      setActiveConvId(Number(initialConversationId));
      loadConversations().catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialConversationId]);

  useEffect(() => {
    if (!rt.connected) return;

    rt.subscribe("queue-conversations", "/user/queue/conversations", (evt) => {
      if (evt?.type === "CONVERSATION_UPDATED") {
        loadConversations().catch(() => {});
        onAnyNewMessage?.();
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rt.connected]);

  useEffect(() => {
    if (!activeConvId) return;

    conversations.forEach((c) => rt.unsubscribe(`topic-conv-${c.id}`));

    if (rt.connected) {
      rt.subscribe(
        `topic-conv-${activeConvId}`,
        `/topic/conversations/${activeConvId}`,
        (evt) => {
          if (evt?.type === "MESSAGE_CREATED") {
            const msg = evt.data;
            setMessagesDesc((prev) => [msg, ...prev]);
            onAnyNewMessage?.();

            rt.publish("/app/chat.read", {
              conversationId: activeConvId,
              lastReadMessageId: msg.id,
            });
          }
        }
      );
    }

    loadMessages(activeConvId, 0).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeConvId, rt.connected]);

  const chats = useMemo(() => {
    return (conversations || []).map((c) => ({
      id: c.id,
      name: c.otherFullName || `User #${c.otherUserId || "?"}`,
      avatar: resolveAvatarUrl(c.otherAvatarUrl), // ✅ convert
      lastMessage: c.lastMessagePreview || "Chưa có tin nhắn",
      unreadCount: Number(c.unreadCount || 0),
      subTitle: c.type === "DIRECT" ? "Direct" : c.type,
      raw: c,
    }));
  }, [conversations]);

  const activeChat = useMemo(
    () => chats.find((x) => x.id === activeConvId) || null,
    [chats, activeConvId]
  );

  const messagesAsc = useMemo(
    () => [...messagesDesc].reverse(),
    [messagesDesc]
  );

  const onSend = (text) => {
    if (!activeConvId) return;
    if (!rt.connected) return;

    rt.publish("/app/chat.send", {
      conversationId: activeConvId,
      contentType: "TEXT",
      content: text,
      metadata: null,
      replyToMessageId: null,
    });
  };

  return (
    <div className="h-full flex bg-white">
      {/* Sidebar */}
      <div className="w-[260px] border-r border-blue-100">
        <ChatSidebar
          chats={chats}
          selectedChatId={activeConvId}
          onSelectChat={(id) => setActiveConvId(id)}
        />
      </div>

      {/* Window */}
      <div className="flex-1">
        <ChatWindow
          chat={activeChat}
          meId={me?.id}
          meAvatarUrl={resolveAvatarUrl(me?.avatarUrl)}
          messagesAsc={messagesAsc}
          onSendMessage={onSend}
        />
      </div>
    </div>
  );
}