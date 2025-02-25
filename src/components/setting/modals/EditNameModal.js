import { LoaderIcon, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";
import { updateInfo } from "../../../services/authService";

function EditNameModal({ isOpen, onClose, onSuccess }) {
  const { t } = useTranslation();
  const { user, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newName = formData.get("name");
    if (newName.trim()) {
      const data = { full_name: newName }
      updateUser(data)
      try {
        setIsLoading(true)
        await updateInfo(data);
        onSuccess();
      } catch (error) {
        console.error("Error converting image:", error);
      } finally {
        setIsLoading(false)
      }
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold mb-2">
              {t("setting.modal.editName.title")}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
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
                defaultValue={user.full_name}
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
                disabled={isLoading}
                type="submit"
                className="px-6 py-3 bg-[#98E9E9] text-gray-700 rounded-xl hover:bg-[#7CD5D5]"
              >
                {
                  isLoading ? <LoaderIcon className="animate-spin" />
                    :
                    t("setting.modal.editAvatar.save")
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditNameModal;