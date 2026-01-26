import { Input, Avatar, List } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";

export default function ChatSidebar({ chats, selectedChatId, onSelectChat }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return chats;
    return chats.filter((c) => (c.name || "").toLowerCase().includes(s));
  }, [chats, q]);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-blue-100 bg-white">
        <h2 className="text-lg font-bold text-gray-800 mb-3">Tin Nhắn</h2>
        <Input
          placeholder="Tìm kiếm..."
          prefix={<SearchOutlined className="text-gray-400" />}
          className="rounded-lg"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto bg-white">
        <List
          dataSource={filtered}
          renderItem={(chat) => (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`p-3 border-b border-blue-100 cursor-pointer transition-colors ${
                selectedChatId === chat.id ? "bg-blue-100" : "hover:bg-blue-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <Avatar src={chat.avatar} size={44} className="flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 truncate">
                    {chat.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {chat.lastMessage || "Chưa có tin nhắn"}
                  </p>
                </div>
                {chat.unreadCount > 0 && (
                  <span className="text-xs bg-blue-600 text-white rounded-full px-2 py-0.5">
                    {chat.unreadCount > 99 ? "99+" : chat.unreadCount}
                  </span>
                )}
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}