import { useState } from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";

function ReportCommentModal({ comment, onClose, onSubmit }) {
  const { t } = useTranslation();
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      reason,
      description,
      commentId: comment?.id,
    });
    setReason("");
    setDescription("");
  };

  if (!comment) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md relative">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">{t("blog.report.title")}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          {/* Comment Preview */}
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-gray-600">{comment.content}</p>
            <p className="text-xs text-gray-500 mt-1">
              {t("blog.report.commentBy")} {comment.userName}
            </p>
          </div>

          {/* Report Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("blog.report.form.reason.label")}
              </label>
              <select
                name="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <option value="misinformation">
                  {t("blog.report.form.reason.options.misinformation")}
                </option>
                <option value="other">
                  {t("blog.report.form.reason.options.other")}
                </option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("blog.report.form.notes.label")}
              </label>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t("blog.report.form.notes.placeholder")}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {t("blog.report.buttons.cancel")}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
            >
              {t("blog.report.buttons.submit")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReportCommentModal;
