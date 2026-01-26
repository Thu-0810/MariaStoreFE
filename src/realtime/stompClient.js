import { Client } from "@stomp/stompjs";

export function createStompClient({ onConnect, onStompError, debug = false } = {}) {
  const token = localStorage.getItem("accessToken");

  const client = new Client();
  client.brokerURL = "ws://localhost:8080/ws";
  client.reconnectDelay = 3000;
  client.heartbeatIncoming = 10000;
  client.heartbeatOutgoing = 10000;

  client.connectHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  client.debug = debug ? (str) => console.log("[STOMP]", str) : () => {};

  client.onConnect = onConnect;
  client.onStompError = onStompError;

  return client;
}