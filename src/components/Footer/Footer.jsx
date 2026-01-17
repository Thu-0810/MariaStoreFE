import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../../assets/img/logo.png";

function Footer() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <footer className="bg-[#ffecc8] py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-3 gap-8">
          {/* Logo Section */}
          <div>
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              <img
                src={logo}
                alt="MariaStore Logo"
                className="w-15 h-15 object-cover rounded-full"
              />
              <span className="text-[#133e87] font-bold text-xl">MariaStore</span>
            </div>

            <p className="text-[#7a7a7a] text-sm mb-2">
              <MailOutlined /> mariastore@gmail.com
            </p>
            <p className="text-[#7a7a7a] text-sm">
              <PhoneOutlined /> 0983271063
            </p>
          </div>

          {/* Info Section */}
          <div>
            <h3 className="text-[#133e87] font-bold mb-4">{t("footer.intro")}</h3>
            <ul className="space-y-2 text-[#7a7a7a] text-sm">
              <li className="cursor-pointer hover:text-[#133e87]" onClick={() => navigate("/dashboard")}>
                {t("footer.home")}
              </li>
              <li className="cursor-pointer hover:text-[#133e87]" onClick={() => navigate("/order")}>
                {t("footer.order")}
              </li>
              <li className="cursor-pointer hover:text-[#133e87]" onClick={() => navigate("/store")}>
                {t("footer.store")}
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-[#133e87] font-bold mb-4">{t("footer.info")}</h3>
            <ul className="space-y-2 text-[#7a7a7a] text-sm">
              <li className="cursor-pointer hover:text-[#133e87]" onClick={() => navigate("/blog")}>
                {t("footer.blog")}
              </li>
              <li className="cursor-pointer hover:text-[#133e87]" onClick={() => navigate("/contact")}>
                {t("footer.contact")}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;