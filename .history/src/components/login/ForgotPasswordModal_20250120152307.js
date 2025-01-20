import { X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function ForgotPasswordModal({ onClose }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Implement forgot password API call
      console.log("Reset password for:", email);
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">
            {t("auth.forgotPasswordModal.title")}
          </h2>
          <p className="text-gray-600 mt-1">
            {t("auth.forgotPasswordModal.subtitle")}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("auth.forgotPasswordModal.username")}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#98E9E9]"
            placeholder={t("auth.forgotPasswordModal.usernamePlaceholder")}
            required
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            {t("auth.forgotPasswordModal.back")}
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-[#98E9E9] text-gray-700 px-4 py-2 rounded-lg hover:bg-[#7CD5D5] disabled:opacity-50"
          >
            {loading ? "..." : t("auth.forgotPasswordModal.sendCode")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPasswordModal; 