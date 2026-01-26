
import { useRef, useState } from "react";
import { createStompClient } from "../realtime/stompClient";

export function useChatRealtime() {
  const clientRef = useRef(null);
  const subsRef = useRef(new Map());
  const [connected, setConnected] = useState(false);

  const connect = () => {
    if (clientRef.current?.active) return;

    const client = createStompClient({
      debug: false,
      onConnect: () => setConnected(true),
      onStompError: (frame) => {
        console.error("STOMP error:", frame.headers?.message, frame.body);
      },
    });

    clientRef.current = client;
    client.activate();
  };

  const disconnect = () => {
    for (const sub of subsRef.current.values()) {
      try {
        sub.unsubscribe();
      } catch {}
    }
    subsRef.current.clear();

    if (clientRef.current?.active) clientRef.current.deactivate();
    clientRef.current = null;
    setConnected(false);
  };

  const subscribe = (key, destination, onMessage) => {
    if (!connected || !clientRef.current) return;
    if (subsRef.current.has(key)) return;

    const sub = clientRef.current.subscribe(destination, (msg) => {
      try {
        onMessage(JSON.parse(msg.body));
      } catch (e) {
        console.error("WS parse error:", e, msg.body);
      }
    });

    subsRef.current.set(key, sub);
  };

  const unsubscribe = (key) => {
    const sub = subsRef.current.get(key);
    if (!sub) return;
    try {
      sub.unsubscribe();
    } catch {}
    subsRef.current.delete(key);
  };

  const publish = (destination, payload) => {
    if (!connected || !clientRef.current) return;
    clientRef.current.publish({
      destination,
      body: JSON.stringify(payload),
    });
  };

  return { connected, connect, disconnect, subscribe, unsubscribe, publish };
}