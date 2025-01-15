import { X, Link as LinkIcon, Facebook, Twitter } from "lucide-react";

function ShareModal({ isOpen, onClose, post }) {
  const shareUrl = `${window.location.origin}/community/post/${post?.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Link copied to clipboard!");
  };

  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const handleTwitterShare = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white rounded-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Share Post</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
          >
            <LinkIcon className="w-5 h-5" />
            <span>Copy Link</span>
          </button>

          <button
            onClick={handleFacebookShare}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
          >
            <Facebook className="w-5 h-5 text-blue-600" />
            <span>Share on Facebook</span>
          </button>

          <button
            onClick={handleTwitterShare}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
          >
            <Twitter className="w-5 h-5 text-blue-400" />
            <span>Share on Twitter</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShareModal; 