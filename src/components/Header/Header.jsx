import { useEffect, useState, useRef } from "react";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  GlobalOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import { useTranslation } from "react-i18next";
import { cartApi } from "../../api/cartApi";
import { BellOutlined } from "@ant-design/icons";
import { useNotificationBell } from "../../hooks/useNotificationBell";
import { Badge } from "antd";

function Header() {
  const [currentUser, setCurrentUser] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openLang, setOpenLang] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [openNoti, setOpenNoti] = useState(false);

  const {
    unreadCount,
    items: notifications,
    loading: loadingNoti,
    fetchList: fetchNotifications,
    markRead: markNotiRead,
    markAllRead: markAllNotiRead,
  } = useNotificationBell({ pollMs: 15000, pageSize: 8 });

  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  const wrapperRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) setCurrentUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target)) {
        setOpenDropdown(false);
        setOpenLang(false);
        setOpenNoti(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const fetchCartCount = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token || !currentUser || currentUser.role !== "USER") {
        setCartCount(0);
        return;
      }

      const res = await cartApi.getCart();
      const items = res.data?.items || [];
      const count = items.reduce((sum, it) => sum + (it.quantity || 0), 0);
      setCartCount(count);
    } catch {
      setCartCount(0);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, [currentUser]);

  useEffect(() => {
    const handler = () => fetchCartCount();

    window.addEventListener("cart:changed", handler);
    return () => window.removeEventListener("cart:changed", handler);
  }, [currentUser]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("accessToken");
    setCurrentUser(null);
    navigate("/dashboard");
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lng", lng);
    setOpenLang(false);
  };

  const currentLangLabel =
    i18n.language === "en" ? t("header.english") : t("header.vietnamese");

  const resolveNotiRoute = (n) => {
    switch (n.type) {
      case "PAYMENT_PAID":
      case "PAYMENT_FAILED":
      case "ORDER_CREATED":
      case "ORDER_STATUS_CHANGED":
        return "/my-profile/orders";

      case "COMMISSION_NEW_REQUEST":
      case "COMMISSION_STATUS_CHANGED":
        return "/my-profile/requests";

      default:
        return n.url || "/my-profile";
    }
  };

  const parseNotiData = (n) => {
    if (!n?.data) return null;
    try {
      return typeof n.data === "string" ? JSON.parse(n.data) : n.data;
    } catch {
      return null;
    }
  };

  return (
    <header className="bg-[#d9eafd] relative">
      <div className="max-w-7xl mx-auto px-4 py-3" ref={wrapperRef}>
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => {
              if (!currentUser) navigate("/dashboard");
              else {
                switch (currentUser.role) {
                  case "ADMIN":
                    navigate("/admin-dashboard");
                    break;
                  case "SELLER":
                    navigate("/seller-dashboard");
                    break;
                  default:
                    navigate("/dashboard");
                }
              }
            }}>
            <img
              src={logo || "/placeholder.svg"}
              alt="MariaStore Logo"
              className="w-15 h-15 object-cover rounded-full"
            />
            <span className="text-[#133e87] font-bold text-xl">MariaStore</span>
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder={t("header.search_placeholder")}
                className="flex-1 pl-4 pr-12 py-2 bg-white border border-[#d1d1d1] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#133e87] focus:border-transparent"
              />
              <SearchOutlined className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#888888]" />
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-[#193a80] font-medium relative">
            {currentUser?.role === "USER" && (
              <div className="flex items-center gap-6">
                {/* NOTIFICATIONS */}
                <div className="relative">
                  <div
                    className="relative flex items-center gap-2 cursor-pointer select-none group p-2 rounded-lg transition-all duration-200 hover:bg-blue-50"
                    onClick={async () => {
                      const next = !openNoti;
                      setOpenNoti(next);
                      if (next) await fetchNotifications();
                    }}>
                    <div className="relative">
                      <BellOutlined className="text-lg group-hover:text-[#0052cc] transition-colors" />
                      {unreadCount > 0 && (
                        <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
                          {unreadCount > 99 ? "99+" : unreadCount}
                        </span>
                      )}
                    </div>
                    <span className="group-hover:text-[#0052cc] transition-colors">
                      {t("header.notifications")}
                    </span>
                  </div>

                  {openNoti && (
                    <div className="absolute right-0 mt-3 w-96 bg-white shadow-2xl rounded-2xl overflow-hidden z-50 border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
                      {/* Header */}
                      <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-[#f8fbff] to-white">
                        <div>
                          <h3 className="font-bold text-[#133e87] text-base">
                            {t("header.notifications") || "Thông báo"}
                          </h3>
                          {unreadCount > 0 && (
                            <p className="text-xs text-gray-500 mt-1">
                              {t("header.unread_count", { count: unreadCount })}
                            </p>
                          )}
                        </div>
                        {unreadCount > 0 && (
                          <button
                            className="text-xs font-semibold text-[#0052cc] hover:text-[#003a99] transition-colors px-3 py-1 hover:bg-blue-50 rounded-md"
                            onClick={async () => {
                              await markAllNotiRead();
                            }}>
                            {t("header.read_all")}
                          </button>
                        )}
                      </div>

                      {/* Content */}
                      <div className="max-h-[480px] overflow-y-auto">
                        {loadingNoti ? (
                          <div className="px-6 py-12 flex flex-col items-center justify-center text-center">
                            <div className="w-10 h-10 border-3 border-gray-200 border-t-[#133e87] rounded-full animate-spin mb-3"></div>
                            <p className="text-sm text-gray-500">
                              {t("header.loading_notifications")}
                            </p>
                          </div>
                        ) : notifications.length === 0 ? (
                          <div className="px-6 py-12 flex flex-col items-center justify-center text-center">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                              <BellOutlined className="text-xl text-gray-400" />
                            </div>
                            <p className="text-sm font-medium text-gray-700">
                              {t("header.no_notifications")}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {t("header.no_notifications_hint")}
                            </p>
                          </div>
                        ) : (
                          <div className="divide-y divide-gray-100">
                            {notifications.map((n) => (
                              <div
                                key={n.id}
                                className={`px-6 py-4 cursor-pointer transition-all duration-150 hover:bg-blue-50 ${
                                  n.read
                                    ? "bg-white"
                                    : "bg-blue-50 border-l-4 border-[#0052cc]"
                                }`}
                                onClick={async () => {
                                  if (!n.read) await markNotiRead(n.id);

                                  if (n.type === "CHAT_MESSAGE") {
                                    const data = parseNotiData(n);
                                    const convId = Number(data?.conversationId);

                                    setOpenNoti(false);

                                    if (Number.isFinite(convId) && convId > 0) {
                                      window.dispatchEvent(
                                        new CustomEvent("chat:open", {
                                          detail: { conversationId: convId },
                                        })
                                      );
                                      return;
                                    }
                                    return;
                                  }

                                  setOpenNoti(false);
                                  navigate(resolveNotiRoute(n));
                                }}>
                                <div className="flex items-start gap-3">
                                  {!n.read && (
                                    <div className="w-2 h-2 bg-[#0052cc] rounded-full mt-2 flex-shrink-0"></div>
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-[#133e87] text-sm line-clamp-1">
                                      {n.title}
                                    </h4>
                                    {n.body && (
                                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                        {n.body}
                                      </p>
                                    )}
                                    <time className="text-xs text-gray-500 mt-2 block">
                                      {new Date(n.createdAt).toLocaleString(
                                        "vi-VN",
                                        {
                                          year: "numeric",
                                          month: "2-digit",
                                          day: "2-digit",
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        }
                                      )}
                                    </time>
                                  </div>
                                  {!n.read && (
                                    <div className="w-1.5 h-1.5 bg-[#0052cc] rounded-full flex-shrink-0 mt-2"></div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Footer */}
                      {notifications.length > 0 && (
                        <div className="px-6 py-3 border-t border-gray-100 bg-gray-50 text-center">
                          <button
                            className="text-sm font-semibold text-[#0052cc] hover:text-[#003a99] transition-colors"
                            onClick={() => {
                              setOpenNoti(false);
                              navigate("/my-profile/notifications");
                            }}>
                            {t("header.view_all_notifications")}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* CART */}
                <div
                  className="relative flex items-center gap-2 cursor-pointer"
                  onClick={() => navigate("/cart")}>
                  <ShoppingCartOutlined />

                  <span className="relative">
                    {t("header.cart")}
                    {cartCount > 0 && (
                      <span
                        className="
              absolute -top-2 -right-4
              min-w-[18px] h-[18px]
              px-1
              rounded-full
              bg-[#193a80] text-white
              text-[10px] leading-[18px]
              font-semibold text-center
            ">
                        {cartCount > 99 ? "99+" : cartCount}
                      </span>
                    )}
                  </span>
                </div>
              </div>
            )}

            <div className="relative">
              <div
                className="flex items-center gap-1 cursor-pointer select-none"
                onClick={() => setOpenLang((v) => !v)}>
                <GlobalOutlined />
                <span>{currentLangLabel}</span>
                <DownOutlined className="text-xs" />
              </div>

              {openLang && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-xl overflow-hidden z-50">
                  <ul className="text-[#133e87] font-medium">
                    <li
                      className="px-4 py-2 hover:bg-[#f0f4ff] cursor-pointer"
                      onClick={() => changeLanguage("vi")}>
                      {t("header.vietnamese")}
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-[#f0f4ff] cursor-pointer"
                      onClick={() => changeLanguage("en")}>
                      {t("header.english")}
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {currentUser ? (
              <div className="relative">
                <button
                  className="flex items-center gap-2 bg-[#133e87] text-white px-4 py-2 rounded-full"
                  onClick={() => setOpenDropdown(!openDropdown)}>
                  <UserOutlined />
                  <span className="uppercase font-semibold">
                    {currentUser.name ||
                      `${currentUser.firstName || ""} ${
                        currentUser.lastName || ""
                      }`.trim() ||
                      currentUser.email}
                  </span>
                  <DownOutlined />
                </button>

                {openDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl overflow-hidden z-50">
                    <ul className="text-[#133e87] font-medium">
                      {currentUser.role === "ADMIN" ? (
                        <li
                          className="px-4 py-2 text-red-600 hover:bg-[#fbeaea] cursor-pointer"
                          onClick={handleLogout}>
                          {t("header.logout")}
                        </li>
                      ) : (
                        <>
                          <li
                            className="px-4 py-2 hover:bg-[#f0f4ff] cursor-pointer"
                            onClick={() => {
                              navigate("/my-profile");
                              setOpenDropdown(false);
                            }}>
                            {t("header.account")}
                          </li>
                          <li
                            className="px-4 py-2 hover:bg-[#f0f4ff] cursor-pointer"
                            onClick={() => {
                              navigate("/my-profile/requests");
                              setOpenDropdown(false);
                            }}>
                            {t("header.requests")}
                          </li>
                          <li
                            className="px-4 py-2 hover:bg-[#f0f4ff] cursor-pointer"
                            onClick={() => {
                              navigate("/my-profile/orders");
                              setOpenDropdown(false);
                            }}>
                            {t("header.orders")}
                          </li>
                          <li
                            className="px-4 py-2 hover:bg-[#f0f4ff] cursor-pointer"
                            onClick={() => {
                              navigate("/my-profile/favorites");
                              setOpenDropdown(false);
                            }}>
                            {t("header.favorite_products")}
                          </li>
                          <li
                            className="px-4 py-2 hover:bg-[#f0f4ff] cursor-pointer"
                            onClick={() => {
                              navigate("/my-profile/posts");
                              setOpenDropdown(false);
                            }}>
                            {t("header.posts")}
                          </li>
                          <hr />
                          <li
                            className="px-4 py-2 text-red-600 hover:bg-[#fbeaea] cursor-pointer"
                            onClick={handleLogout}>
                            {t("header.logout")}
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => navigate("/register")}>
                  <UserOutlined />
                  <span>{t("header.register")}</span>
                </div>
                <span
                  className="pl-4 border-l border-[#193a80] cursor-pointer"
                  onClick={() => navigate("/login")}>
                  {t("header.login")}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;