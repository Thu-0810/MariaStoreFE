import { useEffect, useState } from "react";
import {
  getNotifications,
  getUnreadCount,
  markAllNotificationsRead,
  markNotificationRead,
} from "../api/notificationApi";

export function useNotificationBell({ pollMs = 15000, pageSize = 8 } = {}) {
  const [unreadCount, setUnreadCount] = useState(0);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const refreshCount = async () => {
    try {
      const c = await getUnreadCount();
      setUnreadCount(Number(c) || 0);
    } catch {
      setUnreadCount(0);
    }
  };

  const fetchList = async () => {
    setLoading(true);
    try {
      const page = await getNotifications({ page: 0, size: pageSize });
      setItems(page.content || []);
    } finally {
      setLoading(false);
    }
  };

  const markRead = async (id) => {
    await markNotificationRead(id);
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setUnreadCount((c) => (c > 0 ? c - 1 : 0));
  };

  const markAllRead = async () => {
    await markAllNotificationsRead();
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  useEffect(() => {
    refreshCount();
    const t = setInterval(refreshCount, pollMs);
    return () => clearInterval(t);
  }, [pollMs]);

  return {
    unreadCount,
    items,
    loading,
    refreshCount,
    fetchList,
    markRead,
    markAllRead,
  };
}