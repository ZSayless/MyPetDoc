import { X } from "lucide-react";
import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logocustom.png";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { authService } from "../../../services/authService";
import { useToast } from "../../context/ToastContext";

function Login({ onClose, onRegisterClick, onLoginSuccess }) {
  const { t } = useTranslation();
  const { login } = useAuth();
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { showToast } = useToast();

  const handleRegisterClick = () => {
    onClose();
    onRegisterClick();
  };

  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
    setError(null);
  }, []);

  const handlePasswordChange = useCallback((e) => {
    setPassword(e.target.value);
    setError(null);
  }, []);

  const handleRememberMeChange = useCallback((e) => {
    setRememberMe(e.target.checked);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await authService.login({
        email,
        password,
        rememberMe,
      });
      await login(response.user, response.token);
      onLoginSuccess(response.user);
      onClose();
    } catch (error) {
      setError(t("auth.errors.invalidCredentials"));
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      setError(t("auth.errors.emailRequired"));
      return;
    }
    setLoading(true);
    try {
      await authService.forgotPassword(email);
      showToast({
        message: t("auth.forgotPasswordModal.resetSent"),
        type: "success"
      });
      setShowForgotPassword(false);
    } catch (error) {
      setError(t("auth.errors.resetPasswordFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md relative">
        {!showForgotPassword && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        )}

        {showForgotPassword ? (
          <div className="p-8">
            <div className="text-center mb-8">
              <img src={logo} alt="Logo" className="h-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">
                {t("auth.forgotPasswordModal.title")}
              </h2>
              <p className="text-gray-600">
                {t("auth.forgotPasswordModal.subtitle")}
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleForgotPassword}>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                placeholder={t("auth.emailPlaceholder")}
                autoComplete="email"
              />

              {error && (
                <div className="text-sm text-red-500 text-center">{error}</div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-[#98E9E9] text-gray-700 py-3 rounded-lg font-medium hover:bg-[#7CD5D5] transition-colors ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? t("auth.forgotPasswordModal.sendCode") : t("auth.forgotPasswordModal.resetPassword")}
              </button>

              <button
                type="button"
                onClick={() => setShowForgotPassword(false)}
                className="w-full text-gray-600 hover:underline"
              >
                {t("auth.forgotPasswordModal.back")}
              </button>
            </form>
          </div>
        ) : (
          <div className="p-8">
            <div className="text-center mb-8">
              <img src={logo} alt="Logo" className="h-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">{t("auth.loginTitle")}</h2>
              <p className="text-gray-600">{t("auth.loginSubtitle")}</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                placeholder={t("auth.emailPlaceholder")}
                autoComplete="email"
              />
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
                placeholder={t("auth.passwordPlaceholder")}
                autoComplete="current-password"
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                    className="rounded text-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    {t("auth.rememberMe")}
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-[#1A3C8E] hover:underline"
                >
                  {t("auth.forgotPassword")}
                </button>
              </div>

              {error && (
                <div className="text-sm text-red-500 text-center">{error}</div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-[#98E9E9] text-gray-700 py-3 rounded-lg font-medium hover:bg-[#7CD5D5] transition-colors ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? t("auth.signingIn") : t("auth.signIn")}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    {t("auth.orContinueWith")}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                <span>{t("auth.googleSignIn")}</span>
              </button>

              <div className="text-center text-sm text-gray-600">
                <span>{t("auth.noAccount")}</span>{" "}
                <button
                  type="button"
                  onClick={handleRegisterClick}
                  className="text-[#1A3C8E] hover:underline font-medium"
                >
                  {t("auth.signUp")}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
