import { X } from "lucide-react";

function EditAvatarModal({ onClose, currentAvatar = "J" }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle form submission
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md">
        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-2">Change Avatar</h3>
          <p className="text-gray-600 mb-6">
            Choose an avatar to personalize your profile.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Avatar
              </label>
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl">
                {currentAvatar}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload New Avatar
              </label>
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-6">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="avatar-upload"
                />
                <label
                  htmlFor="avatar-upload"
                  className="cursor-pointer text-center"
                >
                  <div className="text-gray-600 mb-2">
                    <span className="text-blue-600 hover:text-blue-700">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </div>
                  <div className="text-sm text-gray-500">PNG, JPG (max 2MB)</div>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-[#98E9E9] text-gray-700 rounded-xl hover:bg-[#7CD5D5]"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditAvatarModal;
