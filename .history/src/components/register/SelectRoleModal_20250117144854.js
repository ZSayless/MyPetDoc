import { useTranslation } from "react-i18next";

function SelectRoleModal({ isOpen, onClose, onSelectRole }) {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800">
              {t("auth.selectRole.title")}
            </h3>
            <p className="text-gray-600 mt-2">
              {t("auth.selectRole.subtitle")}
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => onSelectRole("petOwner")}
              className="w-full p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
            >
              <h4 className="font-medium text-gray-800">
                {t("auth.selectRole.roles.petOwner.title")}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {t("auth.selectRole.roles.petOwner.description")}
              </p>
            </button>
            {/* ... other role buttons ... */}
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {t("auth.selectRole.buttons.back")}
            </button>
            <button
              onClick={() => onSelectRole(selectedRole)}
              className="px-6 py-2 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5] transition-colors"
            >
              {t("auth.selectRole.buttons.continue")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectRoleModal;
