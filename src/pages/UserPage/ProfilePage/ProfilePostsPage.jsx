import { useTranslation } from "react-i18next";

export default function ProfilePostsPage() {
  const { t } = useTranslation();
  return <p className="text-[#6b7280] text-lg">{t("profile.empty_posts")}</p>;
}