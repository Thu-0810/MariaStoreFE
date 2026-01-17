import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Navigation() {
  const { t } = useTranslation();

  const linkBase = "px-4 border-l border-[#d1d1d1] font-medium";
  const active = "text-[#133e87]";
  const inactive = "text-[#7a7a7a] hover:text-[#133e87]";

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const role = currentUser?.role || "GUEST";

  return (
    <nav className="bg-white border-t border-[#d1d1d1]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center py-3">
          {role === "ADMIN" ? (
            <>
              <NavLink to="/admin-dashboard" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
                {t("nav.home")}
              </NavLink>

              <NavLink to="/admin-product" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
                {t("nav.manage_product")}
              </NavLink>

              <NavLink to="/admin-customer" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
                {t("nav.manage_customer")}
              </NavLink>

              <NavLink to="/admin-order" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
                {t("nav.manage_order")}
              </NavLink>

              <NavLink to="/admin-post" className={({ isActive }) => `${linkBase} border-r ${isActive ? active : inactive}`}>
                {t("nav.manage_post")}
              </NavLink>
            </>
          ) : role === "SELLER" ? (
            <>
              <NavLink to="/seller-dashboard" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
                {t("nav.home")}
              </NavLink>

              <NavLink to="/seller-product" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
                {t("nav.manage_product")}
              </NavLink>

              <NavLink to="/seller-order" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
                {t("nav.manage_order")}
              </NavLink>

              <NavLink to="/seller-post" className={({ isActive }) => `${linkBase} border-r ${isActive ? active : inactive}`}>
                {t("nav.manage_post")}
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/dashboard" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
                {t("nav.home")}
              </NavLink>

              <NavLink to="/order" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
                {t("nav.order_painting")}
              </NavLink>

              <NavLink to="/store" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
                {t("nav.store")}
              </NavLink>

              <NavLink to="/community" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
                {t("nav.community")}
              </NavLink>

              <NavLink to="/contact" className={({ isActive }) => `${linkBase} border-r ${isActive ? active : inactive}`}>
                {t("nav.contact")}
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;