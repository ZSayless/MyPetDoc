import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Eye, Trash2, Check, X, AlertTriangle } from "lucide-react";
import { useToast } from "../../../context/ToastContext";
import {
  fetchPosts,
  updatePostStatus,
  deletePostPermanently,
} from "../../../redux/slices/adminSlice";

function CommunityManagement() {
  const dispatch = useDispatch();
  const { addToast } = useToast();
  const {
    posts,
    isLoadingPosts,
    postsError,
    postsPagination,
    isUpdatingStatus,
    isDeletingPost,
  } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalMode, setModalMode] = useState("view");
  const [postToDelete, setPostToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    dispatch(fetchPosts({ page: currentPage, limit }));
  }, [dispatch, currentPage]);

  const filteredPosts = useMemo(() => {
    if (!searchTerm) return posts;

    const searchLower = searchTerm.toLowerCase();
    return posts.filter(
      (post) =>
        post.caption.toLowerCase().includes(searchLower) ||
        post.description.toLowerCase().includes(searchLower) ||
        post.tags.toLowerCase().includes(searchLower)
    );
  }, [posts, searchTerm]);

  const handleUpdateStatus = async (post) => {
    try {
      const newStatus = post.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
      await dispatch(
        updatePostStatus({
          id: post.id,
          status: newStatus,
        })
      ).unwrap();

      addToast({
        type: "success",
        message: `Successfully ${
          newStatus === "ACTIVE" ? "activated" : "temporarily locked"
        } the post!`,
      });
    } catch (error) {
      addToast({
        type: "error",
        message:
          error.message || "An error occurred while updating the status!",
      });
    }
  };

  const handleDeletePost = async () => {
    try {
      await dispatch(deletePostPermanently(postToDelete.id)).unwrap();
      addToast({
        type: "success",
        message: "Successfully deleted the post!",
      });
      setPostToDelete(null);
    } catch (error) {
      addToast({
        type: "error",
        message: error.message || "An error occurred while deleting the post!",
      });
    }
  };

  return (
    <div className="p-6 mt-12 md:mt-0">
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search posts..."
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
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Post
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pet type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Interaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
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
                        <div className="text-sm text-gray-500">{post.tags}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        post.pet_type === "DOG"
                          ? "bg-blue-100 text-blue-800"
                          : post.pet_type === "CAT"
                          ? "bg-green-100 text-green-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {post.pet_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleUpdateStatus(post)}
                      disabled={isUpdatingStatus}
                      className={`px-2 py-1 rounded-full flex items-center gap-2 ${
                        post.status === "ACTIVE"
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-red-100 text-red-800 hover:bg-red-200"
                      }`}
                    >
                      {post.status === "ACTIVE" ? (
                        <>
                          <Check size={16} />
                          Active
                        </>
                      ) : (
                        <>
                          <X size={16} />
                          Temporarily locked
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
                      <span className="text-sm text-gray-500">
                        {post.user_name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span>{post.likes_count} likes</span>
                      <span>{post.comments_count} comments</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(post.created_at).toLocaleDateString("vi-VN")}
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

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-gray-200">
          {filteredPosts.map((post) => (
            <div key={post.id} className="p-4">
              <div className="flex items-center gap-4 mb-3">
                <img
                  src={post.image_url}
                  alt={post.caption}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {post.caption}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">{post.tags}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        post.pet_type === "DOG"
                          ? "bg-blue-100 text-blue-800"
                          : post.pet_type === "CAT"
                          ? "bg-green-100 text-green-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {post.pet_type}
                    </span>
                    <button
                      onClick={() => handleUpdateStatus(post)}
                      disabled={isUpdatingStatus}
                      className={`px-2 py-1 rounded-full flex items-center gap-1 text-xs ${
                        post.status === "ACTIVE"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {post.status === "ACTIVE" ? (
                        <>
                          <Check size={12} />
                          Active
                        </>
                      ) : (
                        <>
                          <X size={12} />
                          Locked
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <div className="flex items-center gap-2">
                  <img
                    src={post.user_avatar}
                    alt={post.user_name}
                    className="h-5 w-5 rounded-full"
                  />
                  <span>{post.user_name}</span>
                </div>
                <span>
                  {new Date(post.created_at).toLocaleDateString("vi-VN")}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{post.likes_count} likes</span>
                  <span>{post.comments_count} comments</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedPost(post);
                      setModalMode("view");
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => setPostToDelete(post)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
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
          {postsError.message || "An error occurred while loading data"}
        </div>
      )}

      {/* Empty State */}
      {!isLoadingPosts && !postsError && filteredPosts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          {searchTerm ? "No posts found" : "No posts created yet"}
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
                <h2 className="text-xl font-semibold">Post details</h2>
                <button
                  onClick={() => setModalMode("")}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Add scroll for content */}
              <div className="p-6 overflow-y-auto">
                <div className="space-y-6">
                  {/* Post image */}
                  <div className="flex justify-center">
                    <img
                      src={selectedPost.image_url}
                      alt={selectedPost.caption}
                      className="rounded-lg max-h-[200px] object-cover"
                    />
                  </div>

                  {/* Basic information */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Title</h3>
                    <p className="mt-1 text-lg font-medium">
                      {selectedPost.caption}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Content
                    </h3>
                    <p className="mt-1 whitespace-pre-line text-gray-700">
                      {selectedPost.description}
                    </p>
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

                  {/* Classification information */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Pet type
                      </h3>
                      <span
                        className={`mt-1 px-2 py-1 inline-flex text-sm font-semibold rounded-full ${
                          selectedPost.pet_type === "DOG"
                            ? "bg-blue-100 text-blue-800"
                            : selectedPost.pet_type === "CAT"
                            ? "bg-green-100 text-green-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {selectedPost.pet_type}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Status
                      </h3>
                      <span
                        className={`mt-1 px-2 py-1 inline-flex text-sm font-semibold rounded-full ${
                          selectedPost.status === "ACTIVE"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {selectedPost.status === "ACTIVE"
                          ? "Active"
                          : "Temporarily locked"}
                      </span>
                    </div>
                  </div>

                  {/* Author information */}
                  <div className="border-t pt-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      Author information
                    </h3>
                    <div className="flex items-center">
                      <img
                        src={selectedPost.user_avatar}
                        alt={selectedPost.user_name}
                        className="h-10 w-10 rounded-full mr-3"
                      />
                      <div>
                        <p className="font-medium">{selectedPost.user_name}</p>
                        <p className="text-sm text-gray-500">
                          ID: {selectedPost.user_id}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Interaction statistics */}
                  <div className="border-t pt-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      Interaction statistics
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-2xl font-semibold text-blue-600">
                          {selectedPost.likes_count}
                        </p>
                        <p className="text-sm text-gray-500">Likes</p>
                      </div>
                      <div>
                        <p className="text-2xl font-semibold text-green-600">
                          {selectedPost.comments_count}
                        </p>
                        <p className="text-sm text-gray-500">Comments</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-purple-600">
                          {new Date(selectedPost.created_at).toLocaleDateString(
                            "vi-VN"
                          )}
                        </p>
                        <p className="text-sm text-gray-500">Created date</p>
                      </div>
                    </div>
                  </div>

                  {/* Additional information */}
                  <div className="border-t pt-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      Additional information
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Last updated date</p>
                        <p>
                          {new Date(selectedPost.updated_at).toLocaleString(
                            "vi-VN"
                          )}
                        </p>
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
                  Delete post
                </h3>
                <p className="text-sm text-center text-gray-500">
                  {postToDelete && (
                    <>
                      Are you sure you want to delete the post "
                      {postToDelete.caption}"?
                      <br />
                      This action cannot be undone.
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
                    Cancel
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
                        <span>Deleting...</span>
                      </>
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Pagination */}
      {!isLoadingPosts &&
        !postsError &&
        postsPagination &&
        postsPagination.totalPages > 0 && (
          <div className="flex items-center justify-between py-3">
            <div className="text-sm text-gray-500">
              Showing {currentPage} of {postsPagination.totalPages} pages
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1 || posts.length === 0}
                className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(postsPagination.totalPages, prev + 1)
                  )
                }
                disabled={
                  currentPage === postsPagination.totalPages ||
                  posts.length === 0
                }
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
