import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CommissionDetailModal from "../../../components/CommissionDetailModal";
import { getMyCommissionsApi } from "../../../api/commissionApi";

export default function ProfileRequestsPage() {
  const { t } = useTranslation();

  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getMyCommissionsApi().then((res) => {
      setRequests(res.data || []);
    });
  }, []);

  if (requests.length === 0) {
    return (
      <p className="text-[#6b7280] text-lg">{t("profile.empty_request")}</p>
    );
  }

  return (
    <>
      <div className="flex flex-wrap gap-3 mb-6">
        {requests.map((req, idx) => (
          <button
            key={req.id}
            onClick={() => setSelected(req)}
            className="px-8 py-3 bg-gradient-to-r from-[#D9EAFE] to-[#FFF6E9] text-[#133e87] font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
            style={{ boxShadow: "0 4px 30px rgba(0, 0, 0, 0.25)" }}>
            {t("profile.request")} {idx + 1}
          </button>
        ))}
      </div>

      {selected && (
        <CommissionDetailModal
          open={!!selected}
          request={selected}
          onClose={() => setSelected(null)}
          onPay={() => checkoutCommission(selected.id)}
        />
      )}
    </>
  );
}