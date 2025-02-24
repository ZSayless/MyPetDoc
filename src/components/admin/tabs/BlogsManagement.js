import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
  Trash,
  X,
  Loader2,
} from "lucide-react";
import {
  deleteBlog,
  updateBlogStatus,
  fetchBlogPosts,
  fetchDeletedBlogs,
  createBlogPost,
  updateBlogPost,
  toggleDeleteBlog,
  deleteBlogPermanently,
} from "../../../redux/slices/adminSlice";
import { useToast } from "../../../context/ToastContext";
import { useTranslation } from "react-i18next";

const POST_TYPES = ["BLOG", "NEWS", "EVENT"];
const STATUS_TYPES = ["DRAFT", "PENDING", "PUBLISHED", "ARCHIVED"];
const CATEGORIES = [
  "PET_CARE",
  "PET_HEALTH",
  "PET_TRAINING",
  "PET_FOOD",
  "PET_LIFESTYLE",
];
const BLOG_TAGS = [
  "Health Tips",
  "Pet Care",
  "Nutrition",
  "Behavior",
  "Training",
  "Grooming",
  "Vaccination",
  "Disease Prevention",
  "First Aid",
  "Mental Health",
  "Exercise",
  "Breeding",
  "Senior Pet Care",
  "Puppy Care",
  "Emergency Care",
];

function BlogsManagement() {
  const dispatch = useDispatch();
  const { addToast } = useToast();
  const {
    blogs,
    deletedBlogs,
    loading,
    isSubmittingBlog,
    pagination,
    deletedPagination,
  } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("list");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  // State cho form tạo mới
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    summary: "",
    post_type: "BLOG",
    category: "PET_CARE",
    tags: [],
    status: "DRAFT",
    meta_title: "",
    meta_description: "",
    source: "",
    external_link: "",
    hospital_id: "",
  });
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const [previewFeatured, setPreviewFeatured] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Thêm state để quản lý phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Thêm state cho confirm modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  const { t } = useTranslation();

  useEffect(() => {
    if (activeTab === "list") {
      dispatch(fetchBlogPosts({ page: currentPage, limit: itemsPerPage }));
    } else {
      dispatch(fetchDeletedBlogs({ page: currentPage, limit: itemsPerPage }));
    }
  }, [dispatch, activeTab, currentPage, itemsPerPage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === "thumbnail") {
        setThumbnailImage(file);
        setPreviewThumbnail(URL.createObjectURL(file));
      } else {
        setFeaturedImage(file);
        setPreviewFeatured(URL.createObjectURL(file));
      }
    }
  };

  const validateForm = () => {
    // Validate title
    if (!formData.title || formData.title.trim().length < 10) {
      addToast({
        type: "error",
        message: "Title cannot be empty and must be at least 10 characters",
      });
      return false;
    }

    // Validate content
    if (!formData.content || formData.content.trim().length < 50) {
      addToast({
        type: "error",
        message: "Content cannot be empty and must be at least 50 characters",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const formDataToSubmit = new FormData();

      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          formDataToSubmit.append(key, formData[key]);
        }
      });

      if (thumbnailImage) {
        formDataToSubmit.append("thumbnail_image", thumbnailImage);
      }
      if (featuredImage) {
        formDataToSubmit.append("featured_image", featuredImage);
      }

      let result;
      if (selectedBlog) {
        result = await dispatch(
          updateBlogPost({
            id: selectedBlog.id,
            formData: formDataToSubmit,
          })
        ).unwrap();
      } else {
        result = await dispatch(createBlogPost(formDataToSubmit)).unwrap();
      }

      // Check the result from the API
      if (result?.status === "error") {
        addToast({
          type: "error",
          message: `An error occurred: ${result.message || "Invalid data"}`,
        });
        return;
      }

      addToast({
        type: "success",
        message: `${selectedBlog ? "Updated" : "Created"} blog successfully`,
      });

      setShowCreateModal(false);
      resetForm();
      dispatch(fetchBlogPosts({ page: currentPage, limit: itemsPerPage }));
    } catch (error) {
      addToast({
        type: "error",
        message: `An error occurred: ${error.message || "Invalid data"}`,
      });
      console.error("API Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await dispatch(deleteBlog(blogId));
        addToast({
          type: "success",
          message: "Deleted blog successfully",
        });
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "An error occurred when deleting the blog";

        addToast({
          type: "error",
          message: errorMessage,
        });
      }
    }
  };

  const handleView = (blog) => {
    setSelectedBlog(blog);
    setShowViewModal(true);
  };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      summary: blog.summary,
      post_type: blog.post_type,
      category: blog.category,
      tags: blog.tags.split(",").map((tag) => tag.trim()),
      status: blog.status,
      meta_title: blog.meta_title || "",
      meta_description: blog.meta_description || "",
      source: blog.source || "",
      external_link: blog.external_link || "",
      hospital_id: blog.hospital_id || "",
    });
    setPreviewThumbnail(blog.thumbnail_image);
    setPreviewFeatured(blog.featured_image);
    setShowCreateModal(true);
    setShowViewModal(false);
  };

  const handlePublish = (blogId) => {
    dispatch(updateBlogStatus({ blogId, status: "published" }));
  };

  const handleToggleDelete = async (blog) => {
    try {
      const result = await dispatch(toggleDeleteBlog(blog.id)).unwrap();

      if (result?.status === "error") {
        addToast({
          type: "error",
          message: `An error occurred: ${result.message || "Invalid data"}`,
        });
        return;
      }

      if (activeTab === "list") {
        dispatch(fetchBlogPosts({ page: currentPage, limit: itemsPerPage }));
      } else {
        dispatch(fetchDeletedBlogs({ page: currentPage, limit: itemsPerPage }));
      }

      addToast({
        type: "success",
        message: `${
          activeTab === "list" ? "Deleted" : "Restored"
        } blog successfully`,
      });
    } catch (error) {
      addToast({
        type: "error",
        message: `An error occurred: ${error.message || "Invalid data"}`,
      });
    }
  };

  const handleHardDelete = async (blogId) => {
    setBlogToDelete(blogId);
    setShowConfirmModal(true);
  };

  const handleConfirmHardDelete = async () => {
    try {
      setFormLoading(true);
      await dispatch(deleteBlogPermanently(blogToDelete)).unwrap();

      addToast({
        type: "success",
        message: "Permanently deleted blog successfully",
      });

      // Refresh list
      if (activeTab === "list") {
        dispatch(fetchBlogPosts({ page: currentPage, limit: itemsPerPage }));
      } else {
        dispatch(fetchDeletedBlogs({ page: currentPage, limit: itemsPerPage }));
      }
    } catch (error) {
      // Handle specific error cases
      if (error?.response?.status === 404) {
        addToast({
          type: "error",
          message: "Blog not found",
        });
      } else if (error?.response?.status === 403) {
        addToast({
          type: "error",
          message: "You do not have permission to delete this blog",
        });
      } else {
        addToast({
          type: "error",
          message: "An error occurred when deleting the blog",
        });
      }
    } finally {
      setFormLoading(false);
      setShowConfirmModal(false);
      setBlogToDelete(null);
    }
  };

  const getFilteredBlogs = () => {
    let blogsToFilter = [];

    if (activeTab === "list") {
      blogsToFilter = Array.isArray(blogs) ? blogs : [];
    } else {
      blogsToFilter = Array.isArray(deletedBlogs) ? deletedBlogs : [];
    }

    if (!searchTerm) return blogsToFilter;

    return blogsToFilter.filter(
      (blog) =>
        blog?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog?.author_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      summary: "",
      post_type: "BLOG",
      category: "PET_CARE",
      tags: [],
      status: "DRAFT",
      meta_title: "",
      meta_description: "",
      source: "",
      external_link: "",
      hospital_id: "",
    });
    setThumbnailImage(null);
    setFeaturedImage(null);
    setPreviewThumbnail("");
    setPreviewFeatured("");
    setIsSubmitting(false);
    setSelectedBlog(null);
  };

  const handleCreateNew = () => {
    resetForm();
    setShowCreateModal(true);
  };

  // Modal view with similar interface to edit form
  const ViewModal = () => (
    <div className="fixed inset-0 flex items-center justify-center z-[110]">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setShowViewModal(false)}
      />
      <div className="bg-white rounded-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto relative z-10">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Blog details</h2>
            <button
              onClick={() => setShowViewModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            {/* Basic information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                  {selectedBlog.title}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Summary
                </label>
                <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                  {selectedBlog.summary}
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 min-h-[150px]">
                {selectedBlog.content}
              </div>
            </div>

            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thumbnail
                </label>
                <img
                  src={selectedBlog.thumbnail_image}
                  alt="Thumbnail"
                  className="w-full h-32 object-cover rounded-md border border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured image
                </label>
                <img
                  src={selectedBlog.featured_image}
                  alt="Featured"
                  className="w-full h-32 object-cover rounded-md border border-gray-300"
                />
              </div>
            </div>

            {/* Type and status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blog type
                </label>
                <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                  {selectedBlog.post_type}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                  {selectedBlog.category}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                  {selectedBlog.status}
                </div>
              </div>
            </div>

            {/* Tags và SEO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedBlog.tags.split(",").map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-700"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hospital ID
                </label>
                <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                  {selectedBlog.hospital_id}
                </div>
              </div>
            </div>

            {/* SEO and source */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Title
                </label>
                <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                  {selectedBlog.meta_title}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description
                </label>
                <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                  {selectedBlog.meta_description}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Source
                </label>
                <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                  {selectedBlog.source}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Source link
                </label>
                <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                  {selectedBlog.external_link}
                </div>
              </div>
            </div>

            {/* Author information */}
            <div className="flex items-center space-x-4 border-t pt-4">
              <img
                src={selectedBlog.author_avatar}
                alt={selectedBlog.author_name}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium">
                  Author: {selectedBlog.author_name}
                </p>
                <p className="text-xs text-gray-500">
                  Created at:{" "}
                  {new Date(selectedBlog.created_at).toLocaleDateString(
                    "vi-VN"
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Add function to handle tag selection
  const handleTagChange = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  // Add component ConfirmDeleteModal
  const ConfirmDeleteModal = ({ onClose, onConfirm, loading }) => {
    const { t } = useTranslation();

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <h3 className="text-lg font-semibold mb-4">
            {t("Confirm delete permanently")}
          </h3>
          <p className="text-gray-600 mb-6">
            {t(
              "Are you sure you want to delete this blog permanently? This action cannot be undone!"
            )}
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              disabled={loading}
            >
              {t("Cancel")}
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 flex items-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {t("Delete permanently")}
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 md:p-6 mt-12 md:mt-0">
      {/* Header with Tabs */}
      <div className="flex flex-col gap-4">
        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("list")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "list"
                ? "bg-[#0D6EFD] text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            List
          </button>
          <button
            onClick={() => setActiveTab("trash")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "trash"
                ? "bg-[#0D6EFD] text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            Trash
          </button>
        </div>

        {/* Search and Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-1 max-w-lg">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search blog..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent"
            />
          </div>

          {activeTab === "list" && (
            <button
              onClick={handleCreateNew}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-[#0D6EFD] text-white rounded-lg hover:bg-[#0B5ED7] transition-colors w-full sm:w-auto"
            >
              <Plus size={20} />
              Add blog
            </button>
          )}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created at
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {getFilteredBlogs().map((blog) => (
                <tr key={blog.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{blog.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={blog.author_avatar}
                        alt={blog.author_name}
                        className="h-8 w-8 rounded-full mr-2"
                      />
                      {blog.author_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {blog.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        blog.status === "PUBLISHED"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {blog.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={blog.thumbnail_image}
                      alt={blog.title}
                      className="h-12 w-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(blog.created_at).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleView(blog)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye size={18} />
                      </button>
                      {activeTab === "list" && (
                        <>
                          <button
                            onClick={() => handleEdit(blog)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleToggleDelete(blog)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 size={18} />
                          </button>
                        </>
                      )}
                      {activeTab === "trash" && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleDelete(blog)}
                            className="text-green-600 hover:text-green-800 p-2"
                            title="Restore"
                          >
                            <RefreshCw size={20} />
                          </button>
                          <button
                            onClick={() => handleHardDelete(blog.id)}
                            className="text-red-600 hover:text-red-800 p-2"
                            title="Permanently delete"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {getFilteredBlogs().map((blog) => (
          <div key={blog.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium text-gray-900">{blog.title}</h3>
                <p className="text-sm text-gray-500">By {blog.author_name}</p>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  blog.status === "PUBLISHED"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {blog.status}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <span>{blog.category}</span>
              <span>•</span>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {blog.views_count}
              </div>
              <span>•</span>
              <span>
                {new Date(blog.created_at).toLocaleDateString("vi-VN")}
              </span>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleView(blog)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
              >
                <Eye size={18} />
              </button>
              {activeTab === "list" && (
                <>
                  <button
                    onClick={() => handleEdit(blog)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleToggleDelete(blog)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 size={18} />
                  </button>
                </>
              )}
              {activeTab === "trash" && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleDelete(blog)}
                    className="text-green-600 hover:text-green-800 p-2"
                    title="Khôi phục"
                  >
                    <RefreshCw size={20} />
                  </button>
                  <button
                    onClick={() => handleHardDelete(blog.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[110]">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => !isSubmitting && setShowCreateModal(false)}
          />
          <div className="bg-white rounded-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto relative z-10">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  {selectedBlog ? "Edit blog" : "Create new blog"}
                </h2>
                <button
                  onClick={() => {
                    if (!isSubmitting) {
                      setShowCreateModal(false);
                      resetForm();
                    }
                  }}
                  disabled={isSubmitting}
                  className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Thông tin cơ bản */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter title (at least 10 characters)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Summary
                    </label>
                    <input
                      type="text"
                      name="summary"
                      required
                      value={formData.summary}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Nội dung */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="content"
                    required
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter content (at least 50 characters)"
                  />
                </div>

                {/* Ảnh */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Thumbnail
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      required={!selectedBlog}
                      onChange={(e) => handleImageChange(e, "thumbnail")}
                      className="w-full"
                    />
                    {previewThumbnail && (
                      <img
                        src={previewThumbnail}
                        alt="Thumbnail preview"
                        className="mt-2 h-32 object-cover rounded"
                      />
                    )}
                    {selectedBlog &&
                      !previewThumbnail &&
                      selectedBlog.thumbnail_image && (
                        <img
                          src={selectedBlog.thumbnail_image}
                          alt="Current thumbnail"
                          className="mt-2 h-32 object-cover rounded"
                        />
                      )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Featured image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      required={!selectedBlog}
                      onChange={(e) => handleImageChange(e, "featured")}
                      className="w-full"
                    />
                    {previewFeatured && (
                      <img
                        src={previewFeatured}
                        alt="Featured preview"
                        className="mt-2 h-32 object-cover rounded"
                      />
                    )}
                    {selectedBlog &&
                      !previewFeatured &&
                      selectedBlog.featured_image && (
                        <img
                          src={selectedBlog.featured_image}
                          alt="Current featured"
                          className="mt-2 h-32 object-cover rounded"
                        />
                      )}
                  </div>
                </div>

                {/* Loại và trạng thái */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Blog type
                    </label>
                    <select
                      name="post_type"
                      required
                      value={formData.post_type}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {POST_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      required
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {STATUS_TYPES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Tags và SEO */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags <span className="text-red-500">*</span>
                  </label>
                  <div className="p-3 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-700"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleTagChange(tag)}
                            className="ml-1 hover:text-blue-900"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {BLOG_TAGS.filter(
                        (tag) => !formData.tags.includes(tag)
                      ).map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => handleTagChange(tag)}
                          className="px-2 py-1 rounded-full text-sm border border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                  {formData.tags.length === 0 && (
                    <p className="mt-1 text-sm text-red-500">
                      Vui lòng chọn ít nhất 1 tag
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hospital ID (if any)
                    </label>
                    <input
                      type="number"
                      name="hospital_id"
                      value={formData.hospital_id}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* SEO and source */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      name="meta_title"
                      value={formData.meta_title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meta Description
                    </label>
                    <input
                      type="text"
                      name="meta_description"
                      value={formData.meta_description}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Source
                    </label>
                    <input
                      type="text"
                      name="source"
                      value={formData.source}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Source link
                    </label>
                    <input
                      type="url"
                      name="external_link"
                      value={formData.external_link}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => !isSubmitting && setShowCreateModal(false)}
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative px-4 py-2 bg-[#40B8D3] text-white rounded-lg hover:bg-[#3aa5bd] disabled:opacity-50 min-w-[100px]"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="opacity-0">
                          {selectedBlog ? "Update" : "Add new"}
                        </span>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      </>
                    ) : selectedBlog ? (
                      "Update"
                    ) : (
                      "Add new"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && <ViewModal />}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-[#40B8D3] border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-700">Loading...</span>
            </div>
          </div>
        </div>
      )}

      {/* No Results Message */}
      {!loading && getFilteredBlogs()?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          {searchTerm ? (
            <>
              <Search className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg">No results found</p>
            </>
          ) : activeTab === "list" ? (
            <>
              <Plus className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg">No blog created yet</p>
              <button
                onClick={handleCreateNew}
                className="mt-4 flex items-center gap-2 px-4 py-2 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5]"
              >
                <Plus size={20} />
                Create blog
              </button>
            </>
          ) : (
            <>
              <Trash className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg">Trash is empty</p>
              <p className="text-gray-400 text-sm mt-2">
                Deleted blogs will appear here
              </p>
            </>
          )}
        </div>
      )}

      {/* Pagination */}
      {!loading && getFilteredBlogs()?.length > 0 && (
        <div className="mt-4 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{currentPage}</span> of{" "}
                <span className="font-medium">
                  {Math.ceil(
                    ((activeTab === "list"
                      ? pagination?.total
                      : deletedPagination?.total) || 0) / itemsPerPage
                  )}
                </span>{" "}
                pages
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  onClick={() => {
                    if (currentPage > 1) {
                      setCurrentPage((prev) => prev - 1);
                      const action =
                        activeTab === "list"
                          ? fetchBlogPosts
                          : fetchDeletedBlogs;
                      dispatch(
                        action({ page: currentPage - 1, limit: itemsPerPage })
                      );
                    }
                  }}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:bg-gray-100"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    const totalPages =
                      activeTab === "list"
                        ? Math.ceil((pagination?.total || 0) / itemsPerPage)
                        : Math.ceil(
                            (deletedPagination?.total || 0) / itemsPerPage
                          );
                    if (currentPage < totalPages) {
                      setCurrentPage((prev) => prev + 1);
                      const action =
                        activeTab === "list"
                          ? fetchBlogPosts
                          : fetchDeletedBlogs;
                      dispatch(
                        action({ page: currentPage + 1, limit: itemsPerPage })
                      );
                    }
                  }}
                  disabled={
                    currentPage ===
                    Math.ceil(
                      ((activeTab === "list"
                        ? pagination?.total
                        : deletedPagination?.total) || 0) / itemsPerPage
                    )
                  }
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:bg-gray-100"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {showConfirmModal && (
        <ConfirmDeleteModal
          onClose={() => {
            setShowConfirmModal(false);
            setBlogToDelete(null);
          }}
          onConfirm={handleConfirmHardDelete}
          loading={formLoading}
        />
      )}
    </div>
  );
}

export default BlogsManagement;
