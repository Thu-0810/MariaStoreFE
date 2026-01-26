import { Badge, Button, Tooltip } from "antd";
import { CloseOutlined, MinusOutlined, MessageOutlined, ExpandOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ChatDrawer from "./ChatDrawer";

export default function ChatWidget({
  minimized,
  onMinimize,
  onRestore,
  onClose,
  unreadCount,
  onAnyNewMessage,
  initialConversationId,
}) {
  const navigate = useNavigate();

  const width = 720;
  const height = 420;

  const handleGoMessages = () => {
    navigate("/messages");
  };

  return (
    <div
      style={{
        position: "fixed",
        right: 18,
        bottom: 18,
        zIndex: 9999,
        width,
        borderRadius: 16,
        background: "white",
        boxShadow: "0 8px 30px rgba(0,0,0,0.18)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 10px 0 12px",
          borderBottom: "1px solid #eef2ff",
          background: "linear-gradient(90deg, #eef6ff, #ffffff)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Badge count={unreadCount} overflowCount={99} size="small">
            <MessageOutlined />
          </Badge>
          <span style={{ fontWeight: 700 }}>Tin Nhắn</span>
        </div>

        <div style={{ display: "flex", gap: 6 }}>
          <Tooltip title="Mở trang Tin nhắn">
            <Button size="small" icon={<ExpandOutlined />} onClick={handleGoMessages} />
          </Tooltip>

          <Button
            size="small"
            icon={<MinusOutlined />}
            onClick={minimized ? onRestore : onMinimize}
          />
          <Button size="small" danger icon={<CloseOutlined />} onClick={onClose} />
        </div>
      </div>

      {/* Body */}
      {!minimized ? (
        <div style={{ height: height - 44 }}>
          <ChatDrawer
            compact
            initialConversationId={initialConversationId}
            onAnyNewMessage={onAnyNewMessage}
          />
        </div>
      ) : (
        <div
          style={{
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 12px",
            background: "#ffffff",
          }}
        >
          <span style={{ color: "#64748b" }}>Đang thu nhỏ</span>

          <div style={{ display: "flex", gap: 8 }}>
            <Button size="small" icon={<ExpandOutlined />} onClick={handleGoMessages}>
              Mở trang
            </Button>

            <Button type="primary" size="small" onClick={onRestore}>
              Mở lại
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}