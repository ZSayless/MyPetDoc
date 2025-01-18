import { useState } from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";

function ReportCommentModal({ isOpen, onClose, onSubmit }) {
  const { t } = useTranslation();
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ reason, description });
    setReason("");
    setDescription("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {t("blog.report.title")}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("blog.report.form.reason.label")}
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#98E9E9] focus:border-transparent"
            >
              <option value="">
                {t("blog.report.form.reason.placeholder")}
              </option>
              <option value="spam">
                {t("blog.report.form.reason.options.spam")}
              </option>
              <option value="harassment">
                {t("blog.report.form.reason.options.harassment")}
              </option>
              <option value="inappropriate">
                {t("blog.report.form.reason.options.inappropriate")}
              </option>
              <option value="other">
                {t("blog.report.form.reason.options.other")}
              </option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("blog.report.form.description.label")}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="4"
              className="w-full px-4 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-[#98E9E9] focus:border-transparent"
              placeholder={t("blog.report.form.description.placeholder")}
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              {t("blog.report.buttons.submit")}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              {t("blog.report.buttons.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReportCommentModal;
