import { Layout, Typography, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ChatDrawer from "../components/Chat/ChatDrawer";

const { Content } = Layout;

export default function ChatPage() {
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh", padding: 12 }}>
      <Content style={{ background: "white", borderRadius: 12, border: "1px solid rgba(0,0,0,0.08)" }}>
        <div
          style={{
            padding: 12,
            borderBottom: "1px solid rgba(0,0,0,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
            </Button>
          </div>
        </div>

        <div style={{ padding: 12 }}>
          <ChatDrawer />
        </div>
      </Content>
    </Layout>
  );
}