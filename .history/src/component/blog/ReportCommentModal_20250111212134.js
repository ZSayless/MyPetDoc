import { X, Flag } from "lucide-react";
import { useLanguage } from '../../contexts/LanguageContext';

function ReportCommentModal({ comment, onClose, onSubmit }) {
  const { t } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const reportData = {
      reason: formData.get("reason"),
      additionalNotes: formData.get("additionalNotes"),
      commentId: comment.id,
      reportedUser: comment.author,
    };
    onSubmit(reportData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md relative">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">{t('reportComment')}</h2>
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
              Bình luận bởi {comment.author}
            </p>
          </div>

          {/* Report Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('reportReason')} *
              </label>
              <select
                name="reason"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{t('selectReason')}</option>
                <option value="spam">{t('spam')}</option>
                <option value="harassment">{t('harassment')}</option>
                <option value="inappropriate">{t('inappropriate')}</option>
                <option value="misinformation">{t('misinformation')}</option>
                <option value="other">{t('other')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('additionalNotes')}
              </label>
              <textarea
                name="additionalNotes"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t('notesPlaceholder')}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
            >
              {t('submitReport')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReportCommentModal;
