import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import logo from "../../../assets/img/logocustom.png";
import { forgotPassword } from "../../../services/authService";

function ChangePasswordModal({ onClose }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");

    setLoading(true);
    setError("");

    try {
      const result = await forgotPassword(email);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
        }, 5000);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError(t("setting.modal.changePassword.errors.changeFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md relative">
        <div className="p-8">
          <div className="flex items-center mb-6">
            <button
              onClick={onClose}
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
              {t("setting.modal.changePassword.back")}
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
              {t("setting.modal.changePassword.title")}
            </h3>
            <p className="text-gray-600 mt-2">
              {t("setting.modal.changePassword.description")}
            </p>
          </div>

          {success ? (
            <div className="text-center space-y-4">
              <div className="text-green-600 font-medium">
                {t("setting.modal.changePassword.success")}
              </div>
              <p className="text-gray-500">
                {t("setting.modal.changePassword.checkEmail")}
              </p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("setting.modal.changePassword.emailLabel")}
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
                  ? t("setting.modal.changePassword.sending")
                  : t("setting.modal.changePassword.sendRequest")}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordModal;
