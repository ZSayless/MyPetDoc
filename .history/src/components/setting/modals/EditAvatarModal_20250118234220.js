import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

function EditAvatarModal({ onClose, currentAvatar }) {
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle avatar update
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md">
        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-2">
            {t("setting.modal.editAvatar.title")}
          </h3>
          <p className="text-gray-600 mb-6">
            {t("setting.modal.editAvatar.description")}
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center text-white text-3xl">
                  {currentAvatar}
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
                <div className="mb-2">
                  <span className="text-blue-500 font-medium cursor-pointer">
                    {t("setting.modal.editAvatar.uploadTitle")}
                  </span>{" "}
                  {t("setting.modal.editAvatar.dragDropText")}
                </div>
                <div className="text-sm text-gray-500">
                  {t("setting.modal.editAvatar.fileTypes")}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50"
              >
                {t("setting.modal.editAvatar.cancel")}
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-[#98E9E9] text-gray-700 rounded-xl hover:bg-[#7CD5D5]"
              >
                {t("setting.modal.editAvatar.save")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditAvatarModal;
