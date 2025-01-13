import { X } from "lucide-react";

function SelectRoleModal({ onClose, onSelect }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-[30px] w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            Choose Your Account Type
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Select the type of account you want to create
          </p>

          <div className="space-y-4">
            <button
              onClick={() => onSelect("general")}
              className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-[#98E9E9] hover:bg-gray-50 transition-all group"
            >
              <div className="flex items-center">
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-[#98E9E9]">
                    Pet Owner
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Find and book appointments with veterinary hospitals
                  </p>
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
                    Hospital Representative
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Manage your veterinary hospital profile and appointments
                  </p>
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