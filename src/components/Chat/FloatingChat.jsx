
import { useEffect, useState } from "react";
import { Badge, Button } from "antd";
import { MessageOutlined, CloseOutlined, MinusOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import ChatWidget from "./ChatWidget";
import { CHAT_OPEN_EVENT } from "./chatEvents";

export default function FloatingChat() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/messages")) return null;

  const token = localStorage.getItem("accessToken");
  const userRaw = localStorage.getItem("currentUser");
  const user = userRaw ? JSON.parse(userRaw) : null;
  const role = user?.role;

  const enabled = Boolean(token) && (role === "USER" || role === "SELLER");
  if (!enabled) return null;

  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [initialConversationId, setInitialConversationId] = useState(null);

  const loadUnread = async () => {
    try {
      const res = await axiosClient.get("/notifications/unread-count");
      setUnreadCount(Number(res.data || 0));
    } catch {
    }
  };

  useEffect(() => {
    loadUnread();
    const t = setInterval(loadUnread, 15000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      const convId = e?.detail?.conversationId;
      if (convId) {
        setInitialConversationId(Number(convId));
        setOpen(true);
        setMinimized(false);
      }
    };
    window.addEventListener(CHAT_OPEN_EVENT, handler);
    return () => window.removeEventListener(CHAT_OPEN_EVENT, handler);
  }, []);

  return (
    <>
      {/* Bubble */}
      {!open && (
        <div style={{ position: "fixed", right: 18, bottom: 18, zIndex: 9999 }}>
          <Badge count={unreadCount} overflowCount={99}>
            <Button
              type="primary"
              shape="circle"
              size="large"
              icon={<MessageOutlined />}
              onClick={() => {
                setOpen(true);
                setMinimized(false);
              }}
              style={{ width: 56, height: 56 }}
            />
          </Badge>
        </div>
      )}

      {/* Mini chat widget */}
      {open && (
        <ChatWidget
          minimized={minimized}
          onMinimize={() => setMinimized(true)}
          onRestore={() => setMinimized(false)}
          onClose={() => {
            setOpen(false);
            setMinimized(false);
          }}
          unreadCount={unreadCount}
          onAnyNewMessage={loadUnread}
          initialConversationId={initialConversationId}
        />
      )}
    </>
  );
}