import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

function EditNameModal({ onClose }) {
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle form submission
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md">
        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-2">
            {t("setting.modal.editName.title")}
          </h3>
          <p className="text-gray-600 mb-6">
            {t("setting.personal.basic.description")}
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("setting.personal.basic.fullName")}
              </label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                placeholder={t("setting.modal.editName.placeholder")}
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50"
              >
                {t("setting.modal.editName.cancel")}
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-[#98E9E9] text-gray-700 rounded-xl hover:bg-[#7CD5D5]"
              >
                {t("setting.modal.editName.save")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditNameModal;
