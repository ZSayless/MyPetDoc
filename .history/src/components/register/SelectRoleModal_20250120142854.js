import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

function SelectRoleModal({ onClose, onSelect }) {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[30px] w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <div className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              {t("auth.selectRole.title")}
            </h3>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => onSelect("general")}
              className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-[#98E9E9] hover:bg-gray-50 transition-all group"
            >
              <div className="flex items-center">
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-[#98E9E9]">
                    {t("auth.selectRole.roles.petOwner.title")}
                  </h3>
                </div>
              </div>
            </button>

            <button
              onClick={() => onSelect("hospital")}
              className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-[#98E9E9] hover:bg-gray-50 transition-all group"
            >
              <div className="flex items-center">
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-[#98E9E9]">
                    {t("auth.selectRole.roles.veterinarian.title")}
                  </h3>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectRoleModal;
