import { X, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logocustom.png";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { authService } from "../../services/authService";

function Login({ onClose, onRegisterClick, onLoginSuccess }) {
  const { t } = useTranslation();
  const { login } = useAuth();
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleRegisterClick = () => {
    onClose();
    onRegisterClick();
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData(prev => ({
        ...prev,
        [name]: e.target.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await authService.login(formData);
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

  const LoginForm = () => (
    <div className="p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800">
          {t("auth.loginTitle")}
        </h3>
        <p className="text-gray-600 mt-2">{t("auth.loginSubtitle")}</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
          placeholder={t("auth.emailPlaceholder")}
          autoComplete="email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
          placeholder={t("auth.passwordPlaceholder")}
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="rounded text-blue-500" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} />
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

        {error && (
          <div className="mb-4 text-sm text-red-500 text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          className={`w-full py-3 bg-[#98E9E9] text-gray-700 rounded-xl hover:bg-[#7CD5D5] ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          disabled={loading}
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

        <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="h-5 w-5 mr-2"
            alt="Google"
          />
          <span>{t("auth.googleSignIn")}</span>
        </button>
      </form>

      <p className="text-center mt-8 text-gray-600">
        {t("auth.noAccount")}
        <button
          onClick={handleRegisterClick}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          {t("auth.signUp")}
        </button>
      </p>

      <p className="text-center mt-6 text-sm text-gray-600">
        {t("auth.termsAgree")}
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

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("auth.forgotPasswordModal.username")}
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
            placeholder={t("auth.forgotPasswordModal.usernamePlaceholder")}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("auth.forgotPasswordModal.verificationCode")}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
              placeholder={t("auth.forgotPasswordModal.codePlaceholder")}
            />
            <button
              type="button"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
            >
              {t("auth.forgotPasswordModal.sendCode")}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#98E9E9] text-gray-700 py-3 rounded-lg font-medium hover:bg-[#7CD5D5] transition-colors"
        >
          {t("auth.forgotPasswordModal.resetPassword")}
        </button>
      </form>
    </div>
  );

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
        {showForgotPassword ? <ForgotPasswordForm /> : <LoginForm />}
      </div>
    </div>
  );
}

export default Login;
