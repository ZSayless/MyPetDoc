import { X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../../assets/img/logocustom.png";
import { login, forgotPassword } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import GoogleLoginButton from "./GoogleLoginButton";

function Login({ onClose, onRegisterClick, onLoginSuccess }) {
  const { t } = useTranslation();
  const { login: authLogin } = useAuth();
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegisterClick = () => {
    onClose();
    onRegisterClick();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    setLoading(true);
    setError("");

    try {
      const result = await login(email, password);
      // console.log('Login response:', result); // Để debug

      if (result.success) {
        // Truyền toàn bộ response data vào authLogin
        authLogin(result.data);
        onClose();
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError("Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");

    setLoading(true);
    setError("");

    try {
      const result = await forgotPassword(email);
      if (result.success) {
        alert(t("auth.forgotPasswordModal.checkEmail"));
        setShowForgotPassword(false);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError(t("auth.forgotPasswordModal.errors.sendFailed"));
    } finally {
      setLoading(false);
    }
  };

  const LoginForm = () => (
    <div className="p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800">
          {t("auth.loginTitle")}
        </h3>
        <p className="text-gray-600 mt-2">{t("auth.loginSubtitle")}</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
        <input
          type="email"
          name="email"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
          placeholder={t("auth.emailPlaceholder")}
          required
        />
        <input
          type="password"
          name="password"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
          placeholder={t("auth.passwordPlaceholder")}
          required
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="rounded text-blue-500" />
            <span className="ml-2 text-sm text-gray-600">
              {t("auth.rememberMe")}
            </span>
          </label>
          <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {t("auth.forgotPassword")}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#98E9E9] text-gray-700 py-3 rounded-lg font-medium hover:bg-[#7CD5D5] transition-colors disabled:opacity-50"
        >
          {loading ? t("auth.signingIn") : t("auth.signIn")}
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              {t("auth.orContinueWith")}
            </span>
          </div>
        </div>

        <div className="mt-6">
          <GoogleLoginButton onClose={onClose} />
        </div>
      </form>

      <p className="text-center mt-8 text-gray-600">
        {t("auth.noAccount")}{" "}
        <button
          onClick={handleRegisterClick}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          {t("auth.signUp")}
        </button>
      </p>

      <p className="text-center mt-6 text-sm text-gray-600">
        {t("auth.termsAgree")}{" "}
        <Link
          to="/terms"
          className="text-blue-600 hover:underline"
          onClick={onClose}
        >
          {t("auth.termsLink")}
        </Link>
      </p>
    </div>
  );

  const ForgotPasswordForm = () => (
    <div className="p-8">
      <div className="flex items-center mb-6">
        <button
          onClick={() => setShowForgotPassword(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <span className="text-xl font-medium ml-4">
          {t("auth.forgotPasswordModal.back")}
        </span>
        <button
          onClick={onClose}
          className="ml-auto text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>
      </div>

      <div className="text-center mb-8">
        <img src={logo} alt="Logo" className="w-48 h-auto mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800">
          {t("auth.forgotPasswordModal.title")}
        </h3>
        <p className="text-gray-600 mt-2">
          {t("auth.forgotPasswordModal.subtitle")}
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleForgotPassword}>
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("auth.forgotPasswordModal.emailLabel")}
          </label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
            placeholder={t("auth.emailPlaceholder")}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#98E9E9] text-gray-700 py-3 rounded-lg font-medium hover:bg-[#7CD5D5] transition-colors disabled:opacity-50"
        >
          {loading
            ? t("auth.forgotPasswordModal.sending")
            : t("auth.forgotPasswordModal.sendRequest")}
        </button>
      </form>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md relative">
        {!showForgotPassword && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        )}
        {showForgotPassword ? <ForgotPasswordForm /> : <LoginForm />}
      </div>
    </div>
  );
}

export default Login;
