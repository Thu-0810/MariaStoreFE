import { useTranslation } from "react-i18next";

export default function ProfileRequestsPage() {
  const { t } = useTranslation();
  return <p className="text-[#6b7280] text-lg">{t("profile.empty_request")}</p>;
}