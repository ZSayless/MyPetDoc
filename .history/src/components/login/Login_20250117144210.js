import { X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../../assets/img/logocustom.png";

function Login({ onClose, onRegisterClick, onLoginSuccess }) {
  const { t } = useTranslation();
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleRegisterClick = () => {
    onClose();
    onRegisterClick();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Call API to login
      const userData = {
        name: "John Doe",
        email: "john@example.com",
        avatar: "J",
      };
      onLoginSuccess(userData);
      onClose();
    } catch (error) {
      alert("Login failed");
    }
  };

  const LoginForm = () => (
    <div className="p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800">
          {t("auth.login.title")}
        </h3>
        <p className="text-gray-600 mt-2">{t("auth.login.subtitle")}</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
          placeholder={t("auth.login.form.email.placeholder")}
        />
        <input
          type="password"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
          placeholder={t("auth.login.form.password.placeholder")}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="rounded text-blue-500" />
            <span className="ml-2 text-sm text-gray-600">
              {t("auth.login.form.rememberMe")}
            </span>
          </label>
          <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {t("auth.login.form.forgotPassword")}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-[#98E9E9] text-gray-700 py-3 rounded-lg font-medium hover:bg-[#7CD5D5] transition-colors"
        >
          {t("auth.login.buttons.signIn")}
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              {t("auth.login.buttons.orContinue")}
            </span>
          </div>
        </div>

        <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="h-5 w-5 mr-2"
            alt="Google"
          />
          <span>{t("auth.login.buttons.google")}</span>
        </button>
      </form>

      <p className="text-center mt-8 text-gray-600">
        {t("auth.login.noAccount")}{" "}
        <button
          onClick={handleRegisterClick}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          {t("auth.login.signUp")}
        </button>
      </p>

      <p className="text-center mt-6 text-sm text-gray-600">
        {t("auth.login.terms.agree")}{" "}
        <Link
          to="/terms"
          className="text-blue-600 hover:underline"
          onClick={onClose}
        >
          {t("auth.login.terms.link")}
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
          {t("auth.login.buttons.back")}
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
          {t("auth.login.forgotPassword.title")}
        </h3>
        <p className="text-gray-600 mt-2">
          {t("auth.login.forgotPassword.subtitle")}
        </p>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("auth.login.forgotPassword.form.username.label")}
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
            placeholder={t("auth.login.forgotPassword.form.username.placeholder")}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("auth.login.forgotPassword.form.code.label")}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
              placeholder={t("auth.login.forgotPassword.form.code.placeholder")}
            />
            <button
              type="button"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
            >
              {t("auth.login.buttons.sendCode")}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#98E9E9] text-gray-700 py-3 rounded-lg font-medium hover:bg-[#7CD5D5] transition-colors"
        >
          {t("auth.login.buttons.resetPassword")}
        </button>
      </form>

      <p className="text-center mt-6 text-sm text-gray-600">
        {t("auth.login.terms.agree")}{" "}
        <Link
          to="/terms"
          className="text-blue-600 hover:underline"
          onClick={onClose}
        >
          {t("auth.login.terms.link")}
        </Link>
      </p>
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
