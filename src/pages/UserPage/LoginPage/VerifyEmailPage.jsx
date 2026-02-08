import { Button, message, Spin } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmailApi } from "../../../api/authApi";
import { useTranslation } from "react-i18next";

function VerifyEmailPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);

  const [status, setStatus] = useState("loading");
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;
  
    const run = async () => {
      if (!token) {
        setStatus("error");
        return;
      }
      try {
        await verifyEmailApi({ token });
        setStatus("success");
        message.success(t("auth.verify_email_success"));
      } catch (err) {
        setStatus("error");
        message.error(t("auth.verify_email_failed"));
      }
    };
  
    run();
  }, [token, t]);

  return (
    <div className="min-h-screen bg-[#f4faff]">
      <main className="relative min-h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('src/assets/img/Illustration122.jpg')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#d9eafd]/20"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 w-full max-w-md shadow-lg text-center">
            <h2 className="text-[#133e87] text-xl font-bold mb-2">
              {t("auth.verify_email_title")}
            </h2>

            <p className="text-sm text-[#608bc1] mb-6">
              {t("auth.verify_email_desc")}
            </p>

            {status === "loading" && (
              <div className="flex flex-col items-center gap-3 py-6">
                <Spin />
                <div className="text-sm text-[#608bc1]">
                  {t("auth.verifying")}
                </div>
              </div>
            )}

            {status === "success" && (
              <div className="py-6">
                <div className="text-[#133e87] font-semibold mb-2">
                  {t("auth.verify_email_success_text")}
                </div>
                <div className="text-sm text-[#608bc1] mb-6">
                  {t("auth.verify_email_success_hint")}
                </div>

                <Button
                  type="primary"
                  className="w-full font-medium py-2.5 h-10"
                  style={{ backgroundColor: "#608bc1", borderColor: "#608bc1" }}
                  onClick={() => navigate("/login")}
                >
                  {t("auth.back_to_login")}
                </Button>
              </div>
            )}

            {status === "error" && (
              <div className="py-6">
                <div className="text-[#d61f6f] font-semibold mb-2">
                  {token ? t("auth.verify_email_failed_text") : t("auth.verify_email_missing_token")}
                </div>
                <div className="text-sm text-[#608bc1] mb-6">
                  {t("auth.verify_email_failed_hint")}
                </div>

                <Button
                  type="primary"
                  className="w-full font-medium py-2.5 h-10"
                  style={{ backgroundColor: "#608bc1", borderColor: "#608bc1" }}
                  onClick={() => navigate("/login")}
                >
                  {t("auth.back_to_login")}
                </Button>

                <div className="mt-4 text-sm">
                  <a href="/register" className="text-[#133e87] font-medium hover:underline">
                    {t("auth.go_to_register")}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default VerifyEmailPage;