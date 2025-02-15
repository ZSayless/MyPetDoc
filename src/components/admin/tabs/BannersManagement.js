import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Pencil, Trash2, Image, ToggleLeft, ToggleRight, Archive, ArchiveRestore, Trash } from "lucide-react";
import { useToast } from "../../../context/ToastContext";
import {
  fetchBanners,
  createBanner,
  updateBanner,
  toggleDeleteBanner,
  toggleActiveBanner,
  hardDeleteBanner
} from "../../../redux/slices/adminSlice";

function BannersManagement() {
  const dispatch = useDispatch();
  const { addToast } = useToast();
  const { banners, isLoadingBanners, isSubmittingBanner } = useSelector((state) => state.admin);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    link: "",
    description: "",
    image: null,
    imagePreview: null
  });

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      addToast({ type: "error", message: "Please enter the title" });
      return false;
    }
    if (!formData.subtitle.trim()) {
      addToast({ type: "error", message: "Please enter the subtitle" });
      return false;
    }
    if (formData.description.trim().length < 10) {
      addToast({ type: "error", message: "Description must be at least 10 characters" });
      return false;
    }
    if (!selectedBanner && !formData.image) {
      addToast({ type: "error", message: "Please select a banner image" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("subtitle", formData.subtitle);
      formDataToSend.append("description", formData.description);
      if (formData.link) {
        formDataToSend.append("link", formData.link);
      }
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      if (selectedBanner) {
        await dispatch(updateBanner({ 
          id: selectedBanner.id, 
          data: formDataToSend 
        })).unwrap();
        addToast({ type: "success", message: "Updated banner successfully" });
      } else {
        await dispatch(createBanner(formDataToSend)).unwrap();
        addToast({ type: "success", message: "Added banner successfully" });
      }

      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      addToast({
        type: "error",
        message: error.message || "An error occurred"
      });
    }
  };

  const handleEdit = (banner) => {
    setSelectedBanner(banner);
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle,
      link: banner.link || "",
      description: banner.description,
      image: null,
      imagePreview: banner.image_url
    });
    setIsModalOpen(true);
  };

  const handleToggleDelete = async (banner) => {
    const message = banner.is_deleted 
      ? "Are you sure you want to restore this banner?"
      : "Are you sure you want to delete this banner?";
      
    if (window.confirm(message)) {
      try {
        await dispatch(toggleDeleteBanner(banner.id)).unwrap();
        addToast({ 
          type: "success", 
          message: banner.is_deleted 
            ? "Restored banner successfully" 
            : "Deleted banner successfully"
        });
      } catch (error) {
        addToast({
          type: "error",
          message: error.message || "An error occurred when changing the banner status"
        });
      }
    }
  };

  const handleToggleActive = async (banner) => {
    try {
      await dispatch(toggleActiveBanner(banner.id)).unwrap();
      addToast({ 
        type: "success", 
        message: banner.is_active 
          ? "Deactivated banner" 
          : "Activated banner"
      });
    } catch (error) {
      addToast({
        type: "error",
        message: error.message || "An error occurred when changing the banner status"
      });
    }
  };

  const handleHardDelete = async (banner) => {
    if (window.confirm("WARNING: This action cannot be undone. Are you sure you want to permanently delete this banner?")) {
      try {
        await dispatch(hardDeleteBanner(banner.id)).unwrap();
        addToast({ 
          type: "success", 
          message: "Permanently deleted banner successfully"
        });
      } catch (error) {
        addToast({
          type: "error",
          message: error.message || "An error occurred when permanently deleting the banner"
        });
      }
    }
  };

  const resetForm = () => {
    setSelectedBanner(null);
    setFormData({
      title: "",
      subtitle: "",
      link: "",
      description: "",
      image: null,
      imagePreview: null
    });
  };

  if (isLoadingBanners) {
    return (
      <div className="p-4 flex justify-center">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Banner Management</h2>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#40B8D3] text-white rounded-lg hover:bg-[#3aa5bd]"
        >
          <Plus size={20} />
          Add Banner
        </button>
      </div>

      {/* Banner Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners?.map((banner) => (
          <div 
            key={banner.id} 
            className={`bg-white rounded-lg shadow-sm overflow-hidden ${
              banner.is_deleted ? 'opacity-60' : ''
            }`}
          >
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={banner.image_url}
                  alt={banner.title}
                  className="object-cover w-full h-full"
                />
              </div>
              {banner.is_deleted && (
                <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                  <span className="text-white font-medium px-3 py-1 rounded-full bg-red-500">
                    Deleted
                  </span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2">{banner.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{banner.subtitle}</p>
              <p className="text-gray-600 text-sm mb-2">{banner.description}</p>
              <div className="text-xs text-gray-400 mb-4">
                Created by: {banner.created_by_name} - {new Date(banner.created_at).toLocaleDateString()}
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleToggleActive(banner)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                    banner.is_active 
                      ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {banner.is_active ? (
                    <>
                      <ToggleRight size={16} />
                      Active
                    </>
                  ) : (
                    <>
                      <ToggleLeft size={16} />
                      Inactive
                    </>
                  )}
                </button>
                <div className="flex gap-2">
                  {!banner.is_deleted && (
                    <button
                      onClick={() => handleEdit(banner)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => handleToggleDelete(banner)}
                    className={`p-2 rounded-lg ${
                      banner.is_deleted
                        ? 'text-green-600 hover:bg-green-50'
                        : 'text-red-600 hover:bg-red-50'
                    }`}
                    title={banner.is_deleted ? "Restore" : "Delete temporarily"}
                  >
                    {banner.is_deleted ? (
                      <ArchiveRestore size={18} />
                    ) : (
                      <Archive size={18} />
                    )}
                  </button>
                  {banner.is_deleted && (
                    <button
                      onClick={() => handleHardDelete(banner)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      title="Permanently delete"
                    >
                      <Trash size={18} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-md my-8">
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">
                  {selectedBanner ? "Edit Banner" : "Add new Banner"}
                </h3>
              </div>

              <div className="p-4">
                <div className="space-y-3">
                  {/* Form fields */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40B8D3]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subtitle <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.subtitle}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40B8D3]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Link (optional)
                    </label>
                    <input
                      type="text"
                      value={formData.link}
                      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40B8D3]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40B8D3]"
                      required
                      minLength={10}
                    />
                    <p className="text-xs text-gray-500 mt-1">Minimum 10 characters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image {!selectedBanner && <span className="text-red-500">*</span>}
                    </label>
                    <div className="mt-1 flex justify-center px-4 py-4 border-2 border-gray-300 border-dashed rounded-lg">
                      <div className="space-y-1 text-center">
                        {formData.imagePreview ? (
                          <img
                            src={formData.imagePreview}
                            alt="Preview"
                            className="mx-auto h-24 w-auto object-contain"
                          />
                        ) : (
                          <Image className="mx-auto h-12 w-12 text-gray-400" />
                        )}
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-[#40B8D3] hover:text-[#3aa5bd] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#40B8D3]">
                            <span>Upload a file</span>
                            <input
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleImageChange}
                              required={!selectedBanner}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t bg-gray-50">
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      resetForm();
                    }}
                    disabled={isSubmittingBanner}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingBanner}
                    className="relative px-4 py-2 text-white bg-[#40B8D3] rounded-lg hover:bg-[#3aa5bd] disabled:opacity-50 min-w-[100px]"
                  >
                    {isSubmittingBanner ? (
                      <>
                        <span className="opacity-0">
                          {selectedBanner ? "Update" : "Add new"}
                        </span>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      </>
                    ) : (
                      selectedBanner ? "Update" : "Add new"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoadingBanners && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-[#40B8D3] border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-700">Loading...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BannersManagement; 