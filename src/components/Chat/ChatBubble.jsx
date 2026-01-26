
import { Typography } from "antd";

export default function ChatBubble({ message, isMine }) {
  return (
    <div className={`w-full flex ${isMine ? "justify-end" : "justify-start"} my-1`}>
      <div
        className={[
          "max-w-[75%] rounded-2xl px-3 py-2 border",
          isMine ? "bg-white" : "bg-white",
        ].join(" ")}
        style={{
          borderColor: "rgba(0,0,0,0.08)",
        }}
      >
        <Typography.Paragraph style={{ marginBottom: 4, whiteSpace: "pre-wrap" }}>
          {message.content}
        </Typography.Paragraph>

        <div className="text-xs opacity-60">
          #{message.id} • {new Date(message.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
}