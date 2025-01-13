import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, MoreHorizontal } from "lucide-react";
import heart from "../../assets/img/heart.svg";
import comment from "../../assets/img/comment.svg";
import { useParams } from "react-router-dom";

// Add animation keyframes
const slideInAnimation = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

// Mock data cho comments
const mockComments = [
  {
    id: 1,
    user: {
      name: "Nguyễn Phan Dank",
      avatar: "N",
    },
    content: "Bài viết rất hay và bổ ích",
    createdAt: "2 tháng trước",
    likes: 1,
    replies: [
      {
        id: 1,
        user: {
          name: "Sơn Đặng",
          avatar: "S",
        },
        content: "Cảm ơn bạn đã theo dõi!",
        createdAt: "2 tháng trước",
        likes: 0,
      },
    ],
  },
];

// Giả lập API call
const fetchBlogDetail = async (id) => {
  // Trong thực tế, đây sẽ là API call
  return {
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
    likes: 20,
    comments: mockComments,
  };
};

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(20);
  const [commentsCount, setCommentsCount] = useState(2);
  const [isLiked, setIsLiked] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentLikes, setCommentLikes] = useState({});
  const [showReplyInput, setShowReplyInput] = useState(null);
  const [showOptions, setShowOptions] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [commentsList, setCommentsList] = useState([]);

  useEffect(() => {
    const loadBlogDetail = async () => {
      try {
        setLoading(true);
        const data = await fetchBlogDetail(id);
        setBlog(data);
        setLikes(data.likes);
        setCommentsList(data.comments);
        setCommentsCount(data.comments.length);
      } catch (error) {
        console.error("Failed to load blog:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogDetail();
  }, [id]);

  // Tạo style cho heart icon khi được like
  const heartIconStyle = {
    filter: isLiked
      ? "invert(27%) sepia(91%) saturate(2352%) hue-rotate(331deg) brightness(94%) contrast(96%)"
      : "none",
  };

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleComment = () => {
    setShowCommentModal(true);
  };

  const handleCloseModal = () => {
    setShowCommentModal(false);
  };

  const handleCommentLike = (commentId) => {
    setCommentLikes((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleReply = (commentId) => {
    setShowReplyInput(showReplyInput === commentId ? null : commentId);
  };

  const handleShowOptions = (commentId, event) => {
    event.stopPropagation();
    setShowOptions(showOptions === commentId ? null : commentId);
  };

  const handleReplySubmit = async (commentId) => {
    if (!replyText.trim()) return;

    try {
      const newReply = {
        id: Date.now(),
        user: {
          name: "Bạn",
          avatar: "B",
        },
        content: replyText,
        createdAt: "Vừa xong",
        likes: 0,
      };

      setCommentsList((prevComments) =>
        prevComments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              replies: [...comment.replies, newReply],
            };
          }
          return comment;
        })
      );

      setReplyText("");
      setShowReplyInput(null);
    } catch (error) {
      console.error("Failed to submit reply:", error);
    }
  };

  const handleReport = async (commentId) => {
    try {
      // Thêm xử lý click outside cho menu options
      const handleClickOutside = (e) => {
        if (!e.target.closest(".comment-options")) {
          setShowOptions(null);
          document.removeEventListener("click", handleClickOutside);
        }
      };
      document.addEventListener("click", handleClickOutside);

      alert("Đã gửi báo cáo vi phạm!");
      setShowOptions(null);
    } catch (error) {
      console.error("Failed to report comment:", error);
    }
  };

  if (loading) {
    return <div className="py-12 text-center">Đang tải...</div>;
  }

  if (!blog) {
    return <div className="py-12 text-center">Không tìm thấy bài viết</div>;
  }

  return (
    <>
      <style>{slideInAnimation}</style>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-2 relative">
              <div className="sticky top-[50px] left-0 right-0 w-full">
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
                    onClick={handleComment}
                  >
                    <img src={comment} width={"20px"} />
                    {commentsCount}
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
                    <img
                      src={blog.author.avatar}
                      alt="Author avatar"
                      className="w-12 h-12 rounded-full object-cover"
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
                  Bài đăng cùng tác giả
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
                      Tại sao nên thêm rel="noopener" khi sử dụng
                      target="_blank"?
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
            </div>
            <div className="col-span-12 lg:col-span-2"></div>
          </div>
        </div>
      </section>

      {/* Comment Modal */}
      {showCommentModal && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/30 z-[998] transition-opacity duration-300"
            onClick={handleCloseModal}
          />
          <div
            className="fixed inset-y-0 right-0 w-[600px] bg-white z-[999] shadow-lg animate-[slideIn_0.3s_ease-out]"
            style={{
              boxShadow: "-5px 0 25px rgba(0,0,0,0.1)",
            }}
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b p-4 bg-white sticky top-0">
                <div className="text-lg font-medium">
                  {commentsList.length} bình luận
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Comment Input */}
              <div className="p-4 border-b bg-white sticky top-[65px]">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-[#1a1a1a] rounded-full flex items-center justify-center text-white text-sm">
                    T
                  </div>
                  <div className="flex-1">
                    <div className="bg-[#f1f1f1] rounded-lg p-3 hover:bg-[#e8e8e8] transition-colors">
                      <input
                        type="text"
                        placeholder="Nhập bình luận mới của bạn"
                        className="w-full bg-transparent outline-none placeholder:text-gray-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="flex-1 overflow-y-auto bg-[#f7f8fa]">
                {commentsList.map((comment) => (
                  <div key={comment.id} className="p-4 border-b bg-white">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                        {comment.user.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">
                            {comment.user.name}
                          </span>
                          <div className="relative comment-options">
                            <button
                              onClick={(e) => handleShowOptions(comment.id, e)}
                              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            >
                              <MoreHorizontal size={16} />
                            </button>
                            {showOptions === comment.id && (
                              <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg py-2 w-48 z-10 border border-gray-100">
                                <button
                                  onClick={() => handleReport(comment.id)}
                                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm flex items-center gap-2 text-red-500"
                                >
                                  Báo cáo vi phạm
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-800 mt-1">{comment.content}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span>{comment.createdAt}</span>
                          <button
                            onClick={() => handleCommentLike(comment.id)}
                            className={`hover:text-blue-500 ${
                              commentLikes[comment.id] ? "text-blue-500" : ""
                            }`}
                          >
                            Thích
                          </button>
                          <button
                            onClick={() => handleReply(comment.id)}
                            className="hover:text-blue-500"
                          >
                            Phản hồi
                          </button>
                        </div>
                        {showReplyInput === comment.id && (
                          <div className="mt-3 flex gap-3">
                            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm">
                              B
                            </div>
                            <div className="flex-1">
                              <div className="bg-[#f1f1f1] rounded-lg p-3 hover:bg-[#e8e8e8]">
                                <input
                                  type="text"
                                  placeholder="Viết phản hồi..."
                                  className="w-full bg-transparent outline-none"
                                  value={replyText}
                                  onChange={(e) => setReplyText(e.target.value)}
                                  onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                      handleReplySubmit(comment.id);
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        {comment.replies?.length > 0 && (
                          <div className="ml-10 mt-3 space-y-3">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="flex gap-3">
                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">
                                  {reply.user.avatar}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium">
                                      {reply.user.name}
                                    </span>
                                  </div>
                                  <p className="text-gray-800 mt-1">
                                    {reply.content}
                                  </p>
                                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                    <span>{reply.createdAt}</span>
                                    <button className="hover:text-blue-500">
                                      Thích
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BlogDetail;
