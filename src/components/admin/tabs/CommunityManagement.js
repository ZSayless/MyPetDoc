import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Eye, Trash2, Check, X, AlertTriangle } from "lucide-react";
import { useToast } from "../../../context/ToastContext";
import { fetchPosts, updatePostStatus, deletePostPermanently } from "../../../redux/slices/adminSlice";

function CommunityManagement() {
  const dispatch = useDispatch();
  const { addToast } = useToast();
  const { posts, isLoadingPosts, postsError, postsPagination, isUpdatingStatus, isDeletingPost } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalMode, setModalMode] = useState("view"); // chỉ còn "view"
  const [postToDelete, setPostToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10; // số items mỗi trang

  useEffect(() => {
    dispatch(fetchPosts({ page: currentPage, limit }));
  }, [dispatch, currentPage]);

  const filteredPosts = useMemo(() => {
    if (!searchTerm) return posts;

    const searchLower = searchTerm.toLowerCase();
    return posts.filter(
      post =>
        post.caption.toLowerCase().includes(searchLower) ||
        post.description.toLowerCase().includes(searchLower) ||
        post.tags.toLowerCase().includes(searchLower)
    );
  }, [posts, searchTerm]);

  const handleUpdateStatus = async (post) => {
    try {
      const newStatus = post.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
      await dispatch(updatePostStatus({ 
        id: post.id, 
        status: newStatus 
      })).unwrap();
      
      addToast({
        type: "success",
        message: `Đã ${newStatus === 'ACTIVE' ? 'kích hoạt' : 'tạm khóa'} bài viết thành công!`
      });
    } catch (error) {
      addToast({
        type: "error",
        message: error.message || "Có lỗi xảy ra khi cập nhật trạng thái!"
      });
    }
  };

  const handleDeletePost = async () => {
    try {
      await dispatch(deletePostPermanently(postToDelete.id)).unwrap();
      addToast({
        type: "success",
        message: "Xóa bài viết thành công!"
      });
      setPostToDelete(null);
    } catch (error) {
      addToast({
        type: "error",
        message: error.message || "Có lỗi xảy ra khi xóa bài viết!"
      });
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Quản lý bài viết cộng đồng</h2>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm bài viết..."
            className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <Search 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Posts List */}
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bài viết
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Loại thú cưng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tác giả
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tương tác
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày tạo
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPosts.map((post) => (
                <tr key={post.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img 
                        src={post.image_url} 
                        alt={post.caption}
                        className="h-10 w-10 rounded-lg object-cover mr-3"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {post.caption}
                        </div>
                        <div className="text-sm text-gray-500">
                          {post.tags}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      post.pet_type === 'DOG' 
                        ? 'bg-blue-100 text-blue-800'
                        : post.pet_type === 'CAT'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {post.pet_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleUpdateStatus(post)}
                      disabled={isUpdatingStatus}
                      className={`px-2 py-1 rounded-full flex items-center gap-2 ${
                        post.status === 'ACTIVE'
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                    >
                      {post.status === 'ACTIVE' ? (
                        <>
                          <Check size={16} />
                          Hoạt động
                        </>
                      ) : (
                        <>
                          <X size={16} />
                          Tạm khóa
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img 
                        src={post.user_avatar} 
                        alt={post.user_name}
                        className="h-6 w-6 rounded-full mr-2"
                      />
                      <span className="text-sm text-gray-500">{post.user_name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span>{post.likes_count} thích</span>
                      <span>{post.comments_count} bình luận</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(post.created_at).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedPost(post);
                          setModalMode("view");
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => setPostToDelete(post)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Loading State */}
      {isLoadingPosts && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}

      {/* Error State */}
      {postsError && (
        <div className="text-center py-8 text-red-500">
          {postsError.message || 'Có lỗi xảy ra khi tải dữ liệu'}
        </div>
      )}

      {/* Empty State */}
      {!isLoadingPosts && !postsError && filteredPosts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          {searchTerm ? 'Không tìm thấy bài viết phù hợp' : 'Chưa có bài viết nào'}
        </div>
      )}

      {/* View Modal */}
      {modalMode === "view" && selectedPost && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
            onClick={() => setModalMode("")}
          />
          <div className="fixed inset-0 flex items-center justify-center z-[110] p-4">
            <div 
              className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center px-6 py-4 border-b shrink-0">
                <h2 className="text-xl font-semibold">
                  Chi tiết bài viết
                </h2>
                <button
                  onClick={() => setModalMode("")}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Thêm scroll cho phần nội dung */}
              <div className="p-6 overflow-y-auto">
                <div className="space-y-6">
                  {/* Hình ảnh bài viết */}
                  <div className="flex justify-center">
                    <img 
                      src={selectedPost.image_url} 
                      alt={selectedPost.caption}
                      className="rounded-lg max-h-[200px] object-cover"
                    />
                  </div>

                  {/* Thông tin cơ bản */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Tiêu đề</h3>
                    <p className="mt-1 text-lg font-medium">{selectedPost.caption}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Nội dung</h3>
                    <p className="mt-1 whitespace-pre-line text-gray-700">{selectedPost.description}</p>
                  </div>

                  {/* Tags */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Tags</h3>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {selectedPost.tags.split(",").map((tag, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Thông tin phân loại */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Loại thú cưng</h3>
                      <span className={`mt-1 px-2 py-1 inline-flex text-sm font-semibold rounded-full ${
                        selectedPost.pet_type === 'DOG' 
                          ? 'bg-blue-100 text-blue-800'
                          : selectedPost.pet_type === 'CAT'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {selectedPost.pet_type}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Trạng thái</h3>
                      <span className={`mt-1 px-2 py-1 inline-flex text-sm font-semibold rounded-full ${
                        selectedPost.status === 'ACTIVE'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedPost.status === 'ACTIVE' ? 'Hoạt động' : 'Tạm khóa'}
                      </span>
                    </div>
                  </div>

                  {/* Thông tin tác giả */}
                  <div className="border-t pt-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Thông tin tác giả</h3>
                    <div className="flex items-center">
                      <img 
                        src={selectedPost.user_avatar} 
                        alt={selectedPost.user_name}
                        className="h-10 w-10 rounded-full mr-3"
                      />
                      <div>
                        <p className="font-medium">{selectedPost.user_name}</p>
                        <p className="text-sm text-gray-500">ID: {selectedPost.user_id}</p>
                      </div>
                    </div>
                  </div>

                  {/* Thống kê tương tác */}
                  <div className="border-t pt-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Thống kê tương tác</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-2xl font-semibold text-blue-600">{selectedPost.likes_count}</p>
                        <p className="text-sm text-gray-500">Lượt thích</p>
                      </div>
                      <div>
                        <p className="text-2xl font-semibold text-green-600">{selectedPost.comments_count}</p>
                        <p className="text-sm text-gray-500">Bình luận</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-purple-600">
                          {new Date(selectedPost.created_at).toLocaleDateString('vi-VN')}
                        </p>
                        <p className="text-sm text-gray-500">Ngày đăng</p>
                      </div>
                    </div>
                  </div>

                  {/* Thông tin bổ sung */}
                  <div className="border-t pt-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Thông tin bổ sung</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Ngày cập nhật cuối</p>
                        <p>{new Date(selectedPost.updated_at).toLocaleString('vi-VN')}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Slug</p>
                        <p className="break-all">{selectedPost.slug}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {postToDelete && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
            onClick={() => setPostToDelete(null)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-[110] p-4">
            <div 
              className="bg-white rounded-lg w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-center text-gray-900">
                  Xóa bài viết
                </h3>
                <p className="text-sm text-center text-gray-500">
                  {postToDelete && (
                    <>
                      Bạn có chắc chắn muốn xóa bài viết "{postToDelete.caption}"? 
                      <br />
                      Hành động này không thể hoàn tác.
                    </>
                  )}
                </p>
                <div className="flex justify-center gap-3 mt-6">
                  <button
                    type="button"
                    disabled={isDeletingPost}
                    onClick={() => setPostToDelete(null)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    disabled={isDeletingPost}
                    onClick={handleDeletePost}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 min-w-[100px]"
                  >
                    {isDeletingPost ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Đang xóa...</span>
                      </>
                    ) : (
                      'Xóa'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Pagination */}
      {!isLoadingPosts && !postsError && postsPagination && postsPagination.totalPages > 0 && (
        <div className="flex items-center justify-between py-3">
          <div className="text-sm text-gray-500">
            Showing {currentPage} of {postsPagination.totalPages} pages
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1 || posts.length === 0}
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(postsPagination.totalPages, prev + 1))}
              disabled={currentPage === postsPagination.totalPages || posts.length === 0}
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommunityManagement;
