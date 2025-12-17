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

const revenueData = [
  { month: "Tháng 1", thisYear: 10, lastYear: 8 },
  { month: "Tháng 2", thisYear: 8, lastYear: 12 },
  { month: "Tháng 3", thisYear: 12, lastYear: 10 },
  { month: "Tháng 4", thisYear: 15, lastYear: 14 },
  { month: "Tháng 5", thisYear: 22, lastYear: 18 },
  { month: "Tháng 6", thisYear: 28, lastYear: 25 },
  { month: "Tháng 7", thisYear: 18, lastYear: 20 },
  { month: "Tháng 8", thisYear: 20, lastYear: 22 },
  { month: "Tháng 9", thisYear: 25, lastYear: 24 },
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

function AdminHomeContainer() {
  const [selectedPeriod, setSelectedPeriod] = useState("thisYear");

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

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
              title: "Tổng Doanh Thu Hôm Nay",
              value: "9,999,999đ",
              color: "#d9eafd",
            },
            { title: "Số Đơn Đã Bán Hôm Nay", value: "100", color: "#fdf6eb" },
            { title: "Tổng Số Khách Hàng", value: "1000", color: "#d9eafd" },
            {
              title: "Khách Mới Trong Hôm Nay",
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
                Biểu đồ tổng doanh thu trong năm (chục triệu VNĐ)
              </h3>
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedPeriod("thisYear")}
                  className={`text-sm transition ${
                    selectedPeriod === "thisYear"
                      ? "text-[#133e87] font-semibold"
                      : "text-gray-400 hover:text-[#133e87]"
                  }`}>
                  Năm nay
                </button>
                <button
                  onClick={() => setSelectedPeriod("lastYear")}
                  className={`text-sm transition ${
                    selectedPeriod === "lastYear"
                      ? "text-[#133e87] font-semibold"
                      : "text-gray-400 hover:text-[#133e87]"
                  }`}>
                  Năm ngoái
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
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
                      thisYear: "Năm nay",
                      lastYear: "Năm ngoái",
                      value: "Giá trị",
                    };
                    return [value, nameMap[name] || name];
                  }}
                />
                <Legend
                  formatter={(value) => {
                    const nameMap = {
                      thisYear: "Năm nay",
                      lastYear: "Năm ngoái",
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
                  name={selectedPeriod === "thisYear" ? "Năm nay" : "Năm ngoái"}
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
                Tổng lượt đăng nhập theo thiết bị (nghìn lượt)
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
                    formatter={(value) => [`${value} lượt`, "Số lượng"]}
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
                Tỷ lệ sử dụng phương thức thanh toán (nghìn lượt)
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
                      formatter={(value, name) => [`${value} lượt`, name]}
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
              Tổng lượng tranh đã bán theo từng danh mục (trăm tranh)
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
                  formatter={(value, name) => [`${value} tranh`, name]}
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

export default AdminHomeContainer;