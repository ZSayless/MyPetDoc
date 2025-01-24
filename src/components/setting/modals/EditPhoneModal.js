import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";

function EditPhoneModal({ isOpen, onClose, currentPhone, onSubmit }) {
  const { t } = useTranslation();
  const [phone, setPhone] = useState(currentPhone || "");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const validatePhone = (value) => {
    // Regex cho số điện thoại Việt Nam
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    return phoneRegex.test(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone.trim()) {
      setError(t("setting.modal.editPhone.errors.required"));
      return;
    }
    if (!validatePhone(phone)) {
      setError(t("setting.modal.editPhone.errors.invalid"));
      return;
    }
    onSubmit(phone);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold mb-2">
              {t("setting.modal.editPhone.title")}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          <p className="text-gray-600 mb-6">
            {t("setting.modal.editPhone.description")}
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("setting.personal.basic.phone")}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setError("");
                }}
                className={`w-full px-4 py-3 border ${
                  error ? "border-red-500" : "border-gray-200"
                } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400`}
                placeholder={t("setting.modal.editPhone.placeholder")}
              />
              {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50"
              >
                {t("setting.modal.editPhone.cancel")}
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-[#98E9E9] text-gray-700 rounded-xl hover:bg-[#7CD5D5]"
              >
                {t("setting.modal.editPhone.save")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPhoneModal;
