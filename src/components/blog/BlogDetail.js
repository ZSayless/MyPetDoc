import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { X, MoreHorizontal, Flag, Heart, Trash2 } from "lucide-react";
import heart from "../../assets/img/heart.svg";
import comment from "../../assets/img/comment.svg";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const { t } = useTranslation();
  const menuRefs = useRef({});
  const [replyingTo, setReplyingTo] = useState(null);
  const { user, isAuthenticated } = useAuth();
  const [showCommentPopup, setShowCommentPopup] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // Giả lập API call
        const data = {
          id,
          title: "Hoàng Bảo Trung - Học viên tiêu biểu của F8...",
          content: "...",
          author: {
            id: 1,
            name: "Sơn Đặng",
            avatar:
              "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
          },
          createdAt: "3 tháng trước",
          readTime: "6 phút đọc",
          likes: 0,
        };
        setBlog(data);
        setLikes(data.likes);
      } catch (error) {
        console.error("Failed to load blog:", error);
        setError("Failed to load blog. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickedOutside = Object.values(menuRefs.current).every(
        (ref) => ref && !ref.contains(event.target)
      );
      if (isClickedOutside) {
        setSelectedComment(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const heartIconStyle = {
    filter: isLiked
      ? "invert(27%) sepia(91%) saturate(2352%) hue-rotate(331deg) brightness(94%) contrast(96%)"
      : "none",
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert(t("blog.comments.loginRequired"));
      return;
    }

    const comment = {
      id: Date.now(),
      content: newComment,
      author: user,
      createdAt: new Date().toISOString(),
      replies: [],
    };

    setComments((prev) => [...prev, comment]);
    setNewComment("");
  };

  const handleReplySubmit = (e, parentId) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert(t("blog.comments.loginRequired"));
      return;
    }

    const reply = {
      id: Date.now(),
      content: e.target.reply.value,
      author: user,
      createdAt: new Date().toISOString(),
    };

    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...comment.replies, reply],
          };
        }
        return comment;
      })
    );

    setReplyingTo(null);
  };

  const handleReportComment = (commentId) => {
    setSelectedComment(null);
    alert(t("blog.comments.reportSuccess"));
  };

  const handleDeleteComment = (commentId) => {
    if (window.confirm(t("blog.comments.confirmDelete"))) {
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    }
  };

  useEffect(() => {
    if (!selectedComment) {
      setShowReportModal(false);
    }
  }, [selectedComment]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!blog) return <div>Blog not found</div>;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-2">
            <div className="lg:sticky lg:top-[100px] w-full">
              <div className="font-[600] text-[#000]">Sơn Đặng</div>
              <div className="text-[13px] pt-[5px] pb-[5px] text-[#757575] border-b border-[#7575753f]">
                Stop thinking, start doing!
              </div>
              <div className="flex gap-[20px] mt-[20px]">
                <div
                  className={`flex gap-[4px] items-center ${
                    isLiked ? "text-red-500" : "text-[#757575]"
                  } cursor-pointer hover:text-red-500 transition-colors`}
                  onClick={handleLike}
                >
                  <img
                    src={heart}
                    width={"20px"}
                    style={heartIconStyle}
                    className="transition-all"
                  />
                  {likes}
                </div>

                <div
                  className="ms-4 flex gap-[4px] items-center text-[#757575] cursor-pointer hover:text-blue-500 transition-colors"
                  onClick={() => setShowCommentPopup(true)}
                >
                  <img src={comment} width={"20px"} />
                  {comments.length}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <div className="">
              <h1 className="text-[#222] text-2xl lg:text-3xl font-bold leading-tight mb-6">
                {blog.title}
              </h1>
              <div className="flex items-center gap-4 pb-4 border-b border-gray-200 mb-6">
                <div className="flex-shrink-0">
                  <LazyLoadImage
                    src={blog.author.avatar}
                    alt="Author avatar"
                    className="w-12 h-12 rounded-full object-cover"
                    effect="blur"
                    placeholderSrc="/placeholder-image.jpg"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-[#292929] text-base">
                    {blog.author.name}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {blog.createdAt} • {blog.readTime}
                  </span>
                </div>
              </div>
              <p className="text-[#292929] mb-4">{blog.content}</p>
            </div>
            <div className="mt-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                  Front-end
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                  ReactJS
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                  UI
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                  UX
                </span>
              </div>

              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                More posts from author
              </h2>

              <ul className="space-y-2 list-disc text-[#000] pl-[20px]">
                <li>
                  <Link
                    to="#"
                    className="text-gray-700 hover:text-blue-600 text-[15px]"
                  >
                    Tổng hợp các sản phẩm của học viên tại F8
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-700 hover:text-blue-600 text-[15px]"
                  >
                    [Phần 1] Tạo dự án ReactJS với Webpack và Babel
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-700 hover:text-blue-600 text-[15px]"
                  >
                    [Vlog] Review tất cả đồ mình sử dụng cho F8
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-700 hover:text-blue-600 text-[15px]"
                  >
                    Tại sao nên thêm rel="noopener" khi sử dụng target="_blank"?
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-700 hover:text-blue-600 text-[15px]"
                  >
                    Áo Polo F8 Đã Về! Trên Tay Áo Polo F8 Của F8
                  </Link>
                </li>
              </ul>
            </div>
            <div className="">
              <div className="border-b border-gray-200 pb-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                  Other featured posts
                </h1>
                <p className="text-gray-600 mt-2">
                  Posted by {blog.author.name} · {blog.createdAt}
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Tổng hợp các sản phẩm của học viên tại F8{" "}
                  <span role="img" aria-label="clapping hands">
                    👏👏
                  </span>
                </h2>
                <div className="w-full rounded-lg overflow-hidden">
                  <LazyLoadImage
                    src="https://files.fullstack.edu.vn/f8-prod/blog_posts/65/6139fe28a9844.png"
                    className="w-full object-cover"
                    effect="blur"
                    placeholderSrc="/placeholder-image.jpg"
                  />
                </div>
                <p className="text-gray-700">
                  Bài viết này nhằm tổng hợp lại các dự án mà học viên F8 đã
                  hoàn thành và chia sẻ trên nhóm
                  <Link
                    href="https://www.facebook.com/groups/f8official"
                    className="text-blue-500 ml-1"
                  >
                    Học lập trình web F8
                  </Link>
                  . Các dự án dưới đây được mình ngẫu nhiên lựa chọn để đăng chứ
                  không mang tính xếp hạng các bạn nhé.
                </p>
                <Link
                  href="https://fullstack.edu.vn"
                  className="text-red-500 font-semibold hover:underline"
                >
                  Xem thêm hàng trăm dự án khác do học viên F8 tự làm.
                </Link>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-2"></div>
        </div>
      </div>

      {/* Comments Popup */}
      {showCommentPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-lg max-h-[90vh] flex flex-col">
            {/* Popup Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">
                {t("blog.comments.title")}
              </h3>
              <button
                onClick={() => setShowCommentPopup(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {comments.length === 0 ? (
                <p className="text-center text-gray-500">
                  {t("blog.comments.noComments")}
                </p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="border rounded-lg p-4">
                    {/* Comment Header */}
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          {comment.author.name[0]}
                        </div>
                        <div>
                          <h4 className="font-medium">{comment.author.name}</h4>
                          <p className="text-sm text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* Comment Actions */}
                      <div
                        className="relative"
                        ref={(el) => (menuRefs.current[comment.id] = el)}
                      >
                        <button
                          onClick={() =>
                            setSelectedComment(
                              selectedComment === comment.id ? null : comment.id
                            )
                          }
                          className="p-1 hover:bg-gray-100 rounded-full"
                        >
                          <MoreHorizontal className="w-5 h-5" />
                        </button>

                        {selectedComment === comment.id && (
                          <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border py-1 z-10">
                            {user?.id === comment.author.id && (
                              <button
                                onClick={() => handleDeleteComment(comment.id)}
                                className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <Trash2 className="w-4 h-4" />
                                {t("blog.comments.actions.delete")}
                              </button>
                            )}
                            <button
                              onClick={() => handleReportComment(comment.id)}
                              className="w-full px-4 py-2 text-left text-gray-600 hover:bg-gray-50 flex items-center gap-2"
                            >
                              <Flag className="w-4 h-4" />
                              {t("blog.comments.actions.report")}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Comment Content */}
                    <p className="text-gray-700">{comment.content}</p>

                    {/* Reply Button */}
                    <button
                      onClick={() => setReplyingTo(comment.id)}
                      className="mt-2 text-sm text-blue-500 hover:text-blue-600"
                    >
                      {t("blog.comments.actions.reply")}
                    </button>

                    {/* Reply Form */}
                    {replyingTo === comment.id && (
                      <form
                        onSubmit={(e) => handleReplySubmit(e, comment.id)}
                        className="mt-3"
                      >
                        <textarea
                          name="reply"
                          placeholder={t("blog.comments.writeReply")}
                          className="w-full p-2 text-sm border rounded-lg"
                          rows="2"
                          required
                        />
                        <div className="flex justify-end gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() => setReplyingTo(null)}
                            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                          >
                            {t("blog.comments.actions.cancel")}
                          </button>
                          <button
                            type="submit"
                            className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                          >
                            {t("blog.comments.actions.reply")}
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Replies */}
                    {comment.replies?.length > 0 && (
                      <div className="mt-4 pl-4 border-l space-y-4">
                        {comment.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className="bg-gray-50 rounded-lg p-3"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                                {reply.author.name[0]}
                              </div>
                              <div>
                                <h5 className="font-medium text-sm">
                                  {reply.author.name}
                                </h5>
                                <p className="text-xs text-gray-500">
                                  {new Date(
                                    reply.createdAt
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <p className="text-sm text-gray-700">
                              {reply.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Comment Form */}
            <div className="border-t p-4">
              <form onSubmit={handleSubmitComment}>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={
                    isAuthenticated
                      ? t("blog.comments.placeholder") // This exists in EN translation
                      : t("blog.comments.loginRequired") // Need to add this key to both EN and VI
                  }
                  className="w-full p-3 border rounded-lg resize-none"
                  rows="3"
                  disabled={!isAuthenticated}
                />
                <button
                  type="submit"
                  className="w-full mt-3 py-2 bg-[#1A73E8] text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                  disabled={!isAuthenticated || !newComment.trim()}
                >
                  {isAuthenticated
                    ? t("blog.comments.postComment") // This exists in EN translation
                    : t("blog.comments.loginToComment") // Need to add this key to both EN and VI
                }
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogDetail;