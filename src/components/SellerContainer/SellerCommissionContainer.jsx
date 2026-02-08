
import { useEffect, useMemo, useState } from "react";
import { Pagination, message, Tag } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import CommissionActionBar from "./SellerCommissionComponent/CommissionActionBar";
import CommissionTable from "./SellerCommissionComponent/CommissionTable";
import { getSellerCommissionsApi } from "../../api/sellerCommissionApi";
import ApproveCommissionModal from "../ApproveCommissionModal";

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

  const pageSize = 10;

  const statusColor = useMemo(
    () => ({
      SUBMITTED: "volcano",
      APPROVED: "cyan",
      REJECTED: "red",
      PAID: "green",
      CONFIRMED: "blue",
      DRAFT: "default",
      CANCELLED: "orange",
    }),
    []
  );

  const renderStatusTag = (status) => {
    const key = String(status || "").toUpperCase();
    const color = statusColor[key] || "default";

    return (
      <Tag color={color} className="font-medium px-3 py-1 rounded-full">
        {t(`commission.status.${key.toLowerCase()}`)}
      </Tag>
    );
  };

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
      dataIndex: "raw",
      width: 180,
      render: (raw) => renderStatusTag(raw?.status),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys) => setSelectedRowKeys(keys),
  };

  const handleRowClick = (record) => {
    const raw = record?.raw;
    if (!raw) return;

    if (raw.status === "SUBMITTED") {
      setSelectedRequest(raw);
      setApproveOpen(true);
      return;
    }

    message.info(t("sellerCommission.only_submitted_can_approve"));
  };

  const fetchCommissions = async () => {
    try {
      setLoading(true);
      const res = await getSellerCommissionsApi();
      const list = Array.isArray(res?.data) ? res.data : [];

      const mapped = list.map((c, index) => ({
        key: c.id,
        stt: index + 1,
        code: c.code || t("sellerCommission.code_fallback", { id: c.id }),
        contact:
          c.contactMethod === "EMAIL"
            ? t("sellerCommission.contact.email")
            : t("sellerCommission.contact.twitter"),
        totalPrice:
          c.totalPrice != null
            ? money(c.totalPrice)
            : t("common.na"),
        raw: c,
      }));

      setData(mapped);
      setCurrentPage(1);
    } catch (e) {
      console.error(e);
      message.error(t("sellerCommission.load_failed"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pagedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return data.slice(start, end);
  }, [data, currentPage]);

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

            <CommissionActionBar t={t} onOpenDelete={() => {}} onEdit={() => {}} />

            <ApproveCommissionModal
              open={approveOpen}
              request={selectedRequest}
              onClose={() => setApproveOpen(false)}
              onSuccess={fetchCommissions}
            />

            <AnimatePresence mode="wait">
              <CommissionTable
                columns={columns}
                dataSource={pagedData}
                rowSelection={rowSelection}
                onRowClick={handleRowClick}
                loading={loading}
              />
            </AnimatePresence>

            <div className="flex justify-center mt-8">
              <Pagination
                current={currentPage}
                total={data.length}
                pageSize={pageSize}
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
