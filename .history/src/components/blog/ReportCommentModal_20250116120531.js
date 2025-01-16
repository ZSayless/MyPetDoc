import { X, Flag } from "lucide-react";
import { useState } from 'react';

function ReportCommentModal({ onClose, commentId }) {
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle report submission
    console.log('Report submitted:', { commentId, reason });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Report Comment</h3>
          <form onSubmit={handleSubmit}>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Why are you reporting this comment?"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
              rows="4"
              required
            />
            <div className="mt-4 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Submit Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReportCommentModal;
