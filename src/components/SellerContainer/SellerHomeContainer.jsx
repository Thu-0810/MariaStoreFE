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
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const revenueData = [
  { monthKey: "adminHome.month.m1", thisYear: 10, lastYear: 8 },
  { monthKey: "adminHome.month.m2", thisYear: 8, lastYear: 12 },
  { monthKey: "adminHome.month.m3", thisYear: 12, lastYear: 10 },
  { monthKey: "adminHome.month.m4", thisYear: 15, lastYear: 14 },
  { monthKey: "adminHome.month.m5", thisYear: 22, lastYear: 18 },
  { monthKey: "adminHome.month.m6", thisYear: 28, lastYear: 25 },
  { monthKey: "adminHome.month.m7", thisYear: 18, lastYear: 20 },
  { monthKey: "adminHome.month.m8", thisYear: 20, lastYear: 22 },
  { monthKey: "adminHome.month.m9", thisYear: 25, lastYear: 24 },
];

const deviceData = [
  { name: "Windows", value: 20 },
  { name: "Android", value: 9 },
  { name: "iOS", value: 6 },
];

const paymentData = [
  { name: "Paypal", value: 33, color: "#96e2d6" },
  { name: "VNPay", value: 54, color: "#92bfff" },
  { name: "Tài khoản ngân hàng", value: 13, color: "#ffd09b" },
];

const categoryData = [
  { name: "Nghệ đạn", value: 5 },
  { name: "Chibi", value: 3 },
  { name: "Ảnh động", value: 2 },
  { name: "Bảo mật & bảo vệ", value: 3.5 },
  { name: "Tranh phân dụng", value: 5 },
  { name: "Avatar 2D", value: 1.5 },
];

function SellerHomeContainer() {
  const [selectedPeriod, setSelectedPeriod] = useState("thisYear");
  const { t } = useTranslation();

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  const revenueDataI18n = revenueData.map((d) => ({
    ...d,
    month: t(d.monthKey),
  }));

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('src/assets/img/Illustration265.jpg')",
      }}>
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[3px]" />
      <div className="relative z-10 container mx-auto px-6 py-10">
        {/* Thẻ thống kê */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
          initial="hidden"
          animate="visible">
          {[
            {
              title: t("adminHome.cards.revenue_today"),
              value: "9,999,999đ",
              color: "#d9eafd",
            },
            {
              title: t("adminHome.cards.orders_today"),
              value: "100",
              color: "#fdf6eb",
            },
            {
              title: t("adminHome.cards.total_customers"),
              value: "1000",
              color: "#d9eafd",
            },
            {
              title: t("adminHome.cards.new_customers_today"),
              value: "100",
              color: "#fdf6eb",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
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

        {/* Biểu đồ chính */}
        <motion.div
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border-0 p-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}>
          {/* Biểu đồ doanh thu */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#133e87] font-semibold text-lg">
                {t("adminHome.charts.revenue_title")}
              </h3>
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedPeriod("thisYear")}
                  className={`text-sm transition ${
                    selectedPeriod === "thisYear"
                      ? "text-[#133e87] font-semibold"
                      : "text-gray-400 hover:text-[#133e87]"
                  }`}>
                  {t("adminHome.period.this_year")}{" "}
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
              <LineChart data={revenueDataI18n}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#bcbcbc" />
                <YAxis stroke="#bcbcbc" />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "none",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}
                  formatter={(value, name) => {
                    const nameMap = {
                      thisYear: t("adminHome.legend.this_year"),
                      lastYear: t("adminHome.legend.last_year"),
                      value: t("adminHome.tooltip.value"),
                    };
                    return [value, nameMap[name] || name];
                  }}
                />
                <Legend
                  formatter={(value) => {
                    const nameMap = {
                      thisYear: t("adminHome.legend.this_year"),
                      lastYear: t("adminHome.legend.last_year"),
                    };
                    return nameMap[value] || value;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey={
                    selectedPeriod === "thisYear" ? "thisYear" : "lastYear"
                  }
                  stroke="#608bc1"
                  strokeWidth={3}
                  dot={{ fill: "#608bc1", r: 4 }}
                  name={
                    selectedPeriod === "thisYear"
                      ? t("adminHome.legend.this_year")
                      : t("adminHome.legend.last_year")
                  }
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Biểu đồ thiết bị & thanh toán */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}>
            <div>
              <h3 className="text-[#133e87] font-semibold mb-4">
                {t("adminHome.charts.device_title")}{" "}
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

            <div>
              <h3 className="text-[#133e87] font-semibold mb-4">
                {t("adminHome.charts.payment_title")}{" "}
              </h3>
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
                        `${value} ${t("adminHome.tooltip.turns_suffix")}`,
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

          {/* Biểu đồ danh mục */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}>
            <h3 className="text-[#133e87] font-semibold mb-4">
              {t("adminHome.charts.category_title")}{" "}
            </h3>
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
                    `${value} ${t("adminHome.tooltip.paintings_suffix")}`,
                    name,
                  ]}
                />
                <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                  <Cell fill="#92bfff" />
                  <Cell fill="#96e2d6" />
                  <Cell fill="#9f9ff8" />
                  <Cell fill="#000000" />
                  <Cell fill="#ffd09b" />
                  <Cell fill="#ff7383" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default SellerHomeContainer;