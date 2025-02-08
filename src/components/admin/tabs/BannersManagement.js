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
      addToast({ type: "error", message: "Vui lòng nhập tiêu đề" });
      return false;
    }
    if (!formData.subtitle.trim()) {
      addToast({ type: "error", message: "Vui lòng nhập tiêu đề phụ" });
      return false;
    }
    if (formData.description.trim().length < 10) {
      addToast({ type: "error", message: "Mô tả phải có ít nhất 10 ký tự" });
      return false;
    }
    if (!selectedBanner && !formData.image) {
      addToast({ type: "error", message: "Vui lòng chọn ảnh banner" });
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
        addToast({ type: "success", message: "Cập nhật banner thành công" });
      } else {
        await dispatch(createBanner(formDataToSend)).unwrap();
        addToast({ type: "success", message: "Thêm banner thành công" });
      }

      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      addToast({
        type: "error",
        message: error.message || "Có lỗi xảy ra"
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
      ? "Bạn có chắc chắn muốn khôi phục banner này?"
      : "Bạn có chắc chắn muốn xóa banner này?";
      
    if (window.confirm(message)) {
      try {
        await dispatch(toggleDeleteBanner(banner.id)).unwrap();
        addToast({ 
          type: "success", 
          message: banner.is_deleted 
            ? "Đã khôi phục banner thành công" 
            : "Đã xóa banner thành công"
        });
      } catch (error) {
        addToast({
          type: "error",
          message: error.message || "Có lỗi xảy ra khi thay đổi trạng thái banner"
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
          ? "Đã tắt kích hoạt banner" 
          : "Đã kích hoạt banner"
      });
    } catch (error) {
      addToast({
        type: "error",
        message: error.message || "Có lỗi xảy ra khi thay đổi trạng thái banner"
      });
    }
  };

  const handleHardDelete = async (banner) => {
    if (window.confirm("CẢNH BÁO: Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa vĩnh viễn banner này?")) {
      try {
        await dispatch(hardDeleteBanner(banner.id)).unwrap();
        addToast({ 
          type: "success", 
          message: "Đã xóa vĩnh viễn banner thành công"
        });
      } catch (error) {
        addToast({
          type: "error",
          message: error.message || "Có lỗi xảy ra khi xóa vĩnh viễn banner"
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
        <h2 className="text-xl font-semibold text-gray-800">Quản lý Banner</h2>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#40B8D3] text-white rounded-lg hover:bg-[#3aa5bd]"
        >
          <Plus size={20} />
          Thêm Banner
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
                    Đã xóa
                  </span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2">{banner.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{banner.subtitle}</p>
              <p className="text-gray-600 text-sm mb-2">{banner.description}</p>
              <div className="text-xs text-gray-400 mb-4">
                Tạo bởi: {banner.created_by_name} - {new Date(banner.created_at).toLocaleDateString()}
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
                      Đang hoạt động
                    </>
                  ) : (
                    <>
                      <ToggleLeft size={16} />
                      Không hoạt động
                    </>
                  )}
                </button>
                <div className="flex gap-2">
                  {!banner.is_deleted && (
                    <button
                      onClick={() => handleEdit(banner)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      title="Chỉnh sửa"
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
                    title={banner.is_deleted ? "Khôi phục" : "Xóa tạm thời"}
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
                      title="Xóa vĩnh viễn"
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
                  {selectedBanner ? "Chỉnh sửa Banner" : "Thêm Banner mới"}
                </h3>
              </div>

              <div className="p-4">
                <div className="space-y-3">
                  {/* Form fields */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tiêu đề <span className="text-red-500">*</span>
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
                      Tiêu đề phụ <span className="text-red-500">*</span>
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
                      Link (tùy chọn)
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
                      Mô tả <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40B8D3]"
                      required
                      minLength={10}
                    />
                    <p className="text-xs text-gray-500 mt-1">Tối thiểu 10 ký tự</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hình ảnh {!selectedBanner && <span className="text-red-500">*</span>}
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
                          {selectedBanner ? "Cập nhật" : "Thêm mới"}
                        </span>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      </>
                    ) : (
                      selectedBanner ? "Cập nhật" : "Thêm mới"
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
              <span className="text-gray-700">Đang tải...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BannersManagement; 