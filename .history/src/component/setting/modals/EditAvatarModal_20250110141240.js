import { X } from "lucide-react";

function EditAvatarModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Change Avatar</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Choose an avatar to personalize your profile.
        </p>

        <form className="space-y-4">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="avatar-upload"
            />
            <label htmlFor="avatar-upload" className="cursor-pointer text-center">
              <div className="text-gray-600 mb-2">
                <span className="text-blue-600 hover:text-blue-700">
                  Click to upload
                </span>{" "}
                or drag and drop
              </div>
              <div className="text-sm text-gray-500">
                PNG, JPG (max 2MB)
              </div>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#98E9E9] text-gray-700 py-3 rounded-lg font-medium hover:bg-[#7CD5D5] transition-colors mt-6"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditAvatarModal; 