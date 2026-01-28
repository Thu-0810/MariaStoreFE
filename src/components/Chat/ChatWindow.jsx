import { useRef, useEffect, useMemo, useState } from "react";
import { Avatar, Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";

function formatTime(ts) {
  try {
    return new Date(ts).toLocaleString();
  } catch {
    return "";
  }
}

const toAvatarSrc = (url, fallback = null) => {
  if (!url) return fallback;
  if (String(url).startsWith("http")) return url;
  return `http://localhost:8080${url}`;
};

export default function ChatWindow({
  chat,
  meId,
  meAvatarUrl,
  messagesAsc,
  onSendMessage,
}) {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesAsc]);

  useEffect(() => {
    setInputValue("");
  }, [chat?.id]);

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text || !chat) return;
    onSendMessage(text);
    setInputValue("");
  };

  if (!chat) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500 bg-white">
        <p>Chọn một cuộc trò chuyện</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Chat Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-white">
        <Avatar src={chat.avatar} size={40} />
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-gray-800 truncate">
            {chat.name}
          </h3>
          <p className="text-xs text-gray-500 truncate">
            {chat.subTitle || ""}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
        {messagesAsc.map((m) => {
          const isMine =
            meId != null &&
            m.senderUserId != null &&
            Number(m.senderUserId) === Number(meId);

          const avatar = isMine
            ? toAvatarSrc(meAvatarUrl, null)
            : toAvatarSrc(chat?.avatar, null);

          return (
            <div
              key={m.id}
              className={`flex items-end gap-2 ${
                isMine ? "justify-end" : "justify-start"
              }`}>
              {!isMine && <Avatar src={avatar} size={32} />}

              <div
                className={`max-w-[80%] lg:max-w-[65%] px-4 py-2 rounded-lg ${
                  isMine
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}>
                <p className="break-words whitespace-pre-wrap">{m.content}</p>
                <p
                  className={`text-xs mt-1 ${
                    isMine ? "text-blue-100" : "text-gray-500"
                  }`}>
                  {formatTime(m.createdAt)}
                </p>
              </div>

              {isMine && <Avatar src={avatar} size={32} />}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex gap-3">
          <Input
            placeholder="Nhập tin nhắn..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={onKeyDown}
            className="flex-1 rounded-lg"
            size="large"
          />
          <Button
            type="primary"
            size="large"
            onClick={handleSend}
            className="rounded-lg"
            icon={<SendOutlined />}>
            Gửi
          </Button>
        </div>
      </div>
    </div>
  );
}