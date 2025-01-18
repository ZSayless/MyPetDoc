import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { MessageCircle, Flag } from "lucide-react";
import ReportCommentModal from "./ReportCommentModal";

function BlogDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);

  // Mock data cho demo
  useEffect(() => {
    // Giả lập API call để lấy chi tiết blog
    setBlog({
      id: 1,
      title: "Chăm sóc chó con đúng cách",
      author: "TS. Nguyễn Văn A",
      date: "2024-03-15",
      readTime: "5",
      image: "https://example.com/image.jpg",
      content: "Nội dung bài viết...",
    });

    // Giả lập API call để lấy comments
    setComments([
      {
        id: 1,
        author: "Mai Anh",
        date: "2024-03-16",
        content: "Bài viết rất hữu ích!",
      },
      {
        id: 2,
        author: "Hoàng Nam",
        date: "2024-03-16",
        content: "Cảm ơn bạn đã chia sẻ.",
      },
    ]);
  }, [id]);

  const handleComment = () => {
    if (!comment.trim()) return;

    const newComment = {
      id: comments.length + 1,
      author: "Người dùng hiện tại",
      date: new Date().toISOString().split('T')[0],
      content: comment,
    };

    setComments([...comments, newComment]);
    setComment("");
  };

  const handleReport = (commentId) => {
    setSelectedCommentId(commentId);
    setShowReportModal(true);
  };

  const handleReportSubmit = (reportData) => {
    console.log("Report submitted:", { commentId: selectedCommentId, ...reportData });
    // Thêm logic xử lý báo cáo ở đây
  };

  if (!blog) {
    return <div className="min-h-screen bg-gray-50 py-12">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
          {/* Blog Header */}
          <div className="p-6 md:p-8">
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span>{t("blog.detail.publishedOn")} {blog.date}</span>
              <span className="mx-2">•</span>
              <span>{t("blog.detail.by")} {blog.author}</span>
              <span className="mx-2">•</span>
              <span>{blog.readTime} {t("blog.detail.readTime")}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1A3C8E] mb-6">
              {blog.title}
            </h1>
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-[400px] object-cover rounded-lg mb-8"
            />
            <div className="prose max-w-none">
              {blog.content}
            </div>
          </div>

          {/* Comments Section */}
          <div className="border-t">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">
                {t("blog.detail.comments")}
              </h2>

              {/* Comment Form */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">
                  {t("blog.detail.writeComment")}
                </h3>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows="4"
                  className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-[#1A3C8E] focus:border-transparent"
                  placeholder={t("blog.detail.writeComment")}
                />
                <button
                  onClick={handleComment}
                  className="mt-2 px-6 py-2 bg-[#1A3C8E] text-white rounded-lg hover:bg-[#15307A] transition-colors"
                >
                  {t("blog.detail.submit")}
                </button>
              </div>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{comment.author}</h4>
                        <p className="text-sm text-gray-500">{comment.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleReport(comment.id)}
                          className="text-sm text-red-500 hover:underline flex items-center gap-1"
                        >
                          <Flag className="w-4 h-4" />
                          {t("blog.detail.reportComment")}
                        </button>
                      </div>
                    </div>
                    <p>{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* Report Modal */}
      <ReportCommentModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        onSubmit={handleReportSubmit}
      />
    </div>
  );
}

export default BlogDetail;
