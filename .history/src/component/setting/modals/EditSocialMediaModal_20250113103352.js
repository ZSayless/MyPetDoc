import { X } from "lucide-react";

function EditSocialMediaModal({ platform, value, onClose, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSubmit(formData.get("link"));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md">
        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-2">{platform}</h3>

          {platform === "GitHub" && (
            <p className="text-gray-600 mb-6">
              Your GitHub URL will be displayed on your profile. Example:
              https://github.com/username
            </p>
          )}
          {platform !== "GitHub" && (
            <p className="text-gray-600 mb-6">
              Enter the URL to your {platform} profile
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {platform} URL
              </label>
              <input
                type="text"
                name="link"
                defaultValue={value}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                placeholder={`Enter your ${platform.toLowerCase()} URL`}
              />
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

export default EditSocialMediaModal;
