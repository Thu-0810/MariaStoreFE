import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card } from "antd";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { getProductsPagedApi } from "../../api/productApi";
import { getAdminUsersApi } from "../../api/adminUserApi";
import { adminPostApi } from "../../api/adminPostApi";
import { getAdminOrdersPagedApi } from "../../api/adminOrderApi";
import { getAdminRevenueStatsApi } from "../../api/adminStatsApi";

const toMonthKey = (monthIndex0) => `adminHome.month.m${monthIndex0 + 1}`;

const safeNumber = (v) => {
  const n = typeof v === "string" ? Number(v) : Number(v);
  return Number.isFinite(n) ? n : 0;
};

const formatCurrencyVND = (value) => {
  const n = safeNumber(value);
  return `${n.toLocaleString("vi-VN")}đ`;
};

const fetchAllPaged = async (fetchPage, { pageSize = 100 } = {}) => {
  let page = 0;
  let all = [];

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const res = await fetchPage({ page, size: pageSize });
    const data = res?.data;
    const content = Array.isArray(data?.content) ? data.content : [];
    all = all.concat(content);

    if (data?.last === true) break;

    page += 1;
    if (page > 1000) break;
  }

  return all;
};

const sumCompletedByMonth = (orders, year) => {
  const months = Array.from({ length: 12 }, () => 0);

  for (const o of orders) {
    if (o?.status !== "COMPLETED") continue;

    const dt = new Date(o.createdAt);
    if (Number.isNaN(dt.getTime())) continue;
    if (dt.getFullYear() !== year) continue;

    const m = dt.getMonth();
    months[m] += safeNumber(o.totalAmount);
  }

  return months;
};

const sumCompletedByPaymentMethod = (orders, { labelMap }) => {
  const map = new Map();
  for (const o of orders) {
    if (o?.status !== "COMPLETED") continue;
    const method = o?.paymentMethod ?? "UNKNOWN";
    const prev = map.get(method) ?? 0;
    map.set(method, prev + safeNumber(o.totalAmount));
  }

  const arr = Array.from(map.entries()).map(([key, value]) => ({
    key,
    name: labelMap[key] ?? key,
    value,
  }));

  arr.sort((a, b) => b.value - a.value);

  return arr;
};

const countProductsByCategory = (products) => {
  const map = new Map();
  for (const p of products) {
    const cats = Array.isArray(p?.categories) ? p.categories : [];
    for (const c of cats) {
      map.set(c, (map.get(c) ?? 0) + 1);
    }
  }

  const arr = Array.from(map.entries()).map(([name, value]) => ({
    name,
    value,
  }));
  arr.sort((a, b) => b.value - a.value);
  return arr;
};

const takeTop = (arr, n) => (arr.length > n ? arr.slice(0, n) : arr);

function AdminHomeContainer() {
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState("thisYear");

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalPosts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [loadingStats, setLoadingStats] = useState(false);

  const [ordersAll, setOrdersAll] = useState([]);
  const [productsAll, setProductsAll] = useState([]);
  const [loadingCharts, setLoadingCharts] = useState(false);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      try {
        setLoadingStats(true);

        const [productsRes, usersRes, postsRes, ordersRes, revenueRes] =
          await Promise.all([
            getProductsPagedApi({
              page: 0,
              size: 1,
              sort: "id,desc",
              category: null,
            }),
            getAdminUsersApi({ page: 0, size: 1 }),
            adminPostApi.list({ page: 0, size: 1, keyword: "" }),
            getAdminOrdersPagedApi({ page: 0, size: 1 }),
            getAdminRevenueStatsApi(),
          ]);

        if (!mounted) return;

        setStats({
          totalProducts: safeNumber(productsRes?.data?.totalElements),
          totalUsers: safeNumber(usersRes?.data?.totalElements),
          totalPosts: safeNumber(postsRes?.data?.totalElements),
          totalOrders: safeNumber(ordersRes?.data?.totalElements),
          totalRevenue: safeNumber(revenueRes?.data?.totalRevenue),
        });
      } catch (e) {
        if (!mounted) return;
        setStats({
          totalProducts: 0,
          totalUsers: 0,
          totalPosts: 0,
          totalOrders: 0,
          totalRevenue: 0,
        });
      } finally {
        if (mounted) setLoadingStats(false);
      }
    };

    run();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      try {
        setLoadingCharts(true);

        const [allOrders, allProducts] = await Promise.all([
          fetchAllPaged((p) => getAdminOrdersPagedApi(p), { pageSize: 100 }),
          fetchAllPaged(
            (p) =>
              getProductsPagedApi({
                page: p.page,
                size: p.size,
                sort: "id,desc",
                category: null,
              }),
            { pageSize: 100 }
          ),
        ]);

        if (!mounted) return;
        setOrdersAll(allOrders);
        setProductsAll(allProducts);
      } catch (e) {
        if (!mounted) return;
        setOrdersAll([]);
        setProductsAll([]);
      } finally {
        if (mounted) setLoadingCharts(false);
      }
    };

    run();
    return () => {
      mounted = false;
    };
  }, []);

  const now = new Date();
  const thisYear = now.getFullYear();
  const lastYear = thisYear - 1;

  const revenueData = useMemo(() => {
    const thisMonths = sumCompletedByMonth(ordersAll, thisYear);
    const lastMonths = sumCompletedByMonth(ordersAll, lastYear);

    return Array.from({ length: 12 }).map((_, idx) => ({
      monthKey: toMonthKey(idx),
      thisYear: thisMonths[idx],
      lastYear: lastMonths[idx],
    }));
  }, [ordersAll, thisYear, lastYear]);

  const revenueDataI18n = useMemo(() => {
    return revenueData.map((d) => ({
      ...d,
      month: t(d.monthKey),
    }));
  }, [revenueData, t]);

  const paymentLabelMap = useMemo(
    () => ({
      PAYPAL: "Paypal",
      VNPAY: "VNPay",
      BANK_QR: t("adminHome.payment.bank_qr") || "Bank QR",
      UNKNOWN: t("adminHome.payment.unknown") || "Unknown",
    }),
    [t]
  );

  const normalizePaymentMethod = (method) => {
    const m = String(method ?? "").toUpperCase().trim();
  
    if (
      m === "BANK" ||
      m === "BANK_QR" ||
      m === "BANKTRANSFER" ||
      m === "BANK_TRANSFER" ||
      m === "TRANSFER" ||
      m === "ATM" ||
      m === "QR" ||
      m === "VNQR"
    ) {
      return "BANK";
    }
  
    if (m === "PAYPAL") return "PAYPAL";
    if (m === "VNPAY") return "VNPAY";
  
    return "UNKNOWN";
  };
  
  const sumCompletedBy3PaymentMethods = (orders) => {
    const map = new Map([["BANK", 0], ["PAYPAL", 0], ["VNPAY", 0]]);
  
    for (const o of orders) {
      if (o?.status !== "COMPLETED") continue;
  
      const key = normalizePaymentMethod(o?.paymentMethod);
      if (key === "UNKNOWN") continue;
  
      map.set(key, (map.get(key) ?? 0) + Number(o.totalAmount ?? 0));
    }
  
    return [
      { key: "BANK", name: "Bank", value: map.get("BANK") ?? 0, color: "#ffd09b" },
      { key: "PAYPAL", name: "Paypal", value: map.get("PAYPAL") ?? 0, color: "#96e2d6" },
      { key: "VNPAY", name: "VNPay", value: map.get("VNPAY") ?? 0, color: "#92bfff" },
    ].filter((x) => x.value > 0);
  };
  

  const paymentData = useMemo(() => {
    return sumCompletedBy3PaymentMethods(ordersAll);
  }, [ordersAll]);
  

  const categoryData = useMemo(() => {
    const rows = countProductsByCategory(productsAll);
    return takeTop(rows, 12);
  }, [productsAll]);

  const deviceData = useMemo(
    () => [
      { name: "Windows", value: 20 },
      { name: "Android", value: 9 },
      { name: "iOS", value: 6 },
    ],
    []
  );

  const statCards = useMemo(
    () => [
      {
        title: t("adminHome.cards.total_products"),
        value: loadingStats ? "..." : String(stats.totalProducts),
        color: "#d9eafd",
      },
      {
        title: t("adminHome.cards.total_users"),
        value: loadingStats ? "..." : String(stats.totalUsers),
        color: "#fdf6eb",
      },
      {
        title: t("adminHome.cards.total_posts"),
        value: loadingStats ? "..." : String(stats.totalPosts),
        color: "#d9eafd",
      },
      {
        title: t("adminHome.cards.total_orders"),
        value: loadingStats ? "..." : String(stats.totalOrders),
        color: "#fdf6eb",
      },
      {
        title: t("adminHome.cards.total_revenue"),
        value: loadingStats ? "..." : formatCurrencyVND(stats.totalRevenue),
        color: "#d9eafd",
      },
    ],
    [loadingStats, stats, t]
  );

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('src/assets/img/Illustration265.jpg')",
      }}>
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[3px]" />
      <div className="relative z-10 container mx-auto px-6 py-10">
        {/* ===== 5 cards ===== */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10"
          initial="hidden"
          animate="visible">
          {statCards.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              custom={i}
              whileHover={{ scale: 1.05 }}
              className="transform transition-all duration-300">
              <Card
                className="rounded-2xl shadow-lg border-0 text-center"
                style={{
                  backgroundColor: `${item.color}CC`,
                  backdropFilter: "blur(8px)",
                }}>
                <p className="text-sm text-[#133e87] mb-2 font-medium">
                  {item.title}
                </p>
                <p className="text-3xl font-bold text-[#133e87]">
                  {item.value}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* ===== Charts ===== */}
        <motion.div
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border-0 p-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}>
          {/* Revenue line chart (real from orders) */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h3 className="text-[#133e87] font-semibold text-lg">
                  {t("adminHome.charts.revenue_title")}
                </h3>
                {loadingCharts && (
                  <span className="text-xs text-gray-500">
                    {t("common.loading") || "Loading..."}
                  </span>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedPeriod("thisYear")}
                  className={`text-sm transition ${
                    selectedPeriod === "thisYear"
                      ? "text-[#133e87] font-semibold"
                      : "text-gray-400 hover:text-[#133e87]"
                  }`}>
                  {t("adminHome.period.this_year")}
                </button>
                <button
                  onClick={() => setSelectedPeriod("lastYear")}
                  className={`text-sm transition ${
                    selectedPeriod === "lastYear"
                      ? "text-[#133e87] font-semibold"
                      : "text-gray-400 hover:text-[#133e87]"
                  }`}>
                  {t("adminHome.period.last_year")}
                </button>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={revenueDataI18n}
                margin={{ top: 10, right: 20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

                <XAxis dataKey="month" stroke="#bcbcbc" />

                <YAxis
                  stroke="#bcbcbc"
                  width={70}
                  tickMargin={8}
                  tickFormatter={(v) => (v / 1_000_000).toLocaleString("vi-VN")}
                />

                <Tooltip
                  formatter={(value) => [
                    formatCurrencyVND(value),
                    t("adminHome.tooltip.revenue"),
                  ]}
                />

                <Line
                  type="monotone"
                  dataKey={
                    selectedPeriod === "thisYear" ? "thisYear" : "lastYear"
                  }
                  stroke="#608bc1"
                  strokeWidth={3}
                  dot={{ fill: "#608bc1", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Device + Payment */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}>
            {/* Device (mock) */}
            <div>
              <h3 className="text-[#133e87] font-semibold mb-4">
                {t("adminHome.charts.device_title")}
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={deviceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f6f6f6" />
                  <XAxis dataKey="name" stroke="#bcbcbc" />
                  <YAxis stroke="#bcbcbc" />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "none",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    }}
                    formatter={(value) => [
                      `${value} ${t("adminHome.tooltip.turns_suffix")}`,
                      t("adminHome.tooltip.quantity"),
                    ]}
                  />
                  <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                    <Cell fill="#92bfff" />
                    <Cell fill="#96e2d6" />
                    <Cell fill="#9f9ff8" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Payment (real from orders) */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-[#133e87] font-semibold">
                  {t("adminHome.charts.payment_title")}
                </h3>
                {loadingCharts && (
                  <span className="text-xs text-gray-500">
                    {t("common.loading") || "Loading..."}
                  </span>
                )}
              </div>

              <div className="flex justify-center items-center">
                <ResponsiveContainer width="70%" height={300}>
                  <PieChart>
                    <Pie
                      data={paymentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value">
                      {paymentData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>

                    <Tooltip
                      cursor={{ fill: "transparent" }}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "none",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      }}
                      formatter={(value, name) => [
                        formatCurrencyVND(value),
                        name,
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>

                <div className="ml-6">
                  {paymentData.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 mb-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-[#404040]">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Category (real from products) */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}>
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-[#133e87] font-semibold">
                {t("adminHome.charts.category_title")}
              </h3>
              {loadingCharts && (
                <span className="text-xs text-gray-500">
                  {t("common.loading") || "Loading..."}
                </span>
              )}
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f6f6f6" />
                <XAxis dataKey="name" stroke="#bcbcbc" />
                <YAxis stroke="#bcbcbc" />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "none",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}
                  formatter={(value, name) => [
                    `${value} ${
                      t("adminHome.tooltip.products_suffix") || ""
                    }`.trim(),
                    name,
                  ]}
                />
                <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                  {/* màu lặp vòng cho đẹp */}
                  {categoryData.map((_, idx) => {
                    const colors = [
                      "#92bfff",
                      "#96e2d6",
                      "#9f9ff8",
                      "#ffd09b",
                      "#ff7383",
                      "#608bc1",
                    ];
                    return (
                      <Cell key={idx} fill={colors[idx % colors.length]} />
                    );
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default AdminHomeContainer;