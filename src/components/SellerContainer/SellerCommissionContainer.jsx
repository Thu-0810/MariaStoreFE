import { useEffect, useState } from "react";
import { Pagination, message, Tag } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import CommissionActionBar from "./SellerCommissionComponent/CommissionActionBar";
import CommissionTable from "./SellerCommissionComponent/CommissionTable";
import { getPendingCommissionsApi } from "../../api/sellerCommissionApi";
import ApproveCommissionModal from "../ApproveCommissionModal";

const COMMISSION_STATUS = {
  PENDING: "PENDING",
};

function SellerCommissionContainer() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === "en" ? "en-US" : "vi-VN";
  const money = (n) => (n || 0).toLocaleString(locale);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [approveOpen, setApproveOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const columns = [
    {
      title: t("adminOrder.table.index"),
      dataIndex: "stt",
      width: 80,
    },
    {
      title: t("sellerCommission.table.code"),
      dataIndex: "code",
    },
    {
      title: t("sellerCommission.table.contact"),
      dataIndex: "contact",
    },
    {
      title: t("sellerCommission.table.total_price"),
      dataIndex: "totalPrice",
      width: 160,
    },
    {
      title: t("sellerCommission.table.status"),
      width: 180,
      render: () => (
        <Tag color="volcano" className="font-medium px-3 py-1 rounded-full">
          {t("sellerCommission.status.pending")}
        </Tag>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys) => setSelectedRowKeys(keys),
  };

  const handleRowClick = (record) => {
    setSelectedRequest(record.raw);
    setApproveOpen(true);
  };

  useEffect(() => {
    fetchCommissions();
  }, []);

  const fetchCommissions = async () => {
    try {
      setLoading(true);
      const res = await getPendingCommissionsApi();

      const mapped = res.data.map((c, index) => ({
        key: c.id,
        stt: index + 1,
        code: c.code || `CM-${c.id}`,
        contact:
          c.contactMethod === "EMAIL"
            ? t("sellerCommission.contact.email")
            : t("sellerCommission.contact.twitter"),
        totalPrice: c.totalPrice ? money(c.totalPrice) : "-",
        status: COMMISSION_STATUS.PENDING,
        raw: c,
      }));

      setData(mapped);
    } catch {
      message.error(t("sellerCommission.load_failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/src/assets/img/Illustration265.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[3px]" />

      <div className="relative z-10 mt-20">
        <motion.div className="px-6 pb-8">
          <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8">
            <h1 className="text-[#133e87] text-3xl font-bold text-center mb-6">
              {t("sellerCommission.title")}
            </h1>

            <CommissionActionBar
              t={t}
              onOpenDelete={() => {}}
              onEdit={() => {}}
            />

            <ApproveCommissionModal
              open={approveOpen}
              request={selectedRequest}
              onClose={() => setApproveOpen(false)}
              onSuccess={fetchCommissions}
            />

            <AnimatePresence mode="wait">
              <CommissionTable
                columns={columns}
                dataSource={data}
                rowSelection={rowSelection}
                onRowClick={handleRowClick}
                loading={loading}
              />
            </AnimatePresence>

            <div className="flex justify-center mt-8">
              <Pagination
                current={currentPage}
                total={data.length}
                pageSize={10}
                onChange={setCurrentPage}
                showSizeChanger={false}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default SellerCommissionContainer;